import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  FiUsers, 
  FiTruck, 
  FiAward,
  FiHeart 
} from "react-icons/fi"
import { 
  MdRestaurant,
  MdVerified 
} from "react-icons/md"

const stats = [
  {
    icon: FiUsers,
    number: "10,000+",
    label: "Happy Customers",
    description: "Served nationwide"
  },
  {
    icon: FiTruck,
    number: "50+",
    label: "Cities Covered",
    description: "Across Indonesia"
  },
  {
    icon: MdRestaurant,
    number: "500K+",
    label: "Meals Delivered",
    description: "Fresh & healthy"
  },
  {
    icon: FiAward,
    number: "4.8/5",
    label: "Customer Rating",
    description: "Based on reviews"
  }
]

export default function AboutSection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 bg-card/50">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4 sm:space-y-6">
          <Badge variant="secondary" className="flex items-center space-x-1 bg-accent/10 text-accent border-accent/20 text-xs sm:text-sm w-fit mx-auto">
            <FiHeart className="w-4 h-4" />
            <span>About SEA Catering</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Your Trusted Partner in Healthy Living
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Whether you&apos;re a busy professional, fitness enthusiast, or someone who simply values 
            good nutrition, we&apos;re here to make healthy eating effortless and enjoyable for you. 
            Our journey from a small startup to Indonesia&apos;s leading healthy catering service 
            reflects our commitment to quality and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-2 sm:space-y-3 p-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <MdVerified className="w-5 h-5 text-primary" />
            <span>Certified by Indonesian Health Ministry</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ISO 22000 Food Safety Certified</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Halal Certified</span>
          </div>
        </div>
      </div>
    </section>
  )
} 