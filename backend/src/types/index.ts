export interface CreateSubscriptionRequest {
  selectedPlan: 'diet' | 'protein' | 'royal';
  selectedMealTypes: string[];
  selectedDeliveryDays: string[];
  allergies?: string;
  totalPrice: number;
}

export interface CreateTestimonialRequest {
  message: string;
  rating: number;
  subscriptionId?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface SubscriptionStatus {
  status: 'pending' | 'confirmed' | 'cancelled';
} 