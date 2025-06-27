import { ChefHat } from "lucide-react"

export default function MenuEmptyState() {
  return (
    <div className="text-center py-16">
      <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
      <h3 className="text-xl font-semibold mb-2">Menu Coming Soon</h3>
      <p className="text-muted-foreground">Our chefs are working hard to bring you amazing dishes!</p>
    </div>
  )
} 