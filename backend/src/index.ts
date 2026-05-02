import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { contactRouter } from './routes/contact';
import { authRouter } from './routes/auth';
import { newsletterRouter } from './routes/newsletter';
import { demoRouter } from './routes/demo';
import { adminRouter } from './routes/admin';
import chatRouter from './routes/chat';

const app = express();
const PORT = process.env.PORT || 4000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/demo', demoRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 ClaritAI Backend running on port ${PORT}`);
});

export default app;
