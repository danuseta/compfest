import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TestimonialAttributes {
  id: number;
  customerName: string;
  reviewMessage: string;
  rating: number;
  plan?: string;
  location?: string;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TestimonialCreationAttributes extends Optional<TestimonialAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
  public id!: number;
  public customerName!: string;
  public reviewMessage!: string;
  public rating!: number;
  public plan?: string;
  public location?: string;
  public isApproved!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'customer_name',
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
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
    plan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_approved'
    }
  },
  {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: true,
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