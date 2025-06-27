import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { MdRestaurantMenu } from "react-icons/md"

interface Menu {
  id: number
  mealPlanId: number
  name: string
  description?: string
  ingredients?: string[]
  nutritionalInfo?: {
    calories?: number
    protein?: string
    carbs?: string
    fat?: string
    fiber?: string
  }
  imageUrl?: string
  isAvailable: boolean
  createdAt: string
  mealPlan: {
    id: number
    name: string
    planId: string
  }
}

interface MenuCardProps {
  menu: Menu
  onEdit: (menu: Menu) => void
  onDelete: (menuId: number) => void
  onToggleStatus: (menu: Menu) => void
}

export default function MenuCard({ menu, onEdit, onDelete, onToggleStatus }: MenuCardProps) {
  return (
    <Card className="border border-border bg-muted/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl shadow-sm border border-border">
              <MdRestaurantMenu className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">{menu.name}</span>
              <span className="text-xs text-muted-foreground">{menu.mealPlan.name}</span>
            </div>
          </div>
          <Badge className={menu.isAvailable ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'}>
            {menu.isAvailable ? 'Available' : 'Unavailable'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {menu.imageUrl && (
          <div className="w-full h-40 rounded-lg overflow-hidden bg-muted/30">
            <Image 
              src={menu.imageUrl} 
              alt={menu.name}
              width={400}
              height={160}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        
        {menu.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{menu.description}</p>
        )}
        
        {menu.ingredients && menu.ingredients.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {menu.ingredients.slice(0, 3).map((ingredient, idx) => (
                <Badge key={idx} className="bg-primary/10 text-primary text-xs">
                  {ingredient}
                </Badge>
              ))}
              {menu.ingredients.length > 3 && (
                <Badge className="bg-primary/10 text-primary text-xs">
                  +{menu.ingredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {menu.nutritionalInfo && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">Nutrition:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {menu.nutritionalInfo.calories && (
                <div className="bg-muted p-2 rounded text-center">
                  <div className="font-bold">{menu.nutritionalInfo.calories}</div>
                  <div className="text-muted-foreground">Cal</div>
                </div>
              )}
              {menu.nutritionalInfo.protein && (
                <div className="bg-muted p-2 rounded text-center">
                  <div className="font-bold">{menu.nutritionalInfo.protein}</div>
                  <div className="text-muted-foreground">Protein</div>
                </div>
              )}
              {menu.nutritionalInfo.carbs && (
                <div className="bg-muted p-2 rounded text-center">
                  <div className="font-bold">{menu.nutritionalInfo.carbs}</div>
                  <div className="text-muted-foreground">Carbs</div>
                </div>
              )}
              {menu.nutritionalInfo.fat && (
                <div className="bg-muted p-2 rounded text-center">
                  <div className="font-bold">{menu.nutritionalInfo.fat}</div>
                  <div className="text-muted-foreground">Fat</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onEdit(menu)}
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
          >
            <FiEdit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            onClick={() => onToggleStatus(menu)}
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
          >
            {menu.isAvailable ? 'Disable' : 'Enable'}
          </Button>
          <Button
            onClick={() => onDelete(menu.id)}
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