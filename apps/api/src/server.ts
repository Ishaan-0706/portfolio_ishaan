import 'dotenv/config';
import { Resend } from 'resend';
import { createApp } from './app.js';
const app = createApp(async ({ name, email, message }) => {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM || !process.env.CONTACT_TO) throw new Error('Email not configured');
  const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.CONTACT_FROM, to: process.env.CONTACT_TO, replyTo: email,
    subject: `Portfolio inquiry from ${name.replace(/[\r\n]/g, ' ')}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  if (result.error) throw new Error('Delivery failed');
}, process.env.FRONTEND_ORIGIN);
app.listen(Number(process.env.PORT ?? 4000), () => console.log('Contact API listening'));
