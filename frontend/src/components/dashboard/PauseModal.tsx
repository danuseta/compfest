import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface PauseModalProps {
  isOpen: boolean
  onClose: () => void
  pauseStartDate: string
  pauseEndDate: string
  setPauseStartDate: (date: string) => void
  setPauseEndDate: (date: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function PauseModal({
  isOpen,
  onClose,
  pauseStartDate,
  pauseEndDate,
  setPauseStartDate,
  setPauseEndDate,
  onSubmit,
  isSubmitting
}: PauseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] sm:max-w-2xl lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-foreground pr-8">
            Pause Subscription
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Select the period to pause your subscription. No charges will be applied during this period.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pauseStartDate" className="text-xs sm:text-sm font-medium text-foreground">Start Date</Label>
              <Input
                id="pauseStartDate"
                type="date"
                value={pauseStartDate}
                onChange={(e) => setPauseStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 bg-background border-border text-foreground text-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="pauseEndDate" className="text-xs sm:text-sm font-medium text-foreground">End Date</Label>
              <Input
                id="pauseEndDate"
                type="date"
                value={pauseEndDate}
                onChange={(e) => setPauseEndDate(e.target.value)}
                min={pauseStartDate || new Date().toISOString().split('T')[0]}
                className="mt-1 bg-background border-border text-foreground text-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSubmit}
              disabled={isSubmitting || !pauseStartDate || !pauseEndDate}
              className="flex-1 orange-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
            >
              {isSubmitting ? "Processing..." : "Pause Subscription"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 