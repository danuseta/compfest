import { FiUser } from "react-icons/fi"

export default function DashboardHeader() {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 md:mb-4">
        <FiUser className="h-5 w-5 md:h-6 md:w-6 text-primary" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 px-4">
        My Dashboard
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
        Manage your meal plan subscriptions and track your healthy eating journey
      </p>
    </div>
  )
} 