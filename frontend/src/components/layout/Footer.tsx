import { Badge } from "@/components/ui/badge"
import { Utensils } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Utensils className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">SEA Catering</h3>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">&ldquo;Healthy Meals, Anytime, Anywhere&rdquo;</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
              Nationwide Delivery
            </Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
              Customizable Meals
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
              Nutritionist Approved
            </Badge>
          </div>
          <div className="pt-4 sm:pt-6 border-t border-border">
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              © 2024 SEA Catering. All rights reserved.<br className="sm:hidden" />
              <span className="hidden sm:inline"> | </span>Transforming Indonesia&apos;s eating habits, one meal at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 