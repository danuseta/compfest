import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MdRestaurantMenu, MdFastfood } from "react-icons/md"
import { useRouter } from "next/navigation"

export default function EmptyState() {
  const router = useRouter()

  return (
    <Card className="border-0 shadow-xl bg-card">
      <CardContent className="py-16 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
          <MdRestaurantMenu className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">No Subscriptions Yet</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto">
          You don&apos;t have any meal plan subscriptions yet. Start your healthy journey now with our delicious meal plans!
        </p>
        <Button 
          onClick={() => router.push('/subscription')}
          className="orange-gradient text-white shadow-lg hover:shadow-xl transition-all px-8 py-3 text-sm sm:text-base lg:text-lg"
        >
          <MdFastfood className="h-5 w-5 mr-2" />
          Create New Subscription
        </Button>
      </CardContent>
    </Card>
  )
} 