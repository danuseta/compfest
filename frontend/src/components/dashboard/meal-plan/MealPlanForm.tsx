import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FiSave, FiX } from "react-icons/fi"
import { getApiUrl } from "@/lib/api"

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

interface MealPlanFormProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
  editingPlan: MealPlan | null
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onRefresh: () => void
}

export default function MealPlanForm({ 
  showModal, 
  setShowModal, 
  editingPlan, 
  onSuccess, 
  onError, 
  onRefresh 
}: MealPlanFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    planId: '',
    name: '',
    price: '',
    description: '',
    features: '',
    imageUrl: '',
    isActive: true
  })

  useEffect(() => {
    if (editingPlan) {
      setFormData({
        planId: editingPlan.planId,
        name: editingPlan.name,
        price: editingPlan.price.toString(),
        description: editingPlan.description,
        features: editingPlan.features.join(', '),
        imageUrl: editingPlan.imageUrl || '',
        isActive: editingPlan.isActive
      })
    } else {
      setFormData({
        planId: '',
        name: '',
        price: '',
        description: '',
        features: '',
        imageUrl: '',
        isActive: true
      })
    }
  }, [editingPlan])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f)
      
      const body = {
        planId: formData.planId,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        features: featuresArray,
        imageUrl: formData.imageUrl || undefined,
        isActive: formData.isActive
      }

      const url = editingPlan 
        ? getApiUrl(`/api/meal-plans/${editingPlan.id}`)
        : getApiUrl('/api/meal-plans')

      const response = await fetch(url, {
        method: editingPlan ? 'PUT' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      if (data.success) {
        onSuccess(`Meal plan ${editingPlan ? 'updated' : 'created'} successfully!`)
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {editingPlan ? 'Edit Meal Plan' : 'Add New Meal Plan'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="planId">Plan ID *</Label>
              <Input
                id="planId"
                name="planId"
                value={formData.planId}
                onChange={handleInputChange}
                placeholder="e.g., diet, protein"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Diet Plan"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price (IDR) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="30000"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the meal plan..."
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="features">Features (comma-separated) *</Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="Calorie controlled, Fresh vegetables, Lean proteins"
              rows={2}
              required
              disabled={isSubmitting}
            />
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
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="rounded border-border"
            />
            <Label htmlFor="isActive">Active</Label>
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
                  {editingPlan ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4 mr-2" />
                  {editingPlan ? 'Update' : 'Create'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 