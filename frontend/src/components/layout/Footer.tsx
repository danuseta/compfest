import { MdRestaurant } from "react-icons/md"
import { FiPhone } from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MdRestaurant className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">SEA Catering</h3>
              <p className="text-muted-foreground text-xs">Healthy Meals, Anytime, Anywhere</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FiPhone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">08123456789 (Brian)</span>
            </div>
            <span className="text-muted-foreground">© 2024 SEA Catering</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 