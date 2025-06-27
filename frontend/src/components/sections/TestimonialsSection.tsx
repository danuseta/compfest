"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi"
import { MdStar, MdFormatQuote } from "react-icons/md"
import { Badge } from "@/components/ui/badge"
import { getApiUrl } from "@/lib/api"

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

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(getApiUrl('/api/testimonials?limit=10'))
      const data = await response.json()
      
      if (data.success && data.data.testimonials.length > 0) {
        setTestimonials(data.data.testimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <MdStar
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
         } catch {
       return 'Invalid Date'
     }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their eating habits with SEA Catering
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <FiMessageSquare className="w-6 h-6 mr-2 text-primary" />
              Customer Reviews
            </h3>
            
            <Card className="bg-card border border-border">
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-24 mb-3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their eating habits with SEA Catering
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-card border border-border">
              <CardContent className="p-8">
                <FiMessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No testimonials available at the moment. Be the first to share your experience!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonialData = testimonials[currentTestimonial]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their eating habits with SEA Catering
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
            <FiMessageSquare className="w-6 h-6 mr-2 text-primary" />
            Customer Reviews
          </h3>
          
          <div className="relative">
            <Card className="bg-card border border-border">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdFormatQuote className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{currentTestimonialData.user?.full_name || 'Anonymous Customer'}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(currentTestimonialData.created_at)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      {renderStars(currentTestimonialData.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic text-center text-lg">
                  &ldquo;{currentTestimonialData.reviewMessage}&rdquo;
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="flex items-center space-x-1"
                disabled={testimonials.length <= 1}
              >
                <FiChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? "bg-primary" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="flex items-center space-x-1"
                disabled={testimonials.length <= 1}
              >
                <span>Next</span>
                <FiChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 