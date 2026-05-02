import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, adminMiddleware } from '../lib/auth';

export const adminRouter = Router();

// All admin routes require auth + admin role
adminRouter.use(authMiddleware, adminMiddleware);

// Get all contact submissions
adminRouter.get('/submissions', async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactSubmission.count(),
    ]);

    res.json({ submissions, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Admin submissions error:', err);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
});

// Get all demo requests
adminRouter.get('/demos', async (req: Request, res: Response): Promise<void> => {
  try {
    const demos = await prisma.demoRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    res.json({ demos });
  } catch (err) {
    console.error('Admin demos error:', err);
    res.status(500).json({ message: 'Failed to fetch demo requests' });
  }
});

// Get all users
adminRouter.get('/users', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, institute: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ users });
  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get dashboard stats
adminRouter.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  try {
    const [contacts, demos, users, newsletters] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.demoRequest.count(),
      prisma.user.count(),
      prisma.newsletterSubscription.count(),
    ]);
    res.json({ contacts, demos, users, newsletters });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});
