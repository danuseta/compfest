import { Card, CardContent } from "@/components/ui/card"
import { FiTrendingUp, FiDollarSign } from "react-icons/fi"
import { MdRestaurantMenu } from "react-icons/md"
import { Subscription } from "@/types/subscription"
import { formatPrice } from "@/lib/formatters"

interface QuickStatsProps {
  subscriptions: Subscription[]
}

export default function QuickStats({ subscriptions }: QuickStatsProps) {

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active')
  const totalMonthlySpend = activeSubscriptions.reduce((sum, s) => sum + s.totalPrice, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium">Active Plans</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {activeSubscriptions.length}
              </p>
            </div>
            <div className="p-3 bg-emerald-200 dark:bg-emerald-800/30 rounded-full">
              <MdRestaurantMenu className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">Total Subscriptions</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300">{subscriptions.length}</p>
            </div>
            <div className="p-3 bg-blue-200 dark:bg-blue-800/30 rounded-full">
              <FiTrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-medium">Monthly Spend</p>
              <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-300">
                {formatPrice(totalMonthlySpend)}
              </p>
            </div>
            <div className="p-3 bg-amber-200 dark:bg-amber-800/30 rounded-full">
              <FiDollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 