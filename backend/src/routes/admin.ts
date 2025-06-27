import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/metrics', authenticateToken, requireAdmin, AdminController.getMetrics);
router.get('/monthly-revenue', authenticateToken, requireAdmin, AdminController.getMonthlyRevenue);
router.get('/recent-subscriptions', authenticateToken, requireAdmin, AdminController.getRecentSubscriptions);
router.get('/pending-subscriptions', authenticateToken, requireAdmin, AdminController.getPendingSubscriptions);
router.put('/subscriptions/:id/status', authenticateToken, requireAdmin, AdminController.updateSubscriptionStatus);
router.get('/users', authenticateToken, requireAdmin, AdminController.getAllUsers);
router.put('/users/:id', authenticateToken, requireAdmin, AdminController.updateUserStatus);
router.get('/subscription-stats', authenticateToken, requireAdmin, AdminController.getSubscriptionStats);

router.post('/meal-plans', authenticateToken, requireAdmin, AdminController.createMealPlan);
router.put('/meal-plans/:id', authenticateToken, requireAdmin, AdminController.updateMealPlan);
router.delete('/meal-plans/:id', authenticateToken, requireAdmin, AdminController.deleteMealPlan);

export default router; 