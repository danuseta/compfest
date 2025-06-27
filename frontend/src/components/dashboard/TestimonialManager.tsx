import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiStar, FiUser, FiCheck, FiX, FiClock, FiMessageSquare, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
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

interface TestimonialManagerProps {
  onRefresh?: () => void
}

export default function TestimonialManager({ onRefresh }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  useEffect(() => {
    fetchTestimonials()
  }, [filter])

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      let endpoint = '/api/testimonials'
      
      if (filter === 'pending') {
        endpoint = '/api/testimonials/pending'
      } else if (filter === 'approved') {
        endpoint = '/api/testimonials?approved=true'
      }
      
      const response = await fetch(getApiUrl(endpoint), {
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      const data = await response.json()
      if (data.success) {
        setTestimonials(data.data.testimonials || data.data || [])
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setAlert({ type: 'error', message: 'Failed to load testimonials' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproval = async (id: number, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem("token")
      const endpoint = action === 'approve' ? `/api/testimonials/${id}/approve` : `/api/testimonials/${id}/reject`
      
      const response = await fetch(getApiUrl(endpoint), {
        method: 'PUT',
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      const data = await response.json()
      if (data.success) {
        setAlert({ 
          type: 'success', 
          message: `Testimonial ${action === 'approve' ? 'approved' : 'rejected'} successfully!` 
        })
        fetchTestimonials()
        onRefresh?.()
      } else {
        setAlert({ type: 'error', message: data.message || 'Operation failed' })
      }
    } catch (error) {
      console.error('Error updating testimonial:', error)
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

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

  const getStatusBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge className="bg-emerald-500 text-white">
        <FiCheckCircle className="h-3 w-3 mr-1" />
        Approved
      </Badge>
    ) : (
      <Badge className="bg-amber-500 text-white">
        <FiClock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-muted-foreground">Loading testimonials...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Testimonial Management</h2>
          <p className="text-muted-foreground">Review and manage customer testimonials</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('approved')}
          >
            Approved
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-12 text-center">
            <div className="mb-4 p-3 bg-muted rounded-full w-fit mx-auto">
              <FiMessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No testimonials found</h3>
            <p className="text-muted-foreground">
              {filter === 'pending' ? 'No pending testimonials to review' : 
               filter === 'approved' ? 'No approved testimonials yet' : 
               'No testimonials available'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-background rounded-xl shadow-sm border border-border">
                      <FiUser className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground flex items-center gap-3">
                        <span>{testimonial.user.full_name}</span>
                        {getStatusBadge(testimonial.isApproved)}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{formatDate(testimonial.created_at)}</span>
                        {testimonial.subscription && (
                          <div className="flex items-center gap-1">
                            <MdRestaurantMenu className="h-4 w-4" />
                            {testimonial.subscription.mealPlan.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FiStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <blockquote className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.reviewMessage}&rdquo;
                </blockquote>
                
                {!testimonial.isApproved && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApproval(testimonial.id, 'approve')}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <FiCheck className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleApproval(testimonial.id, 'reject')}
                      className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <FiX className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 