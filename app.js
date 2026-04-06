/* ============================================
   PORTFOLIO DATA MODEL
   Edit this object or use the ✏️ button on the page.
   ============================================ */
const DEFAULT_DATA = {
  name:         "Jorge Fraile Perez",
  initials:     "JF",
  title:        "SDE Intern Candidate · AWS Student Builder Campus Leader",
  tagline:      "CS student at FSU building distributed systems, cloud infrastructure, and AI-powered tools — from 300-node reliability pipelines to serverless architectures handling thousands of requests.",
  resume:       "resume.pdf",
  about:        "I'm a Computer Science student at Florida State University (GPA 3.5, Dean's List, Bright Futures Scholar) with hands-on experience managing 300+ node systems infrastructure as an Undergraduate Systems Admin — cutting downtime 25% and MTTR 30%. As an AWS Student Builder Campus Leader for Amazon Web Services, I run cloud workshops for 500+ students, publish technical content on distributed systems, and have driven 500+ AWS Builder Center registrations. I build at the intersection of systems reliability, cloud engineering, and AI.",
  contactBlurb: "I'm actively seeking software engineering internship opportunities. Whether you have an opening or just want to connect — I'd love to hear from you.",
  email:        "Jorge@JorgeFraile.com",
  github:       "https://github.com/Jfraile05",
  linkedin:     "https://linkedin.com/in/jorge-fraile",
  projects: [
    {
      id: 1,
      title:       "NoleQuest — AI Internship Marketplace",
      description: "AI-powered internship marketplace prototype built for the AWS Design Sprint Competition using Working Backwards methodology. Architected a serverless AWS backend handling 1K+ simulated requests at low latency. Integrated Amazon Bedrock and Claude Sonnet for AI features and optimized cloud costs by 20%.",
      tech:        ["React JS", "AWS", "Amazon Bedrock", "Claude Sonnet", "Figma"],
      github:      "https://github.com/Jfraile05/AWS-NoleQuest"
    },
    {
      id: 2,
      title:       "Cloud API — AWS EC2 REST Backend",
      description: "Lightweight Python REST API deployed on AWS EC2 with production-style infrastructure. Runs a Flask application managed through Gunicorn and systemd with health monitoring, automated startup/recovery, and multi-worker concurrency for handling real traffic.",
      tech:        ["Python", "Flask", "AWS EC2", "Gunicorn", "systemd", "Linux"],
      github:      "https://github.com/Jfraile05/cloud-api"
    },
    {
      id: 3,
      title:       "FSU Systems — Automation & Observability",
      description: "Python automation and monitoring tooling for Florida State University's 300+ node CS department infrastructure. Reduced incident detection time by 40%, MTTR by 30%, and overall downtime by 25% through improved observability and automated cross-layer diagnostics.",
      tech:        ["Python", "Linux", "Observability", "AWS CloudWatch"]
    },
    {
      id: 4,
      title:       "Pokémon Battle Simulator",
      description: "Fully-interactive terminal-based Pokémon battle engine written in modern C++17. Features real-time combat logic, a complete type-effectiveness system, team management, and a CPU AI opponent — demonstrating systems-level programming, OOP design, and game state management.",
      tech:        ["C++17", "OOP", "Game AI", "CMake"],
      github:      "https://github.com/Jfraile05/Pokemon-Battle-Simulator"
    },
    {
      id: 5,
      title:       "Banking System",
      description: "Console-based banking application in C++ with full account lifecycle management — create, deposit, withdraw, transfer, and delete accounts with persistent file storage. Demonstrates OOP design, STL vectors, file I/O, and input validation.",
      tech:        ["C++", "OOP", "STL", "File I/O"],
      github:      "https://github.com/Jfraile05/BankingSystem"
    }
  ],
  skills: [
    { category: "Programming",  items: ["Python", "C++", "Java", "SQL", "Bash", "JavaScript"] },
    { category: "Cloud & AWS",  items: ["Lambda", "EC2", "S3", "DynamoDB", "API Gateway", "Cognito", "Textract", "Personalize", "Serverless", "CI/CD"] },
    { category: "Development",  items: ["React", "Node.js", "Vite"] },
    { category: "Systems",      items: ["Linux", "Ubuntu", "Active Directory", "Distributed Systems", "Multithreading", "Low-Latency"] },
    { category: "Databases",    items: ["MySQL", "SQLite", "DynamoDB"] },
    { category: "Tools",        items: ["Git", "GitHub", "ServiceNow", "SCCM"] },
    { category: "Networking",   items: ["TCP/IP", "Observability", "System Debugging", "Performance Analysis"] },
    { category: "Core",         items: ["System Reliability", "Fault Tolerance", "Scalability", "Root Cause Analysis", "Automation"] }
  ],
  hobbies: [
    { icon: "🏗️", label: "System Design" },
    { icon: "☁️", label: "Cloud Architecture" },
    { icon: "💻", label: "Software Engineering" },
    { icon: "⚙️", label: "Engineering Problem Solving" },
    { icon: "🤖", label: "AI & Machine Learning" },
    { icon: "🔐", label: "Cryptography" },
    { icon: "🖥️", label: "PC Building" },
    { icon: "🔧", label: "Hardware & Device Repair" },
    { icon: "🎧", label: "Vibe Coding" },
    { icon: "👥", label: "Team Projects" },
    { icon: "🚀", label: "Hackathons" },
    { icon: "♟️", label: "Chess" },
    { icon: "💡", label: "Startups & Venture" },
    { icon: "📈", label: "Quantitative Finance" },
    { icon: "₿",  label: "Crypto & Blockchain" },
    { icon: "🎮", label: "Game Development" },
    { icon: "🤝", label: "Community Impact" },
    { icon: "📣", label: "Tech Marketing" },
    { icon: "🍳", label: "Cooking" },
    { icon: "🏊", label: "Swimming" },
    { icon: "💪", label: "Fitness" },
    { icon: "🏋️", label: "Weightlifting" }
  ],
  leadership: [
    {
      id: 1,
      role:     "AWS Student Builder Campus Leader",
      org:      "Amazon Web Services",
      period:   "Mar. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Lead AWS workshops for 500+ students increasing engagement and adoption of cloud best practices",
        "Develop technical content on distributed systems, networking, and cloud architecture used across multiple sessions",
        "Produce 24+ posts and 4 AWS Builder articles amplifying program awareness and technical engagement",
        "Drive 500+ AWS Builder Center registrations, mentoring students on cloud best practices and cost-efficient system design"
      ]
    },
    {
      id: 2,
      role:     "DevOps Project Manager",
      org:      "AWS Cloud Club, FSU Chapter",
      period:   "Jan. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Build CI/CD pipelines reducing deployment time by 50% and improving release reliability",
        "Monitor cloud systems to detect issues early and improve system availability",
        "Debug AWS infrastructure issues improving system availability and performance"
      ]
    },
    {
      id: 3,
      role:     "Communications Assistant",
      org:      "ColorStack",
      period:   "2025 – Present",
      location: "Remote",
      bullets: [
        "Support communications and outreach efforts to grow and engage the ColorStack community",
        "Coordinate technical collaboration across engineering teams and project initiatives",
        "Manage internal technical communication platforms and infrastructure tools"
      ]
    },
    {
      id: 5,
      role:     "Member",
      org:      "Association for Computing Machinery (ACM), FSU Chapter",
      period:   "2025 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Active member of ACM FSU Chapter, the umbrella organization housing the AWS Cloud Club and other technical student groups",
        "Engage with the broader computing community through events, workshops, and collaborative technical initiatives"
      ]
    },
    {
      id: 4,
      role:     "JROTC Officer",
      org:      "MAST Academy — U.S. Coast Guard JROTC",
      period:   "2019 – 2023",
      location: "Miami, FL",
      bullets: [
        "Served as an officer in MAST Academy's Coast Guard JROTC program across four years of high school",
        "Developed leadership, discipline, and teamwork skills through structured military training and unit responsibilities",
        "Participated in drills, ceremonies, and community service initiatives representing the program"
      ]
    }
  ],
  experience: [
    {
      id: 1,
      role:     "Undergraduate Systems Administrator",
      org:      "Florida State University, Department of Computer Science",
      period:   "Jan. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Own reliability of 300+ node systems by diagnosing cross-layer failures and reducing downtime by 25%",
        "Investigate incidents using logs/metrics and improve observability to accelerate debugging and reduce MTTR by 30%",
        "Build Python automation and monitoring tools reducing detection time by 40% and improving system reliability",
        "Review and validate automation scripts, documenting system configurations and incident resolutions to support team reliability"
      ]
    },
    {
      id: 2,
      role:     "IT Support — Shadow Program",
      org:      "Florida Auditor General",
      period:   "Dec. 2025",
      location: "Tallahassee, FL",
      bullets: [
        "Observed enterprise production support workflows including incident intake, prioritization, escalation, and resolution",
        "Gained exposure to access controls, documentation standards, and procedures supporting mission-critical systems"
      ]
    },
    {
      id: 3,
      role:     "Technical Support & Device Repair Technician",
      org:      "Independent",
      period:   "Jan. 2020 – Present",
      location: "Miami, FL",
      bullets: [
        "Troubleshoot production issues across hardware, operating systems, and networked systems to restore service availability",
        "Configure and maintain systems and network settings to ensure uptime and reliable performance",
        "Perform root cause analysis on recurring technical issues and implement corrective actions to prevent recurrence"
      ]
    },
    {
      id: 4,
      role:     "AWS Student Builder Campus Leader",
      org:      "Amazon Web Services",
      period:   "Mar. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Drive 500+ AWS Builder Center registrations via campus outreach, technical demos, and cloud education initiatives",
        "Deliver 4+ AWS technical presentations introducing students to cloud tools, developer resources, and hands-on labs",
        "Produce 24+ technical posts and 4 AWS Builder articles amplifying program awareness and engagement across campus"
      ]
    },
    {
      id: 5,
      role:     "Software Engineering Intern",
      org:      "Drafted (USC Backed)",
      period:   "Mar. 2026 – Present",
      location: "Remote",
      bullets: [
        "Develop and ship features across application backend and UI on a live production platform used by real users",
        "Pair with developers on code review and feature delivery in a collaborative engineering environment",
        "Diagnose and resolve full stack bugs, presenting technical proposals to stakeholders with intensity and commitment"
      ]
    }
  ]
};

