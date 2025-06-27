"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"
import TestimonialForm from "./testimonial/TestimonialForm"
import TestimonialDisplay from "./testimonial/TestimonialDisplay"

interface SubscriptionTestimonialProps {
  subscriptionId: number
  subscriptionPlan: string
  subscriptionStatus: 'active' | 'pending' | 'paused' | 'cancelled' | 'confirmed'
  onTestimonialUpdate?: () => void
}

interface Testimonial {
  id: number
  userId: number
  reviewMessage: string
  rating: number
  isApproved: boolean
  created_at: string
  user?: {
    full_name: string
  }
}

export default function SubscriptionTestimonial({ 
  subscriptionId, 
  subscriptionPlan,
  subscriptionStatus,
  onTestimonialUpdate 
}: SubscriptionTestimonialProps) {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    fetchTestimonial()
  }, [subscriptionId])

  const fetchTestimonial = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error('No token found')
        setIsLoading(false)
        return
      }
      
      const url = getApiUrl(`/api/testimonials/subscription/${subscriptionId}`)
      
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        console.error('Response not ok:', response.status, response.statusText)
        setIsLoading(false)
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTestimonial(data.data)
      }
    } catch (error) {
      console.error('Error fetching testimonial:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccess = (message: string) => {
    setAlert({ type: 'success', message })
    fetchTestimonial()
    onTestimonialUpdate?.()
  }

  const handleError = (message: string) => {
    setAlert({ type: 'error', message })
  }

  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading testimonial...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      {alert && (
        <Alert className={`border-0 shadow-lg ${
          alert.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30' 
            : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30'
        }`}>
          {alert.type === 'success' ? (
            <FiCheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <FiAlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
          <AlertDescription className={
            alert.type === 'success' 
              ? 'text-emerald-800 dark:text-emerald-200' 
              : 'text-red-800 dark:text-red-200'
          }>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      {testimonial ? (
        <TestimonialDisplay 
          testimonial={testimonial} 
          subscriptionPlan={subscriptionPlan} 
        />
      ) : (
        subscriptionStatus === 'active' ? (
          <TestimonialForm
            subscriptionId={subscriptionId}
            subscriptionPlan={subscriptionPlan}
            onSuccess={handleSuccess}
            onError={handleError}
            onTestimonialUpdate={onTestimonialUpdate}
          />
        ) : (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <FiAlertCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Review Not Available</span>
            </div>
            <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
              You can only write a review when your subscription is active. Current status: {subscriptionStatus}.
            </p>
          </div>
        )
      )}
    </div>
  )
} 