"use client"

import { Button } from "@/components/ui/button"
import { SimpleToggle } from "@/components/ui/mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  FiHome, 
  FiBook, 
  FiCreditCard, 
  FiMail, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiUser,
  FiSettings,
  FiChevronDown
} from "react-icons/fi"
import { MdRestaurant } from "react-icons/md"
import { isAuthenticated, getUser, logout, type User } from "@/lib/auth"

const navItems = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/menu", label: "Menu / Meal Plans", icon: FiBook },
  { href: "/subscription", label: "Subscription", icon: FiCreditCard },
  { href: "/contact", label: "Contact Us", icon: FiMail }
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
    setUser(getUser())
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUser(null)
    setIsMenuOpen(false)
  }

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
            
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FiUser className="w-4 h-4" />
                      {user?.full_name?.split(' ')[0] || 'User'}
                      <FiChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2">
                        {user?.role === 'admin' ? (
                          <>
                            <FiSettings className="w-4 h-4" />
                            Admin Dashboard
                          </>
                        ) : (
                          <>
                            <FiUser className="w-4 h-4" />
                            My Dashboard
                          </>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">
                    <FiLogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    <FiUserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Link>
                </Button>
              </div>
            )}

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
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="text-sm text-muted-foreground px-2">
                    Hello, {user?.full_name}
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMenuOpen(false)}>
                      {user?.role === 'admin' ? (
                        <>
                          <FiSettings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </>
                      ) : (
                        <>
                          <FiUser className="w-4 h-4 mr-2" />
                          My Dashboard
                        </>
                      )}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/login">
                      <FiLogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href="/register">
                      <FiUserPlus className="w-4 h-4 mr-2" />
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 