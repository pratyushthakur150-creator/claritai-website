import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 's.pratyush@iitg.ac.in';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function sendContactNotification(data: {
  name: string; email: string; phone: string; institute?: string; city?: string; interest?: string; message?: string;
}) {
  if (!resend) { console.log('[Email] Resend not configured, skipping notification'); return; }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🔔 New ClaritAI Lead: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            ${data.institute ? `<tr><td style="padding: 8px 0; color: #666;">Institute</td><td style="padding: 8px 0;">${data.institute}</td></tr>` : ''}
            ${data.city ? `<tr><td style="padding: 8px 0; color: #666;">City</td><td style="padding: 8px 0;">${data.city}</td></tr>` : ''}
            ${data.interest ? `<tr><td style="padding: 8px 0; color: #666;">Interest</td><td style="padding: 8px 0;">${data.interest}</td></tr>` : ''}
          </table>
          ${data.message ? `<div style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 8px;"><strong>Message:</strong><br/>${data.message}</div>` : ''}
          <p style="color: #999; font-size: 12px; margin-top: 20px;">Sent from ClaritAI website contact form</p>
        </div>
      `,
    });
    console.log(`[Email] Notification sent for lead: ${data.email}`);
  } catch (err) {
    console.error('[Email] Failed to send notification:', err);
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  if (!resend) { console.log('[Email] Resend not configured, skipping welcome email'); return; }
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Welcome to ClaritAI, ${name}! 🚀`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563EB;">Welcome to ClaritAI!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for creating your ClaritAI account. We're excited to help you transform your coaching institute's lead conversion.</p>
          <p>Here's what you can do next:</p>
          <ul>
            <li>📅 <a href="https://calendly.com/pratyushthakur150/30min">Schedule a free demo</a></li>
            <li>💬 <a href="https://wa.me/918953960991">Chat with us on WhatsApp</a></li>
            <li>📧 Reply to this email with any questions</li>
          </ul>
          <p>Best regards,<br/>Pratyush Thakur<br/>Founder, ClaritAI</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send welcome email:', err);
  }
}
