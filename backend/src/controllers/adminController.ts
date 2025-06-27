import { Request, Response } from 'express';
import { Op, literal } from 'sequelize';
import Subscription from '../models/Subscription';
import MealPlan from '../models/MealPlan';
import { User } from '../models';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    full_name: string;
  };
}

export class AdminController {
  static async getMetrics(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { startDate, endDate } = req.query;
      const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const end = endDate ? new Date(endDate as string) : new Date();

      const previousStart = new Date(start.getTime() - (end.getTime() - start.getTime()));
      const previousEnd = start;

      const newSubscriptions = await Subscription.count({
        where: {
          [Op.and]: [
            literal(`created_at BETWEEN '${start.toISOString().slice(0, 19).replace('T', ' ')}' AND '${end.toISOString().slice(0, 19).replace('T', ' ')}'`)
          ]
        }
      });

      const activeSubscriptions = await Subscription.findAll({
        where: {
          status: 'active'
        },
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['price']
          }
        ]
      });

      const monthlyRecurringRevenue = activeSubscriptions.reduce((total, sub) => {
        return total + parseFloat(sub.totalPrice.toString());
      }, 0);

      const totalActiveSubscriptions = activeSubscriptions.length;

      const totalRevenue = await Subscription.sum('total_price', {
        where: {
          [Op.and]: [
            literal(`created_at BETWEEN '${start.toISOString().slice(0, 19).replace('T', ' ')}' AND '${end.toISOString().slice(0, 19).replace('T', ' ')}'`),
            {
          status: {
            [Op.in]: ['active', 'confirmed', 'paused']
          }
            }
          ]
        }
      }) || 0;

      const totalSubscriptionsInPeriod = await Subscription.count({
        where: {
          [Op.and]: [
            literal(`created_at BETWEEN '${start.toISOString().slice(0, 19).replace('T', ' ')}' AND '${end.toISOString().slice(0, 19).replace('T', ' ')}'`)
          ]
        }
      });

      const averageOrderValue = totalSubscriptionsInPeriod > 0 ? totalRevenue / totalSubscriptionsInPeriod : 0;

      const previousPeriodSubscriptions = await Subscription.count({
        where: {
          [Op.and]: [
            literal(`created_at BETWEEN '${previousStart.toISOString().slice(0, 19).replace('T', ' ')}' AND '${previousEnd.toISOString().slice(0, 19).replace('T', ' ')}'`)
          ]
        }
      });

      const subscriptionGrowth = previousPeriodSubscriptions > 0 
        ? ((newSubscriptions - previousPeriodSubscriptions) / previousPeriodSubscriptions) * 100 
        : 0;

      const reactivations = await Subscription.count({
        where: {
          [Op.and]: [
            { status: 'active' },
            literal(`updated_at BETWEEN '${start.toISOString().slice(0, 19).replace('T', ' ')}' AND '${end.toISOString().slice(0, 19).replace('T', ' ')}'`),
            literal(`created_at < '${start.toISOString().slice(0, 19).replace('T', ' ')}'`)
          ]
        }
      });

      const totalUsers = await User.count();
      const totalSubscribedUsers = await Subscription.count({
        distinct: true,
        col: 'user_id'
      });

      const conversionRate = totalUsers > 0 ? (totalSubscribedUsers / totalUsers) * 100 : 0;

      const metrics = {
        newSubscriptions,
        monthlyRecurringRevenue,
        reactivations,
        subscriptionGrowth: Math.round(subscriptionGrowth * 100) / 100,
        totalActiveSubscriptions,
        totalRevenue,
        averageOrderValue: Math.round(averageOrderValue),
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalUsers,
        totalSubscribedUsers
      };

      res.json({
        success: true,
        data: metrics
      });

    } catch (error) {
      console.error('Get admin metrics error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getRecentSubscriptions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const limit = parseInt(req.query.limit as string) || 10;

      const subscriptions = await Subscription.findAll({
        limit,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'selectedPlan', 'selectedMealTypes', 'selectedDeliveryDays', 'allergies', 'totalPrice', 'status', 'pauseStartDate', 'pauseEndDate', 'created_at'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['full_name', 'email']
          },
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['name', 'price']
          }
        ]
      });

      res.json({
        success: true,
        data: subscriptions
      });

    } catch (error) {
      console.error('Get recent subscriptions error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getPendingSubscriptions(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const subscriptions = await Subscription.findAll({
        where: {
          status: 'pending'
        },
        order: [['created_at', 'DESC']],
        attributes: ['id', 'selectedPlan', 'selectedMealTypes', 'selectedDeliveryDays', 'allergies', 'totalPrice', 'status', 'pauseStartDate', 'pauseEndDate', 'created_at'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['full_name', 'email']
          },
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['name', 'price']
          }
        ]
      });

      res.json({
        success: true,
        data: subscriptions
      });

    } catch (error) {
      console.error('Get pending subscriptions error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateSubscriptionStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'active', 'paused', 'cancelled'].includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Invalid status value'
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

      await subscription.update({ status });

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

  static async createMealPlan(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { planId, name, price, description, features, imageUrl, isActive } = req.body;

      const existingPlan = await MealPlan.findOne({ where: { planId } });
      if (existingPlan) {
        res.status(400).json({
          success: false,
          message: 'Plan ID already exists'
        });
        return;
      }

      const mealPlan = await MealPlan.create({
        planId,
        name,
        price,
        description,
        features,
        imageUrl,
        isActive: isActive !== undefined ? isActive : true
      });

      res.status(201).json({
        success: true,
        message: 'Meal plan created successfully',
        data: mealPlan
      });

    } catch (error) {
      console.error('Create meal plan error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateMealPlan(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { id } = req.params;
      const { planId, name, price, description, features, imageUrl, isActive } = req.body;

      const mealPlan = await MealPlan.findByPk(id);
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      if (planId && planId !== mealPlan.planId) {
        const existingPlan = await MealPlan.findOne({ where: { planId } });
        if (existingPlan) {
          res.status(400).json({
            success: false,
            message: 'Plan ID already exists'
          });
          return;
        }
      }

      await mealPlan.update({
        planId: planId || mealPlan.planId,
        name: name || mealPlan.name,
        price: price !== undefined ? price : mealPlan.price,
        description: description || mealPlan.description,
        features: features || mealPlan.features,
        imageUrl: imageUrl !== undefined ? imageUrl : mealPlan.imageUrl,
        isActive: isActive !== undefined ? isActive : mealPlan.isActive
      });

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

  static async deleteMealPlan(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { id } = req.params;

      const mealPlan = await MealPlan.findByPk(id);
      if (!mealPlan) {
        res.status(404).json({
          success: false,
          message: 'Meal plan not found'
        });
        return;
      }

      const activeSubscriptions = await Subscription.count({
        where: {
          planId: mealPlan.id,
          status: ['active', 'pending', 'paused']
        }
      });

      if (activeSubscriptions > 0) {
        res.status(400).json({
          success: false,
          message: 'Cannot delete meal plan with active subscriptions. Please deactivate instead.'
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

  static async getAllUsers(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: users } = await User.findAndCountAll({
        attributes: ['id', 'full_name', 'email', 'phone', 'role', 'is_active', 'created_at'],
        limit,
        offset,
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
          }
        }
      });

    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateUserStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const { id } = req.params;
      const { is_active, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      const updateData: any = {};
      if (typeof is_active === 'boolean') {
        updateData.is_active = is_active;
      }
      if (role && ['user', 'admin'].includes(role)) {
        updateData.role = role;
      }

      await user.update(updateData);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      });

    } catch (error) {
      console.error('Update user status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getMonthlyRevenue(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const now = new Date();
      const monthlyData = [];

      for (let i = 5; i >= 0; i--) {
        const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        const monthEnd = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

        console.log(`Checking revenue for ${monthStart.toISOString()} to ${monthEnd.toISOString()}`);

        const revenue = await Subscription.sum('total_price', {
          where: {
            [Op.and]: [
              literal(`created_at BETWEEN '${monthStart.toISOString().slice(0, 19).replace('T', ' ')}' AND '${monthEnd.toISOString().slice(0, 19).replace('T', ' ')}'`),
              {
                status: {
                  [Op.in]: ['active', 'confirmed', 'paused']
                }
              }
            ]
          }
        }) || 0;

        console.log(`Revenue for ${monthStart.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}: ${revenue}`);

        monthlyData.push({
          month: monthStart.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          revenue: parseFloat(revenue.toString())
        });
      }

      console.log('Final monthly revenue data:', monthlyData);

      res.json({
        success: true,
        data: monthlyData
      });

    } catch (error) {
      console.error('Get monthly revenue error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getSubscriptionStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (req.user?.role !== 'admin') {
        res.status(403).json({
          success: false,
          message: 'Access denied. Admin only.'
        });
        return;
      }

      const subscriptionStats = await Subscription.findAll({
        attributes: [
          'status',
          [Subscription.sequelize!.fn('COUNT', Subscription.sequelize!.col('id')), 'count'],
          [Subscription.sequelize!.fn('SUM', Subscription.sequelize!.col('total_price')), 'totalRevenue']
        ],
        group: ['status'],
        raw: true
      });

      const planStats = await Subscription.findAll({
        attributes: [
          'selectedPlan',
          [Subscription.sequelize!.fn('COUNT', Subscription.sequelize!.col('id')), 'count'],
          [Subscription.sequelize!.fn('SUM', Subscription.sequelize!.col('total_price')), 'totalRevenue']
        ],
        group: ['selectedPlan'],
        include: [
          {
            model: MealPlan,
            as: 'mealPlan',
            attributes: ['name', 'price']
          }
        ],
        raw: true
      });

      res.json({
        success: true,
        data: {
          subscriptionStats,
          planStats
        }
      });

    } catch (error) {
      console.error('Get subscription stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
} 