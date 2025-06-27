import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiStar, FiUser, FiMessageSquare, FiCheckCircle } from "react-icons/fi"
import { MdRestaurantMenu } from "react-icons/md"
import { getApiUrl } from "@/lib/api"

interface Testimonial {
  id: number
  userId: number
  subscriptionId: number
  reviewMessage: string
  rating: number
  isApproved: boolean
  created_at: string
  user: {
    full_name: string
  }
  subscription?: {
    mealPlan: {
      name: string
    }
  }
}

interface ApprovedTestimonialsProps {
  title?: string
  className?: string
  limit?: number
  showPagination?: boolean
}

export default function ApprovedTestimonials({ 
  title = "Customer Reviews", 
  className = "",
  limit = 10,
  showPagination = true
}: ApprovedTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchTestimonials()
  }, [currentPage, limit])

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(getApiUrl(`/api/testimonials?approved=true&page=${currentPage}&limit=${limit}`))
      const data = await response.json()
      
      if (data.success) {
        setTestimonials(data.data.testimonials || [])
        if (data.data.pagination) {
          setTotalPages(data.data.pagination.totalPages)
        }
      }
    } catch (error) {
      console.error('Error fetching approved testimonials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading testimonials...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">What our customers are saying</p>
        </div>
        <Badge className="bg-emerald-500 text-white">
          <FiCheckCircle className="h-3 w-3 mr-1" />
          {testimonials.length} Reviews
        </Badge>
      </div>

      {testimonials.length === 0 ? (
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-12 text-center">
            <div className="mb-4 p-3 bg-muted rounded-full w-fit mx-auto">
              <FiMessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">Be the first to share your experience!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg bg-card hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-background rounded-full shadow-sm border border-border">
                        <FiUser className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-foreground">
                          {testimonial.user.full_name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(testimonial.created_at)}
                        </p>
                      </div>
                    </div>
                    {testimonial.subscription && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MdRestaurantMenu className="h-3 w-3" />
                        <span className="hidden sm:inline">{testimonial.subscription.mealPlan.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <blockquote className="text-foreground text-sm leading-relaxed">
                    &ldquo;{testimonial.reviewMessage}&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          {showPagination && totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  const isActive = pageNum === currentPage
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 text-sm rounded-md border ${
                        isActive 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-border bg-background text-foreground hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
} 