/* ============================================
   STORAGE
   Key is FIXED — never bump it. User edits made through the website
   always win. New top-level keys added to DEFAULT_DATA are merged in
   automatically; existing user data is never overwritten by code.
   ============================================ */
const STORAGE_KEY = 'jorge_portfolio';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // Merge: start from DEFAULT_DATA, overlay every key the user has saved.
      // This means user edits are always preserved, while any new top-level
      // keys added to DEFAULT_DATA in future code updates appear automatically.
      const merged = structuredClone(DEFAULT_DATA);
      Object.keys(saved).forEach(k => { merged[k] = saved[k]; });
      // Fix stale file:// resume URL (was set before PDF was hosted in repo)
      if (merged.resume && merged.resume.startsWith('file://')) {
        merged.resume = DEFAULT_DATA.resume;
      }
      // Inject any new entries added to DEFAULT_DATA arrays that aren't in
      // the user's saved data yet (matched by id). Preserves all existing edits.
      ['experience', 'leadership', 'projects'].forEach(key => {
        if (!Array.isArray(merged[key])) return;
        DEFAULT_DATA[key].forEach(defaultItem => {
          if (!merged[key].find(item => item.id === defaultItem.id)) {
            merged[key].push(structuredClone(defaultItem));
          }
        });
      });
      return merged;
    }
  } catch (_) {}
  return structuredClone(DEFAULT_DATA);
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
}

