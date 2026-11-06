import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
export type Message = { name: string; email: string; message: string };
export function createApp(send: (message: Message) => Promise<void>, origin = 'http://localhost:3000') {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin }));
  app.use(express.json({ limit: '8kb' }));
  app.get('/health', (_req, res) => { res.json({ ok: true }); });
  // shortcut: in-memory limits apply per process; use a shared store when scaling replicas.
  app.post('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many messages. Please try again later.' } }), async (req, res) => {
    const body = req.body ?? {};
    if (body.website) { res.status(400).json({ error: 'Unable to submit this message.' }); return; }
    const { name, email, message } = body;
    if (typeof name !== 'string' || !name.trim() || name.length > 100 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== 'string' || !message.trim() || message.length > 5000) {
      res.status(400).json({ error: 'Enter a name, valid email, and a message of up to 5,000 characters.' }); return;
    }
    try { await send({ name: name.trim(), email: email.trim(), message: message.trim() }); res.json({ ok: true }); }
    catch { res.status(503).json({ error: 'Email delivery is unavailable. Please email me directly or try again later.' }); }
  });
  app.use((error: { status?: number }, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(error.status === 413 ? 413 : 400).json({ error: 'Invalid request.' });
  });
  return app;
}
