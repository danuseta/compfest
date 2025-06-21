"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { MdRestaurantMenu } from "react-icons/md"

const mealTypes = [
  { id: "breakfast", name: "Breakfast", time: "07:00 - 09:00" },
  { id: "lunch", name: "Lunch", time: "12:00 - 14:00" },
  { id: "dinner", name: "Dinner", time: "18:00 - 20:00" }
]

interface MealTypeSelectorProps {
  selectedMealTypes: string[]
  onMealTypeChange: (mealTypeId: string, checked: boolean) => void
  error?: string
}

export default function MealTypeSelector({ selectedMealTypes, onMealTypeChange, error }: MealTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold flex items-center gap-2">
        <MdRestaurantMenu className="h-4 w-4 text-primary" />
        Select Meal Types
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mealTypes.map((meal) => (
          <Card key={meal.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={meal.id}
                checked={selectedMealTypes.includes(meal.id)}
                onCheckedChange={(checked) => onMealTypeChange(meal.id, checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor={meal.id} className="cursor-pointer">
                  <div className="font-medium text-foreground">{meal.name}</div>
                  <div className="text-sm text-muted-foreground">{meal.time}</div>
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
} 