/* ============================================
   STATE
   ============================================ */
let data = loadData();
let editMode = false;

/* ============================================
   DOM HELPERS
   ============================================ */
function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

function txt(tag, cls, text) {
  const e = el(tag, cls);
  e.textContent = text;
  return e;
}

function makeEditable(element, saver) {
  element.dataset.editTarget = '1';
  element.addEventListener('blur', () => {
    if (!editMode) return;
    saver(element.textContent.trim());
    saveData();
  });
  if (element.tagName === 'A') {
    element.addEventListener('click', e => { if (editMode) e.preventDefault(); });
  }
}

function enableAllEditing() {
  document.querySelectorAll('[data-edit-target]').forEach(e => {
    e.contentEditable = 'true';
  });
}

function disableAllEditing() {
  document.querySelectorAll('[contenteditable]').forEach(e => {
    e.removeAttribute('contenteditable');
  });
}

/* Called after every section re-render (add/delete actions).
   In edit mode: immediately make all cards visible and re-enable editing.
   Otherwise: re-run the scroll-reveal observer for newly added elements. */
function afterRender() {
  if (editMode) {
    document.querySelectorAll('.reveal').forEach(e => e.classList.add('visible'));
    enableAllEditing();
  } else {
    setTimeout(initReveal, 50);
  }
}

/* ============================================
   DRAG & DROP SORT
   ============================================ */
function makeSortable(container, arr, renderFn) {
  let src = null;
  container.querySelectorAll('[data-drag-idx]').forEach(item => {
    item.draggable = true;

    item.addEventListener('dragstart', e => {
      if (!editMode) { e.preventDefault(); return; }
      src = +item.dataset.dragIdx;
      setTimeout(() => item.classList.add('is-dragging'), 0);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(src));
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('is-dragging');
      container.querySelectorAll('.drag-target').forEach(i => i.classList.remove('drag-target'));
      src = null;
    });

    item.addEventListener('dragover', e => {
      if (!editMode || src === null) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const tgt = +item.dataset.dragIdx;
      if (src !== tgt) {
        container.querySelectorAll('.drag-target').forEach(i => i.classList.remove('drag-target'));
        item.classList.add('drag-target');
      }
    });

    item.addEventListener('dragleave', e => {
      if (!item.contains(e.relatedTarget)) item.classList.remove('drag-target');
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      if (!editMode || src === null) return;
      const tgt = +item.dataset.dragIdx;
      if (src !== tgt) {
        const moved = arr.splice(src, 1)[0];
        arr.splice(tgt, 0, moved);
        saveData();
        renderFn();
        afterRender();
      }
    });
  });
}

