import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FiUsers, FiCheck, FiX } from "react-icons/fi"
import { formatPrice, formatDate } from "@/lib/formatters"

interface Subscription {
  id: number
  user: {
    full_name: string
    email: string
  }
  mealPlan: {
    name: string
    price: number
  }
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  totalPrice: number
  status: string
  allergies?: string
  created_at: string
}

interface PendingSubscriptionsProps {
  subscriptions: Subscription[]
  onApproval: (id: number, action: 'approve' | 'reject') => void
}

export default function PendingSubscriptions({ subscriptions, onApproval }: PendingSubscriptionsProps) {
  return (
    <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-foreground flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
              <FiUsers className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <span className="text-sm sm:text-base md:text-lg">Incoming Subscriptions</span>
          </div>
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary text-xs">
            {subscriptions.length} pending approval
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        {subscriptions.length > 0 ? (
          <div className="space-y-3">
            {subscriptions.map((sub) => (
                             <Card key={sub.id} className="border border-border bg-muted/50 hover:shadow-lg transition-all duration-300">
                 <CardContent className="p-3 sm:p-4">
                   <div className="space-y-3">
                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                           <span className="text-primary font-semibold text-xs sm:text-sm">
                             {sub.user.full_name.charAt(0).toUpperCase()}
                           </span>
                         </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm sm:text-base text-foreground truncate">{sub.user.full_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{sub.user.email}</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                        <p className="font-bold text-base sm:text-lg text-foreground">{formatPrice(sub.totalPrice)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(sub.created_at)}</p>
                      </div>
                    </div>
                    
                                                              <div className="space-y-3">
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 bg-background rounded-lg border border-border">
                         <div className="flex sm:flex-col justify-between sm:justify-start">
                           <p className="text-xs font-medium text-muted-foreground">Plan</p>
                           <p className="text-sm font-semibold text-foreground">{sub.mealPlan.name}</p>
                         </div>
                         <div className="flex sm:flex-col justify-between sm:justify-start">
                           <p className="text-xs font-medium text-muted-foreground">Meals</p>
                           <p className="text-sm text-foreground">{sub.selectedMealTypes.join(', ')}</p>
                         </div>
                         <div className="flex sm:flex-col justify-between sm:justify-start">
                           <p className="text-xs font-medium text-muted-foreground">Days</p>
                           <p className="text-sm text-foreground">{sub.selectedDeliveryDays.join(', ')}</p>
                         </div>
                       </div>
                       
                       {sub.allergies && (
                         <div className="p-2 bg-muted/30 rounded-lg border border-border">
                           <p className="text-xs font-medium text-muted-foreground">Allergies & Dietary Restrictions</p>
                           <p className="text-xs text-foreground">{sub.allergies}</p>
                         </div>
                       )}
                     </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        onClick={() => onApproval(sub.id, 'approve')}
                        className="w-full sm:flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                      >
                        <FiCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onApproval(sub.id, 'reject')}
                        className="w-full sm:flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                      >
                        <FiX className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <FiUsers className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-sm sm:text-base">No pending subscriptions</p>
            <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-1">
              All caught up! 
              <FiCheck className="h-3 w-3 text-emerald-500" />
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 