import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database';
import authRoutes from './src/routes/auth';
import subscriptionRoutes from './src/routes/subscription';
import testimonialRoutes from './src/routes/testimonials';
import mealPlanRoutes from './src/routes/mealPlans';
import { errorHandler } from './src/middleware/errorHandler';
import { requestLogger } from './src/middleware/requestLogger';
import { 
  generalRateLimit, 
  securityHeaders, 
  preventXSS, 
  preventSQLInjection 
} from './src/middleware/security';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: process.env.NODE_ENV === 'production'
}));

app.use(securityHeaders);
app.use(generalRateLimit);
app.use(preventXSS);
app.use(preventSQLInjection);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'sea-catering-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SEA Catering Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    security: {
      helmet: 'enabled',
      rateLimit: 'enabled',
      xssProtection: 'enabled',
      sqlInjectionProtection: 'enabled'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SEA Catering API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      subscriptions: '/api/subscriptions',
      testimonials: '/api/testimonials',
      mealPlans: '/api/meal-plans'
    },
    security: {
      authentication: 'JWT Bearer Token',
      rateLimit: 'enabled',
      inputValidation: 'enabled',
      xssProtection: 'enabled',
      sqlInjectionProtection: 'enabled'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Database: ${process.env.DB_NAME || 'sea_catering'}@${process.env.DB_HOST || 'localhost'}`);
      console.log(`Security: Helmet, Rate Limiting, XSS Protection, SQL Injection Protection enabled`);
      console.log(`JWT Authentication enabled`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
