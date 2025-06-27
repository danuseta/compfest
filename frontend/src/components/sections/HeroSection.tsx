"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { 
  FiCheckCircle, 
  FiArrowRight,
  FiTrendingUp 
} from "react-icons/fi"
import { 
  MdStar,
  MdRestaurant 
} from "react-icons/md"
import { getApiUrl } from "@/lib/api"

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

export default function HeroSection() {
  const [popularPlan, setPopularPlan] = useState<MealPlan | null>(null)
  const [reviewCount, setReviewCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPopularPlan()
  }, [])

  const fetchPopularPlan = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(getApiUrl('/api/meal-plans?active=true'))
      const data = await response.json()
      
      if (data.success && data.data.length > 0) {
        const selectedPlan = data.data.find((plan: MealPlan) => plan.planId === 'protein') || data.data[0]
        setPopularPlan(selectedPlan)
        
        if (selectedPlan) {
          await fetchReviewCount(selectedPlan.planId)
        }
      }
    } catch (error) {
      console.error('Error fetching popular plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchReviewCount = async (planId: string) => {
    try {
      const response = await fetch(getApiUrl(`/api/testimonials/count/plan/${planId}`))
      const data = await response.json()
      
      if (data.success) {
        setReviewCount(data.data.count)
      }
    } catch (error) {
      console.error('Error fetching review count:', error)
      setReviewCount(0)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatReviewCount = (count: number) => {
    if (count === 0) return 'No reviews yet'
    if (count === 1) return '1 review'
    return `${count.toLocaleString()} reviews`
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 gradient-bg-effects">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <Badge variant="secondary" className="flex items-center space-x-1 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm w-fit mx-auto lg:mx-0">
                <MdRestaurant className="w-4 h-4" />
                <span>Indonesia&apos;s #1 Healthy Catering</span>
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
                  <span>Explore Our Menu</span>
                  <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Nationwide Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Custom Nutrition</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>Expert Approved</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="gradient-orbs">
              {isLoading ? (
                <Card className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 lg:p-8 shadow-xl premium-card">
                  <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-20 mb-3"></div>
                    <div className="h-6 bg-muted rounded w-32 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-40 mb-4"></div>
                    <div className="h-8 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-36"></div>
                  </div>
                </Card>
              ) : popularPlan ? (
                <Card className="relative bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 lg:p-8 shadow-xl premium-card">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-muted-foreground">Popular Plan</span>
                      <Badge className="flex items-center space-x-1 bg-primary text-white text-xs">
                        <FiTrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">{popularPlan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{popularPlan.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-0">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {formatPrice(popularPlan.price)}
                      <span className="text-sm text-muted-foreground font-normal">/meal</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <MdStar key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      ))}
                      <span className="text-xs sm:text-sm text-muted-foreground ml-2">({formatReviewCount(reviewCount)})</span>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 