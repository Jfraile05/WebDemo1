// Vercel cron: GET /api/digest, daily. Reads the day's chat logs from
// Vercel Blob, emails one digest to Jorge via the contact Formspree form,
// then deletes the logs. Secured with CRON_SECRET.

const { list, get, del } = require('@vercel/blob');

function fmtTime(t) {
  return new Date(t).toLocaleTimeString('en-US', {
    timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit'
  });
}

function visitorHeader(entries) {
  const first = entries[0];
  const parts = [];
  const named = entries.map(e => e.visitor).find(v => v && (v.name || v.email));
  if (named) parts.push([named.name, named.email && '<' + named.email + '>'].filter(Boolean).join(' '));
  else parts.push('anonymous');
  parts.push(first.ip);
  if (first.geo) {
    const place = [first.geo.city, first.geo.region, first.geo.country].filter(Boolean).join(', ');
    if (place) parts.push(place);
    if (first.geo.org) parts.push(first.geo.org);
  }
  return parts.join(' · ');
}

module.exports = async (req, res) => {
  const auth = req.headers.authorization || '';
  if (!process.env.CRON_SECRET || auth !== 'Bearer ' + process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { blobs } = await list({ prefix: 'chat/', limit: 1000 });
  if (blobs.length === 0) {
    return res.status(200).json({ sent: false, messages: 0 });
  }

  const entries = [];
  for (const b of blobs) {
    try {
      const got = await get(b.url, { access: 'private' });
      if (got && got.stream) entries.push(JSON.parse(await new Response(got.stream).text()));
    } catch (e) {
      console.error('read error', b.pathname, String(e).slice(0, 120));
    }
  }
  if (entries.length === 0) {
    return res.status(200).json({ sent: false, messages: 0 });
  }

  // Group chronological entries by visitor IP so conversations read together.
  const byIp = new Map();
  entries.sort((a, b) => a.t - b.t);
  for (const e of entries) {
    if (!byIp.has(e.ip)) byIp.set(e.ip, []);
    byIp.get(e.ip).push(e);
  }

  const sections = [];
  for (const group of byIp.values()) {
    const lines = ['— ' + visitorHeader(group)];
    for (const e of group) {
      if (e.question === '(visitor introduced themselves)') {
        lines.push(fmtTime(e.t) + '  (introduced themselves via the chat card)');
        continue;
      }
      lines.push(fmtTime(e.t) + '  Q: ' + e.question);
      lines.push('         A: ' + (e.reply || '').slice(0, 400));
    }
    sections.push(lines.join('\n'));
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York', month: 'short', day: 'numeric'
  });
  const subject = 'Site chat digest, ' + dateStr + ': ' +
    entries.length + ' message' + (entries.length === 1 ? '' : 's') +
    ' from ' + byIp.size + ' visitor' + (byIp.size === 1 ? '' : 's');

  const send = await fetch('https://formspree.io/f/xlgovanz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: subject, digest: sections.join('\n\n') })
  });
  if (!send.ok) {
    console.error('formspree error', send.status, (await send.text()).slice(0, 200));
    return res.status(502).json({ error: 'Digest email failed; logs kept for next run' });
  }

  await del(blobs.map(b => b.url));
  return res.status(200).json({ sent: true, messages: entries.length, visitors: byIp.size });
};
