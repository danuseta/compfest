import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MealPlanAttributes {
  id: number;
  planId: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MealPlanCreationAttributes extends Optional<MealPlanAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class MealPlan extends Model<MealPlanAttributes, MealPlanCreationAttributes> implements MealPlanAttributes {
  public id!: number;
  public planId!: string;
  public name!: string;
  public price!: number;
  public description!: string;
  public features!: string[];
  public imageUrl?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MealPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    planId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'plan_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_url'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    }
  },
  {
    sequelize,
    modelName: 'MealPlan',
    tableName: 'meal_plans',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['plan_id'],
        unique: true
      },
      {
        fields: ['is_active']
      }
    ]
  }
);

export default MealPlan; 