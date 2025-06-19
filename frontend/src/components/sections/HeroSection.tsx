import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 gradient-bg-effects">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                🍽️ Indonesia&apos;s #1 Healthy Catering
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                SEA Catering
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-primary font-semibold">
                &ldquo;Healthy Meals, Anytime, Anywhere&rdquo;
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Customizable healthy meal services with delivery coverage across Indonesia. 
                From small passion project to nationwide movement, helping thousands access 
                nutritious, delicious meals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" className="orange-gradient text-white font-semibold group w-full sm:w-auto" asChild>
                <Link href="/menu">
                  Explore Our Menu
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto" asChild>
                <Link href="/contact">
                  Contact Brian
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Nationwide Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Custom Nutrition</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Expert Approved</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="gradient-orbs">
              <Card className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 lg:p-8 shadow-xl premium-card">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm text-muted-foreground">Popular Plan</span>
                    <Badge className="bg-primary text-white text-xs">Trending</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">Protein Plan</CardTitle>
                    <p className="text-sm text-muted-foreground">High-protein meals for fitness enthusiasts</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-0">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    Rp 40.000
                    <span className="text-sm text-muted-foreground font-normal">/meal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-xs sm:text-sm text-muted-foreground ml-2">(2,847 reviews)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 