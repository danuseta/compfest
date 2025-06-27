import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MenuAttributes {
  id: number;
  mealPlanId: number;
  name: string;
  description?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  imageUrl?: string;
  isAvailable: boolean;
  created_at?: Date;
  updatedAt?: Date;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, 'id' | 'created_at' | 'updatedAt'> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  public id!: number;
  public mealPlanId!: number;
  public name!: string;
  public description?: string;
  public ingredients?: string[];
  public nutritionalInfo?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
  };
  public imageUrl?: string;
  public isAvailable!: boolean;
  public readonly created_at!: Date;
  public readonly updatedAt!: Date;
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mealPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'meal_plan_id',
      references: {
        model: 'meal_plans',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    nutritionalInfo: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'nutritional_info'
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_url'
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_available'
    }
  },
  {
    sequelize,
    modelName: 'Menu',
    tableName: 'menus',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['meal_plan_id']
      },
      {
        fields: ['is_available']
      }
    ]
  }
);

export default Menu; 