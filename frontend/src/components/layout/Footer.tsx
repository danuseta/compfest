import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  MdRestaurant,
  MdLocalShipping,
  MdRestaurantMenu,
  MdVerified
} from "react-icons/md"
import { 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiTwitter
} from "react-icons/fi"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MdRestaurant className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">SEA Catering</h3>
            </div>
            
            <p className="text-muted-foreground text-sm sm:text-base">&ldquo;Healthy Meals, Anytime, Anywhere&rdquo;</p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Badge variant="secondary" className="flex items-center space-x-1 bg-primary/10 text-primary border-primary/20 text-xs">
                <MdLocalShipping className="w-3 h-3" />
                <span>Nationwide Delivery</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1 bg-accent/10 text-accent border-accent/20 text-xs">
                <MdRestaurantMenu className="w-3 h-3" />
                <span>Customizable Meals</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1 bg-primary/10 text-primary border-primary/20 text-xs">
                <MdVerified className="w-3 h-3" />
                <span>Nutritionist Approved</span>
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>hello@seacatering.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4" />
                <span>+62 811-2345-678</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <Link href="https://instagram.com/seacatering" target="_blank">
                  <FiInstagram className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <Link href="https://facebook.com/seacatering" target="_blank">
                  <FiFacebook className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="p-2" asChild>
                <Link href="https://twitter.com/seacatering" target="_blank">
                  <FiTwitter className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            {/* Copyright */}
            <div className="pt-4 sm:pt-6 border-t border-border">
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                © 2024 SEA Catering. All rights reserved.<br className="sm:hidden" />
                <span className="hidden sm:inline"> | </span>Transforming Indonesia&apos;s eating habits, one meal at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 