import { Router } from 'express';
import { body } from 'express-validator';
import { MealPlanController } from '../controllers/mealPlanController';

const router = Router();

const validateMealPlan = [
  body('planId').trim().isLength({ min: 2, max: 50 }).withMessage('Plan ID must be between 2 and 50 characters'),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('price').isNumeric().isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('imageUrl').optional().isURL().withMessage('Image URL must be a valid URL')
];

router.post('/', validateMealPlan, MealPlanController.createMealPlan);
router.get('/with-menus', MealPlanController.getMealPlansWithMenus);
router.get('/', MealPlanController.getMealPlans);
router.get('/:id', MealPlanController.getMealPlanById);
router.put('/:id', MealPlanController.updateMealPlan);
router.delete('/:id', MealPlanController.deleteMealPlan);

export default router; 