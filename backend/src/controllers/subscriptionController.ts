import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Subscription from '../models/Subscription';
import MealPlan from '../models/MealPlan';
import { User } from '../models';
import { SubscriptionStatus } from '../types';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    full_name: string;
  };
}

export class SubscriptionController {
  
  static async createSubscription(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
        return;
      }

      const {
        selectedPlan,
        selectedMealTypes,
        selectedDeliveryDays,
        allergies,
        totalPrice
      } = req.body;

      const mealPlan = await MealPlan.findOne({ 
        where: { 
          planId: selectedPlan,
          isActive: true 
        } 
      });

      if (!mealPlan) {
        res.status(400).json({
          success: false,
          message: 'Selected meal plan is not available'
        });
        return;
      }

      const calculatedPrice = mealPlan.price * selectedMealTypes.length * selectedDeliveryDays.length * 4.3;

      if (Math.abs(calculatedPrice - totalPrice) > 10) {
        res.status(400).json({
          success: false,
          message: 'Price calculation mismatch',
          calculatedPrice,
          submittedPrice: totalPrice
        });
        return;
      }

      const subscription = await Subscription.create({
        userId: req.user?.id,
        name: req.user?.full_name || 'N/A',
        phone: '',
        planId: mealPlan.id,
        selectedPlan,
        selectedMealTypes,
        selectedDeliveryDays,
        allergies: allergies || undefined,
        totalPrice: calculatedPrice,
        status: 'pending'
      });

      res.status(201).json({
        success: true,
        message: 'Subscription created successfully',
        data: {
          id: subscription.id,
          name: subscription.name,
          phone: subscription.phone,
          selectedPlan: subscription.selectedPlan,
          selectedMealTypes: subscription.selectedMealTypes,
          selectedDeliveryDays: subscription.selectedDeliveryDays,
          allergies: subscription.allergies,
          totalPrice: subscription.totalPrice,
          status: subscription.status,
          createdAt: subscription.createdAt
        }
      });

    } catch (error) {
      console.error('Subscription creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getSubscriptions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const offset = (page - 1) * limit;

      const whereClause: any = {};
      if (status && ['pending', 'confirmed', 'active', 'paused', 'cancelled'].includes(status)) {
        whereClause.status = status;
      }

      if (req.user?.role !== 'admin') {
        whereClause.userId = req.user?.id;
      }

      const { count, rows: subscriptions } = await Subscription.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'planId', 'name', 'price', 'description']
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'full_name', 'email']
          }
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: {
          subscriptions,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
          }
        }
      });

    } catch (error) {
      console.error('Get subscriptions error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getSubscriptionById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const whereClause: any = { id };
      if (req.user?.role !== 'admin') {
        whereClause.userId = req.user?.id;
      }
      
      const subscription = await Subscription.findOne({
        where: whereClause,
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'planId', 'name', 'price', 'description', 'features']
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'full_name', 'email']
          }
        ]
      });
      
      if (!subscription) {
        res.status(404).json({
          success: false,
          message: 'Subscription not found'
        });
        return;
      }

      res.json({
        success: true,
        data: subscription
      });

    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateSubscriptionStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, pauseStartDate, pauseEndDate } = req.body;
      
      if (!status || !['pending', 'confirmed', 'active', 'paused', 'cancelled'].includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status'
        });
        return;
      }
      
      const whereClause: any = { id };
      if (req.user?.role !== 'admin') {
        whereClause.userId = req.user?.id;
      }
      
      const subscription = await Subscription.findOne({ where: whereClause });
      
      if (!subscription) {
        res.status(404).json({
          success: false,
          message: 'Subscription not found'
        });
        return;
      }

      const updateData: any = { status };
      
      if (status === 'paused') {
        if (!pauseStartDate || !pauseEndDate) {
          res.status(400).json({
            success: false,
            message: 'Pause start and end dates are required for paused status'
          });
          return;
        }
        updateData.pauseStartDate = pauseStartDate;
        updateData.pauseEndDate = pauseEndDate;
      } else {
        updateData.pauseStartDate = null;
        updateData.pauseEndDate = null;
      }
      
      await subscription.update(updateData);

      res.json({
        success: true,
        message: 'Subscription status updated successfully',
        data: subscription
      });

    } catch (error) {
      console.error('Update subscription status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async deleteSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const subscription = await Subscription.findByPk(id);
      
      if (!subscription) {
        res.status(404).json({
          success: false,
          message: 'Subscription not found'
        });
        return;
      }

      await subscription.destroy();

      res.json({
        success: true,
        message: 'Subscription deleted successfully'
      });

    } catch (error) {
      console.error('Delete subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 