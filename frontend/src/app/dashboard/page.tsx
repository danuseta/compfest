"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import SubscriptionCard from "@/components/dashboard/SubscriptionCard"

import PauseModal from "@/components/dashboard/PauseModal"
import EmptyState from "@/components/dashboard/EmptyState"
import { isAuthenticated } from "@/lib/auth"
import { FiAlertCircle, FiArrowRight } from "react-icons/fi"
import { MdFastfood } from "react-icons/md"
import { useRouter } from "next/navigation"
import { Subscription } from "@/types/subscription"
import Link from "next/link"
import { getApiUrl } from '@/lib/api'

export default function UserDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPauseModal, setShowPauseModal] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [pauseStartDate, setPauseStartDate] = useState("")
  const [pauseEndDate, setPauseEndDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const router = useRouter()

  const fetchSubscriptions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(getApiUrl('/api/subscriptions'), {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Subscriptions data:', data)
      
      if (data.success) {
        setSubscriptions(data.data.subscriptions || [])
      } else {
        console.error('API error:', data.message)
        setAlert({ type: 'error', message: data.message || 'Failed to load subscriptions' })
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      setAlert({ type: 'error', message: 'Failed to load subscriptions. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    fetchSubscriptions()
  }, [router, fetchSubscriptions])

  const handlePauseSubscription = async () => {
    if (!selectedSubscription || !pauseStartDate || !pauseEndDate) return

    setIsSubmitting(true)
    try {
      const response = await fetch(getApiUrl(`/api/subscriptions/${selectedSubscription.id}/pause`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          pauseStartDate,
          pauseEndDate
        })
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ type: 'success', message: 'Subscription paused successfully!' })
        fetchSubscriptions()
        setShowPauseModal(false)
        setPauseStartDate("")
        setPauseEndDate("")
        setSelectedSubscription(null)
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to pause subscription' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResumeSubscription = async (subscriptionId: number) => {
    try {
      const response = await fetch(getApiUrl(`/api/subscriptions/${subscriptionId}/resume`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ type: 'success', message: 'Subscription resumed successfully!' })
        fetchSubscriptions()
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to resume subscription' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handleCancelSubscription = async (subscriptionId: number) => {
    if (!confirm('Are you sure you want to cancel this subscription? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(getApiUrl(`/api/subscriptions/${subscriptionId}/status`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          status: 'cancelled'
        })
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ type: 'success', message: 'Subscription cancelled successfully!' })
        fetchSubscriptions()
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to cancel subscription' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handlePauseClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setShowPauseModal(true)
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
          <DashboardHeader />

          {alert && (
            <Alert className={`mb-8 border-0 shadow-lg ${alert.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30'}`}>
              <FiAlertCircle className={`h-4 w-4 ${alert.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
              <AlertDescription className={alert.type === 'success' ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'}>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          {subscriptions.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Your Subscriptions</h2>
                <p className="text-sm text-muted-foreground">
                  {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="grid gap-6">
                {subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onPause={handlePauseClick}
                    onResume={handleResumeSubscription}
                    onCancel={handleCancelSubscription}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button 
                  className="orange-gradient text-white font-semibold flex items-center space-x-2 group w-full sm:w-auto" 
                  asChild
                >
                  <Link href="/subscription">
                    <MdFastfood className="w-4 h-4" />
                    <span>Add New Subscription</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto" 
                  asChild
                >
                  <Link href="/menu">View Our Menu</Link>
                </Button>
              </div>
            </div>
          )}

          <PauseModal
            isOpen={showPauseModal}
            onClose={() => {
              setShowPauseModal(false)
              setSelectedSubscription(null)
              setPauseStartDate("")
              setPauseEndDate("")
            }}
            pauseStartDate={pauseStartDate}
            pauseEndDate={pauseEndDate}
            setPauseStartDate={setPauseStartDate}
            setPauseEndDate={setPauseEndDate}
            onSubmit={handlePauseSubscription}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}