import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiSearch, FiFilter, FiUser, FiCalendar, FiDollarSign, FiClock, FiAlertCircle, FiCheck, FiX, FiPause, FiActivity } from "react-icons/fi"
import { MdRestaurantMenu, MdDeliveryDining } from "react-icons/md"
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
  pauseStartDate?: string
  pauseEndDate?: string
}

interface SubscriptionHistoryProps {
  subscriptions: Subscription[]
}

export default function SubscriptionHistory({ subscriptions }: SubscriptionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.mealPlan.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500 text-white'
      case 'paused': return 'bg-blue-500 text-white'
      case 'cancelled': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <FiCheck className="h-3 w-3" />
      case 'paused': return <FiPause className="h-3 w-3" />
      case 'cancelled': return <FiX className="h-3 w-3" />
      default: return <FiUser className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Subscription History</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Complete audit trail of all subscriptions</p>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span className="bg-primary/10 px-3 py-1 rounded-full">
            {filteredSubscriptions.length} records
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name, email, or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="pl-10 bg-background border-border text-foreground">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredSubscriptions.length === 0 ? (
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-12 text-center">
            <div className="mb-4 p-3 bg-muted rounded-full w-fit mx-auto">
              <FiSearch className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No subscriptions found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredSubscriptions.map((sub) => (
            <Card key={sub.id} className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="p-3 bg-background rounded-xl shadow-sm border border-border">
                      <MdRestaurantMenu className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex flex-col sm:flex-row sm:items-center gap-3">
                        <span>{sub.user.full_name}</span>
                        <Badge className={`${getStatusColor(sub.status)} text-white shadow-sm self-start sm:self-center`}>
                          {getStatusIcon(sub.status)}
                          <span className="ml-1">{sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span>
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground flex items-center gap-2 mt-1 text-xs sm:text-sm">
                        <FiCalendar className="h-4 w-4" />
                        {sub.user.email} • Created on {formatDate(sub.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-left lg:text-right">
                    <div className="inline-flex flex-col items-start lg:items-end bg-background p-3 md:p-4 rounded-xl shadow-sm border border-border">
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {formatPrice(sub.totalPrice)}
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
                          <span className="font-semibold text-foreground text-xs sm:text-sm">{sub.mealPlan.name}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                            <FiDollarSign className="h-4 w-4" />
                            Price per meal
                          </span>
                          <span className="font-semibold text-foreground text-xs sm:text-sm">{formatPrice(sub.mealPlan.price)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                            <MdDeliveryDining className="h-4 w-4" />
                            Meal types
                          </span>
                          <span className="font-semibold text-foreground capitalize text-xs sm:text-sm">
                            {sub.selectedMealTypes.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground flex items-center gap-2 text-xs sm:text-sm">
                            <MdDeliveryDining className="h-4 w-4" />
                            Delivery days
                          </span>
                          <span className="font-semibold text-foreground capitalize text-xs sm:text-sm">
                            {sub.selectedDeliveryDays.join(', ')}
                          </span>
                        </div>
                        {sub.allergies && (
                          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                            <span className="text-amber-700 dark:text-amber-300 flex items-center gap-2 text-xs sm:text-sm">
                              <FiAlertCircle className="h-4 w-4" />
                              Allergies
                            </span>
                            <span className="font-semibold text-amber-800 dark:text-amber-200 text-xs sm:text-sm">{sub.allergies}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <FiActivity className="h-5 w-5 text-primary" />
                        Status & Information
                      </h4>
                      
                      {sub.status === 'paused' && sub.pauseStartDate && sub.pauseEndDate && (
                        <div className="mb-6 p-4 rounded-xl border bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30">
                          <div className="flex items-center gap-2 font-semibold mb-2 text-blue-700 dark:text-blue-300 text-sm">
                            <FiClock className="h-4 w-4" />
                            Subscription Paused
                          </div>
                          <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                            {formatDate(sub.pauseStartDate)} - {formatDate(sub.pauseEndDate)}
                          </p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 opacity-80 mt-1">
                            No charges during this period
                          </p>
                        </div>
                      )}

                      {sub.status === 'cancelled' && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                            This subscription has been cancelled
                          </p>
                        </div>
                      )}

                      {sub.status === 'active' && (
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
                          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                            This subscription is currently active
                          </p>
                        </div>
                      )}
                      
                      {!sub.allergies && !sub.pauseStartDate && !sub.pauseEndDate && sub.status === 'active' && (
                        <div className="p-3 bg-muted/30 rounded-lg border border-border text-center">
                          <p className="text-sm text-muted-foreground">No special notes or restrictions</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 