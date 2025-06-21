"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiCheckCircle } from "react-icons/fi"
import { MdCalculate } from "react-icons/md"

const mealPlans = [
  { id: "diet", name: "Diet Plan", price: 30000 },
  { id: "protein", name: "Protein Plan", price: 40000 },
  { id: "royal", name: "Royal Plan", price: 60000 }
]

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
}

export default function OrderSummary({ 
  selectedPlan, 
  selectedMealTypes, 
  selectedDeliveryDays, 
  totalPrice 
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const selectedPlanData = mealPlans.find(p => p.id === selectedPlan)

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MdCalculate className="h-5 w-5 text-primary" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPlan && selectedPlanData && (
          <div>
            <h4 className="font-semibold text-foreground">Selected Plan:</h4>
            <p className="text-primary font-medium">
              {selectedPlanData.name} - {formatPrice(selectedPlanData.price)}
            </p>
          </div>
        )}

        {selectedMealTypes.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground">Meal Types ({selectedMealTypes.length}):</h4>
            <div className="space-y-1">
              {selectedMealTypes.map((mealType) => (
                <p key={mealType} className="text-sm capitalize flex items-center gap-1 text-muted-foreground">
                  <FiCheckCircle className="h-3 w-3 text-emerald-500" />
                  {mealTypes.find(m => m.id === mealType)?.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {selectedDeliveryDays.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground">Delivery Days ({selectedDeliveryDays.length}):</h4>
            <div className="flex flex-wrap gap-1">
              {selectedDeliveryDays.map((day) => (
                <Badge key={day} variant="outline" className="text-xs">
                  {weekDays.find(d => d.id === day)?.short}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {totalPrice > 0 && selectedPlanData && (
          <div className="border-t border-border pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Plan Price:</span>
                <span>{formatPrice(selectedPlanData.price)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Meal Types:</span>
                <span>×{selectedMealTypes.length}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Days:</span>
                <span>×{selectedDeliveryDays.length}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Weekly Multiplier:</span>
                <span>×4.3</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span className="text-foreground">Total per Month:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 