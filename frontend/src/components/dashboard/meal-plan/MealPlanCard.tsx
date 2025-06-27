import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { MdRestaurantMenu } from "react-icons/md"
import { formatPrice } from "@/lib/formatters"

interface MealPlan {
  id: number
  planId: string
  name: string
  price: number
  description: string
  features: string[]
  imageUrl?: string
  isActive: boolean
  createdAt: string
}

interface MealPlanCardProps {
  plan: MealPlan
  onEdit: (plan: MealPlan) => void
  onDelete: (planId: number) => void
  onToggleStatus: (plan: MealPlan) => void
}

export default function MealPlanCard({ plan, onEdit, onDelete, onToggleStatus }: MealPlanCardProps) {
  return (
    <Card className="border border-border bg-muted/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl shadow-sm border border-border">
              <MdRestaurantMenu className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">{plan.name}</span>
          </div>
          <Badge className={plan.isActive ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'}>
            {plan.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {formatPrice(plan.price)}
          </p>
          <p className="text-xs text-muted-foreground">per meal</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
        
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">Features:</Label>
          <div className="flex flex-wrap gap-1">
            {plan.features.slice(0, 3).map((feature, idx) => (
              <Badge key={idx} className="bg-primary/10 text-primary text-xs">
                {feature}
              </Badge>
            ))}
            {plan.features.length > 3 && (
              <Badge className="bg-primary/10 text-primary text-xs">
                +{plan.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onEdit(plan)}
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
          >
            <FiEdit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            onClick={() => onToggleStatus(plan)}
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
          >
            {plan.isActive ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            onClick={() => onDelete(plan.id)}
            size="sm"
            variant="outline"
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <FiTrash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 