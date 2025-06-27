import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiPlus, FiAlertCircle } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"
import MealPlanForm from "./meal-plan/MealPlanForm"
import MealPlanCard from "./meal-plan/MealPlanCard"

interface MealPlan {
  id: number
  planId: string
  name: string
  price: number
  description: string
  features: string[]
  imageUrl?: string
  isActive: boolean
  createdAt: string
}

interface MealPlanManagerProps {
  mealPlans: MealPlan[]
  onRefresh: () => void
}

export default function MealPlanManager({ mealPlans, onRefresh }: MealPlanManagerProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState<MealPlan | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  const handleAddNew = () => {
    setEditingPlan(null)
    setShowModal(true)
  }

  const handleEdit = (plan: MealPlan) => {
    setEditingPlan(plan)
    setShowModal(true)
  }

  const handleDelete = async (planId: number) => {
    if (!confirm('Are you sure you want to delete this meal plan?')) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(getApiUrl(`/api/meal-plans/${planId}`), {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ type: 'success', message: 'Meal plan deleted successfully!' })
        onRefresh()
      } else {
        setAlert({ type: 'error', message: data.message || 'Delete failed' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const toggleStatus = async (plan: MealPlan) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(getApiUrl(`/api/meal-plans/${plan.id}`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...plan, isActive: !plan.isActive })
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ 
          type: 'success', 
          message: `Meal plan ${!plan.isActive ? 'activated' : 'deactivated'} successfully!` 
        })
        onRefresh()
      } else {
        setAlert({ type: 'error', message: data.message || 'Operation failed' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handleSuccess = (message: string) => {
    setAlert({ type: 'success', message })
  }

  const handleError = (message: string) => {
    setAlert({ type: 'error', message })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Meal Plans Management</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Create and manage your meal plan offerings</p>
        </div>
        <Button onClick={handleAddNew} className="orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          <FiPlus className="h-4 w-4 mr-2" />
          Add New Plan
        </Button>
      </div>

      {alert && (
        <Alert className={`border-0 shadow-lg ${alert.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30'}`}>
          <FiAlertCircle className={`h-4 w-4 ${alert.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`} />
          <AlertDescription className={alert.type === 'success' ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlans.map((plan) => (
          <MealPlanCard 
            key={plan.id}
            plan={plan}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={toggleStatus}
          />
        ))}
      </div>

      <MealPlanForm
        showModal={showModal}
        setShowModal={setShowModal}
        editingPlan={editingPlan}
        onSuccess={handleSuccess}
        onError={handleError}
        onRefresh={onRefresh}
      />
    </div>
  )
} 