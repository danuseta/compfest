import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Subscription from '../models/Subscription';
import MealPlan from '../models/MealPlan';
import { CreateSubscriptionRequest, SubscriptionStatus } from '../types';

export class SubscriptionController {
  
  static async createSubscription(req: Request, res: Response): Promise<void> {
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
        name,
        phone,
        selectedPlan,
        selectedMealTypes,
        selectedDeliveryDays,
        allergies,
        totalPrice
      }: CreateSubscriptionRequest = req.body;

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
        name,
        phone,
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

  static async getSubscriptions(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const offset = (page - 1) * limit;

      const whereClause: any = {};
      if (status && ['pending', 'confirmed', 'active', 'paused', 'cancelled'].includes(status)) {
        whereClause.status = status;
      }

      const { count, rows: subscriptions } = await Subscription.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'planId', 'name', 'price', 'description']
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

  static async getSubscriptionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const subscription = await Subscription.findByPk(id, {
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'planId', 'name', 'price', 'description', 'features']
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

  static async updateSubscriptionStatus(req: Request, res: Response): Promise<void> {
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
      
      const subscription = await Subscription.findByPk(id);
      
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
            message: 'Pause start date and end date are required for paused status'
          });
          return;
        }
        updateData.pauseStartDate = pauseStartDate;
        updateData.pauseEndDate = pauseEndDate;
      } else if (status === 'active') {
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