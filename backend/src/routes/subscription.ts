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
router.put('/:id/pause', authenticateToken, [
  body('pauseStartDate').isISO8601().withMessage('Valid start date is required'),
  body('pauseEndDate').isISO8601().withMessage('Valid end date is required')
], SubscriptionController.pauseSubscription);
router.put('/:id/resume', authenticateToken, SubscriptionController.resumeSubscription);
router.delete('/:id', authenticateToken, requireAdmin, SubscriptionController.deleteSubscription);

export default router; 