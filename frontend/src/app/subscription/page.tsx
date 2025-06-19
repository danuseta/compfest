import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"

const subscriptionPlans = [
  {
    name: "Starter",
    price: "Rp 150.000",
    period: "week",
    description: "Perfect for trying out SEA Catering",
    meals: 5,
    features: [
      "5 meals per week",
      "Basic meal customization",
      "Standard delivery",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Popular",
    price: "Rp 280.000",
    period: "week", 
    description: "Most chosen plan by our customers",
    meals: 10,
    features: [
      "10 meals per week",
      "Full meal customization",
      "Priority delivery",
      "Phone & email support",
      "Nutrition tracking"
    ],
    popular: true
  },
  {
    name: "Family",
    price: "Rp 500.000",
    period: "week",
    description: "Great for families and meal sharing",
    meals: 20,
    features: [
      "20 meals per week",
      "Multiple dietary preferences",
      "Express delivery",
      "Dedicated support",
      "Family nutrition dashboard",
      "Flexible scheduling"
    ],
    popular: false
  }
]

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Subscribe to SEA Catering and enjoy healthy, customizable meals delivered right to your door. 
            Choose the plan that fits your lifestyle and dietary goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : 'border-border'} transition-all hover:shadow-md`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mt-2">
                  {plan.price}
                  <span className="text-lg text-muted-foreground font-normal">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-muted/50 rounded-lg">
                  <span className="text-2xl font-bold">{plan.meals}</span>
                  <span className="text-muted-foreground ml-2">meals per week</span>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Subscribe to SEA Catering?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fresh Daily</h3>
              <p className="text-sm text-muted-foreground">All meals prepared fresh daily with premium ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Highly Rated</h3>
              <p className="text-sm text-muted-foreground">4.8/5 average rating from thousands of satisfied customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible</h3>
              <p className="text-sm text-muted-foreground">Pause, skip, or cancel your subscription anytime</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 