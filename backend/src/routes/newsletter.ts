import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

export const newsletterRouter = Router();

const schema = z.object({
  email: z.string().email('Invalid email'),
});

newsletterRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = schema.parse(req.body);

    const existing = await prisma.newsletterSubscription.findUnique({ where: { email } });
    if (existing) {
      res.json({ message: 'Already subscribed!' });
      return;
    }

    await prisma.newsletterSubscription.create({ data: { email } });
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }
    console.error('Newsletter error:', err);
    res.status(500).json({ message: 'Subscription failed' });
  }
});
