/* ============================================
   PORTFOLIO DATA
   Edit this object to update site content.
   ============================================ */
const DEFAULT_DATA = {
  name:         "Jorge Fraile Perez",
  initials:     "JF",
  title:        "SDE Intern Candidate · AWS Student Builder Campus Leader",
  tagline:      "CS student at FSU maintaining and building on distributed infrastructure at scale — 300-node clusters, cloud deployments, and AI-powered automation pipelines.",
  resume:       "resume.pdf",
  about:        "I'm a Computer Science student at Florida State University (GPA 3.5, Dean's List, Bright Futures Scholar) with hands-on experience managing 300+ node systems infrastructure as an Undergraduate Systems Admin — cutting downtime 25% and MTTR 30%. As an AWS Student Builder Campus Leader for Amazon Web Services, I run cloud workshops for 500+ students, publish technical content on distributed systems, and have driven 500+ AWS Builder Center registrations. I build at the intersection of systems reliability, cloud engineering, and AI.",
  contactBlurb: "I'm actively seeking software engineering internship opportunities. Whether you have an opening or just want to connect — I'd love to hear from you.",
  email:        "Jorge@JorgeFraile.com",
  github:       "https://github.com/Jfraile05",
  linkedin:     "https://linkedin.com/in/jorge-fraile",
  projects: [
    {
      id: 1,
      title:       "SmartGallery — AWS Cloud Club @ FSU",
      description: "Serverless image recognition and management web app built collaboratively by 40 developers across 5 teams. Users upload images that are automatically tagged using Amazon Rekognition, with tags stored in DynamoDB for browsing, filtering, and searching personal galleries.",
      tech:        ["React", "AWS SAM", "Lambda", "Amazon Rekognition", "DynamoDB", "S3", "API Gateway", "AWS Cognito"],
      github:      "https://github.com/Jfraile05/CloudClub-Spring26-ImageManagementWebApp"
    },
    {
      id: 2,
      title:       "NoleQuest — AI Internship Marketplace",
      description: "AI-powered internship marketplace prototype built for the AWS Design Sprint Competition. Architected AWS network infrastructure with VPC, routing, and IP management supporting 1,000+ reliable user requests. Deployed serverless backend with DNS, access controls, and monitoring for zero-disruption service delivery.",
      tech:        ["React JS", "AWS", "Amazon Bedrock", "Claude Sonnet", "Figma"],
      github:      "https://github.com/Jfraile05/AWS-NoleQuest"
    },
    {
      id: 3,
      title:       "Cloud API — AWS EC2 REST Backend",
      description: "Lightweight Python REST API deployed on AWS EC2 with production-style infrastructure. Runs a Flask application managed through Gunicorn and systemd with health monitoring, automated startup/recovery, and multi-worker concurrency for handling real traffic.",
      tech:        ["Python", "Flask", "AWS EC2", "Gunicorn", "systemd", "Linux"],
      github:      "https://github.com/Jfraile05/cloud-api"
    },
    {
      id: 4,
      title:       "FSU Systems — Automation & Observability",
      description: "Python automation and monitoring tooling for Florida State University's 300+ node CS department infrastructure. Reduced incident detection time by 40%, MTTR by 30%, and overall downtime by 25% through improved observability and automated cross-layer diagnostics.",
      tech:        ["Python", "Linux", "Observability"]
    },
    {
      id: 5,
      title:       "Pokémon Battle Simulator",
      description: "Fully-interactive terminal-based Pokémon battle engine written in modern C++17. Features real-time combat logic, a complete type-effectiveness system, team management, and a CPU AI opponent — demonstrating systems-level programming, OOP design, and game state management.",
      tech:        ["C++17", "OOP", "Game AI", "CMake"],
      github:      "https://github.com/Jfraile05/Pokemon-Battle-Simulator"
    },
    {
      id: 6,
      title:       "Banking System",
      description: "Console-based banking application in C++ with full account lifecycle management — create, deposit, withdraw, transfer, and delete accounts with persistent file storage. Demonstrates OOP design, STL vectors, file I/O, and input validation.",
      tech:        ["C++", "OOP", "STL", "File I/O"],
      github:      "https://github.com/Jfraile05/BankingSystem"
    }
  ],
  skills: [
    { category: "Programming",  items: ["Python", "C++", "Java", "SQL", "Bash", "JavaScript"] },
    { category: "Cloud & AWS",  items: ["Lambda", "EC2", "S3", "DynamoDB", "API Gateway", "IAM", "VPC", "Azure", "Serverless", "CI/CD"] },
    { category: "Systems",      items: ["Linux", "Ubuntu", "Active Directory", "Distributed Systems", "Multithreading", "Low-Latency"] },
    { category: "Core",         items: ["System Reliability", "Fault Tolerance", "Scalability", "Root Cause Analysis", "Automation"] },
    { category: "AI/ML",        items: ["LLM Training & Development", "Model Fine-Tuning", "Prompt Engineering", "Amazon Bedrock", "Claude", "Generative AI"] },
    { category: "Networking",   items: ["TCP/IP", "DNS", "BGP", "OSPF", "VPC", "Routing", "Observability", "Network Troubleshooting"] },
    { category: "Dev & Data",   items: ["React", "Node.js", "Vite", "MySQL", "SQLite"] },
    { category: "Tools",        items: ["Git", "GitHub", "ServiceNow", "SCCM"] }
  ],
  hobbies: [
    { icon: "🏗️", label: "System Design" },
    { icon: "☁️", label: "Cloud Architecture" },
    { icon: "💻", label: "Software Engineering" },
    { icon: "⚙️", label: "Engineering Problem Solving" },
    { icon: "🤖", label: "AI & Machine Learning" },
    { icon: "🚀", label: "Hackathons" },
    { icon: "👥", label: "Team Projects" },
    { icon: "🎧", label: "Vibe Coding" },
    { icon: "💡", label: "Startups & Venture" },
    { icon: "🎮", label: "Game Development" },
    { icon: "🔐", label: "Cryptography" },
    { icon: "📈", label: "Quantitative Finance" },
    { icon: "₿",  label: "Crypto & Blockchain" },
    { icon: "📣", label: "Tech Marketing" },
    { icon: "🖥️", label: "PC Building" },
    { icon: "🔧", label: "Hardware & Device Repair" },
    { icon: "🤝", label: "Community Impact" },
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
        "Built and maintained CI/CD pipelines on AWS, improving deployment speed by 50% with repeatable standards",
        "Monitored distributed cloud systems, analyzed logs and metrics, resolving alerts to maintain high availability",
        "Led root cause analysis on AWS infrastructure failures, reducing recurring issues by 40% through structured debugging"
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
      id: 5,
      role:     "Software Engineer Intern",
      org:      "Drafted Labs",
      period:   "Mar. 2026 – Present",
      location: "Remote",
      bullets: [
        "Developing annotation infrastructure for RLHF preference ranking, trajectory recording, and process supervision",
        "Building tooling that captures browser task trajectories as structured training data for AI lab pipelines",
        "Designing and deploying annotation workflows at scale across 100K+ verified students across university campuses",
        "Integrating large language model APIs into the core platform for candidate matching and semantic search"
      ]
    },
    {
      id: 1,
      role:     "Systems Administrator",
      org:      "Florida State University, Department of Computer Science",
      period:   "Jan. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Administering Linux and Windows Server environments across 300+ nodes, maintaining network uptime above 99.5%",
        "Building Python automation for system monitoring and alerting, reducing incident detection time by 40%",
        "Diagnosing TCP/IP, DNS, BGP, and OSPF routing failures using log analysis and metrics, cutting MTTR by 30%",
        "Managing Active Directory accounts and enforcing secure access controls, ensuring configuration compliance"
      ]
    },
    {
      id: 4,
      role:     "AWS Student Builder Campus Leader",
      org:      "Amazon Web Services",
      period:   "Mar. 2026 – Present",
      location: "Tallahassee, FL",
      bullets: [
        "Deploying AWS network infrastructure labs covering VPC, subnets, routing tables, and IP management for 500+ students",
        "Teaching AWS services across majors, showing students how to turn ideas into modern solutions using cloud infrastructure",
        "Automating deployment workflows via Python and Bash scripting, reducing lab setup time by 35% and expanding reach",
        "Collaborating with 7 PMs to coordinate 33 developers, delivering 3 workshops and a semester-long AWS cloud project"
      ]
    },
    {
      id: 3,
      role:     "Technical Support & Device Repair Technician",
      org:      "Independent",
      period:   "Jan. 2020 – Aug. 2023",
      location: "Miami, FL",
      bullets: [
        "Troubleshot production issues across hardware, operating systems, and networked systems to restore service availability",
        "Configured and maintained systems and network settings to ensure uptime and reliable performance",
        "Performed root cause analysis on recurring technical issues and implemented corrective actions to prevent recurrence"
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
    }
  ]
};

