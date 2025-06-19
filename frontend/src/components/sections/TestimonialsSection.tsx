"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Putri",
    rating: 5,
    message: "SEA Catering has completely transformed my daily routine! The meals are delicious, healthy, and arrive fresh every time. As a busy professional, this service is a lifesaver.",
    plan: "Protein Power Plan",
    location: "Jakarta"
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    rating: 5,
    message: "I've been subscribing for 3 months now and the quality never disappoints. The variety keeps meals exciting and my fitness goals are finally achievable with proper nutrition.",
    plan: "Balanced Lifestyle",
    location: "Surabaya"
  },
  {
    id: 3,
    name: "Maria Santos",
    rating: 4,
    message: "Great service and fantastic food! My whole family loves the Family Special plan. The kids actually ask for their healthy meals now!",
    plan: "Family Special",
    location: "Bandung"
  },
  {
    id: 4,
    name: "David Tan",
    rating: 5,
    message: "The Plant-Based Deluxe plan exceeded my expectations. Creative, flavorful, and nutritious meals that make eating healthy enjoyable.",
    plan: "Plant-Based Deluxe",
    location: "Medan"
  },
  {
    id: 5,
    name: "Lisa Wijaya",
    rating: 5,
    message: "Perfect for my keto lifestyle! The macro tracking and meal customization features are exactly what I needed. Highly recommended!",
    plan: "Keto-Friendly Plan",
    location: "Makassar"
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5
  })

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % sampleTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + sampleTestimonials.length) % sampleTestimonials.length)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your testimonial! It will be reviewed and published soon.")
    setFormData({ name: "", message: "", rating: 5 })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    )
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-primary" />
              Customer Reviews
            </h3>
            
            <div className="relative">
              <Card className="bg-card border border-border">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{sampleTestimonials[currentTestimonial].name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {sampleTestimonials[currentTestimonial].plan}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        {renderStars(sampleTestimonials[currentTestimonial].rating)}
                        <span className="text-sm text-muted-foreground">
                          from {sampleTestimonials[currentTestimonial].location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &ldquo;{sampleTestimonials[currentTestimonial].message}&rdquo;
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                
                <div className="flex space-x-2">
                  {sampleTestimonials.map((_, index) => (
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
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
            <Card>
              <CardHeader>
                <CardTitle>Write a Testimonial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Your Rating</Label>
                    <div className="flex items-center space-x-2">
                      {renderStars(formData.rating, true, handleRatingChange)}
                      <span className="text-sm text-muted-foreground">
                        ({formData.rating} out of 5 stars)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Review</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your experience with SEA Catering..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Testimonial
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your testimonial will be reviewed before being published.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 