import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FiStar, FiMessageSquare } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"

interface TestimonialFormProps {
  subscriptionId: number
  subscriptionPlan: string
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onTestimonialUpdate?: () => void
}

export default function TestimonialForm({ 
  subscriptionId, 
  subscriptionPlan, 
  onSuccess, 
  onError, 
  onTestimonialUpdate 
}: TestimonialFormProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    message: "",
    rating: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    if (!formData.message.trim() || formData.rating === 0) {
      onError('Please fill in all required fields and select a rating.')
      return
    }

    if (formData.message.length < 10) {
      onError('Review message must be at least 10 characters long.')
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      
      const response = await fetch(getApiUrl('/api/testimonials'), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          subscriptionId
        })
      })

      const data = await response.json()

      if (data.success) {
        onSuccess('Thank you! Your testimonial has been submitted and will be reviewed before being published.')
        setFormData({ message: "", rating: 0 })
        setShowForm(false)
        onTestimonialUpdate?.()
      } else {
        onError(data.message || 'Failed to submit testimonial. Please try again.')
      }
    } catch {
      onError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogTrigger asChild>
        <Button className="w-full orange-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <FiMessageSquare className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your experience with the {subscriptionPlan}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Rating *</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                  disabled={isSubmitting}
                >
                  <FiStar 
                    className={`h-6 w-6 ${
                      star <= formData.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium">Your Review *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share your thoughts about the meal plan, delivery, taste, portion size, etc..."
              rows={4}
              className="mt-2"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 10 characters ({formData.message.length}/10)
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.message.trim() || formData.rating === 0}
              className="flex-1 orange-gradient text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 