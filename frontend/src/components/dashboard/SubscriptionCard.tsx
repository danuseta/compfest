import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiClock, FiX, FiPause, FiPlay, FiAlertCircle, FiCalendar, FiDollarSign, FiActivity, FiCheck } from "react-icons/fi"
import { MdRestaurantMenu, MdDeliveryDining, MdFastfood } from "react-icons/md"
import { Subscription } from "@/types/subscription"
import { formatPrice, formatDate } from "@/lib/formatters"
import SubscriptionTestimonial from "./SubscriptionTestimonial"

interface SubscriptionCardProps {
  subscription: Subscription
  onPause: (subscription: Subscription) => void
  onResume: (subscriptionId: number) => void
  onCancel: (subscriptionId: number) => void
}

export default function SubscriptionCard({ 
  subscription, 
  onPause, 
  onResume, 
  onCancel 
}: SubscriptionCardProps) {

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-emerald-500', 
          text: 'Active',
          icon: FiCheck,
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30',
          textColor: 'text-emerald-700 dark:text-emerald-300'
        }
      case 'pending': 
        return { 
          color: 'bg-amber-500', 
          text: 'Pending',
          icon: FiClock,
          bgColor: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30',
          textColor: 'text-amber-700 dark:text-amber-300'
        }
      case 'paused': 
        return { 
          color: 'bg-blue-500', 
          text: 'Paused',
          icon: FiPause,
          bgColor: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30',
          textColor: 'text-blue-700 dark:text-blue-300'
        }
      case 'cancelled': 
        return { 
          color: 'bg-red-500', 
          text: 'Cancelled',
          icon: FiX,
          bgColor: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30',
          textColor: 'text-red-700 dark:text-red-300'
        }
      default: 
        return { 
          color: 'bg-gray-500', 
          text: status,
          icon: FiActivity,
          bgColor: 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800/30',
          textColor: 'text-gray-700 dark:text-gray-300'
        }
    }
  }

  const statusConfig = getStatusConfig(subscription.status)
  const StatusIcon = statusConfig.icon

  return (
    <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-3 bg-background rounded-xl shadow-sm border border-border">
              <MdRestaurantMenu className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex flex-col sm:flex-row sm:items-center gap-3">
                <span>{subscription.mealPlan.name}</span>
                <Badge className={`${statusConfig.color} text-white shadow-sm self-start sm:self-center`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig.text}
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground flex items-center gap-2 mt-1 text-xs sm:text-sm">
                <FiCalendar className="h-4 w-4" />
                Created on {formatDate(subscription.created_at)}
              </p>
            </div>
          </div>
          <div className="text-left lg:text-right">
            <div className="inline-flex flex-col items-start lg:items-end bg-background p-3 md:p-4 rounded-xl shadow-sm border border-border">
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatPrice(subscription.totalPrice)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">per month</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
                <FiActivity className="h-5 w-5 text-primary" />
                Subscription Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                    <MdRestaurantMenu className="h-4 w-4" />
                    Plan Type
                  </span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm">{subscription.mealPlan.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                    <FiDollarSign className="h-4 w-4" />
                    Price per meal
                  </span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm">{formatPrice(subscription.mealPlan.price)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                    <MdFastfood className="h-4 w-4" />
                    Meal types
                  </span>
                  <span className="font-semibold text-foreground capitalize text-xs sm:text-sm">
                    {subscription.selectedMealTypes.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                    <MdDeliveryDining className="h-4 w-4" />
                    Delivery days
                  </span>
                  <span className="font-semibold text-foreground capitalize text-xs sm:text-sm">
                    {subscription.selectedDeliveryDays.join(', ')}
                  </span>
                </div>
                {subscription.nextDeliveryDate && subscription.status === 'active' && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800/30">
                    <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-xs sm:text-sm">
                      <FiClock className="h-4 w-4" />
                      Next Delivery
                    </span>
                    <span className="font-semibold text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm">
                      {formatDate(subscription.nextDeliveryDate)}
                    </span>
                  </div>
                )}
                {subscription.allergies && (
                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                    <span className="text-amber-700 dark:text-amber-300 flex items-center gap-2 text-xs sm:text-sm">
                      <FiAlertCircle className="h-4 w-4" />
                      Allergies
                    </span>
                    <span className="font-semibold text-amber-800 dark:text-amber-200 text-xs sm:text-sm">{subscription.allergies}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
                <FiActivity className="h-5 w-5 text-primary" />
                Status & Actions
              </h4>
              
              {subscription.status === 'paused' && subscription.pauseStartDate && subscription.pauseEndDate && (
                <div className={`mb-6 p-4 rounded-xl border ${statusConfig.bgColor}`}>
                  <div className={`flex items-center gap-2 font-semibold mb-2 ${statusConfig.textColor} text-sm`}>
                    <FiClock className="h-4 w-4" />
                    Subscription Paused
                  </div>
                  <p className={`text-xs sm:text-sm ${statusConfig.textColor}`}>
                    {formatDate(subscription.pauseStartDate)} - {formatDate(subscription.pauseEndDate)}
                  </p>
                  <p className={`text-xs ${statusConfig.textColor} opacity-80 mt-1`}>
                    No charges during this period
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {subscription.status === 'active' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPause(subscription)}
                      className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm"
                    >
                      <FiPause className="h-4 w-4" />
                      Pause Plan
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancel(subscription.id)}
                      className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300 text-xs sm:text-sm"
                    >
                      <FiX className="h-4 w-4" />
                      Cancel Plan
                    </Button>
                  </>
                )}
                
                {subscription.status === 'paused' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onResume(subscription.id)}
                    className="flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm"
                  >
                    <FiPlay className="h-4 w-4" />
                    Resume Plan
                  </Button>
                )}
                
                {subscription.status === 'cancelled' && (
                  <div className={`p-3 rounded-lg ${statusConfig.bgColor}`}>
                    <p className={`text-xs sm:text-sm ${statusConfig.textColor} font-medium`}>
                      This subscription has been cancelled
                    </p>
                  </div>
                )}
                
                {subscription.status === 'pending' && (
                  <div className={`p-3 rounded-lg ${statusConfig.bgColor}`}>
                    <p className={`text-xs sm:text-sm ${statusConfig.textColor} font-medium`}>
                      Your subscription is being processed
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <SubscriptionTestimonial
          subscriptionId={subscription.id}
          subscriptionPlan={subscription.mealPlan.name}
          subscriptionStatus={subscription.status}
        />
      </CardContent>
    </Card>
  )
} 