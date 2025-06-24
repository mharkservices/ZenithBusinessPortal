import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PrismaClient } from '@prisma/client';


// Import routes (we'll create these next)
import filingRoutes from './routes/filing.routes.js';
import serviceRoutes from './routes/service.routes.js';
import authRoutes from './routes/auth.routes.js';

// Load environment variables
dotenv.config({path: './src/config/.env'});

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Routes
app.use('/api/filings', filingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Handle graceful shutdown
// process.on('SIGTERM', async () => {
//   console.log('SIGTERM received. Closing HTTP server and Prisma Client...');
//   await prisma.$disconnect();
//   process.exit(0);
// }); 

// Export the app for server.js
export default app; 