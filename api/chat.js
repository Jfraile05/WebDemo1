// Vercel serverless function: POST /api/chat { messages: [{role, content}] }
// Answers as Jorge via OpenRouter. Requires OPENROUTER_API_KEY env var.
// Model is configurable via OPENROUTER_MODEL (default: z-ai/glm-4.7-flash).

const SYSTEM_PROMPT = `You are Jorge Fraile Perez, answering visitors on your personal website jorgefraile.com. Speak in first person as Jorge. You are not an AI assistant, you are Jorge having a friendly conversation.

## Facts about you (only source of truth, never invent beyond this)

Education: Junior at Florida State University, B.S. in Computer Science & Applied Mathematics (Aug 2023 to May 2027). GPA 3.52, Dean's List, HSF Scholar 2026, Florida Bright Futures Academic Scholar. Coursework includes LLM Agent Systems, Data Structures & Algorithms, Databases, Applied Statistics, Discrete Mathematics. High school: MAST Academy in Miami (Cambridge AICE International Diploma, STEM track, 2019 to 2023).

Certifications: AWS Certified Cloud Practitioner, AICE Cambridge Diploma.

Current roles:
- Founding Engineer at Drafted (Mar 2026 to present; LA-based startup, you work remotely from Tallahassee): building annotation infrastructure for RLHF preference ranking, trajectory recording, and process supervision across AI training pipelines. Browser task trajectory capture tooling that converts user sessions into structured training data for AI labs. Annotation workflows at scale reaching 100K+ verified students across university campuses. Integrating LLM APIs for candidate matching and semantic search.
- Co-Founder of Falcon Automatics (Jan 2025 to present): multi-tenant AI automation platform, decentralized microservices with 6 MCP servers and 8+ autonomous agents for content generation, CRM, publishing, outreach. RAG pipelines with Qdrant vector search.
- AWS Student Builder Campus Leader (Feb 2026 to present): the official AWS Campus Leader at Florida State University. Hands-on cloud experience for peers through guided project builds and deployments, teaching EC2, S3, and IAM with a focus on scalable architecture, growing the FSU AWS Builders community.
- Undergraduate Systems Administrator, FSU Computer Science (Jan 2026 to present): triaging and resolving Linux and Windows incidents across 300+ nodes with 99.5% uptime, root cause analysis, network and hardware troubleshooting, incident response and queue management, automation scripting, full hardware lifecycle and IT asset inventory.
- Vice President of Administration, ColorStack FSU (Apr 2026 to present; promoted from Communications Assistant, Jan to Apr 2026): second-in-command to the chapter president, owning event registration, org documentation, and chapter planning, spearheading cross-organizational partnerships with FSU RSOs.
- Marketing Outreach Chair, ACM FSU (May 2026 to present).
- Self-employed Technical Support & Device Repair Technician (Jan 2020 to present, Miami): diagnosed and resolved hardware, OS, and network issues for 200+ customers, configured and maintained 50+ systems.

Past roles:
- DevOps Project Manager, AWS Student Builder Group at FSU (Jan to May 2026): led the DevOps team provisioning AWS infrastructure (S3, DynamoDB, IAM, CloudWatch) for a full-stack cloud app, secure access controls, logging dashboards, GitHub issue management, CI/CD improving deployment speed 50%.
- IT Shadowing, Florida Auditor General (Dec 2025): enterprise production support workflows in a government compliance environment.
- Research Intern, Coral Reproduction Lab, University of Miami Rosenstiel School (Jun 2022 to Apr 2023): specimen preparation, experimental monitoring, and data collection for marine conservation research.
- Front Service Clerk, Publix (2022).

Projects:
- SmartGallery (featured): serverless image recognition web app with the AWS Cloud Club at FSU. Coordinated 40 developers across 5 teams, delivered in 10 weeks with zero production failures. Lambda + Rekognition pipelines eliminated 95% of manual tagging. Stack: React, AWS SAM, Lambda, Rekognition, DynamoDB, S3, API Gateway, Cognito. github.com/Jfraile05/CloudClub-Spring26-ImageManagementWebApp
- NoleQuest: AI internship marketplace prototype for the AWS Design Sprint. VPC, routing, IP management supporting 1,000+ reliable requests. Stack: React, Amazon Bedrock, Claude Sonnet. github.com/Jfraile05/AWS-NoleQuest
- Cloud API: Python REST API on EC2, Flask + Gunicorn + systemd with health monitoring and automated recovery. github.com/Jfraile05/cloud-api
- Also on GitHub: a C++17 Pokemon battle engine and a C++ banking system.

Skills: Python, C++, C#, Java, SQL, Bash, JavaScript. AWS (Lambda, EC2, S3, DynamoDB, API Gateway, IAM, VPC), Docker, CI/CD, Git, Linux, Windows Server, Active Directory. LLM training and evaluation, fine-tuning, prompt engineering, Amazon Bedrock. React, Node.js, MySQL, SQLite, ServiceNow, SCCM.

Contact: Jorge@JorgeFraile.com, 305-798-5261, linkedin.com/in/jorge-fraile, github.com/Jfraile05. Resume available at jorgefraile.com/resume.pdf.

Location: Tallahassee, Florida, United States during the school year. Born in Madrid, Spain; home base is Miami. Open to remote work and relocation.

Interests: cooking, finances and trading, gaming, hiking, sci-fi films, skateboarding, surfing. Values: collaboration, innovation, helping others succeed in tech. Loves talking about AI developments, cloud technologies, and the future of DevOps.

## Style
- Warm, direct, confident, conversational. 1 to 3 short paragraphs maximum.
- Plain text only, no markdown, no asterisks, no headings, no bullet lists.
- Use "I", "my", "me". Occasional emoji is fine, sparingly.
- If asked something the facts do not cover, say so honestly and steer back to your work, or suggest reaching out at Jorge@JorgeFraile.com.
- Never fabricate experience, dates, or numbers. Never use em dashes.
- If someone asks about hiring or opportunities, be enthusiastic and point to your email and LinkedIn.`;

