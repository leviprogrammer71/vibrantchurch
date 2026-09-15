import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vibrantchurch113@gmail.com';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await resend.emails.send({
      from: 'Vibrant Church Website <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #d4a843; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="padding: 20px 0;">
            <h3 style="color: #2d3748;">Message:</h3>
            <p style="color: #4a5568; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: 1px solid #e2e8f0;" />
          <p style="color: #a0aec0; font-size: 12px;">
            This message was sent from the Vibrant Church website contact form.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email notification' });
  }
}
