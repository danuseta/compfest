"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiStar, FiMessageSquare, FiUser, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"

interface TestimonialFormProps {
  onSubmitSuccess?: () => void
}

export default function TestimonialForm({ onSubmitSuccess }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim() || formData.rating === 0) {
      setAlert({ type: 'error', message: 'Please fill in all required fields and select a rating.' })
      return
    }

    if (formData.message.length < 10) {
      setAlert({ type: 'error', message: 'Review message must be at least 10 characters long.' })
      return
    }

    setIsSubmitting(true)
    setAlert(null)

    try {
      const response = await fetch(getApiUrl('/api/testimonials'), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setAlert({ 
          type: 'success', 
          message: 'Thank you! Your testimonial has been submitted and will be reviewed before being published.' 
        })
        setFormData({ name: "", message: "", rating: 0 })
        onSubmitSuccess?.()
      } else {
        setAlert({ 
          type: 'error', 
          message: data.message || 'Failed to submit testimonial. Please try again.' 
        })
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error)
      setAlert({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <FiMessageSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-bold">Share Your Experience</CardTitle>
        </div>
        <CardDescription>
          Help others discover SEA Catering by sharing your experience with our meal plans!
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {alert && (
          <Alert className={`mb-6 border-0 shadow-lg ${
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <FiUser className="h-4 w-4" />
              Your Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              maxLength={100}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <FiStar className="h-4 w-4" />
              Rating *
            </Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  disabled={isSubmitting}
                  className={`p-1 rounded transition-all duration-200 hover:scale-110 ${
                    star <= formData.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                >
                  <FiStar 
                    className="h-6 w-6" 
                    fill={star <= formData.rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-muted-foreground">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
              <FiMessageSquare className="h-4 w-4" />
              Your Review *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share your experience with SEA Catering... What did you love about our meal plans?"
              rows={4}
              maxLength={1000}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
              disabled={isSubmitting}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimum 10 characters</span>
              <span>{formData.message.length}/1000</span>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.name.trim() || !formData.message.trim() || formData.rating === 0}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <FiCheckCircle className="h-4 w-4 mr-2" />
                Submit Testimonial
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 