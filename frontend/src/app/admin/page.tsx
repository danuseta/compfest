"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import AdminMetrics from "@/components/dashboard/AdminMetrics"
import AnalyticsPeriod from "@/components/dashboard/AnalyticsPeriod"
import PendingSubscriptions from "@/components/dashboard/PendingSubscriptions"
import SubscriptionHistory from "@/components/dashboard/SubscriptionHistory"
import MealPlanManager from "@/components/dashboard/MealPlanManager"
import MenuManager from "@/components/dashboard/MenuManager"
import TestimonialManager from "@/components/dashboard/TestimonialManager"

import { isAuthenticated, getUser } from "@/lib/auth"
import { FiShield, FiAlertCircle, FiClock, FiInbox, FiMessageSquare } from "react-icons/fi"
import { MdAnalytics, MdRestaurantMenu } from "react-icons/md"
import { getApiUrl } from '@/lib/api'

interface AdminMetrics {
  totalSubscribedUsers: number
  monthlyRecurringRevenue: number
  totalRevenue: number
}

interface MealPlan {
  id: number
  planId: string
  name: string
  price: number
  description: string
  features: string[]
  imageUrl?: string
  isActive: boolean
  createdAt: string
}

interface Subscription {
  id: number
  user: {
    full_name: string
    email: string
  }
  mealPlan: {
    name: string
    price: number
  }
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  totalPrice: number
  status: string
  allergies?: string
  created_at: string
}



export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null)
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [pendingSubscriptions, setPendingSubscriptions] = useState<Subscription[]>([])
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([])
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<Array<{month: string, revenue: number}>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])
  const router = useRouter()

  const getSubscriptionPieData = (subscriptions: Subscription[], plans: MealPlan[]) => {
    const planCounts = plans.reduce((acc, plan) => {
      acc[plan.name] = { name: plan.name, count: 0 }
      return acc
    }, {} as Record<string, { name: string; count: number }>)

    subscriptions.forEach(sub => {
      if (sub.mealPlan && planCounts[sub.mealPlan.name]) {
        planCounts[sub.mealPlan.name].count++
      }
    })

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
    
    return Object.values(planCounts)
      .filter(plan => plan.count > 0)
      .map((plan, index) => ({
        planName: plan.name,
        count: plan.count,
        color: colors[index % colors.length]
      }))
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push('/login')
        return
      }

      const queryParams = new URLSearchParams()
      if (startDate) queryParams.append('startDate', startDate)
      if (endDate) queryParams.append('endDate', endDate)

      const [metricsRes, mealsRes, subsRes, allSubsRes, revenueRes] = await Promise.all([
        fetch(getApiUrl(`/api/admin/metrics?${queryParams}`), {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(getApiUrl('/api/meal-plans'), {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(getApiUrl('/api/admin/pending-subscriptions'), {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(getApiUrl('/api/admin/recent-subscriptions?limit=50'), {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(getApiUrl(`/api/admin/monthly-revenue?${queryParams}`), {
          headers: { "Authorization": `Bearer ${token}` }
        })
      ])

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json()
        if (metricsData.success) setMetrics(metricsData.data)
      }

      if (mealsRes.ok) {
        const mealsData = await mealsRes.json()
        if (mealsData.success) setMealPlans(mealsData.data)
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json()
        if (subsData.success) setPendingSubscriptions(subsData.data)
      }

      if (allSubsRes.ok) {
        const allSubsData = await allSubsRes.json()
        if (allSubsData.success) setAllSubscriptions(allSubsData.data)
      }



      if (revenueRes.ok) {
        const revenueData = await revenueRes.json()
        if (revenueData.success) setMonthlyRevenueData(revenueData.data)
      }

    } catch {
      setAlert({ type: 'error', message: 'Failed to load admin data. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate, router])

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const user = getUser()
    if (!user || user.role !== 'admin') {
      setAlert({ type: 'error', message: 'Access denied. Admin role required.' })
      setTimeout(() => router.push('/dashboard'), 2000)
      return
    }

    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    setStartDate(firstDay.toISOString().split('T')[0])
    setEndDate(today.toISOString().split('T')[0])

    fetchData()
  }, [router, fetchData])

  const handleSubscriptionApproval = async (id: number, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem("token")
      const status = action === 'approve' ? 'active' : 'cancelled'
      
      const response = await fetch(getApiUrl(`/api/admin/subscriptions/${id}/status`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ 
          type: 'success', 
          message: `Subscription ${action === 'approve' ? 'approved' : 'rejected'} successfully!` 
        })
        fetchData()
      } else {
        setAlert({ type: 'error', message: data.message || 'Operation failed' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background transition-all duration-500">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 md:mb-4">
              <FiShield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 px-4">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Monitor business performance and manage SEA Catering operations
            </p>
          </div>

          {alert && (
            <Alert className={`mb-8 border-0 shadow-lg ${alert.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30'}`}>
              <FiAlertCircle className={`h-4 w-4 ${alert.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
              <AlertDescription className={alert.type === 'success' ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'}>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6 sm:mb-8 h-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <MdAnalytics className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Dashboard</span>
                <span className="xs:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="incoming" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <FiInbox className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Incoming</span>
                <span className="xs:hidden">New</span>
              </TabsTrigger>
              <TabsTrigger value="menus" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <MdRestaurantMenu className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Meal Plans</span>
                <span className="xs:hidden">Plans</span>
              </TabsTrigger>
              <TabsTrigger value="menu-items" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <MdRestaurantMenu className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Menu</span>
                <span className="xs:hidden">Menu</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <FiMessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Testimonials</span>
                <span className="xs:hidden">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <FiClock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Subscription History</span>
                <span className="xs:hidden">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6 sm:space-y-8">
              <AnalyticsPeriod
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onRefresh={fetchData}
              />

              {metrics && (
                <AdminMetrics 
                  metrics={metrics} 
                  subscriptionData={getSubscriptionPieData(allSubscriptions, mealPlans)}
                  monthlyRevenueData={monthlyRevenueData}
                />
              )}
            </TabsContent>

            <TabsContent value="incoming" className="space-y-6 sm:space-y-8">
              <PendingSubscriptions 
                subscriptions={pendingSubscriptions}
                onApproval={handleSubscriptionApproval}
              />
            </TabsContent>

            <TabsContent value="menus" className="space-y-6">
              <MealPlanManager mealPlans={mealPlans} onRefresh={fetchData} />
            </TabsContent>

            <TabsContent value="menu-items" className="space-y-6">
              <MenuManager onRefresh={fetchData} />
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-8">
              <TestimonialManager onRefresh={fetchData} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <SubscriptionHistory subscriptions={allSubscriptions} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}