import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendContactNotification } from '../lib/email';

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone is required').max(20),
  institute: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  interest: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).optional(),
});

contactRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = contactSchema.parse(req.body);

    const submission = await prisma.contactSubmission.create({ data });

    // Send email notification (non-blocking)
    sendContactNotification(data).catch(console.error);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: submission.id,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});
