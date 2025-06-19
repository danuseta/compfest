import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, Utensils, CheckCircle } from "lucide-react"

const mealPlans = [
  {
    id: 1,
    name: "Protein Power Plan",
    price: "Rp 45.000",
    description: "High-protein meals designed for fitness enthusiasts and muscle building",
    image: "/api/placeholder/400/300",
    rating: 4.8,
    reviews: 2847,
    duration: "Weekly",
    meals: 7,
    features: [
      "25-30g protein per meal",
      "Lean meats and fish",
      "Post-workout optimization",
      "Nutritionist approved",
      "Custom portion sizes"
    ],
    nutritionInfo: {
      calories: "450-550 per meal",
      protein: "25-30g",
      carbs: "35-45g",
      fat: "15-20g"
    }
  },
  {
    id: 2,
    name: "Balanced Lifestyle",
    price: "Rp 35.000",
    description: "Perfect balance of nutrients for everyday healthy living",
    image: "/api/placeholder/400/300",
    rating: 4.7,
    reviews: 1952,
    duration: "Weekly",
    meals: 7,
    features: [
      "Balanced macronutrients",
      "Fresh vegetables daily",
      "Whole grain options",
      "Heart-healthy fats",
      "Diverse menu rotation"
    ],
    nutritionInfo: {
      calories: "400-500 per meal",
      protein: "20-25g",
      carbs: "40-50g",
      fat: "12-18g"
    }
  },
  {
    id: 3,
    name: "Plant-Based Deluxe",
    price: "Rp 40.000",
    description: "100% plant-based meals packed with nutrients and flavor",
    image: "/api/placeholder/400/300",
    rating: 4.9,
    reviews: 1324,
    duration: "Weekly",
    meals: 7,
    features: [
      "100% plant-based",
      "High fiber content",
      "Organic ingredients",
      "Sustainable sourcing",
      "Creative flavor profiles"
    ],
    nutritionInfo: {
      calories: "380-480 per meal",
      protein: "15-22g",
      carbs: "45-55g",
      fat: "14-20g"
    }
  },
  {
    id: 4,
    name: "Keto-Friendly Plan",
    price: "Rp 50.000",
    description: "Low-carb, high-fat meals perfect for ketogenic lifestyle",
    image: "/api/placeholder/400/300",
    rating: 4.6,
    reviews: 967,
    duration: "Weekly",
    meals: 7,
    features: [
      "Under 10g net carbs",
      "High healthy fats",
      "Moderate protein",
      "Keto-certified recipes",
      "Macro tracking included"
    ],
    nutritionInfo: {
      calories: "500-600 per meal",
      protein: "25-30g",
      carbs: "5-10g net",
      fat: "35-45g"
    }
  },
  {
    id: 5,
    name: "Family Special",
    price: "Rp 30.000",
    description: "Family-friendly meals that everyone will love",
    image: "/api/placeholder/400/300",
    rating: 4.5,
    reviews: 2156,
    duration: "Weekly",
    meals: 7,
    features: [
      "Kid-approved flavors",
      "Large portion sizes",
      "No exotic ingredients",
      "Comfort food inspired",
      "Weekly family favorites"
    ],
    nutritionInfo: {
      calories: "450-550 per meal",
      protein: "18-25g",
      carbs: "50-60g",
      fat: "15-25g"
    }
  },
  {
    id: 6,
    name: "Weight Management",
    price: "Rp 38.000",
    description: "Carefully portioned meals to support healthy weight goals",
    image: "/api/placeholder/400/300",
    rating: 4.7,
    reviews: 1543,
    duration: "Weekly",
    meals: 7,
    features: [
      "Calorie controlled",
      "High satiety index",
      "Metabolism boosting",
      "Portion guidance",
      "Weekly progress tracking"
    ],
    nutritionInfo: {
      calories: "350-450 per meal",
      protein: "22-28g",
      carbs: "30-40g",
      fat: "12-16g"
    }
  }
]

export default function MenuPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Meal Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully crafted meal plans, each designed to meet specific dietary needs and lifestyle goals. All meals are prepared fresh daily and delivered across Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mealPlans.map((plan) => (
            <Card key={plan.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card border border-border">
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-primary/40" />
                </div>
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {plan.duration}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{plan.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{plan.reviews.toLocaleString()} reviews</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{plan.meals} meals</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">/meal</span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      See More Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-4">{plan.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Utensils className="w-24 h-24 text-primary/40" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Plan Features</h3>
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Nutrition Info</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Calories:</span>
                              <span className="font-medium">{plan.nutritionInfo.calories}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Protein:</span>
                              <span className="font-medium">{plan.nutritionInfo.protein}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Carbs:</span>
                              <span className="font-medium">{plan.nutritionInfo.carbs}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fat:</span>
                              <span className="font-medium">{plan.nutritionInfo.fat}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-3xl font-bold text-primary">
                            {plan.price}
                            <span className="text-lg text-muted-foreground font-normal">/meal</span>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-sm">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{plan.rating} ({plan.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          Subscribe to This Plan
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Can&apos;t decide?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our nutrition experts for personalized meal plan recommendations
          </p>
          <Button variant="outline" size="lg">
            Get Personal Consultation
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
} 