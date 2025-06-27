"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle, FiUser, FiInfo, FiLock } from "react-icons/fi"
import { MdContactMail } from "react-icons/md"
import { getUser } from "@/lib/auth"

export default function ContactPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<{ id: number; email: string; role: string; full_name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userData = getUser()
    if (userData) {
      setUser(userData)
      if (userData.role === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [])

  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSendMessage = async () => {
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      setAlert({ 
        type: 'success', 
        message: "Message sent successfully! We'll get back to you within 24 hours." 
      })
      
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 md:mb-4">
              <MdContactMail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 px-4">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Have questions about our meal plans or need assistance? We&apos;re here to help! 
              Reach out to our team for personalized support.
            </p>
          </div>

          {isAdmin && (
            <Alert className="mb-8 border-0 shadow-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30 max-w-4xl mx-auto">
              <FiInfo className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Admin View:</strong> You are viewing this contact form as an administrator. This form is read-only for admin users. Only customers can submit contact messages.
              </AlertDescription>
            </Alert>
          )}

          {alert && (
            <Alert className={`mb-8 border-0 shadow-lg max-w-4xl mx-auto ${
              alert.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30' 
                : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30'
            }`}>
              <FiInfo className={`h-4 w-4 ${
                alert.type === 'success' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              }`} />
              <AlertDescription className={
                alert.type === 'success' 
                  ? 'text-emerald-800 dark:text-emerald-200' 
                  : 'text-red-800 dark:text-red-200'
              }>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                    <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
                      <FiPhone className="h-5 w-5 text-primary" />
                    </div>
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="p-4 bg-muted/50 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 text-foreground">Phone Support</h3>
                        <p className="text-muted-foreground mb-2 text-sm">Speak directly with our manager</p>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground text-sm">Manager: Brian</p>
                          <p className="text-primary font-semibold">08123456789</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 text-foreground">Email Support</h3>
                        <p className="text-muted-foreground mb-2 text-sm">Send us your questions anytime</p>
                        <div className="space-y-1">
                          <p className="text-primary font-medium text-sm">hello@seacatering.id</p>
                          <p className="text-primary font-medium text-sm">support@seacatering.id</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 text-foreground">Service Coverage</h3>
                        <p className="text-muted-foreground mb-2 text-sm">We deliver nationwide across Indonesia</p>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground text-sm">Major cities: Jakarta, Surabaya, Bandung, Medan, Makassar</p>
                          <p className="text-xs text-muted-foreground">And many more cities nationwide</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiClock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 text-foreground">Business Hours</h3>
                        <p className="text-muted-foreground mb-2 text-sm">We&apos;re here when you need us</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between items-center p-2 bg-background rounded-lg">
                            <span className="font-medium text-foreground">Monday - Friday:</span>
                            <span className="text-muted-foreground">8:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-background rounded-lg">
                            <span className="font-medium text-foreground">Saturday:</span>
                            <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-background rounded-lg">
                            <span className="font-medium text-foreground">Sunday:</span>
                            <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
                <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border">
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                    <div className="p-2 bg-background rounded-xl shadow-sm border border-border">
                      {isAdmin ? <FiLock className="h-5 w-5 text-amber-500" /> : <FiMessageCircle className="h-5 w-5 text-primary" />}
                    </div>
                    {isAdmin ? "Contact Form (Admin View)" : "Send us a Message"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {user && !isAdmin && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800/30">
                      <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                        <FiUser className="w-4 h-4" />
                        <span className="font-medium">Logged in as: {user.full_name} ({user.email})</span>
                      </div>
                    </div>
                  )}
                  
                  {!user && !isAdmin && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Enter your first name" 
                            className="border-border focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Enter your last name"
                            className="border-border focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email address"
                          className="border-border focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number"
                          className="border-border focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </>
                  )}
                  
                  {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter your first name" 
                          className="border-border focus:ring-primary focus:border-primary"
                          disabled={true}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter your last name"
                          className="border-border focus:ring-primary focus:border-primary"
                          disabled={true}
                        />
                      </div>
                    </div>
                  )}
                  
                  {isAdmin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email address"
                          className="border-border focus:ring-primary focus:border-primary"
                          disabled={true}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number"
                          className="border-border focus:ring-primary focus:border-primary"
                          disabled={true}
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What is this about?"
                      className="border-border focus:ring-primary focus:border-primary"
                      disabled={isAdmin}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..." 
                      className="min-h-[120px] border-border focus:ring-primary focus:border-primary resize-none"
                      disabled={isAdmin}
                    />
                  </div>

                  <Button 
                    className="w-full orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                    disabled={isAdmin || isLoading}
                    onClick={handleSendMessage}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    {isLoading ? "Sending..." : isAdmin ? "Form Disabled (Admin View)" : "Send Message"}
                  </Button>

                  <div className="text-center p-3 bg-muted/30 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll get back to you within 24 hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-4xl mx-auto">
              <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FiPhone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Need Immediate Help?</h2>
                <p className="text-sm sm:text-base lg:text-lg mb-6 text-muted-foreground max-w-2xl mx-auto">
                  For urgent matters or immediate assistance with your meal plans, contact our manager Brian directly for instant support.
                </p>
                <Button 
                  size="lg" 
                  className="orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
                >
                  <FiPhone className="w-5 h-5 mr-2" />
                  Call Brian: 08123456789
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 