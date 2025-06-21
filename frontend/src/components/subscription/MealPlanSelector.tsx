"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MdFitnessCenter,
  MdStar
} from "react-icons/md"
import { 
  FiCheckCircle 
} from "react-icons/fi"

const mealPlans = [
  {
    id: "diet",
    name: "Diet Plan",
    price: 30000,
    description: "Healthy and balanced meals for weight management",
    features: ["Calorie controlled", "Fresh vegetables", "Lean proteins"],
    icon: FiCheckCircle,
    color: "emerald"
  },
  {
    id: "protein", 
    name: "Protein Plan",
    price: 40000,
    description: "High-protein meals for fitness enthusiasts",
    features: ["25-30g protein per meal", "Post-workout optimization", "Muscle building focus"],
    icon: MdFitnessCenter,
    color: "blue"
  },
  {
    id: "royal",
    name: "Royal Plan", 
    price: 60000,
    description: "Premium gourmet meals with finest ingredients",
    features: ["Premium ingredients", "Gourmet preparation", "Luxury dining experience"],
    icon: MdStar,
    color: "amber"
  }
]

interface MealPlanSelectorProps {
  selectedPlan: string
  onPlanChange: (planId: string) => void
  error?: string
}

export default function MealPlanSelector({ selectedPlan, onPlanChange, error }: MealPlanSelectorProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Select Meal Plan</Label>
      <RadioGroup
        value={selectedPlan}
        onValueChange={onPlanChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {mealPlans.map((plan) => {
          const IconComponent = plan.icon
          return (
            <div key={plan.id}>
              <Label htmlFor={plan.id} className="cursor-pointer">
                <Card className={`transition-all hover:shadow-md ${selectedPlan === plan.id ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            plan.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                            plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h3 className="font-semibold text-foreground">{plan.name}</h3>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatPrice(plan.price)}</p>
                        <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {plan.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
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
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
} 