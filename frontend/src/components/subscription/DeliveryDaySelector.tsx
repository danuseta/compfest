"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiCalendar, FiActivity } from "react-icons/fi"

const weekDays = [
  { id: "monday", name: "Monday", short: "Mon", color: "emerald" },
  { id: "tuesday", name: "Tuesday", short: "Tue", color: "blue" },
  { id: "wednesday", name: "Wednesday", short: "Wed", color: "amber" },
  { id: "thursday", name: "Thursday", short: "Thu", color: "purple" },
  { id: "friday", name: "Friday", short: "Fri", color: "pink" },
  { id: "saturday", name: "Saturday", short: "Sat", color: "indigo" },
  { id: "sunday", name: "Sunday", short: "Sun", color: "red" }
]

interface DeliveryDaySelectorProps {
  selectedDeliveryDays: string[]
  onDeliveryDayChange: (dayId: string, checked: boolean) => void
  error?: string
}

export default function DeliveryDaySelector({ selectedDeliveryDays, onDeliveryDayChange, error }: DeliveryDaySelectorProps) {
  const getColorConfig = (color: string) => {
    const configs = {
      emerald: { gradient: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800/30", text: "text-emerald-600 dark:text-emerald-400" },
      blue: { gradient: "from-blue-400 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800/30", text: "text-blue-600 dark:text-blue-400" },
      amber: { gradient: "from-amber-400 to-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800/30", text: "text-amber-600 dark:text-amber-400" },
      purple: { gradient: "from-purple-400 to-purple-600", bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800/30", text: "text-purple-600 dark:text-purple-400" },
      pink: { gradient: "from-pink-400 to-pink-600", bg: "bg-pink-50 dark:bg-pink-950/20", border: "border-pink-200 dark:border-pink-800/30", text: "text-pink-600 dark:text-pink-400" },
      indigo: { gradient: "from-indigo-400 to-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/20", border: "border-indigo-200 dark:border-indigo-800/30", text: "text-indigo-600 dark:text-indigo-400" },
      red: { gradient: "from-red-400 to-red-600", bg: "bg-red-50 dark:bg-red-950/20", border: "border-red-200 dark:border-red-800/30", text: "text-red-600 dark:text-red-400" }
    }
    return configs[color as keyof typeof configs] || configs.emerald
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
          <FiActivity className="h-4 w-4 text-primary" />
          Select Delivery Days
        </Label>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Choose which days you want meals delivered (at least one required)</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {weekDays.map((day) => {
          const isSelected = selectedDeliveryDays.includes(day.id)
          const colorConfig = getColorConfig(day.color)
          return (
            <Card 
              key={day.id} 
              className={`transition-all duration-300 hover:shadow-xl border-0 shadow-lg cursor-pointer ${
                isSelected 
                  ? 'shadow-2xl' 
                  : 'hover:shadow-2xl hover:transform hover:scale-102'
              }`}
              onClick={() => onDeliveryDayChange(day.id, !isSelected)}
            >
              {isSelected && <div className={`h-2 bg-gradient-to-r ${colorConfig.gradient}`}></div>}
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${colorConfig.bg} flex items-center justify-center border ${colorConfig.border}`}>
                    <FiCalendar className={`w-4 h-4 sm:w-5 sm:h-5 ${colorConfig.text}`} />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground text-xs sm:text-sm">{day.short}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">{day.name}</div>
                  </div>
                  <Checkbox
                    id={day.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => onDeliveryDayChange(day.id, checked as boolean)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  {isSelected && (
                    <Badge className="bg-primary text-white text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {selectedDeliveryDays.length > 0 && (
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs sm:text-sm text-primary font-medium">
            Selected: {selectedDeliveryDays.length} day{selectedDeliveryDays.length !== 1 ? 's' : ''} per week
          </p>
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
} 