/* ============================================
   STATE
   ============================================ */
const data = DEFAULT_DATA;
let currentSection = null;

/* ============================================
   HELPERS
   ============================================ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================
   RENDER — ABOUT
   ============================================ */
function renderAbout(container) {
  const d = data;
  const techCount = d.skills.reduce((a, g) => a + g.items.length, 0);

  container.classList.add('is-about');
  container.innerHTML =
    '<div class="about-body">' +
      '<h2 class="section-title">About</h2>' +
      '<p class="about-text">' + esc(d.about) + '</p>' +
      '<div class="about-stats">' +
        '<div class="stat"><span class="stat-n">' + d.projects.length + '</span><span class="stat-l">Projects</span></div>' +
        '<div class="stat"><span class="stat-n">4</span><span class="stat-l">Years Coding</span></div>' +
        '<div class="stat"><span class="stat-n">' + techCount + '+</span><span class="stat-l">Technologies</span></div>' +
      '</div>' +
      '<div class="about-actions">' +
        '<a href="' + esc(d.resume) + '" target="_blank" rel="noopener" class="btn">Resume \u2197</a>' +
        '<a href="' + esc(d.github) + '" target="_blank" rel="noopener" class="text-link">GitHub \u2197</a>' +
        '<a href="' + esc(d.linkedin) + '" target="_blank" rel="noopener" class="text-link">LinkedIn \u2197</a>' +
        '<a href="mailto:' + esc(d.email) + '" class="text-link">Email</a>' +
      '</div>' +
    '</div>';
}

