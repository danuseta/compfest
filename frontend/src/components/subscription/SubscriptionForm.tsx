"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  name: string
  phone: string
  selectedPlan: string
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  allergies: string
}

interface FormErrors {
  name?: string
  phone?: string
  selectedPlan?: string
  selectedMealTypes?: string
  selectedDeliveryDays?: string
}

interface SubscriptionFormProps {
  onSuccess: () => void
}

export default function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    selectedPlan: "",
    selectedMealTypes: [],
    selectedDeliveryDays: [],
    allergies: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone.trim())) newErrors.phone = "Please enter a valid phone number"
    if (!formData.selectedPlan) newErrors.selectedPlan = "Please select a meal plan"
    if (formData.selectedMealTypes.length === 0) newErrors.selectedMealTypes = "Please select at least one meal type"
    if (formData.selectedDeliveryDays.length === 0) newErrors.selectedDeliveryDays = "Please select at least one delivery day"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Subscription Data:', { ...formData, totalPrice: calculateTotalPrice() })
      onSuccess()
      setFormData({ name: "", phone: "", selectedPlan: "", selectedMealTypes: [], selectedDeliveryDays: [], allergies: "" })
    } catch (error) {
      console.error('Error submitting subscription:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = calculateTotalPrice()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FiUser className="h-5 w-5 text-primary" />
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="08123456789"
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>

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

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting || totalPrice === 0}
              >
                {isSubmitting ? "Processing..." : `Subscribe Now - ${formatPrice(totalPrice)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <OrderSummary
          selectedPlan={formData.selectedPlan}
          selectedMealTypes={formData.selectedMealTypes}
          selectedDeliveryDays={formData.selectedDeliveryDays}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  )
} 