"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FiUser } from "react-icons/fi"
import MealPlanSelector from "./MealPlanSelector"
import MealTypeSelector from "./MealTypeSelector"
import DeliveryDaySelector from "./DeliveryDaySelector"
import OrderSummary from "./OrderSummary"

const mealPlans = [
  { id: "diet", name: "Diet Plan", price: 30000 },
  { id: "protein", name: "Protein Plan", price: 40000 },
  { id: "royal", name: "Royal Plan", price: 60000 }
]

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

  const calculateTotalPrice = () => {
    if (!formData.selectedPlan || formData.selectedMealTypes.length === 0 || formData.selectedDeliveryDays.length === 0) {
      return 0
    }

    const selectedPlanData = mealPlans.find(plan => plan.id === formData.selectedPlan)
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/subscriptions`, {
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

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FiUser className="h-5 w-5 text-primary" />
            Subscription Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <MealPlanSelector
              selectedPlan={formData.selectedPlan}
              onPlanChange={(planId) => setFormData(prev => ({ ...prev, selectedPlan: planId }))}
              error={errors.selectedPlan}
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

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies & Special Requests (Optional)</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="Please list any food allergies or special dietary requirements..."
                rows={3}
              />
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleSubscribeClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={totalPrice === 0}
                >
                  Subscribe Now - {formatPrice(totalPrice)}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Confirm Your Subscription</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <OrderSummary
                    selectedPlan={formData.selectedPlan}
                    selectedMealTypes={formData.selectedMealTypes}
                    selectedDeliveryDays={formData.selectedDeliveryDays}
                    totalPrice={totalPrice}
                  />
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleConfirmSubscription}
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Order"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 