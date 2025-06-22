import { Router } from 'express';
import { body } from 'express-validator';
import { SubscriptionController } from '../controllers/subscriptionController';
import { subscriptionValidation } from '../middleware/validation';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { subscriptionRateLimit } from '../middleware/security';

const router = Router();


router.post('/', authenticateToken, subscriptionRateLimit, subscriptionValidation, SubscriptionController.createSubscription);
router.get('/', authenticateToken, SubscriptionController.getSubscriptions);
router.get('/:id', authenticateToken, SubscriptionController.getSubscriptionById);
router.put('/:id/status', authenticateToken, SubscriptionController.updateSubscriptionStatus);
router.delete('/:id', authenticateToken, requireAdmin, SubscriptionController.deleteSubscription);

export default router; 