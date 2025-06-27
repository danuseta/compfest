import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiSave, FiX } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"

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

interface MenuFormProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
  editingMenu: Menu | null
  mealPlans: MealPlan[]
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onRefresh: () => void
}

export default function MenuForm({ 
  showModal, 
  setShowModal, 
  editingMenu, 
  mealPlans, 
  onSuccess, 
  onError, 
  onRefresh 
}: MenuFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    mealPlanId: '',
    name: '',
    description: '',
    ingredients: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    imageUrl: '',
    isAvailable: true
  })

  useEffect(() => {
    if (editingMenu) {
      setFormData({
        mealPlanId: editingMenu.mealPlanId.toString(),
        name: editingMenu.name,
        description: editingMenu.description || '',
        ingredients: editingMenu.ingredients?.join(', ') || '',
        calories: editingMenu.nutritionalInfo?.calories?.toString() || '',
        protein: editingMenu.nutritionalInfo?.protein || '',
        carbs: editingMenu.nutritionalInfo?.carbs || '',
        fat: editingMenu.nutritionalInfo?.fat || '',
        fiber: editingMenu.nutritionalInfo?.fiber || '',
        imageUrl: editingMenu.imageUrl || '',
        isAvailable: editingMenu.isAvailable
      })
    } else {
      setFormData({
        mealPlanId: '',
        name: '',
        description: '',
        ingredients: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        imageUrl: '',
        isAvailable: true
      })
    }
  }, [editingMenu])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const ingredientsArray = formData.ingredients.split(',').map(i => i.trim()).filter(i => i)
      
      const nutritionalInfo: Record<string, string | number> = {}
      if (formData.calories) nutritionalInfo.calories = parseInt(formData.calories)
      if (formData.protein) nutritionalInfo.protein = formData.protein
      if (formData.carbs) nutritionalInfo.carbs = formData.carbs
      if (formData.fat) nutritionalInfo.fat = formData.fat
      if (formData.fiber) nutritionalInfo.fiber = formData.fiber
      
      const body = {
        mealPlanId: parseInt(formData.mealPlanId),
        name: formData.name,
        description: formData.description || undefined,
        ingredients: ingredientsArray.length > 0 ? ingredientsArray : undefined,
        nutritionalInfo: Object.keys(nutritionalInfo).length > 0 ? nutritionalInfo : undefined,
        imageUrl: formData.imageUrl || undefined,
        isAvailable: formData.isAvailable
      }

      const url = editingMenu 
        ? getApiUrl(`/api/menus/${editingMenu.id}`)
        : getApiUrl('/api/menus')

      const response = await fetch(url, {
        method: editingMenu ? 'PUT' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      if (data.success) {
        onSuccess(`Menu ${editingMenu ? 'updated' : 'created'} successfully!`)
        setShowModal(false)
        onRefresh()
      } else {
        onError(data.message || 'Operation failed')
      }
    } catch {
      onError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editingMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mealPlanId">Meal Plan *</Label>
            <Select 
              value={formData.mealPlanId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, mealPlanId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a meal plan" />
              </SelectTrigger>
              <SelectContent>
                {mealPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id.toString()}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Menu Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Grilled Chicken Salad"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the dish..."
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="Chicken breast, Mixed greens, Cherry tomatoes"
              rows={2}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleInputChange}
                placeholder="280"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein</Label>
              <Input
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
                placeholder="25g"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="carbs">Carbs</Label>
              <Input
                id="carbs"
                name="carbs"
                value={formData.carbs}
                onChange={handleInputChange}
                placeholder="12g"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="fat">Fat</Label>
              <Input
                id="fat"
                name="fat"
                value={formData.fat}
                onChange={handleInputChange}
                placeholder="8g"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="fiber">Fiber</Label>
              <Input
                id="fiber"
                name="fiber"
                value={formData.fiber}
                onChange={handleInputChange}
                placeholder="4g"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="rounded border-border"
            />
            <Label htmlFor="isAvailable">Available</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowModal(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              <FiX className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 orange-gradient text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {editingMenu ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4 mr-2" />
                  {editingMenu ? 'Update' : 'Create'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 