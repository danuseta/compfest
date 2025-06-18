import { Button } from "@/components/ui/button"
import { SimpleToggle } from "@/components/ui/mode-toggle"
import { Utensils } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="relative border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="w-full px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Utensils className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">SEA Catering</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <SimpleToggle />
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-3 py-2 sm:px-4">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 