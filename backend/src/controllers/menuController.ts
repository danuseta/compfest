import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Menu from '../models/Menu';
import MealPlan from '../models/MealPlan';

export class MenuController {
  
  static async createMenu(req: Request, res: Response): Promise<void> {
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

      const { mealPlanId, name, description, ingredients, nutritionalInfo, imageUrl, isAvailable } = req.body;

      const mealPlan = await MealPlan.findByPk(mealPlanId);
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      const menu = await Menu.create({
        mealPlanId,
        name,
        description,
        ingredients,
        nutritionalInfo,
        imageUrl,
        isAvailable: isAvailable !== undefined ? isAvailable : true
      });

      res.status(201).json({
        success: true,
        message: 'Menu created successfully',
        data: menu
      });

    } catch (error) {
      console.error('Menu creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMenus(req: Request, res: Response): Promise<void> {
    try {
      const { available, mealPlanId } = req.query;
      
      const whereClause: any = {};
      if (available === 'true') {
        whereClause.isAvailable = true;
      }
      if (mealPlanId) {
        whereClause.mealPlanId = mealPlanId;
      }

      const menus = await Menu.findAll({
        where: whereClause,
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'name', 'planId', 'price']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        data: menus
      });

    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMenuById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const menu = await Menu.findByPk(id, {
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'name', 'planId', 'price', 'description', 'features']
          }
        ]
      });
      
      if (!menu) {
        res.status(404).json({
          success: false,
          message: 'Menu not found'
        });
        return;
      }

      res.json({
        success: true,
        data: menu
      });

    } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { mealPlanId, name, description, ingredients, nutritionalInfo, imageUrl, isAvailable } = req.body;
      
      const menu = await Menu.findByPk(id);
      
      if (!menu) {
        res.status(404).json({
          success: false,
          message: 'Menu not found'
        });
        return;
      }

      if (mealPlanId) {
        const mealPlan = await MealPlan.findByPk(mealPlanId);
        if (!mealPlan) {
          res.status(404).json({
            success: false,
            message: 'Meal plan not found'
          });
          return;
        }
      }

      const updateData: any = {};
      if (mealPlanId !== undefined) updateData.mealPlanId = mealPlanId;
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (ingredients !== undefined) updateData.ingredients = ingredients;
      if (nutritionalInfo !== undefined) updateData.nutritionalInfo = nutritionalInfo;
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
      if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

      await menu.update(updateData);

      const updatedMenu = await Menu.findByPk(id, {
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['id', 'name', 'planId', 'price']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Menu updated successfully',
        data: updatedMenu
      });

    } catch (error) {
      console.error('Update menu error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async deleteMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const menu = await Menu.findByPk(id);
      
      if (!menu) {
        res.status(404).json({
          success: false,
          message: 'Menu not found'
        });
        return;
      }

      await menu.destroy();

      res.json({
        success: true,
        message: 'Menu deleted successfully'
      });

    } catch (error) {
      console.error('Delete menu error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 