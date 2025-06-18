import { Badge } from "@/components/ui/badge"

export default function AboutSection() {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 lg:py-20 bg-card/50">
      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs sm:text-sm">
          About SEA Catering
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Your Trusted Partner in Healthy Living
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          Whether you&apos;re a busy professional, fitness enthusiast, or someone who simply values 
          good nutrition, we&apos;re here to make healthy eating effortless and enjoyable for you. 
          Our journey from a small startup to Indonesia&apos;s leading healthy catering service 
          reflects our commitment to quality and customer satisfaction.
        </p>
      </div>
    </section>
  )
} 