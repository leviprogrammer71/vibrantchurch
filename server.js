// Simple Express API server for Vibrant Church
// Handles contact form submissions + Resend email notifications
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.API_PORT || 3001;

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vibrantchurch113@gmail.com';

app.use(cors({ origin: true }));
app.use(express.json());

// ─── POST /api/contact ──────────────────────────────────────
// Receives contact form data, sends notification email via Resend
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Send notification email to admin via Resend
    const { data, error } = await resend.emails.send({
      from: 'Vibrant Church Website <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a365d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0; opacity: 0.9;">Vibrant Church Website</p>
          </div>
          <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #2d3748;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2b6cb0;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2b6cb0;">${phone}</a></td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Subject:</td>
                <td style="padding: 8px 0; color: #2d3748;">${subject}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="color: #4a5568; margin-bottom: 8px;">Message:</h3>
            <div style="background: #f7fafc; padding: 16px; border-radius: 6px; color: #2d3748; white-space: pre-wrap; line-height: 1.6;">${message}</div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="color: #718096; font-size: 12px; margin: 0;">
              You can view and manage all contact messages in the
              <a href="http://localhost:8080/admin" style="color: #2b6cb0;">Admin Panel</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      // Still return success — the message was received even if email fails
      return res.json({
        success: true,
        emailSent: false,
        emailError: error.message,
      });
    }

    console.log(`Email sent to ${ADMIN_EMAIL}, Resend ID: ${data?.id}`);
    return res.json({ success: true, emailSent: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✓ Vibrant Church API running on http://localhost:${PORT}`);
});
