import sequelize from '../config/database';
import Subscription from './Subscription';
import MealPlan from './MealPlan';
import Testimonial from './Testimonial';

Subscription.belongsTo(MealPlan, {
  foreignKey: 'planId',
  as: 'mealPlan'
});

MealPlan.hasMany(Subscription, {
  foreignKey: 'planId',
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
  Subscription,
  MealPlan,
  Testimonial
};

export default {
  sequelize,
  Subscription,
  MealPlan,
  Testimonial,
  initializeModels
}; 