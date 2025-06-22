"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import SubscriptionForm from "@/components/subscription/SubscriptionForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FiCheckCircle, FiPhone, FiClock, FiLock, FiArrowRight } from "react-icons/fi"
import { MdRestaurantMenu, MdLocalShipping, MdFitnessCenter } from "react-icons/md"
import { isAuthenticated, getUser, type User } from "@/lib/auth"
import Link from "next/link"

export default function SubscriptionPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const handleSubscriptionSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  useEffect(() => {
    const loggedIn = isAuthenticated()
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      setUser(getUser())
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 gradient-bg-effects">
        <Navigation />
        
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiLock className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Login Required
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                You need to be logged in to access our subscription service. Please sign in or create an account to continue.
              </p>
            </div>

            <Card className="premium-card backdrop-blur-sm border-border/50 shadow-2xl max-w-md mx-auto">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground">Access Subscription</CardTitle>
                <CardDescription className="text-muted-foreground">
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
                  <p className="text-sm text-muted-foreground">
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
              <div className="bg-card rounded-lg shadow-lg p-8 max-w-4xl mx-auto border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose SEA Catering?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MdRestaurantMenu className="text-2xl text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Fresh Ingredients</h3>
                    <p className="text-muted-foreground">Locally sourced, premium quality ingredients in every meal</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MdLocalShipping className="text-2xl text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Reliable Delivery</h3>
                    <p className="text-muted-foreground">On-time delivery to your doorstep, every single day</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MdFitnessCenter className="text-2xl text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">Health Focused</h3>
                    <p className="text-muted-foreground">Nutritionally balanced meals designed for your wellness goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Member'}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your perfect meal plan and let us deliver healthy, delicious meals to your doorstep. 
              Customize your subscription to fit your lifestyle and dietary needs.
            </p>
          </div>

          {showSuccess && (
            <Alert className="mb-8 border-emerald-500 bg-emerald-50">
              <FiCheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                Thank you! Your subscription has been successfully submitted. We&apos;ll contact you soon to confirm your order.
              </AlertDescription>
            </Alert>
          )}

          <SubscriptionForm onSuccess={handleSubscriptionSuccess} />

          <div className="mt-16 text-center">
            <div className="bg-card rounded-lg shadow-lg p-8 max-w-4xl mx-auto border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose SEA Catering?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MdRestaurantMenu className="text-2xl text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Fresh Ingredients</h3>
                  <p className="text-muted-foreground">Locally sourced, premium quality ingredients in every meal</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MdLocalShipping className="text-2xl text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Reliable Delivery</h3>
                  <p className="text-muted-foreground">On-time delivery to your doorstep, every single day</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MdFitnessCenter className="text-2xl text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Health Focused</h3>
                  <p className="text-muted-foreground">Nutritionally balanced meals designed for your wellness goals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-primary text-primary-foreground rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-lg mb-4">Contact our friendly team for personalized meal planning advice</p>
              <div className="space-y-2">
                <p className="text-primary-foreground/90 flex items-center justify-center gap-2">
                  <FiPhone className="h-4 w-4" />
                  Manager Brian: 08123456789
                </p>
                <p className="text-primary-foreground/90 flex items-center justify-center gap-2">
                  <FiClock className="h-4 w-4" />
                  Available: Monday - Saturday, 8AM - 8PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 