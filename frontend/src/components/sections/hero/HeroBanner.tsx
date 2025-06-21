"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        SEA Catering
      </h1>
      <p className="text-xl md:text-2xl text-orange-100 mb-2">
        Healthy Meals, Anytime, Anywhere
      </p>
      <p className="text-lg text-orange-200 max-w-2xl mx-auto mb-8">
        Transform your lifestyle with our customizable healthy meal delivery service. 
        Fresh ingredients, expert nutrition, delivered to your doorstep.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3"
        >
          <Link href="/subscription">Start Your Journey</Link>
        </Button>
        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3"
        >
          <Link href="/menu">View Menu</Link>
        </Button>
      </div>
    </div>
  )
} 