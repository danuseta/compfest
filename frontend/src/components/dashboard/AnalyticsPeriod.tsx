import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FiCalendar, FiRefreshCw } from "react-icons/fi"

interface AnalyticsPeriodProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onRefresh: () => void
}

export default function AnalyticsPeriod({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onRefresh 
}: AnalyticsPeriodProps) {
  return (
    <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
            <FiCalendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          Analytics Period
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="startDate" className="text-xs sm:text-sm font-medium text-foreground">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="mt-1 text-sm border-border focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="endDate" className="text-xs sm:text-sm font-medium text-foreground">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="mt-1 text-sm border-border focus:ring-primary focus:border-primary"
            />
          </div>
          <Button 
            onClick={onRefresh} 
            className="w-full sm:w-auto orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiRefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <span className="text-sm">Refresh</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 