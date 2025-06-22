import sequelize from '../config/database';
import Subscription from './Subscription';
import MealPlan from './MealPlan';
import Testimonial from './Testimonial';
import User from './User';

User.hasMany(Subscription, {
  foreignKey: 'user_id',
  as: 'subscriptions'
});

Subscription.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Subscription.belongsTo(MealPlan, {
  foreignKey: 'plan_id',
  as: 'mealPlan'
});

MealPlan.hasMany(Subscription, {
  foreignKey: 'plan_id',
  as: 'subscriptions'
});

export const initializeModels = async (): Promise<void> => {
  try {
    console.log('Database models associations initialized successfully.');
  } catch (error) {
    console.error('Error initializing database models:', error);
    throw error;
  }
};

export {
  sequelize,
  User,
  Subscription,
  MealPlan,
  Testimonial
};

export default {
  sequelize,
  User,
  Subscription,
  MealPlan,
  Testimonial,
  initializeModels
}; 