"use client"

import { useState } from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import SubscriptionForm from "@/components/subscription/SubscriptionForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiCheckCircle, FiPhone, FiClock } from "react-icons/fi"
import { MdRestaurantMenu, MdLocalShipping, MdFitnessCenter } from "react-icons/md"

export default function SubscriptionPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubscriptionSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start Your Healthy Journey
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