import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FiPlus, FiAlertCircle } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"
import MenuForm from "./menu/MenuForm"
import MenuCard from "./menu/MenuCard"

interface Menu {
  id: number
  mealPlanId: number
  name: string
  description?: string
  ingredients?: string[]
  nutritionalInfo?: {
    calories?: number
    protein?: string
    carbs?: string
    fat?: string
    fiber?: string
  }
  imageUrl?: string
  isAvailable: boolean
  createdAt: string
  mealPlan: {
    id: number
    name: string
    planId: string
  }
}

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

interface MenuManagerProps {
  onRefresh?: () => void
}

export default function MenuManager({ onRefresh }: MenuManagerProps = {}) {
  const [menus, setMenus] = useState<Menu[]>([])
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      
      const [menusRes, plansRes] = await Promise.all([
        fetch(getApiUrl('/api/meal-plans/with-menus'), {
          headers: { "Authorization": `Bearer ${token}` }
        }),
        fetch(getApiUrl('/api/meal-plans'), {
          headers: { "Authorization": `Bearer ${token}` }
        })
      ])

      if (menusRes.ok) {
        const menusData = await menusRes.json()
        if (menusData.success) {
          const allMenus = menusData.data.flatMap((plan: MealPlan & { menus: Menu[] }) => 
            plan.menus.map((menu: Menu) => ({
              ...menu,
              mealPlan: { id: plan.id, name: plan.name, planId: plan.planId }
            }))
          )
          setMenus(allMenus)
        }
      }

      if (plansRes.ok) {
        const plansData = await plansRes.json()
        if (plansData.success) setMealPlans(plansData.data)
      }

    } catch {
      setAlert({ type: 'error', message: 'Failed to load menu data. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingMenu(null)
    setShowModal(true)
  }

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu)
    setShowModal(true)
  }

  const handleDelete = async (menuId: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(getApiUrl(`/api/menus/${menuId}`), {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ type: 'success', message: 'Menu deleted successfully!' })
        fetchData()
        onRefresh?.()
      } else {
        setAlert({ type: 'error', message: data.message || 'Delete failed' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handleToggleStatus = async (menu: Menu) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(getApiUrl(`/api/menus/${menu.id}`), {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...menu, isAvailable: !menu.isAvailable })
      })

      const data = await response.json()
      if (data.success) {
        setAlert({ 
          type: 'success', 
          message: `Menu ${!menu.isAvailable ? 'enabled' : 'disabled'} successfully!` 
        })
        fetchData()
        onRefresh?.()
      } else {
        setAlert({ type: 'error', message: data.message || 'Operation failed' })
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handleSuccess = (message: string) => {
    setAlert({ type: 'success', message })
    fetchData()
    onRefresh?.()
  }

  const handleError = (message: string) => {
    setAlert({ type: 'error', message })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Menu Management</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Create and manage menu items for each meal plan</p>
        </div>
        <Button onClick={handleAddNew} className="orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          <FiPlus className="h-4 w-4 mr-2" />
          Add New Menu
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

      {menus.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No menu items found. Create your first menu item!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <MenuCard 
              key={menu.id}
              menu={menu}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      <MenuForm
        showModal={showModal}
        setShowModal={setShowModal}
        editingMenu={editingMenu}
        mealPlans={mealPlans}
        onSuccess={handleSuccess}
        onError={handleError}
        onRefresh={fetchData}
      />
    </div>
  )
}
