import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TestimonialAttributes {
  id: number;
  userId: number;
  subscriptionId?: number;
  reviewMessage: string;
  rating: number;
  isApproved: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface TestimonialCreationAttributes extends Optional<TestimonialAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
  public id!: number;
  public userId!: number;
  public subscriptionId?: number;
  public reviewMessage!: string;
  public rating!: number;
  public isApproved!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'subscription_id',
      references: {
        model: 'subscriptions',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    reviewMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'review_message',
      validate: {
        notEmpty: true,
        len: [10, 1000]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_approved'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: false,
    indexes: [
      {
        fields: ['is_approved']
      },
      {
        fields: ['rating']
      },
      {
        fields: ['created_at']
      }
    ]
  }
);

export default Testimonial; 