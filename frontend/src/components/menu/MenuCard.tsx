import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Clock, Utensils, CheckCircle } from "lucide-react"

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
}

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

interface MenuCardProps {
  menu: Menu & { mealPlan: MealPlan }
  formatPrice: (price: number) => string
}

export default function MenuCard({ menu, formatPrice }: MenuCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-0 shadow-lg">
      <CardHeader className="p-0">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          {menu.imageUrl ? (
            <Image 
              src={menu.imageUrl} 
              alt={menu.name}
              width={400}
              height={192}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${menu.imageUrl ? 'hidden' : ''}`}>
            <Utensils className="w-16 h-16 text-primary/40" />
          </div>
        </div>
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">{menu.name}</CardTitle>
          </div>
          
          <div className="mb-3">
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
              From {menu.mealPlan.name}
            </Badge>
          </div>

          {menu.description && (
            <p className="text-muted-foreground text-sm mb-4">{menu.description}</p>
          )}

          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Premium</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Popular</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Fresh</span>
            </div>
          </div>

          <div className="text-lg sm:text-xl font-bold text-primary mb-4">
            Plan Price: {formatPrice(menu.mealPlan.price)} per meal
          </div>

          <div className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full text-sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <span>{menu.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {menu.mealPlan.name}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {menu.imageUrl && (
                    <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                      <Image 
                        src={menu.imageUrl} 
                        alt={menu.name}
                        width={600}
                        height={256}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  
                  {menu.description && (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{menu.description}</p>
                    </div>
                  )}

                  {menu.ingredients && menu.ingredients.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Ingredients</h3>
                      <div className="flex flex-wrap gap-2">
                        {menu.ingredients.map((ingredient, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {menu.nutritionalInfo && (
                    <div>
                      <h3 className="font-semibold mb-2">Nutritional Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {menu.nutritionalInfo.calories && (
                          <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="font-bold text-lg">{menu.nutritionalInfo.calories}</div>
                            <div className="text-muted-foreground">Calories</div>
                          </div>
                        )}
                        {menu.nutritionalInfo.protein && (
                          <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="font-bold text-lg">{menu.nutritionalInfo.protein}</div>
                            <div className="text-muted-foreground">Protein</div>
                          </div>
                        )}
                        {menu.nutritionalInfo.carbs && (
                          <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="font-bold text-lg">{menu.nutritionalInfo.carbs}</div>
                            <div className="text-muted-foreground">Carbs</div>
                          </div>
                        )}
                        {menu.nutritionalInfo.fat && (
                          <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="font-bold text-lg">{menu.nutritionalInfo.fat}</div>
                            <div className="text-muted-foreground">Fat</div>
                          </div>
                        )}
                        {menu.nutritionalInfo.fiber && (
                          <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="font-bold text-lg">{menu.nutritionalInfo.fiber}</div>
                            <div className="text-muted-foreground">Fiber</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-lg font-bold text-primary">
                    Plan Price: {formatPrice(menu.mealPlan.price)} per meal
                  </div>
                  
                  <Link href="/subscription">
                    <Button className="w-full orange-gradient text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribe to {menu.mealPlan.name}
                    </Button>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>

            <Link href="/subscription">
              <Button className="w-full orange-gradient text-white text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Subscribe Now
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
} 