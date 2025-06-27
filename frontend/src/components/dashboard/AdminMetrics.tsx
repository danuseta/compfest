import { Card, CardContent } from "@/components/ui/card"
import { FiUsers, FiDollarSign, FiTrendingUp } from "react-icons/fi"
import { formatPrice } from "@/lib/formatters"
import SubscriptionPieChart from "./SubscriptionPieChart"
import RevenueChart from "./RevenueChart"

interface AdminMetrics {
  totalSubscribedUsers: number
  monthlyRecurringRevenue: number
  totalRevenue: number
}

interface MonthlyRevenueData {
  month: string
  revenue: number
}

interface AdminMetricsProps {
  metrics: AdminMetrics
  subscriptionData?: Array<{
    planName: string
    count: number
    color: string
  }>
  monthlyRevenueData?: MonthlyRevenueData[]
}

export default function AdminMetrics({ metrics, subscriptionData = [], monthlyRevenueData = [] }: AdminMetricsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">Total Subscriptions</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{metrics.totalSubscribedUsers || 0}</p>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl flex-shrink-0">
                <FiUsers className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">Monthly Revenue</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{formatPrice(metrics.monthlyRecurringRevenue)}</p>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl flex-shrink-0">
                <FiDollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs sm:text-sm font-medium truncate">Total Revenue</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{formatPrice(metrics.totalRevenue)}</p>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl flex-shrink-0">
                <FiTrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <SubscriptionPieChart data={subscriptionData} />
        </div>
        <div className="w-full">
          <RevenueChart data={monthlyRevenueData} />
        </div>
      </div>
    </div>
  )
} 