import { Button } from "@/components/ui/button"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"

interface MenuErrorStateProps {
  error: string
  onRetry: () => void
}

export default function MenuErrorState({ error, onRetry }: MenuErrorStateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={onRetry} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 