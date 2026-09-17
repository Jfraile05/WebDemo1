// Vercel serverless function: POST /api/lead { name, email, company?, service?, message, website? }
// Delivers Lodestar Systems contact form submissions. Sends through Resend
// (RESEND_API_KEY + ALERT_EMAIL) and falls back to the shared Formspree form,
// which has a small monthly quota the chat digest already draws on.

const ALLOWED_ORIGIN = /^(https:\/\/((www\.)?jorgefraile\.com|[a-z0-9-]+\.vercel\.app)|http:\/\/localhost(:\d+)?)$/;

// In-memory sliding windows, same approach as api/chat.js. Instances are
// reused under Fluid Compute, so this caps abuse without extra infra.
const IP_WINDOW_MS = 10 * 60 * 1000;
const IP_MAX = 3;
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000;
const DAY_MAX = 60;
const ipHits = new Map();
let dayHits = [];

function rateLimited(ip) {
  const now = Date.now();
  dayHits = dayHits.filter(t => now - t < DAY_WINDOW_MS);
  if (dayHits.length >= DAY_MAX) return true;
  const hits = (ipHits.get(ip) || []).filter(t => now - t < IP_WINDOW_MS);
  if (hits.length >= IP_MAX) { ipHits.set(ip, hits); return true; }
  hits.push(now);
  ipHits.set(ip, hits);
  dayHits.push(now);
  if (ipHits.size > 2000) ipHits.clear();
  return false;
}

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Browsers always send Origin on POST fetch; absence means a script.
  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGIN.test(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  const body = req.body || {};

  // Honeypot: real people never fill a field they cannot see. Answer 200 so
  // the bot cannot tell it was caught.
  if (clean(body.website, 80)) {
    return res.status(200).json({ ok: true });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const lead = {
    name: clean(body.name, 80),
    email: clean(body.email, 120),
    company: clean(body.company, 120),
    service: clean(body.service, 60),
    message: typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : ''
  };
  if (!lead.name || !lead.email || !lead.message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(lead.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const subject = 'Lodestar lead: ' + lead.name + (lead.company ? ' (' + lead.company + ')' : '');
  const text = [
    'Name: ' + lead.name,
    'Email: ' + lead.email,
    'Company: ' + (lead.company || 'not given'),
    'Needs: ' + (lead.service || 'not given'),
    '',
    lead.message,
    '',
    'IP: ' + ip
  ].join('\n');

  try {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.ALERT_EMAIL;
    if (key && to) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Lodestar Systems <onboarding@resend.dev>',
          to: [to],
          reply_to: lead.email,
          subject: subject,
          text: text
        })
      });
      if (r.ok) return res.status(200).json({ ok: true });
      console.error('resend error', r.status, (await r.text()).slice(0, 200));
    }

    // Fallback so a lead is never lost when Resend is unavailable.
    const f = await fetch('https://formspree.io/f/xlgovanz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        email: lead.email,
        name: lead.name,
        company: lead.company,
        service: lead.service,
        message: lead.message
      })
    });
    if (!f.ok) throw new Error('formspree ' + f.status);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead error', String(err).slice(0, 200));
    return res.status(502).json({ error: 'Delivery failed' });
  }
};
