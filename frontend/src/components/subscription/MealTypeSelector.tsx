"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MdLunchDining } from "react-icons/md"
import { FiSun, FiActivity, FiMoon } from "react-icons/fi"

const mealTypes = [
  { 
    id: "breakfast", 
    name: "Breakfast", 
    time: "07:00 - 09:00",
    icon: FiSun,
    gradient: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800/30"
  },
  { 
    id: "lunch", 
    name: "Lunch", 
    time: "12:00 - 14:00",
    icon: MdLunchDining,
    gradient: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800/30"
  },
  { 
    id: "dinner", 
    name: "Dinner", 
    time: "18:00 - 20:00",
    icon: FiMoon,
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800/30"
  }
]

interface MealTypeSelectorProps {
  selectedMealTypes: string[]
  onMealTypeChange: (mealTypeId: string, checked: boolean) => void
  error?: string
}

export default function MealTypeSelector({ selectedMealTypes, onMealTypeChange, error }: MealTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
          <FiActivity className="h-4 w-4 text-primary" />
          Select Meal Types
        </Label>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Choose when you want your meals delivered (at least one required)</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {mealTypes.map((meal) => {
          const isSelected = selectedMealTypes.includes(meal.id)
          const IconComponent = meal.icon
          return (
            <Card 
              key={meal.id} 
              className={`transition-all duration-300 hover:shadow-xl border-0 shadow-lg cursor-pointer ${
                isSelected 
                  ? 'shadow-2xl' 
                  : 'hover:shadow-2xl hover:transform hover:scale-102'
              }`}
              onClick={() => onMealTypeChange(meal.id, !isSelected)}
            >
              {isSelected && <div className={`h-2 bg-gradient-to-r ${meal.gradient}`}></div>}
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Checkbox
                    id={meal.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => onMealTypeChange(meal.id, checked as boolean)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${meal.bgColor} flex items-center justify-center border ${meal.borderColor}`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${meal.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={meal.id} className="cursor-pointer">
                        <div className="font-bold text-foreground text-sm sm:text-base">{meal.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{meal.time}</div>
                      </Label>
                    </div>
                    {isSelected && (
                      <Badge className="bg-primary text-white text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
} 