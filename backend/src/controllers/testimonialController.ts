import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Testimonial from '../models/Testimonial';
import { CreateTestimonialRequest } from '../types';

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

      const { name, message, rating, plan, location }: CreateTestimonialRequest = req.body;

      const testimonial = await Testimonial.create({
        customerName: name,
        reviewMessage: message,
        rating,
        plan: plan || undefined,
        location: location || undefined,
        isApproved: false
      });

      res.status(201).json({
        success: true,
        message: 'Testimonial submitted successfully. It will be reviewed before being published.',
        data: {
          id: testimonial.id,
          customerName: testimonial.customerName,
          reviewMessage: testimonial.reviewMessage,
          rating: testimonial.rating,
          plan: testimonial.plan,
          location: testimonial.location,
          createdAt: testimonial.createdAt
        }
      });

    } catch (error) {
      console.error('Testimonial creation error:', error);
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
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'customerName', 'reviewMessage', 'rating', 'plan', 'location', 'createdAt']
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
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: testimonials } = await Testimonial.findAndCountAll({
        where: { isApproved: false },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
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
} 