function dragHandle() {
  const h = el('span', 'drag-handle');
  h.setAttribute('aria-hidden', 'true');
  h.textContent = '\u2807'; /* ⠇ braille dots — universal drag icon */
  return h;
}

/* ============================================
   SECTION HEADER
   ============================================ */
function sectionHeader(num, title) {
  const h = el('div', 'section-header');
  h.append(
    txt('span', 'section-num', num),
    txt('h2',   'section-title', title),
    el('div',   'section-line')
  );
  return h;
}

/* ============================================
   HERO
   ============================================ */
function renderHero() {
  const section = document.getElementById('hero');
  section.innerHTML = '';

  const inner = el('div', 'hero-inner');
  const left  = el('div', 'hero-left');

  /* Available badge */
  const badge = el('div', 'hero-badge');
  const dot   = el('span', 'hero-badge-dot');
  badge.append(dot, document.createTextNode('Available for Work'));

  /* Name split into two lines */
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0] || 'Your';
  const lastName  = nameParts.slice(1).join(' ') || 'Name';

  const nameEl = el('h1', 'hero-name');
  nameEl.dataset.editTarget = '1';

  const firstSpan = document.createElement('span');
  firstSpan.textContent = firstName;

  const lastSpan = el('span', 'hero-name-sub');
  lastSpan.textContent = lastName;

  nameEl.append(firstSpan, document.createTextNode(' '), lastSpan);

  nameEl.addEventListener('blur', () => {
    if (!editMode) return;
    const val = nameEl.textContent.trim();
    data.name = val;
    data.initials = val.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
    document.getElementById('nav-logo').textContent = data.initials;
    saveData();
  });

  /* Title row */
  const titleRow = el('div', 'hero-title-row');
  const arrow    = txt('span', 'hero-title-arrow', '>');
  const titleTxt = txt('span', 'hero-title-text', data.title);
  makeEditable(titleTxt, v => { data.title = v; });
  titleRow.append(arrow, titleTxt);

  /* Tagline */
  const tagline = txt('p', 'hero-tagline', data.tagline);
  makeEditable(tagline, v => { data.tagline = v; });

  /* Actions */
  const actions = el('div', 'hero-actions');

  const resumeBtn = el('a', 'btn btn-primary');
  resumeBtn.href = data.resume || '#';
  resumeBtn.target = '_blank';
  resumeBtn.textContent = '\u2197 Resume';

  const contactBtn = el('a', 'btn btn-outline');
  contactBtn.href = '#contact';
  contactBtn.textContent = 'Get in Touch';

  actions.append(resumeBtn, contactBtn);

  /* Resume URL edit field — only visible in edit mode */
  const resumeUrlRow = el('div', 'resume-url-row');
  const resumeUrlLabel = txt('span', 'resume-url-label', 'Resume URL:');
  const resumeUrlSpan = txt('span', 'resume-url-field', data.resume || '#');
  resumeUrlSpan.dataset.editTarget = '1';
  resumeUrlSpan.addEventListener('blur', () => {
    if (!editMode) return;
    const v = resumeUrlSpan.textContent.trim();
    data.resume = v;
    resumeBtn.href = v;
    saveData();
  });
  resumeUrlRow.append(resumeUrlLabel, resumeUrlSpan);
  left.append(badge, nameEl, titleRow, tagline, actions, resumeUrlRow);

  /* Decorative element */
  const deco = el('div', 'hero-deco');
  const bracket = txt('div', 'hero-deco-bracket', '</>');
  const lines   = el('div', 'hero-deco-lines');
  for (let i = 0; i < 4; i++) lines.append(el('div', 'hero-deco-line'));
  deco.append(bracket, lines);

  inner.append(left, deco);
  section.append(inner);
}

/* ============================================
   ABOUT
   ============================================ */
function renderAbout() {
  const section = document.getElementById('about');
  section.innerHTML = '';
  section.append(sectionHeader('01', 'About'));

  const layout = el('div', 'about-layout reveal');

  const p = txt('p', 'about-text', data.about);
  makeEditable(p, v => { data.about = v; });

  const statsDiv = el('div', 'about-stats');
  const stats = [
    { value: data.projects.length + '+', label: 'Projects Built' },
    { value: '3',  label: 'Years Coding' },
    { value: data.skills.reduce((a, g) => a + g.items.length, 0) + '+', label: 'Technologies' },
    { value: '\u221e', label: 'Curiosity' },
  ];

  stats.forEach(s => {
    const card = el('div', 'stat-card');
    card.append(txt('div', 'stat-value', s.value), txt('div', 'stat-label', s.label));
    statsDiv.append(card);
  });

  layout.append(p, statsDiv);
  section.append(layout);
}

