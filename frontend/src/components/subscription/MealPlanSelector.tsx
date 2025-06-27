"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MdFitnessCenter,
  MdStar,
  MdRestaurantMenu
} from "react-icons/md"
import { 
  FiCheckCircle,
  FiActivity
} from "react-icons/fi"

interface MealPlan {
  id: number
  planId: string
  name: string
  price: number
  description: string
  features: string[]
  imageUrl?: string
  isActive: boolean
}

interface MealPlanSelectorProps {
  selectedPlan: string
  onPlanChange: (planId: string) => void
  error?: string
  mealPlans: MealPlan[]
}

export default function MealPlanSelector({ selectedPlan, onPlanChange, error, mealPlans }: MealPlanSelectorProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getPlanConfig = (planId: string) => {
    switch (planId) {
      case 'diet':
        return { 
          icon: FiCheckCircle, 
          gradient: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          borderColor: 'border-emerald-200 dark:border-emerald-800/30'
        }
      case 'protein':
        return { 
          icon: MdFitnessCenter, 
          gradient: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-blue-200 dark:border-blue-800/30'
        }
      case 'royal':
        return { 
          icon: MdStar, 
          gradient: 'from-amber-500 to-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-950/20',
          iconColor: 'text-amber-600 dark:text-amber-400',
          borderColor: 'border-amber-200 dark:border-amber-800/30'
        }
      default:
        return { 
          icon: FiCheckCircle, 
          gradient: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          borderColor: 'border-emerald-200 dark:border-emerald-800/30'
        }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
          <FiActivity className="h-4 w-4 text-primary" />
          Select Meal Plan
        </Label>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Choose the perfect plan for your healthy lifestyle</p>
      </div>
      <RadioGroup
        value={selectedPlan}
        onValueChange={onPlanChange}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {mealPlans.map((plan) => {
          const { icon: IconComponent, gradient, bgColor, iconColor, borderColor } = getPlanConfig(plan.planId)
          const isSelected = selectedPlan === plan.planId
          return (
            <div key={plan.planId}>
              <Label htmlFor={plan.planId} className="cursor-pointer">
                <Card className={`transition-all duration-300 hover:shadow-xl border-0 shadow-lg ${
                  isSelected 
                    ? 'shadow-2xl' 
                    : 'hover:shadow-2xl hover:transform hover:scale-102'
                }`}>
                  {isSelected && <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>}
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <RadioGroupItem value={plan.planId} id={plan.planId} className="mt-2" />
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bgColor} flex items-center justify-center border ${borderColor}`}>
                            <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-sm sm:text-base lg:text-lg">{plan.name}</h3>
                            <div className="flex items-center gap-2">
                              <p className="text-lg sm:text-xl font-bold text-primary">{formatPrice(plan.price)}</p>
                              <span className="text-xs text-muted-foreground">per meal</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {plan.features.slice(0, 3).map((feature: string, index: number) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-xs bg-muted text-muted-foreground border border-border"
                            >
                              <MdRestaurantMenu className="w-3 h-3 mr-1" />
                              {feature}
                            </Badge>
                          ))}
                          {plan.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                              +{plan.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          )
        })}
      </RadioGroup>
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
        </div>
      )}
    </div>
  )
} 