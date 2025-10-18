import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import sequelize from './config/database';
import { specs } from './config/swagger';
import authRoutes from './routes/auth';
import horoscopeRoutes from './routes/horoscope';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Request logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
});


// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Horoscope API Documentation'
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/horoscope', horoscopeRoutes);


app.get('/health', (req, res) => res.json({ 
  status: 'OK', 
  timestamp: new Date().toISOString(),
  uptime: process.uptime()
}));


app.get('/', (req, res) => res.json({
  message: 'Personalized Horoscope API',
  version: '1.0.0',
  documentation: '/api-docs',
  endpoints: { auth: '/api/auth', horoscope: '/api/horoscope', health: '/health' }
}));


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


// 404 handler
app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));


// Database connection and server startup
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync({ force: false });
    console.log('Database models synchronized.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}


// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\nShutting down server...');
  await sequelize.close();
  process.exit(0);
};


process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown); 


startServer();