/* ============================================
   RENDER — EXPERIENCE
   ============================================ */
function renderExperience(container) {
  const items = data.experience;

  const entriesHtml = items.map(function(item) {
    const bulletsHtml = item.bullets.map(function(b) {
      return '<li>' + esc(b) + '</li>';
    }).join('');

    return '<div class="entry">' +
      '<p class="entry-period">' + esc(item.period) + '</p>' +
      '<h3 class="entry-role">' + esc(item.role) + '</h3>' +
      '<p class="entry-meta">' + esc(item.org) + '<span class="entry-sep">\u00b7</span>' + esc(item.location) + '</p>' +
      '<ul class="entry-bullets">' + bulletsHtml + '</ul>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<h2 class="section-title">Experience</h2>' +
    '<div class="entries">' + entriesHtml + '</div>';
}

/* ============================================
   RENDER — PROJECTS
   ============================================ */
function renderProjects(container) {
  const projs = data.projects;

  const projectsHtml = projs.map(function(proj) {
    const ghLink = proj.github
      ? '<a href="' + esc(proj.github) + '" target="_blank" rel="noopener" class="project-gh">GitHub \u2192</a>'
      : '';

    const techStr = proj.tech.join(', ');

    return '<div class="project">' +
      '<div class="project-header">' +
        '<h3 class="project-title">' + esc(proj.title) + ' <span class="project-tech">\u2022 ' + esc(techStr) + '</span></h3>' +
        ghLink +
      '</div>' +
      '<p class="project-desc">' + esc(proj.description) + '</p>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<h2 class="section-title">Projects</h2>' +
    '<div class="projects">' + projectsHtml + '</div>';
}

/* ============================================
   RENDER — LEADERSHIP
   ============================================ */
function renderLeadership(container) {
  const items = data.leadership;

  const entriesHtml = items.map(function(item) {
    const bulletsHtml = item.bullets.map(function(b) {
      return '<li>' + esc(b) + '</li>';
    }).join('');

    return '<div class="entry">' +
      '<p class="entry-period">' + esc(item.period) + '</p>' +
      '<h3 class="entry-role">' + esc(item.role) + '</h3>' +
      '<p class="entry-meta">' + esc(item.org) + '<span class="entry-sep">\u00b7</span>' + esc(item.location) + '</p>' +
      '<ul class="entry-bullets">' + bulletsHtml + '</ul>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<h2 class="section-title">Leadership</h2>' +
    '<div class="entries">' + entriesHtml + '</div>';
}

/* ============================================
   RENDER — SKILLS
   ============================================ */
function renderSkills(container) {
  const skillsHtml = data.skills.map(function(group) {
    return '<div class="skill-group">' +
      '<p class="skill-cat">' + esc(group.category) + '</p>' +
      '<p class="skill-list">' + esc(group.items.join(', ')) + '</p>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<h2 class="section-title">Skills</h2>' +
    '<div class="skills">' + skillsHtml + '</div>';
}

/* ============================================
   RENDER — INTERESTS
   ============================================ */
function renderInterests(container) {
  const interestsHtml = data.hobbies.map(function(h) {
    return '<p class="interest">' + h.icon + ' ' + esc(h.label) + '</p>';
  }).join('');

  container.innerHTML =
    '<h2 class="section-title">Interests</h2>' +
    '<div class="interests">' + interestsHtml + '</div>';
}

/* ============================================
   RENDER — CONTACT
   ============================================ */
function renderContact(container) {
  const d = data;

  container.innerHTML =
    '<h2 class="section-title">Contact</h2>' +
    '<div class="contact-wrap">' +
      '<p class="contact-intro">' + esc(d.contactBlurb) + '</p>' +
      '<div class="contact-links">' +
        '<a href="mailto:' + esc(d.email) + '" class="contact-item">' +
          '<span class="contact-type">Email</span>' +
          '<span class="contact-value">' + esc(d.email) + '</span>' +
        '</a>' +
        '<a href="' + esc(d.github) + '" target="_blank" rel="noopener" class="contact-item">' +
          '<span class="contact-type">GitHub</span>' +
          '<span class="contact-value">Jfraile05 \u2197</span>' +
        '</a>' +
        '<a href="' + esc(d.linkedin) + '" target="_blank" rel="noopener" class="contact-item">' +
          '<span class="contact-type">LinkedIn</span>' +
          '<span class="contact-value">jorge-fraile \u2197</span>' +
        '</a>' +
      '</div>' +
      '<form class="contact-form" id="contact-form" novalidate>' +
        '<div class="form-row">' +
          '<div class="form-field">' +
            '<label class="form-label" for="cf-name">Name</label>' +
            '<input type="text" id="cf-name" name="name" class="form-input" placeholder="Your name" required />' +
          '</div>' +
          '<div class="form-field">' +
            '<label class="form-label" for="cf-email">Email</label>' +
            '<input type="email" id="cf-email" name="email" class="form-input" placeholder="your@email.com" required />' +
          '</div>' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="cf-message">Message</label>' +
          '<textarea id="cf-message" name="message" class="form-textarea" placeholder="What\'s on your mind?" required></textarea>' +
        '</div>' +
        '<div class="form-actions">' +
          '<button type="submit" class="form-submit">Send Message \u2197</button>' +
          '<p class="form-success" id="form-success">Sent \u2014 I\'ll be in touch soon.</p>' +
          '<p class="form-error" id="form-error">Something went wrong \u2014 email me directly.</p>' +
        '</div>' +
      '</form>' +
    '</div>';

  initContactForm();
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn  = form.querySelector('.form-submit');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const nameVal  = form.querySelector('[name="name"]').value.trim();
    const emailVal = form.querySelector('[name="email"]').value.trim();
    const msgVal   = form.querySelector('[name="message"]').value.trim();
    if (!nameVal || !emailVal || !msgVal) return;

    submitBtn.textContent = 'Sending\u2026';
    submitBtn.disabled = true;
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    try {
      const fd = new FormData();
      fd.append('name',    nameVal);
      fd.append('email',   emailVal);
      fd.append('message', msgVal);

      const res = await fetch('https://formspree.io/f/xlgovanz', {
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    fd
      });

      if (res.ok) {
        form.reset();
        submitBtn.style.display  = 'none';
        successMsg.style.display = 'block';
      } else {
        throw new Error();
      }
    } catch (_) {
      errorMsg.style.display = 'block';
      submitBtn.textContent  = 'Send Message \u2197';
      submitBtn.disabled     = false;
    }
  });
}

/* ============================================
   SECTION ROUTER
   ============================================ */
const SECTIONS = ['about', 'experience', 'projects', 'leadership', 'skills', 'interests', 'contact'];

const renderers = {
  about:      renderAbout,
  experience: renderExperience,
  projects:   renderProjects,
  leadership: renderLeadership,
  skills:     renderSkills,
  interests:  renderInterests,
  contact:    renderContact
};

function renderSection(id) {
  const main = document.getElementById('site-main');
  main.innerHTML = '';
  main.classList.remove('is-about');
  if (renderers[id]) renderers[id](main);
}

function updateNav(id) {
  document.querySelectorAll('.nav-link').forEach(function(a) {
    a.classList.toggle('active', a.dataset.section === id);
  });
}

function showSection(id, animate) {
  if (!SECTIONS.includes(id)) id = 'about';
  if (id === currentSection) return;

  const main = document.getElementById('site-main');

  if (animate === false) {
    // Initial load — no transition
    currentSection = id;
    renderSection(id);
    updateNav(id);
    return;
  }

  // Fade out
  main.style.opacity   = '0';
  main.style.transform = 'translateY(8px)';

  setTimeout(function() {
    currentSection = id;
    renderSection(id);
    updateNav(id);
    window.scrollTo(0, 0);
    history.replaceState(null, '', '#' + id);

    // Fade in (two rAF to ensure paint between innerHTML change and transition)
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        main.style.opacity   = '1';
        main.style.transform = 'translateY(0)';
      });
    });
  }, 160);
}

/* ============================================
   NAV CLICK HANDLER
   ============================================ */
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    showSection(link.dataset.section, true);
  });
});

/* ============================================
   FOOTER
   ============================================ */
(function() {
  var el = document.getElementById('footer-copy');
  if (el) el.textContent = '\u00a9 ' + new Date().getFullYear() + ' Jorge Fraile Perez';
})();

/* ============================================
   INIT
   ============================================ */
(function() {
  var hash = location.hash.slice(1);
  var start = SECTIONS.includes(hash) ? hash : 'about';
  showSection(start, false);
})();
