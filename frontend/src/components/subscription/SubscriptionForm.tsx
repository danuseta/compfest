"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiUser, FiLock, FiInfo } from "react-icons/fi"
import { getUser } from "@/lib/auth"
import MealPlanSelector from "./MealPlanSelector"
import MealTypeSelector from "./MealTypeSelector"
import DeliveryDaySelector from "./DeliveryDaySelector"
import OrderSummary from "./OrderSummary"
import { getApiUrl } from "@/lib/api"

interface MealPlan {
  id: number
  planId: string
  name: string
  price: number
  description: string
  features: string[]
  imageUrl?: string
  isActive: boolean
}

interface FormData {
  selectedPlan: string
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  allergies: string
}

interface FormErrors {
  selectedPlan?: string
  selectedMealTypes?: string
  selectedDeliveryDays?: string
}

interface SubscriptionFormProps {
  onSuccess: () => void
}

export default function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    selectedPlan: "",
    selectedMealTypes: [],
    selectedDeliveryDays: [],
    allergies: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch(getApiUrl('/api/meal-plans?active=true'))
        const data = await response.json()
        
        if (data.success) {
          setMealPlans(data.data)
        } else {
          console.error('Failed to fetch meal plans:', data.message)
        }
      } catch (error) {
        console.error('Error fetching meal plans:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const user = getUser()
    if (user && user.role === 'admin') {
      setIsAdmin(true)
    }

    fetchMealPlans()
  }, [])

  const calculateTotalPrice = () => {
    if (!formData.selectedPlan || formData.selectedMealTypes.length === 0 || formData.selectedDeliveryDays.length === 0) {
      return 0
    }

    const selectedPlanData = mealPlans.find(plan => plan.planId === formData.selectedPlan)
    if (!selectedPlanData) return 0

    return selectedPlanData.price * formData.selectedMealTypes.length * formData.selectedDeliveryDays.length * 4.3
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleMealTypeChange = (mealTypeId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, selectedMealTypes: [...prev.selectedMealTypes, mealTypeId] }))
    } else {
      setFormData(prev => ({ ...prev, selectedMealTypes: prev.selectedMealTypes.filter(id => id !== mealTypeId) }))
    }
  }

  const handleDeliveryDayChange = (dayId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, selectedDeliveryDays: [...prev.selectedDeliveryDays, dayId] }))
    } else {
      setFormData(prev => ({ ...prev, selectedDeliveryDays: prev.selectedDeliveryDays.filter(id => id !== dayId) }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!formData.selectedPlan) newErrors.selectedPlan = "Please select a meal plan"
    if (formData.selectedMealTypes.length === 0) newErrors.selectedMealTypes = "Please select at least one meal type"
    if (formData.selectedDeliveryDays.length === 0) newErrors.selectedDeliveryDays = "Please select at least one delivery day"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubscribeClick = () => {
    if (!validateForm()) return
    setShowModal(true)
  }

  const handleConfirmSubscription = async () => {
    setIsSubmitting(true)
    try {
      const submitData = {
        selectedPlan: formData.selectedPlan,
        selectedMealTypes: formData.selectedMealTypes,
        selectedDeliveryDays: formData.selectedDeliveryDays,
        allergies: formData.allergies.trim() || undefined,
        totalPrice: calculateTotalPrice()
      }

      const response = await fetch(getApiUrl('/api/subscriptions'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        onSuccess()
        setFormData({ selectedPlan: "", selectedMealTypes: [], selectedDeliveryDays: [], allergies: "" })
        setShowModal(false)
      } else {
        console.error('Subscription error:', data.message)
        alert(data.message || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting subscription:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = calculateTotalPrice()

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">Loading meal plans...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {isAdmin && (
        <Alert className="mb-6 border-0 shadow-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30">
          <FiInfo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Admin View:</strong> You are viewing this form as an administrator. This form is read-only for admin users. Only customers can create subscriptions.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
        <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
            <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
              {isAdmin ? <FiLock className="h-5 w-5 text-amber-500" /> : <FiUser className="h-5 w-5 text-primary" />}
            </div>
            {isAdmin ? "Subscription Details (Admin View)" : "Subscription Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className={`space-y-8 ${isAdmin ? 'pointer-events-none opacity-60' : ''}`}>
            <MealPlanSelector
              selectedPlan={formData.selectedPlan}
              onPlanChange={(planId) => setFormData(prev => ({ ...prev, selectedPlan: planId }))}
              error={errors.selectedPlan}
              mealPlans={mealPlans}
            />

            <MealTypeSelector
              selectedMealTypes={formData.selectedMealTypes}
              onMealTypeChange={handleMealTypeChange}
              error={errors.selectedMealTypes}
            />

            <DeliveryDaySelector
              selectedDeliveryDays={formData.selectedDeliveryDays}
              onDeliveryDayChange={handleDeliveryDayChange}
              error={errors.selectedDeliveryDays}
            />

            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium text-foreground">Allergies (Optional)</Label>
              <Textarea
                placeholder="Please list any allergies or dietary restrictions..."
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                className="bg-background border-border text-foreground text-sm sm:text-base"
                rows={3}
                disabled={isAdmin}
              />
            </div>

            <OrderSummary
              selectedPlan={formData.selectedPlan}
              selectedMealTypes={formData.selectedMealTypes}
              selectedDeliveryDays={formData.selectedDeliveryDays}
              totalPrice={totalPrice}
              mealPlans={mealPlans}
              onSubscribe={handleSubscribeClick}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] sm:max-w-2xl lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-foreground pr-8">Confirm Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">Order Summary</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-medium text-foreground">
                    {mealPlans.find(plan => plan.planId === formData.selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Meal Types:</span>
                  <span className="font-medium text-foreground">{formData.selectedMealTypes.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Days:</span>
                  <span className="font-medium text-foreground">{formData.selectedDeliveryDays.join(", ")}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="font-bold text-primary text-sm sm:text-base">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)}
                className="flex-1 text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmSubscription}
                disabled={isSubmitting}
                className="flex-1 orange-gradient text-white font-semibold text-xs sm:text-sm"
              >
                {isSubmitting ? "Processing..." : "Confirm Subscription"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 