"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import SubscriptionForm from "@/components/subscription/SubscriptionForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FiCheckCircle, FiLock, FiArrowRight } from "react-icons/fi"
import { MdRestaurantMenu, MdLocalShipping, MdFitnessCenter } from "react-icons/md"
import { isAuthenticated } from "@/lib/auth"
import Link from "next/link"

export default function SubscriptionPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  const handleSubscriptionSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  useEffect(() => {
    const loggedIn = isAuthenticated()
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background transition-all duration-500">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background transition-all duration-500">
        <Navigation />
        
        <main className="pt-16 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 md:mb-4">
                <FiLock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 px-4">
                Login Required
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                You need to be logged in to access our subscription service. Please sign in or create an account to continue.
              </p>
            </div>

            <Card className="premium-card backdrop-blur-sm border-border shadow-2xl max-w-md mx-auto">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">Access Subscription</CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                  Sign in to start your healthy meal journey with SEA Catering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full orange-gradient text-white font-semibold group" asChild>
                  <Link href="/login">
                    <span>Sign In</span>
                    <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link 
                      href="/register" 
                      className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-16 text-center">
              <Card className="premium-card backdrop-blur-sm border-border shadow-2xl max-w-4xl mx-auto">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Why Choose SEA Catering?</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <MdRestaurantMenu className="text-2xl text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground">Fresh Ingredients</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Locally sourced, premium quality ingredients in every meal</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <MdLocalShipping className="text-2xl text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground">Reliable Delivery</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">On-time delivery to your doorstep, every single day</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <MdFitnessCenter className="text-2xl text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground">Health Focused</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Nutritionally balanced meals designed for your wellness goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 md:mb-4">
              <MdRestaurantMenu className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 px-4">
              Subscription Meal
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Choose your perfect meal plan and let us deliver healthy, delicious meals to your doorstep. 
              Customize your subscription to fit your lifestyle and dietary needs.
            </p>
          </div>

          {showSuccess && (
            <Alert className="mb-8 border-0 shadow-lg bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30">
              <FiCheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                Thank you! Your subscription has been successfully submitted. We&apos;ll contact you soon to confirm your order.
              </AlertDescription>
            </Alert>
          )}

          <SubscriptionForm onSuccess={handleSubscriptionSuccess} />
        </div>
      </main>

      <Footer />
    </div>
  )
} 