import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiStar, FiCheckCircle, FiClock, FiEdit3 } from "react-icons/fi"

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

interface TestimonialDisplayProps {
  testimonial: Testimonial
  subscriptionPlan: string
}

export default function TestimonialDisplay({ testimonial, subscriptionPlan }: TestimonialDisplayProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString)
        return 'Invalid Date'
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error, 'Original:', dateString)
      return 'Invalid Date'
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full shadow-sm border border-border">
            <FiEdit3 className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Your Review for {subscriptionPlan}</h4>
              <Badge 
                className={`${
                  testimonial.isApproved 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-yellow-500 text-white'
                }`}
              >
                {testimonial.isApproved ? (
                  <>
                    <FiCheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </>
                ) : (
                  <>
                    <FiClock className="h-3 w-3 mr-1" />
                    Pending Review
                  </>
                )}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar 
                  key={star}
                  className={`h-4 w-4 ${
                    star <= testimonial.rating 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {testimonial.rating}/5 stars
              </span>
            </div>
            
            <blockquote className="text-muted-foreground italic border-l-4 border-primary pl-4 mb-3">
              &ldquo;{testimonial.reviewMessage}&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Submitted on {formatDate(testimonial.created_at)}</span>
              {!testimonial.isApproved && (
                <span className="text-yellow-600 dark:text-yellow-400">
                  Under review by our team
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 