import { Router } from 'express';
import { body } from 'express-validator';
import { MenuController } from '../controllers/menuController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const menuValidation = [
  body('mealPlanId').isInt({ min: 1 }).withMessage('Valid meal plan ID is required'),
  body('name').trim().isLength({ min: 2, max: 150 }).withMessage('Menu name must be between 2 and 150 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
  body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
  body('nutritionalInfo').optional().isObject().withMessage('Nutritional info must be an object'),
  body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be a boolean')
];

router.post('/', authenticateToken, menuValidation, MenuController.createMenu);

router.get('/', MenuController.getMenus);

router.get('/:id', MenuController.getMenuById);

router.put('/:id', authenticateToken, [
  body('mealPlanId').optional().isInt({ min: 1 }).withMessage('Valid meal plan ID is required'),
  body('name').optional().trim().isLength({ min: 2, max: 150 }).withMessage('Menu name must be between 2 and 150 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must not exceed 1000 characters'),
  body('ingredients').optional().isArray().withMessage('Ingredients must be an array'),
  body('nutritionalInfo').optional().isObject().withMessage('Nutritional info must be an object'),
  body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be a boolean')
], MenuController.updateMenu);

router.delete('/:id', authenticateToken, MenuController.deleteMenu);

export default router; 