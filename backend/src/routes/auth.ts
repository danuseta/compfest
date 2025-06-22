import { Router } from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { authRateLimit } from '../middleware/security';

const router = Router();

router.post('/register', authRateLimit, registerValidation, register);

router.post('/login', authRateLimit, loginValidation, login);

router.post('/logout', logout);

router.get('/profile', authenticateToken, getProfile);

router.put('/profile', authenticateToken, updateProfileValidation, updateProfile);

router.put('/change-password', authenticateToken, changePasswordValidation, changePassword);

export default router; 