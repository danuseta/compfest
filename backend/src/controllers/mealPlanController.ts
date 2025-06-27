import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import MealPlan from '../models/MealPlan';
import Menu from '../models/Menu';
import { sanitizeHtml } from '../middleware/validation';

export class MealPlanController {
  
  static async createMealPlan(req: Request, res: Response): Promise<void> {
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

      const { planId, name, price, description, features, imageUrl } = req.body;

      const existingPlan = await MealPlan.findOne({ where: { planId } });
      if (existingPlan) {
        res.status(409).json({
          success: false,
          message: 'Meal plan with this ID already exists'
        });
        return;
      }

      const mealPlan = await MealPlan.create({
        planId,
        name,
        price,
        description,
        features: features || [],
        imageUrl: imageUrl || undefined,
        isActive: true
      });

      res.status(201).json({
        success: true,
        message: 'Meal plan created successfully',
        data: mealPlan
      });

    } catch (error) {
      console.error('Meal plan creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMealPlans(req: Request, res: Response): Promise<void> {
    try {
      console.log('Getting meal plans...');
      const { active } = req.query;
      console.log('Active filter:', active);
      
      const whereClause: any = {};
      if (active === 'true') {
        whereClause.isActive = true;
      }

      const mealPlans = await MealPlan.findAll({
        where: whereClause,
        include: [
          {
            model: Menu,
            as: 'menus',
            where: { isAvailable: true },
            required: false
          }
        ]
      });

      const sanitizedMealPlans = mealPlans.map(plan => ({
        id: plan.id,
        planId: plan.planId,
        name: plan.name || '',
        price: plan.price,
        description: plan.description || '',
        features: Array.isArray(plan.features) ? plan.features : [],
        imageUrl: plan.imageUrl,
        isActive: plan.isActive,
        menus: (plan as any).menus || []
      }));


      res.json({
        success: true,
        data: sanitizedMealPlans
      });

    } catch (error) {
      console.error('Error fetching meal plans:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMealPlanById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const mealPlan = await MealPlan.findOne({
        where: { planId: id },
        include: [
          {
            model: Menu,
            as: 'menus',
            where: { isAvailable: true },
            required: false
          }
        ]
      });
      
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      const sanitizedMealPlan = {
        id: mealPlan.id,
        planId: mealPlan.planId,
        name: sanitizeHtml(mealPlan.name) || '',
        price: mealPlan.price,
        description: sanitizeHtml(mealPlan.description) || '',
        features: Array.isArray(mealPlan.features) ? mealPlan.features : [],
        imageUrl: mealPlan.imageUrl,
        isActive: mealPlan.isActive,
        menus: (mealPlan as any).menus || []
      };

      res.json({
        success: true,
        data: sanitizedMealPlan
      });

    } catch (error) {
      console.error('Error fetching meal plan:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateMealPlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, price, description, features, imageUrl, isActive } = req.body;
      
      const mealPlan = await MealPlan.findByPk(id);
      
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      if (price !== undefined && price <= 0) {
        res.status(400).json({
          success: false,
          message: 'Price must be greater than 0'
        });
        return;
      }

      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = price;
      if (description !== undefined) updateData.description = description;
      if (features !== undefined) updateData.features = features;
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
      if (isActive !== undefined) updateData.isActive = isActive;

      await mealPlan.update(updateData);

      res.json({
        success: true,
        message: 'Meal plan updated successfully',
        data: mealPlan
      });

    } catch (error) {
      console.error('Update meal plan error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async deleteMealPlan(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const mealPlan = await MealPlan.findByPk(id);
      
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      await mealPlan.destroy();

      res.json({
        success: true,
        message: 'Meal plan deleted successfully'
      });

    } catch (error) {
      console.error('Delete meal plan error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMealPlansWithMenus(req: Request, res: Response): Promise<void> {
    try {
      const { active } = req.query;
      
      const whereClause: any = {};
      if (active === 'true') {
        whereClause.isActive = true;
      }

      const mealPlans = await MealPlan.findAll({
        where: whereClause,
        include: [
          {
            model: Menu,
            as: 'menus',
            required: false
          }
        ],
        order: [['created_at', 'ASC']]
      });

      const sanitizedMealPlans = mealPlans.map(plan => ({
        id: plan.id,
        planId: plan.planId,
        name: plan.name || '',
        price: plan.price,
        description: plan.description || '',
        features: Array.isArray(plan.features) ? plan.features : [],
        imageUrl: plan.imageUrl,
        isActive: plan.isActive,
        menus: (plan as any).menus || []
      }));

      res.json({
        success: true,
        data: sanitizedMealPlans
      });

    } catch (error) {
      console.error('Error fetching meal plans with menus:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 