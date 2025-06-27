import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Testimonial from '../models/Testimonial';
import { User } from '../models';
import { CreateTestimonialRequest } from '../types';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    full_name: string;
  };
}

export class TestimonialController {
  
  static async createTestimonial(req: Request, res: Response): Promise<void> {
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

      const { message, rating, subscriptionId }: CreateTestimonialRequest = req.body;
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User authentication required'
        });
        return;
      }

      const whereCondition: any = { userId };
      if (subscriptionId) {
        whereCondition.subscriptionId = subscriptionId;
      }
      
      const existingTestimonial = await Testimonial.findOne({
        where: whereCondition
      });

      if (existingTestimonial) {
        res.status(409).json({
          success: false,
          message: 'You have already submitted a testimonial for this subscription. Each subscription can only have one testimonial.'
        });
        return;
      }

      const testimonial = await Testimonial.create({
        userId,
        subscriptionId: subscriptionId || undefined,
        reviewMessage: message,
        rating,
        isApproved: false
      });

      res.status(201).json({
        success: true,
        message: 'Testimonial submitted successfully. It will be reviewed before being published.',
        data: {
          id: testimonial.id,
          userId: testimonial.userId,
          reviewMessage: testimonial.reviewMessage,
          rating: testimonial.rating,
          createdAt: testimonial.created_at
        }
      });

    } catch (error: any) {
      console.error('Testimonial creation error:', error);
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({
          success: false,
          message: 'You have already submitted a testimonial for this subscription. Each subscription can only have one testimonial.'
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getApprovedTestimonials(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const rating = req.query.rating as string;
      const offset = (page - 1) * limit;

      const whereClause: any = { isApproved: true };
      if (rating && ['1', '2', '3', '4', '5'].includes(rating)) {
        whereClause.rating = parseInt(rating);
      }

      const { count, rows: testimonials } = await Testimonial.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          as: 'user',
          attributes: ['full_name']
        }]
      });

      res.json({
        success: true,
        data: {
          testimonials,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
          }
        }
      });

    } catch (error) {
      console.error('Get testimonials error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getPendingTestimonials(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;

      const { count, rows: testimonials } = await Testimonial.findAndCountAll({
        where: { isApproved: false },
        limit,
        offset,
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          as: 'user',
          attributes: ['full_name']
        }]
      });

      res.json({
        success: true,
        data: {
          testimonials,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
          }
        }
      });

    } catch (error) {
      console.error('Get pending testimonials error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getTestimonialById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const testimonial = await Testimonial.findByPk(id);
      
      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found'
        });
        return;
      }

      res.json({
        success: true,
        data: testimonial
      });

    } catch (error) {
      console.error('Get testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async approveTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const testimonial = await Testimonial.findByPk(id);
      
      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found'
        });
        return;
      }

      if (testimonial.isApproved) {
        res.status(400).json({
          success: false,
          message: 'Testimonial is already approved'
        });
        return;
      }

      testimonial.isApproved = true;
      await testimonial.save();

      res.json({
        success: true,
        message: 'Testimonial approved successfully',
        data: testimonial
      });

    } catch (error) {
      console.error('Approve testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async rejectTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const testimonial = await Testimonial.findByPk(id);
      
      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found'
        });
        return;
      }

      testimonial.isApproved = false;
      await testimonial.save();

      res.json({
        success: true,
        message: 'Testimonial rejected successfully',
        data: testimonial
      });

    } catch (error) {
      console.error('Reject testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async deleteTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const testimonial = await Testimonial.findByPk(id);
      
      if (!testimonial) {
        res.status(404).json({
          success: false,
          message: 'Testimonial not found'
        });
        return;
      }

      await testimonial.destroy();

      res.json({
        success: true,
        message: 'Testimonial deleted successfully'
      });

    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getTestimonialBySubscription(req: Request, res: Response): Promise<void> {
    try {
      const { subscriptionId } = req.params;
      
      const testimonial = await Testimonial.findOne({
        where: { 
          subscriptionId: parseInt(subscriptionId),
          isApproved: true
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['full_name']
        }]
      });

      res.json({
        success: true,
        data: testimonial
      });

    } catch (error) {
      console.error('Get testimonial by subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserTestimonialForSubscription(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { subscriptionId } = req.params;
      const userId = req.user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }
      
      const testimonial = await Testimonial.findOne({
        where: {
          userId,
          subscriptionId: parseInt(subscriptionId)
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['full_name']
        }]
      });

      res.json({
        success: true,
        data: testimonial
      });

    } catch (error) {
      console.error('Get user testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getTestimonialCountByPlan(req: Request, res: Response): Promise<void> {
    try {
      const { planId } = req.params;

      const { Subscription } = require('../models');
      const { MealPlan } = require('../models');

      const count = await Testimonial.count({
        where: { isApproved: true },
        include: [{
          model: Subscription,
          as: 'subscription',
          required: true,
          where: { selected_plan: planId },
          include: [{
            model: MealPlan,
            as: 'mealPlan',
            required: true
          }]
        }]
      });

      res.json({
        success: true,
        data: {
          count,
          planId
        }
      });

    } catch (error) {
      console.error('Get testimonial count by plan error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 