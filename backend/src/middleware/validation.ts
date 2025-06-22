import { body, ValidationChain } from 'express-validator';
import validator from 'validator';

export const sanitizeHtml = (value: string): string => {
  if (!value || typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const registerValidation: ValidationChain[] = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .customSanitizer(sanitizeHtml)
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Full name can only contain letters, spaces, hyphens, and apostrophes'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .customSanitizer(sanitizeHtml),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .customSanitizer(sanitizeHtml)
    .custom((value) => {
      if (!value || value.trim() === '') {
        return true;
      }
      return /^[0-9+\-\s()]{10,20}$/.test(value);
    })
    .withMessage('Please provide a valid phone number')
];

export const loginValidation: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .customSanitizer(sanitizeHtml),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const updateProfileValidation: ValidationChain[] = [
  body('full_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .customSanitizer(sanitizeHtml)
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Full name can only contain letters, spaces, hyphens, and apostrophes'),

  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .customSanitizer(sanitizeHtml)
    .custom((value) => {
      if (!value || value.trim() === '') {
        return true;
      }
      return /^[0-9+\-\s()]{10,20}$/.test(value);
    })
    .withMessage('Please provide a valid phone number')
];

export const changePasswordValidation: ValidationChain[] = [
  body('current_password')
    .notEmpty()
    .withMessage('Current password is required'),

  body('new_password')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

export const subscriptionValidation: ValidationChain[] = [

  body('selectedPlan')
    .notEmpty()
    .withMessage('Please select a meal plan')
    .customSanitizer(sanitizeHtml)
    .isIn(['diet', 'protein', 'royal'])
    .withMessage('Invalid meal plan selected'),

  body('selectedMealTypes')
    .isArray({ min: 1 })
    .withMessage('Please select at least one meal type')
    .custom((value) => {
      const validMealTypes = ['breakfast', 'lunch', 'dinner'];
      if (!Array.isArray(value) || !value.every(type => validMealTypes.includes(type))) {
        throw new Error('Invalid meal types selected');
      }
      return true;
    }),

  body('selectedDeliveryDays')
    .isArray({ min: 1 })
    .withMessage('Please select at least one delivery day')
    .custom((value) => {
      const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      if (!Array.isArray(value) || !value.every(day => validDays.includes(day))) {
        throw new Error('Invalid delivery days selected');
      }
      return true;
    }),

  body('allergies')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .customSanitizer(sanitizeHtml)
    .isLength({ max: 1000 })
    .withMessage('Allergies description must not exceed 1000 characters'),

  body('totalPrice')
    .isNumeric()
    .withMessage('Total price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number')
];

export const testimonialValidation: ValidationChain[] = [
  body('customer_name')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters')
    .customSanitizer(sanitizeHtml)
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Customer name can only contain letters, spaces, hyphens, and apostrophes'),

  body('review_message')
    .trim()
    .notEmpty()
    .withMessage('Review message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review message must be between 10 and 1000 characters')
    .customSanitizer(sanitizeHtml),

  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('plan')
    .optional()
    .trim()
    .customSanitizer(sanitizeHtml)
    .isLength({ max: 100 })
    .withMessage('Plan name must not exceed 100 characters'),

  body('location')
    .optional()
    .trim()
    .customSanitizer(sanitizeHtml)
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters')
]; 