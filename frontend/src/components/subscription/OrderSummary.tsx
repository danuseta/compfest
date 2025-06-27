"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FiCheckCircle, FiActivity, FiDollarSign } from "react-icons/fi"
import { MdCalculate, MdRestaurantMenu } from "react-icons/md"

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

const mealTypes = [
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" }
]

const weekDays = [
  { id: "monday", short: "Mon" },
  { id: "tuesday", short: "Tue" },
  { id: "wednesday", short: "Wed" },
  { id: "thursday", short: "Thu" },
  { id: "friday", short: "Fri" },
  { id: "saturday", short: "Sat" },
  { id: "sunday", short: "Sun" }
]

interface OrderSummaryProps {
  selectedPlan: string
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  totalPrice: number
  mealPlans: MealPlan[]
  onSubscribe: () => void
}

export default function OrderSummary({ 
  selectedPlan, 
  selectedMealTypes, 
  selectedDeliveryDays, 
  totalPrice,
  mealPlans,
  onSubscribe
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const selectedPlanData = mealPlans.find(p => p.planId === selectedPlan)

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/10 dark:via-background dark:to-accent/10">
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border">
        <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
            <MdCalculate className="h-5 w-5 text-primary" />
          </div>
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {selectedPlan && selectedPlanData && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
              <FiActivity className="h-4 w-4 text-primary" />
              Selected Plan
            </h4>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MdRestaurantMenu className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">{selectedPlanData.name}</p>
                    <p className="text-xs text-muted-foreground">per meal</p>
                  </div>
                </div>
                <p className="text-primary font-bold text-sm sm:text-base">
                  {formatPrice(selectedPlanData.price)}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedMealTypes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
              <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              Meal Types ({selectedMealTypes.length} selected)
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {selectedMealTypes.map((mealType) => (
                <div key={mealType} className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                  <FiCheckCircle className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm capitalize text-emerald-700 dark:text-emerald-300 font-medium">
                    {mealTypes.find(m => m.id === mealType)?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDeliveryDays.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
              <FiCheckCircle className="h-4 w-4 text-blue-500" />
              Delivery Days ({selectedDeliveryDays.length} selected)
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDeliveryDays.map((day) => (
                <Badge key={day} className="bg-blue-500 text-white text-xs">
                  {weekDays.find(d => d.id === day)?.short}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {totalPrice > 0 && selectedPlanData && (
          <div className="border-t border-border pt-6 space-y-4">
            <h4 className="font-semibold text-foreground text-sm sm:text-base flex items-center gap-2">
              <FiDollarSign className="h-4 w-4 text-primary" />
              Price Calculation
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-muted-foreground">Plan Price:</span>
                <span className="font-medium text-foreground">{formatPrice(selectedPlanData.price)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-muted-foreground">Meal Types:</span>
                <span className="font-medium text-foreground">×{selectedMealTypes.length}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-muted-foreground">Delivery Days:</span>
                <span className="font-medium text-foreground">×{selectedDeliveryDays.length}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-muted-foreground">Weekly Multiplier:</span>
                <span className="font-medium text-foreground">×4.3</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="font-bold text-foreground text-sm sm:text-base">Total per Month:</span>
                <span className="font-bold text-primary text-lg sm:text-xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={onSubscribe}
          className="w-full orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all py-3 text-sm sm:text-base"
          disabled={totalPrice === 0}
        >
          {totalPrice > 0 ? `Subscribe Now - ${formatPrice(totalPrice)}` : 'Select your preferences above'}
        </Button>
      </CardContent>
    </Card>
  )
} 