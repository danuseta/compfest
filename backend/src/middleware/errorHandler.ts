import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  if (error instanceof ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    const validationErrors = error.errors.map(err => ({
      field: err.path,
      message: err.message
    }));
    
    res.status(statusCode).json({
      success: false,
      message,
      errors: validationErrors
    });
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', {
      message: error.message,
      stack: error.stack,
      statusCode,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const createError = (message: string, statusCode = 500): ApiError => {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
}; 