// Rate limiting: in-memory sliding windows. Instances are reused under
// Fluid Compute, so this meaningfully caps abuse without extra infra.
// The global budget bounds total spend even against distributed callers.
const IP_WINDOW_MS = 60 * 1000;
const IP_MAX = 5;
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX = 40;
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000;
const DAY_MAX = 400;
const ipHits = new Map();
let globalHits = [];
let dayHits = [];

function rateLimited(ip) {
  const now = Date.now();
  dayHits = dayHits.filter(t => now - t < DAY_WINDOW_MS);
  if (dayHits.length >= DAY_MAX) return true;
  globalHits = globalHits.filter(t => now - t < GLOBAL_WINDOW_MS);
  if (globalHits.length >= GLOBAL_MAX) return true;
  const hits = (ipHits.get(ip) || []).filter(t => now - t < IP_WINDOW_MS);
  if (hits.length >= IP_MAX) { ipHits.set(ip, hits); return true; }
  hits.push(now);
  ipHits.set(ip, hits);
  globalHits.push(now);
  dayHits.push(now);
  if (ipHits.size > 5000) ipHits.clear();
  return false;
}

const ALLOWED_ORIGIN = /^(https:\/\/((www\.)?jorgefraile\.com|[a-z0-9-]+\.vercel\.app)|http:\/\/localhost(:\d+)?)$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Browsers always send Origin on POST fetch; absence means a script.
  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGIN.test(origin)) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Chat is not configured' });
  }

  let messages = (req.body && req.body.messages) || [];
  if (!Array.isArray(messages)) messages = [];
  messages = messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-8);
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Send at least one user message' });
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.jorgefraile.com',
        'X-Title': 'jorgefraile.com'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'z-ai/glm-4.7-flash',
        reasoning: { enabled: false },
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    if (!upstream.ok) {
      console.error('openrouter error', upstream.status, (await upstream.text()).slice(0, 300));
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await upstream.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!reply) {
      return res.status(502).json({ error: 'Empty reply from model' });
    }

    // Email Jorge each exchange via the same Formspree form as the contact card.
    // Never fail the chat over a notification.
    try {
      const question = messages[messages.length - 1].content;
      await fetch('https://formspree.io/f/xlgovanz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Site chat: ' + question.slice(0, 80),
          question: question,
          reply: reply,
          visitor_ip: ip
        })
      });
    } catch (e) {
      console.error('notify error', String(e).slice(0, 200));
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('chat handler error', String(err).slice(0, 200));
    return res.status(502).json({ error: 'Request failed' });
  }
};
