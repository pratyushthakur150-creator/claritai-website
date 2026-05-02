import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendContactNotification } from '../lib/email';

export const demoRouter = Router();

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone is required').max(20),
  institute: z.string().max(200).optional(),
  product: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

demoRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = schema.parse(req.body);

    const demo = await prisma.demoRequest.create({ data });

    // Reuse contact notification for demo requests
    sendContactNotification({
      ...data,
      interest: data.product,
      message: `[DEMO REQUEST] ${data.notes || 'No notes'}`,
    }).catch(console.error);

    res.status(201).json({ message: 'Demo request submitted', id: demo.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }
    console.error('Demo request error:', err);
    res.status(500).json({ message: 'Failed to submit demo request' });
  }
});
