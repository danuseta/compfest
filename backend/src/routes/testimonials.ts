import { Router } from 'express';
import { body } from 'express-validator';
import { TestimonialController } from '../controllers/testimonialController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const validateTestimonial = [
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('subscriptionId').optional().isInt().withMessage('Subscription ID must be a valid integer')
];

router.post('/', authenticateToken, validateTestimonial, TestimonialController.createTestimonial);
router.get('/', TestimonialController.getApprovedTestimonials);
router.get('/count/plan/:planId', TestimonialController.getTestimonialCountByPlan);
router.get('/subscription/:subscriptionId', authenticateToken, TestimonialController.getUserTestimonialForSubscription);
router.get('/pending', authenticateToken, TestimonialController.getPendingTestimonials);
router.get('/:id', TestimonialController.getTestimonialById);
router.put('/:id/approve', authenticateToken, TestimonialController.approveTestimonial);
router.put('/:id/reject', authenticateToken, TestimonialController.rejectTestimonial);
router.delete('/:id', authenticateToken, TestimonialController.deleteTestimonial);

export default router; 