/* ============================================
   PROJECTS
   ============================================ */
/* ============================================
   EXPERIENCE
   ============================================ */
function renderExperience() {
  const section = document.getElementById('experience');
  section.innerHTML = '';
  section.append(sectionHeader('02', 'Experience'));

  const list = el('div', 'leadership-list');
  data.experience.forEach((item, i) => list.append(buildExperienceCard(item, i)));
  makeSortable(list, data.experience, renderExperience);
  section.append(list);

  const addBtn = el('button', 'add-btn');
  addBtn.textContent = '+ Add Role';
  addBtn.addEventListener('click', () => {
    data.experience.push({
      id: Date.now(),
      role:     'Role Title',
      org:      'Organization',
      period:   'Year – Present',
      location: 'Location',
      bullets:  ['Describe your responsibilities and impact here.']
    });
    saveData();
    renderExperience();
    afterRender();
  });
  section.append(addBtn);
}

function buildExperienceCard(item, idx) {
  const card = el('div', 'leadership-card reveal');
  card.dataset.dragIdx = idx;
  card.style.transitionDelay = (idx * 0.08) + 's';

  card.append(dragHandle());

  const delBtn = txt('button', 'delete-btn card-delete', '\u2715 Remove');
  delBtn.addEventListener('click', () => {
    data.experience.splice(idx, 1);
    saveData();
    renderExperience();
    afterRender();
  });
  card.append(delBtn);

  const header = el('div', 'ldr-header');

  const role = txt('h3', 'ldr-role', item.role);
  makeEditable(role, v => { data.experience[idx].role = v; });

  const meta = el('div', 'ldr-meta');
  const org = txt('span', 'ldr-org', item.org);
  makeEditable(org, v => { data.experience[idx].org = v; });
  const period = txt('span', 'ldr-period', item.period);
  makeEditable(period, v => { data.experience[idx].period = v; });
  const location = txt('span', 'ldr-location', item.location);
  makeEditable(location, v => { data.experience[idx].location = v; });

  meta.append(org, period, location);
  header.append(role, meta);
  card.append(header);

  const bulletsWrap = el('ul', 'ldr-bullets');
  item.bullets.forEach((bullet, bi) => {
    const li = el('li', 'ldr-bullet');
    const bulletTxt = txt('span', 'ldr-bullet-text', bullet);
    makeEditable(bulletTxt, v => { data.experience[idx].bullets[bi] = v; });

    const delBullet = txt('button', 'delete-btn', '\u2715');
    delBullet.style.cssText = 'margin-left:6px;padding:0 3px;font-size:0.55rem;flex-shrink:0;';
    delBullet.addEventListener('click', e => {
      e.stopPropagation();
      data.experience[idx].bullets.splice(bi, 1);
      saveData();
      renderExperience();
      afterRender();
    });
    li.append(bulletTxt, delBullet);
    bulletsWrap.append(li);
  });

  const addBullet = txt('button', 'add-tag-btn', '+ bullet');
  addBullet.style.marginTop = '0.6rem';
  addBullet.addEventListener('click', () => {
    data.experience[idx].bullets.push('New achievement.');
    saveData();
    renderExperience();
    afterRender();
  });

  card.append(bulletsWrap, addBullet);
  return card;
}

/* ============================================
   PROJECTS
   ============================================ */
function renderProjects() {
  const section = document.getElementById('projects');
  section.innerHTML = '';
  section.append(sectionHeader('03', 'Projects'));

  const grid = el('div', 'projects-grid');
  data.projects.forEach((proj, i) => grid.append(buildProjectCard(proj, i)));
  makeSortable(grid, data.projects, renderProjects);
  section.append(grid);

  const addBtn = el('button', 'add-btn');
  addBtn.textContent = '+ Add Project';
  addBtn.addEventListener('click', () => {
    data.projects.push({
      id: Date.now(),
      title:       'New Project',
      description: 'Describe your project here.',
      tech:        ['Tech'],
      github:      '#',
      demo:        '#'
    });
    saveData();
    renderProjects();
    afterRender();
  });
  section.append(addBtn);
}

