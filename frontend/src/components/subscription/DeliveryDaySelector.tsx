"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { FiCalendar } from "react-icons/fi"

const weekDays = [
  { id: "monday", name: "Monday", short: "Mon" },
  { id: "tuesday", name: "Tuesday", short: "Tue" },
  { id: "wednesday", name: "Wednesday", short: "Wed" },
  { id: "thursday", name: "Thursday", short: "Thu" },
  { id: "friday", name: "Friday", short: "Fri" },
  { id: "saturday", name: "Saturday", short: "Sat" },
  { id: "sunday", name: "Sunday", short: "Sun" }
]

interface DeliveryDaySelectorProps {
  selectedDeliveryDays: string[]
  onDeliveryDayChange: (dayId: string, checked: boolean) => void
  error?: string
}

export default function DeliveryDaySelector({ selectedDeliveryDays, onDeliveryDayChange, error }: DeliveryDaySelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold flex items-center gap-2">
        <FiCalendar className="h-4 w-4 text-primary" />
        Select Delivery Days
      </Label>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <Card key={day.id} className="p-3 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center space-y-2">
              <Checkbox
                id={day.id}
                checked={selectedDeliveryDays.includes(day.id)}
                onCheckedChange={(checked) => onDeliveryDayChange(day.id, checked as boolean)}
              />
              <Label htmlFor={day.id} className="cursor-pointer text-center">
                <div className="font-medium text-xs text-foreground">{day.short}</div>
              </Label>
            </div>
          </Card>
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
} 