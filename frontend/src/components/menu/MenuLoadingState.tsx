import { Loader2 } from "lucide-react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"

export default function MenuLoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading our delicious menu...</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 