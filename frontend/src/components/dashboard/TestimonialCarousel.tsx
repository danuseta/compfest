"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"

interface Testimonial {
  id: number
  customerName: string
  reviewMessage: string
  rating: number
  createdAt: string
}

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(getApiUrl('/api/testimonials?limit=10'))
      const data = await response.json()
      
      if (data.success) {
        setTestimonials(data.data.testimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (testimonials.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <FiMessageSquare className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No testimonials yet</h3>
              <p className="text-muted-foreground">Be the first to share your experience!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiMessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Customer Reviews</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} of {testimonials.length}
          </div>
        </div>

        <div className="relative min-h-[200px]">
          <div className="absolute inset-0 transition-all duration-500 ease-in-out">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-foreground">
                    {currentTestimonial.customerName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(currentTestimonial.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FiStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-foreground leading-relaxed">
                &ldquo;{currentTestimonial.reviewMessage}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="flex items-center gap-2 transition-all duration-200"
            >
              <FiChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="flex items-center gap-2 transition-all duration-200"
            >
              Next
              <FiChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 