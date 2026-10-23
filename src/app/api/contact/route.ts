import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const MAX = { name: 100, email: 254, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Resend is constructed per request so the build does not require RESEND_API_KEY
// (page-data collection imports this module at build time).
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  const resend = getResend();
  if (!resend) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Contact form is not configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
    !name.trim() || !email.trim() || !message.trim() ||
    name.length > MAX.name || email.length > MAX.email || message.length > MAX.message ||
    !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ error: 'Name, a valid email, and a message are required' }, { status: 400 });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim());

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend verified domain
      to: ['mitthoma@gmail.com'],
      replyTo: email.trim(),
      subject: `Portfolio Contact from ${name.trim().slice(0, 80)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #70e6ff; border-bottom: 2px solid #70e6ff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
