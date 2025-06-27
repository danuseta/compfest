import sequelize from '../config/database';
import Subscription from './Subscription';
import MealPlan from './MealPlan';
import Testimonial from './Testimonial';
import User from './User';
import Menu from './Menu';

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

MealPlan.hasMany(Menu, {
  foreignKey: 'meal_plan_id',
  as: 'menus'
});

Menu.belongsTo(MealPlan, {
  foreignKey: 'meal_plan_id',
  as: 'mealPlan'
});

User.hasMany(Testimonial, {
  foreignKey: 'user_id',
  as: 'testimonials'
});

Testimonial.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Subscription.hasOne(Testimonial, {
  foreignKey: 'subscription_id',
  as: 'testimonial'
});

Testimonial.belongsTo(Subscription, {
  foreignKey: 'subscription_id',
  as: 'subscription'
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
  Testimonial,
  Menu
};

export default {
  sequelize,
  User,
  Subscription,
  MealPlan,
  Testimonial,
  Menu,
  initializeModels
}; 