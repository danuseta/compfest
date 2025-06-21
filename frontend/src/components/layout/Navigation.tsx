"use client"

import { Button } from "@/components/ui/button"
import { SimpleToggle } from "@/components/ui/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  FiHome, 
  FiBook, 
  FiCreditCard, 
  FiMail, 
  FiMenu, 
  FiX,
  FiPlay
} from "react-icons/fi"
import { MdRestaurant } from "react-icons/md"

const navItems = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/menu", label: "Menu / Meal Plans", icon: FiBook },
  { href: "/subscription", label: "Subscription", icon: FiCreditCard },
  { href: "/contact", label: "Contact Us", icon: FiMail }
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 sm:px-8 sm:py-4 lg:px-12">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MdRestaurant className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">SEA Catering</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <SimpleToggle />
            <Button size="sm" className="hidden sm:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-3 py-2 sm:px-4" asChild>
              <Link href="/subscription">
                <FiPlay className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Get Started</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded ${
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Button size="sm" className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground mt-2 w-full" asChild>
                <Link href="/subscription">
                  <FiPlay className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 