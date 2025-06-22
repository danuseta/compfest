"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        window.location.href = "/";
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors: {[key: string]: string} = {};
          data.errors.forEach((err: { path?: string; param?: string; field?: string; msg?: string; message?: string }) => {
            const field = err.field || err.path || err.param || 'general';
            fieldErrors[field] = err.msg || err.message || 'Validation error';
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ general: data.message || "Login failed" });
        }
      }
    } catch {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 gradient-bg-effects">
      <div className="flex items-center justify-center min-h-screen py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <MdRestaurant className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">SEA Catering</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Healthy Meals, Anytime</p>
              </div>
            </Link>
            
            <Badge variant="secondary" className="flex items-center space-x-1 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm w-fit mx-auto mb-4 sm:mb-6 px-2 sm:px-3 py-1 sm:py-1.5">
              <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Member Login</span>
            </Badge>
          </div>

          <Card className="premium-card backdrop-blur-sm border-border/50 shadow-2xl">
            <CardHeader className="space-y-1 text-center pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Welcome Back</CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground">
                Sign in to access your healthy meal plans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errors.general && (
                  <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
                    <AlertDescription className="text-sm">{errors.general}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 sm:h-12 text-sm sm:text-base bg-background border-border focus:border-primary focus:ring-primary/20 ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base bg-background border-border focus:border-primary focus:ring-primary/20 ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 sm:h-12 orange-gradient text-white font-semibold text-sm sm:text-base group hover:shadow-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="pt-4 sm:pt-6 border-t border-border/50">
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/register" 
                    className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 