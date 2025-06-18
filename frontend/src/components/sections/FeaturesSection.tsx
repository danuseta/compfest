import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin, Clock, Users, Utensils, Shield } from "lucide-react"

const features = [
  {
    icon: Utensils,
    title: "Meal Customization",
    description: "Personalize your meals according to your dietary preferences, allergies, and fitness goals. Choose from Diet, Protein, or Royal plans.",
    color: "primary"
  },
  {
    icon: MapPin,
    title: "Nationwide Delivery",
    description: "Fresh, healthy meals delivered to major cities across Indonesia. From Jakarta to Surabaya, Medan to Denpasar.",
    color: "accent"
  },
  {
    icon: Shield,
    title: "Nutritional Information",
    description: "Complete nutritional breakdown including calories, macros, and micronutrients to help track your health goals.",
    color: "primary"
  },
  {
    icon: Users,
    title: "Expert Nutritionists",
    description: "Certified nutritionists and chefs work together to create meals that are both nutritious and delicious.",
    color: "accent"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Choose your delivery days and meal times. Breakfast, lunch, dinner, or all three - we adapt to your schedule.",
    color: "primary"
  },
  {
    icon: Phone,
    title: "24/7 Customer Support",
    description: "Dedicated customer service team ready to help with orders, modifications, or any questions you have.",
    color: "accent"
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Why Choose SEA Catering?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our comprehensive approach to healthy eating
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="premium-card group cursor-pointer h-full">
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className={`mx-auto w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-${feature.color}/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-${feature.color}/20 transition-colors`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-center text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 