import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Users } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Get in touch with our team to begin your healthy lifestyle transformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="premium-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl text-primary flex items-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">Manager</p>
                  <p className="text-muted-foreground text-sm">Brian</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-accent/5 rounded-lg sm:rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm sm:text-base">Phone Number</p>
                  <p className="text-muted-foreground text-sm">08123456789</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90"></div>
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="text-lg sm:text-xl text-white">
                Join Thousands of Happy Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4 sm:space-y-6">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Transform your eating habits with SEA Catering. Start your subscription today 
                and experience the convenience of healthy, delicious meals delivered to your door.
              </p>
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold text-sm sm:text-base py-3"
                >
                  Start Your Subscription
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10 text-sm sm:text-base py-3"
                >
                  View Meal Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 