function buildProjectCard(proj, idx) {
  const card = el('div', 'project-card reveal');
  card.dataset.dragIdx = idx;
  card.style.transitionDelay = (idx * 0.08) + 's';

  card.append(dragHandle());

  const delBtn = txt('button', 'delete-btn card-delete', '\u2715 Remove');
  delBtn.addEventListener('click', () => {
    data.projects.splice(idx, 1);
    saveData();
    renderProjects();
    afterRender();
  });
  card.append(delBtn);

  const num = txt('div', 'project-num', String(idx + 1).padStart(2, '0'));
  card.append(num);

  const title = txt('h3', 'project-title', proj.title);
  makeEditable(title, v => { data.projects[idx].title = v; });
  card.append(title);

  const desc = txt('p', 'project-desc', proj.description);
  makeEditable(desc, v => { data.projects[idx].description = v; });
  card.append(desc);

  const tagsWrap = el('div', 'tech-tags');
  proj.tech.forEach((t, ti) => {
    const tag = txt('span', 'tech-tag', t);
    makeEditable(tag, v => { data.projects[idx].tech[ti] = v; });

    const delTag = txt('button', 'delete-btn', '\u2715');
    delTag.style.cssText = 'margin-left:4px;padding:0 3px;font-size:0.55rem;';
    delTag.addEventListener('click', e => {
      e.stopPropagation();
      data.projects[idx].tech.splice(ti, 1);
      saveData();
      renderProjects();
      afterRender();
    });
    tag.append(delTag);
    tagsWrap.append(tag);
  });

  const addTagBtn = txt('button', 'add-tag-btn', '+ tag');
  addTagBtn.addEventListener('click', () => {
    data.projects[idx].tech.push('New');
    saveData();
    renderProjects();
    afterRender();
  });
  tagsWrap.append(addTagBtn);
  card.append(tagsWrap);

  if (proj.github) {
    const links = el('div', 'project-links');
    const ghLink = el('a', 'project-link');
    ghLink.href = proj.github; ghLink.target = '_blank';
    ghLink.textContent = '\u2325 GitHub';
    makeEditable(ghLink, v => { data.projects[idx].github = v; });
    links.append(ghLink);
    card.append(links);
  }

  card.addEventListener('mousemove', e => {
    if (editMode) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = 'translateY(-4px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });

  return card;
}

/* ============================================
   LEADERSHIP
   ============================================ */
function renderLeadership() {
  const section = document.getElementById('leadership');
  section.innerHTML = '';
  section.append(sectionHeader('04', 'Leadership'));

  const list = el('div', 'leadership-list');
  data.leadership.forEach((item, i) => list.append(buildLeadershipCard(item, i)));
  makeSortable(list, data.leadership, renderLeadership);
  section.append(list);

  const addBtn = el('button', 'add-btn');
  addBtn.textContent = '+ Add Role';
  addBtn.addEventListener('click', () => {
    data.leadership.push({
      id: Date.now(),
      role:     'Role Title',
      org:      'Organization',
      period:   'Year – Present',
      location: 'Location',
      bullets:  ['Describe your contributions and impact here.']
    });
    saveData();
    renderLeadership();
    afterRender();
  });
  section.append(addBtn);
}

function buildLeadershipCard(item, idx) {
  const card = el('div', 'leadership-card reveal');
  card.dataset.dragIdx = idx;
  card.style.transitionDelay = (idx * 0.08) + 's';

  card.append(dragHandle());

  const delBtn = txt('button', 'delete-btn card-delete', '\u2715 Remove');
  delBtn.addEventListener('click', () => {
    data.leadership.splice(idx, 1);
    saveData();
    renderLeadership();
    afterRender();
  });
  card.append(delBtn);

  const header = el('div', 'ldr-header');

  const role = txt('h3', 'ldr-role', item.role);
  makeEditable(role, v => { data.leadership[idx].role = v; });

  const meta = el('div', 'ldr-meta');

  const org = txt('span', 'ldr-org', item.org);
  makeEditable(org, v => { data.leadership[idx].org = v; });

  const period = txt('span', 'ldr-period', item.period);
  makeEditable(period, v => { data.leadership[idx].period = v; });

  const location = txt('span', 'ldr-location', item.location);
  makeEditable(location, v => { data.leadership[idx].location = v; });

  meta.append(org, period, location);
  header.append(role, meta);
  card.append(header);

  const bulletsWrap = el('ul', 'ldr-bullets');
  item.bullets.forEach((bullet, bi) => {
    const li = el('li', 'ldr-bullet');
    const bulletTxt = txt('span', 'ldr-bullet-text', bullet);
    makeEditable(bulletTxt, v => { data.leadership[idx].bullets[bi] = v; });

    const delBullet = txt('button', 'delete-btn', '\u2715');
    delBullet.style.cssText = 'margin-left:6px;padding:0 3px;font-size:0.55rem;flex-shrink:0;';
    delBullet.addEventListener('click', e => {
      e.stopPropagation();
      data.leadership[idx].bullets.splice(bi, 1);
      saveData();
      renderLeadership();
      afterRender();
    });
    li.append(bulletTxt, delBullet);
    bulletsWrap.append(li);
  });

  const addBullet = txt('button', 'add-tag-btn', '+ bullet');
  addBullet.style.marginTop = '0.6rem';
  addBullet.addEventListener('click', () => {
    data.leadership[idx].bullets.push('New achievement.');
    saveData();
    renderLeadership();
    afterRender();
  });

  card.append(bulletsWrap, addBullet);
  return card;
}

/* ============================================
   SKILLS
   ============================================ */
function renderSkills() {
  const section = document.getElementById('skills');
  section.innerHTML = '';
  section.append(sectionHeader('05', 'Skills'));

  const grid = el('div', 'skills-grid');

  data.skills.forEach((group, gi) => {
    const card = el('div', 'skill-group reveal');
    card.dataset.dragIdx = gi;
    card.style.transitionDelay = (gi * 0.07) + 's';

    card.append(dragHandle());

    const delGroup = txt('button', 'delete-btn', '\u2715 Group');
    delGroup.style.cssText = 'float:right;margin-bottom:4px;';
    delGroup.addEventListener('click', () => {
      data.skills.splice(gi, 1);
      saveData();
      renderSkills();
      afterRender();
    });
    card.append(delGroup);

    const cat = txt('div', 'skill-category', group.category);
    makeEditable(cat, v => { data.skills[gi].category = v; });
    card.append(cat);

    const chipsWrap = el('div', 'skill-chips');
    group.items.forEach((skill, si) => {
      const chip = txt('span', 'skill-chip', skill);
      makeEditable(chip, v => { data.skills[gi].items[si] = v; });

      const delChip = txt('button', 'delete-btn', '\u2715');
      delChip.style.cssText = 'padding:0 3px;font-size:0.55rem;margin-left:3px;';
      delChip.addEventListener('click', e => {
        e.stopPropagation();
        data.skills[gi].items.splice(si, 1);
        saveData();
        renderSkills();
        afterRender();
      });
      chip.append(delChip);
      chipsWrap.append(chip);
    });

    const addChip = txt('button', 'add-tag-btn', '+ skill');
    addChip.addEventListener('click', () => {
      data.skills[gi].items.push('New');
      saveData();
      renderSkills();
      afterRender();
    });
    chipsWrap.append(addChip);
    card.append(chipsWrap);
    grid.append(card);
  });

  const addGroup = txt('button', 'add-btn', '+ Add Skill Group');
  addGroup.addEventListener('click', () => {
    data.skills.push({ category: 'Category', items: ['Skill'] });
    saveData();
    renderSkills();
    afterRender();
  });

  makeSortable(grid, data.skills, renderSkills);
  section.append(grid, addGroup);
}

/* ============================================
   HOBBIES
   ============================================ */
function renderHobbies() {
  const section = document.getElementById('hobbies');
  section.innerHTML = '';
  section.append(sectionHeader('06', 'Interests'));

  const grid = el('div', 'hobbies-grid reveal');

  data.hobbies.forEach((h, i) => {
    const chip = el('div', 'hobby-chip');
    chip.dataset.dragIdx = i;

    const icon  = txt('span', 'hobby-icon',  h.icon);
    makeEditable(icon, v => { data.hobbies[i].icon = v.trim() || h.icon; });

    const label = txt('span', 'hobby-label', h.label);
    makeEditable(label, v => { data.hobbies[i].label = v; });

    const delBtn = txt('button', 'delete-btn', '\u2715');
    delBtn.style.cssText = 'margin-left:6px;padding:0 4px;font-size:0.55rem;';
    delBtn.addEventListener('click', () => {
      data.hobbies.splice(i, 1);
      saveData();
      renderHobbies();
      afterRender();
    });

    chip.append(icon, label, delBtn);
    grid.append(chip);
  });

  const addHobby = txt('button', 'add-btn', '+ Add Interest');
  addHobby.addEventListener('click', () => {
    data.hobbies.push({ icon: '\u2b50', label: 'New Interest' });
    saveData();
    renderHobbies();
    afterRender();
  });

  makeSortable(grid, data.hobbies, renderHobbies);
  section.append(grid, addHobby);
}

/* ============================================
   CONTACT
   ============================================ */
function renderContact() {
  const section = document.getElementById('contact');
  section.innerHTML = '';
  section.append(sectionHeader('07', 'Contact'));

  const inner = el('div', 'contact-inner reveal');

  const cta = el('h2', 'contact-cta');
  cta.innerHTML = "Let\u2019s build<br>something <span class=\"lime\">great.</span>";

  const blurb = txt('p', 'contact-blurb', data.contactBlurb);
  makeEditable(blurb, v => { data.contactBlurb = v; });

  const links = el('div', 'contact-links');

  const emailLink = el('a', 'contact-link');
  emailLink.href = 'mailto:' + data.email;
  emailLink.textContent = '\u2709 ' + data.email;
  makeEditable(emailLink, v => {
    data.email = v.replace(/^\u2709\s*/, '').trim();
    emailLink.href = 'mailto:' + data.email;
  });

  const ghLink = el('a', 'contact-link');
  ghLink.href = data.github; ghLink.target = '_blank';
  ghLink.textContent = '\u2325 GitHub';
  makeEditable(ghLink, v => { data.github = v; ghLink.href = v; });

  const liLink = el('a', 'contact-link');
  liLink.href = data.linkedin; liLink.target = '_blank';
  liLink.textContent = '\u2B21 LinkedIn';
  makeEditable(liLink, v => { data.linkedin = v; liLink.href = v; });

  links.append(emailLink, ghLink, liLink);
  inner.append(cta, blurb, links);
  section.append(inner);
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, [data-edit-target]')) {
      ring.style.width  = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(200,255,0,0.5)';
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, [data-edit-target]')) {
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(200,255,0,0.35)';
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ============================================
   EDIT MODE TOGGLE
   ============================================ */
function showToast(msg) {
  const toast = document.getElementById('edit-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3800);
}

document.getElementById('edit-toggle').addEventListener('click', () => {
  editMode = !editMode;
  document.body.classList.toggle('edit-mode', editMode);
  if (editMode) {
    enableAllEditing();
    showToast('\u270f\ufe0f  Edit mode on — click any text to edit.');
  } else {
    disableAllEditing();
    showToast('\ud83d\udd12  Saved.');
  }
});

/* ============================================
   NAVBAR SCROLL
   ============================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ============================================
   RENDER ALL
   ============================================ */
function render() {
  const initials = data.initials || data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  document.getElementById('nav-logo').textContent = initials;

  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderLeadership();
  renderSkills();
  renderHobbies();
  renderContact();

  const existing = document.querySelector('footer');
  if (existing) existing.remove();
  const footer = document.createElement('footer');
  footer.innerHTML = '\u00a9 ' + new Date().getFullYear() + ' ' + data.name + ' &nbsp;\u00b7&nbsp; Built with HTML, CSS &amp; JS';
  document.querySelector('main').after(footer);

  afterRender();
}

/* ============================================
   DYNAMIC BACKGROUND — Particle Constellation
   ============================================ */
function initBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COUNT      = 72;
  const MAX_DIST   = 155;
  const MOUSE_R    = 130;
  const SPEED      = 0.28;

  let W = 0, H = 0;
  let mouseX = -9999, mouseY = -9999;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 0.5 + 0.5) * SPEED;
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      baseR: Math.random() * 1.1 + 0.5,
      phase: Math.random() * Math.PI * 2
    };
  }

  resize();
  window.addEventListener('resize', resize);

  let particles = Array.from({ length: COUNT }, makeParticle);

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  document.addEventListener('mouseleave', () => { mouseX = mouseY = -9999; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Update positions */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.phase += 0.016;

      /* Mouse repulsion */
      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < MOUSE_R * MOUSE_R && md2 > 0) {
        const md   = Math.sqrt(md2);
        const push = (1 - md / MOUSE_R) * 0.5;
        p.vx += (mdx / md) * push;
        p.vy += (mdy / md) * push;
      }

      /* Dampen & move */
      p.vx *= 0.97;
      p.vy *= 0.97;
      /* Clamp velocity */
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > SPEED * 4) { p.vx = (p.vx / spd) * SPEED * 4; p.vy = (p.vy / spd) * SPEED * 4; }

      p.x += p.vx;
      p.y += p.vy;

      /* Wrap edges with a soft margin */
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }

    /* Draw edges */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.13;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,255,0,${a.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    /* Draw nodes */
    for (let i = 0; i < particles.length; i++) {
      const p      = particles[i];
      const pulse  = 0.45 + Math.sin(p.phase) * 0.2;
      const mdx    = p.x - mouseX;
      const mdy    = p.y - mouseY;
      const near   = Math.sqrt(mdx * mdx + mdy * mdy) < MOUSE_R;
      const bright = near ? Math.min(1, pulse + 0.35) : pulse;

      /* Outer glow for near-mouse particles */
      if (near) {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.baseR * 6);
        grd.addColorStop(0, `rgba(200,255,0,${(bright * 0.25).toFixed(3)})`);
        grd.addColorStop(1, 'rgba(200,255,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseR * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.baseR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,255,0,${(bright * 0.75).toFixed(3)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

render();
initCursor();
initBackground();
