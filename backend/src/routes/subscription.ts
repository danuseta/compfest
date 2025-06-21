import { Router } from 'express';
import { body } from 'express-validator';
import { SubscriptionController } from '../controllers/subscriptionController';

const router = Router();

const validateSubscription = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('phone').trim().matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Phone number must be valid'),
  body('selectedPlan').isIn(['diet', 'protein', 'royal']).withMessage('Invalid meal plan selected'),
  body('selectedMealTypes').isArray({ min: 1 }).withMessage('At least one meal type must be selected'),
  body('selectedDeliveryDays').isArray({ min: 1 }).withMessage('At least one delivery day must be selected'),
  body('totalPrice').isNumeric().withMessage('Total price must be a number')
];

router.post('/', validateSubscription, SubscriptionController.createSubscription);
router.get('/', SubscriptionController.getSubscriptions);
router.get('/:id', SubscriptionController.getSubscriptionById);
router.put('/:id/status', SubscriptionController.updateSubscriptionStatus);
router.delete('/:id', SubscriptionController.deleteSubscription);

export default router; 