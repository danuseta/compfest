import { Router } from 'express';
import { body } from 'express-validator';
import { TestimonialController } from '../controllers/testimonialController';

const router = Router();

const validateTestimonial = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('plan').optional().trim().isLength({ max: 100 }).withMessage('Plan name must not exceed 100 characters'),
  body('location').optional().trim().isLength({ max: 100 }).withMessage('Location must not exceed 100 characters')
];

router.post('/', validateTestimonial, TestimonialController.createTestimonial);
router.get('/', TestimonialController.getApprovedTestimonials);
router.get('/pending', TestimonialController.getPendingTestimonials);
router.get('/:id', TestimonialController.getTestimonialById);
router.put('/:id/approve', TestimonialController.approveTestimonial);
router.put('/:id/reject', TestimonialController.rejectTestimonial);
router.delete('/:id', TestimonialController.deleteTestimonial);

export default router; 