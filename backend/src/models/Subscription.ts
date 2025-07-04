import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SubscriptionAttributes {
  id: number;
  userId?: number;
  planId: number;
  selectedPlan: string;
  selectedMealTypes: string[];
  selectedDeliveryDays: string[];
  allergies?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'paused' | 'cancelled';
  pauseStartDate?: Date;
  pauseEndDate?: Date;
  created_at?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, 'id' | 'userId' | 'created_at' | 'updatedAt'> {}

class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
  public id!: number;
  public userId?: number;
  public planId!: number;
  public selectedPlan!: string;
  public selectedMealTypes!: string[];
  public selectedDeliveryDays!: string[];
  public allergies?: string;
  public totalPrice!: number;
  public status!: 'pending' | 'confirmed' | 'active' | 'paused' | 'cancelled';
  public pauseStartDate?: Date;
  public pauseEndDate?: Date;
  public readonly created_at!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id'
    },

    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'plan_id'
    },
    selectedPlan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'selected_plan',
      validate: {
        isIn: [['diet', 'protein', 'royal']]
      }
    },
    selectedMealTypes: {
      type: DataTypes.JSON,
      allowNull: false,
      field: 'selected_meal_types',
      validate: {
        notEmpty: true
      }
    },
    selectedDeliveryDays: {
      type: DataTypes.JSON,
      allowNull: false,
      field: 'selected_delivery_days',
      validate: {
        notEmpty: true
      }
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'total_price',
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'active', 'paused', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    },
    pauseStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'pause_start_date'
    },
    pauseEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'pause_end_date'
    }
  },
  {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: true,
          createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['user_id']
      },

      {
        fields: ['status']
      },
      {
        fields: ['created_at']
      },

    ]
  }
);

export default Subscription; 