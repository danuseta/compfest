'use client';

import { useState, useEffect } from 'react';
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { getApiUrl } from "@/lib/api"
import MenuLoadingState from "@/components/menu/MenuLoadingState"
import MenuErrorState from "@/components/menu/MenuErrorState"
import MenuHeader from "@/components/menu/MenuHeader"
import MenuCard from "@/components/menu/MenuCard"
import MenuEmptyState from "@/components/menu/MenuEmptyState"

interface MealPlan {
  id: number;
  planId: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl?: string;
  isActive: boolean;
  menus: Menu[];
}

interface Menu {
  id: number;
  mealPlanId: number;
  name: string;
  description?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  imageUrl?: string;
  isAvailable: boolean;
}

export default function MenuPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl('/api/meal-plans?active=true'));
      const data = await response.json();
      
      if (data.success) {
        setMealPlans(data.data);
      } else {
        setError('Failed to fetch meal plans');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching meal plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAllMenus = () => {
    const allMenus: (Menu & { mealPlan: MealPlan })[] = [];
    mealPlans.forEach(plan => {
      if (plan.menus && plan.menus.length > 0) {
        plan.menus.forEach(menu => {
          allMenus.push({ ...menu, mealPlan: plan });
        });
      }
    });
    return allMenus;
  };

  if (loading) {
    return <MenuLoadingState />;
  }

  if (error) {
    return <MenuErrorState error={error} onRetry={fetchMealPlans} />;
  }

  const allMenus = getAllMenus();

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      
      <main className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <MenuHeader />

          {allMenus.length === 0 ? (
            <MenuEmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {allMenus.map((menu) => (
                <MenuCard 
                  key={`${menu.mealPlan.id}-${menu.id}`}
                  menu={menu}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 