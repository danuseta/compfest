export interface Subscription {
  id: number
  selectedPlan: string
  selectedMealTypes: string[]
  selectedDeliveryDays: string[]
  allergies?: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'active' | 'paused' | 'cancelled'
  pauseStartDate?: string
  pauseEndDate?: string
  nextDeliveryDate?: string
  created_at: string
  mealPlan: {
    id: number
    name: string
    price: number
    description: string
  }
} 