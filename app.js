/* ============================================
   PORTFOLIO DATA MODEL
   Edit this object or use the ✏️ button on the page.
   ============================================ */
const DEFAULT_DATA = {
  name:         "Jorge Fraile",
  initials:     "JF",
  title:        "Computer Science Student @ Florida State University",
  tagline:      "Building elegant solutions to complex problems — one commit at a time.",
  resume:       "#",
  about:        "I'm a Junior studying Computer Science at Florida State University, passionate about full-stack development, algorithms, and building tools that make a difference. I thrive in fast-paced environments and love turning complex problems into clean, maintainable solutions. Currently looking for summer internship opportunities in software engineering.",
  contactBlurb: "I'm actively looking for software engineering internships and co-op opportunities. If you have an opening or just want to connect, my inbox is always open.",
  email:        "jfraile@fsu.edu",
  github:       "https://github.com/Jfraile05",
  linkedin:     "https://linkedin.com/in/jfraile",
  projects: [
    {
      id: 1,
      title:       "Campus Event Tracker",
      description: "A full-stack web app that aggregates FSU campus events in real time, letting students discover, filter, and RSVP to events based on their interests and major.",
      tech:        ["React", "Node.js", "MongoDB", "REST API"],
      github:      "https://github.com/Jfraile05",
      demo:        "#"
    },
    {
      id: 2,
      title:       "Study Buddy App",
      description: "A peer-matching platform for FSU students to find study partners by course, availability, and learning style — with real-time chat and shared note uploads.",
      tech:        ["Python", "Flask", "PostgreSQL", "WebSocket"],
      github:      "https://github.com/Jfraile05",
      demo:        "#"
    },
    {
      id: 3,
      title:       "Algorithm Visualizer",
      description: "An interactive browser-based tool for visualizing sorting and pathfinding algorithms with step-by-step animation controls and Big-O complexity display.",
      tech:        ["JavaScript", "HTML Canvas", "CSS"],
      github:      "https://github.com/Jfraile05",
      demo:        "#"
    }
  ],
  skills: [
    { category: "Languages",   items: ["Python", "Java", "C++", "JavaScript", "SQL", "Bash"] },
    { category: "Frameworks",  items: ["React", "Node.js", "Express", "Flask", "Spring Boot"] },
    { category: "Tools",       items: ["Git", "Docker", "Linux", "VS Code", "Postman", "Figma"] },
    { category: "Databases",   items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"] }
  ],
  hobbies: [
    { icon: "🎮", label: "Game Development" },
    { icon: "🏋️", label: "Weightlifting" },
    { icon: "🎵", label: "Music Production" },
    { icon: "♟️", label: "Chess" },
    { icon: "🚀", label: "Hackathons" },
    { icon: "📚", label: "Reading" },
    { icon: "🌐", label: "Open Source" },
    { icon: "🎨", label: "UI Design" }
  ]
};

/* ============================================
   STORAGE
   ============================================ */
const STORAGE_KEY = 'portfolio_v1';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
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

/* Make a single element inline-editable and persist on blur.
   `saver` is a function() that writes the current textContent
   back to the data model. */
function makeEditable(element, saver) {
  element.dataset.editTarget = '1';
  element.addEventListener('blur', () => {
    if (!editMode) return;
    saver(element.textContent.trim());
    saveData();
  });
  // Prevent accidental link navigation while editing
  if (element.tagName === 'A') {
    element.addEventListener('click', e => {
      if (editMode) e.preventDefault();
    });
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

/* ============================================
   SECTION HEADER
   ============================================ */
function sectionHeader(num, title) {
  const h = el('div', 'section-header');
  h.append(
    txt('span', 'section-label', num),
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

  const eyebrow = txt('div', 'hero-eyebrow', 'Portfolio');

  const name = txt('h1', 'hero-name', data.name);
  makeEditable(name, v => {
    data.name = v;
    data.initials = v.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
    document.getElementById('nav-logo').textContent = data.initials;
    document.querySelector('.hero-avatar').textContent = data.initials;
  });

  const title = txt('p', 'hero-title', data.title);
  makeEditable(title, v => { data.title = v; });

  const tagline = txt('p', 'hero-tagline', data.tagline);
  makeEditable(tagline, v => { data.tagline = v; });

  const actions = el('div', 'hero-actions');

  const resumeBtn = el('a', 'btn btn-primary');
  resumeBtn.href = data.resume || '#';
  resumeBtn.target = '_blank';
  resumeBtn.innerHTML = '↗ Resume';
  makeEditable(resumeBtn, v => { data.resume = v; });

  const contactBtn = el('a', 'btn btn-outline');
  contactBtn.href = '#contact';
  contactBtn.textContent = 'Get in Touch';

  actions.append(resumeBtn, contactBtn);
  left.append(eyebrow, name, title, tagline, actions);

  const avatar = txt('div', 'hero-avatar', data.initials || 'JF');
  makeEditable(avatar, v => { data.initials = v.slice(0, 2).toUpperCase(); });

  inner.append(left, avatar);
  section.append(inner);
}

/* ============================================
   ABOUT
   ============================================ */
function renderAbout() {
  const section = document.getElementById('about');
  section.innerHTML = '';
  section.append(sectionHeader('01', 'About Me'));

  const p = txt('p', 'about-text', data.about);
  makeEditable(p, v => { data.about = v; });
  section.append(p);
}

/* ============================================
   PROJECTS
   ============================================ */
function renderProjects() {
  const section = document.getElementById('projects');
  section.innerHTML = '';
  section.append(sectionHeader('02', 'Projects'));

  const grid = el('div', 'projects-grid');
  data.projects.forEach((proj, i) => grid.append(buildProjectCard(proj, i)));
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
    if (editMode) enableAllEditing();
  });
  section.append(addBtn);
}

function buildProjectCard(proj, idx) {
  const card = el('div', 'project-card');

  /* delete button */
  const delBtn = txt('button', 'delete-btn card-delete', '✕ Remove');
  delBtn.addEventListener('click', () => {
    data.projects.splice(idx, 1);
    saveData();
    renderProjects();
    if (editMode) enableAllEditing();
  });
  card.append(delBtn);

  /* title */
  const title = txt('h3', 'project-title', proj.title);
  makeEditable(title, v => { data.projects[idx].title = v; });
  card.append(title);

  /* description */
  const desc = txt('p', 'project-desc', proj.description);
  makeEditable(desc, v => { data.projects[idx].description = v; });
  card.append(desc);

  /* tech tags */
  const tagsWrap = el('div', 'tech-tags');
  proj.tech.forEach((t, ti) => {
    const tag = txt('span', 'tech-tag', t);
    makeEditable(tag, v => { data.projects[idx].tech[ti] = v; });

    const delTag = txt('button', 'delete-btn', '✕');
    delTag.style.cssText = 'margin-left:4px;padding:0 3px;font-size:0.6rem;';
    delTag.addEventListener('click', (e) => {
      e.stopPropagation();
      data.projects[idx].tech.splice(ti, 1);
      saveData();
      renderProjects();
      if (editMode) enableAllEditing();
    });
    tag.append(delTag);
    tagsWrap.append(tag);
  });

  const addTagBtn = txt('button', 'add-tag-btn', '+ tag');
  addTagBtn.addEventListener('click', () => {
    data.projects[idx].tech.push('New');
    saveData();
    renderProjects();
    if (editMode) enableAllEditing();
  });
  tagsWrap.append(addTagBtn);
  card.append(tagsWrap);

  /* links */
  const links = el('div', 'project-links');

  const ghLink = el('a', 'project-link');
  ghLink.href = proj.github; ghLink.target = '_blank';
  ghLink.textContent = '⌥ GitHub';
  makeEditable(ghLink, v => { data.projects[idx].github = v; });

  const demoLink = el('a', 'project-link');
  demoLink.href = proj.demo; demoLink.target = '_blank';
  demoLink.textContent = '↗ Live Demo';
  makeEditable(demoLink, v => { data.projects[idx].demo = v; });

  links.append(ghLink, demoLink);
  card.append(links);

  /* 3-D tilt on hover */
  card.addEventListener('mousemove', e => {
    if (editMode) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });

  return card;
}

/* ============================================
   SKILLS
   ============================================ */
function renderSkills() {
  const section = document.getElementById('skills');
  section.innerHTML = '';
  section.append(sectionHeader('03', 'Skills'));

  const grid = el('div', 'skills-grid');

  data.skills.forEach((group, gi) => {
    const card = el('div', 'skill-group');

    const delGroup = txt('button', 'delete-btn', '✕ Group');
    delGroup.style.cssText = 'float:right;margin-bottom:4px;';
    delGroup.addEventListener('click', () => {
      data.skills.splice(gi, 1);
      saveData();
      renderSkills();
      if (editMode) enableAllEditing();
    });
    card.append(delGroup);

    const cat = txt('div', 'skill-category', group.category);
    makeEditable(cat, v => { data.skills[gi].category = v; });
    card.append(cat);

    const chipsWrap = el('div', 'skill-chips');
    group.items.forEach((skill, si) => {
      const chip = txt('span', 'skill-chip', skill);
      makeEditable(chip, v => { data.skills[gi].items[si] = v; });

      const delChip = txt('button', 'delete-btn', '✕');
      delChip.style.cssText = 'padding:0 3px;font-size:0.6rem;margin-left:3px;';
      delChip.addEventListener('click', (e) => {
        e.stopPropagation();
        data.skills[gi].items.splice(si, 1);
        saveData();
        renderSkills();
        if (editMode) enableAllEditing();
      });
      chip.append(delChip);
      chipsWrap.append(chip);
    });

    const addChip = txt('button', 'add-tag-btn', '+ skill');
    addChip.addEventListener('click', () => {
      data.skills[gi].items.push('New');
      saveData();
      renderSkills();
      if (editMode) enableAllEditing();
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
    if (editMode) enableAllEditing();
  });

  section.append(grid, addGroup);
}

/* ============================================
   HOBBIES
   ============================================ */
function renderHobbies() {
  const section = document.getElementById('hobbies');
  section.innerHTML = '';
  section.append(sectionHeader('04', 'Hobbies & Interests'));

  const grid = el('div', 'hobbies-grid');

  data.hobbies.forEach((h, i) => {
    const chip = el('div', 'hobby-chip');

    const icon = txt('span', 'hobby-icon', h.icon);
    makeEditable(icon, v => { data.hobbies[i].icon = v.trim() || h.icon; });

    const label = txt('span', 'hobby-label', h.label);
    makeEditable(label, v => { data.hobbies[i].label = v; });

    const delBtn = txt('button', 'delete-btn', '✕');
    delBtn.style.cssText = 'margin-left:6px;padding:0 4px;font-size:0.6rem;';
    delBtn.addEventListener('click', () => {
      data.hobbies.splice(i, 1);
      saveData();
      renderHobbies();
      if (editMode) enableAllEditing();
    });

    chip.append(icon, label, delBtn);
    grid.append(chip);
  });

  const addHobby = txt('button', 'add-btn', '+ Add Hobby');
  addHobby.addEventListener('click', () => {
    data.hobbies.push({ icon: '⭐', label: 'New Hobby' });
    saveData();
    renderHobbies();
    if (editMode) enableAllEditing();
  });

  section.append(grid, addHobby);
}

/* ============================================
   CONTACT
   ============================================ */
function renderContact() {
  const section = document.getElementById('contact');
  section.innerHTML = '';
  section.append(sectionHeader('05', 'Get In Touch'));

  const inner = el('div', 'contact-inner');

  const blurb = txt('p', 'contact-blurb', data.contactBlurb);
  makeEditable(blurb, v => { data.contactBlurb = v; });

  const links = el('div', 'contact-links');

  const emailLink = el('a', 'contact-link');
  emailLink.href = `mailto:${data.email}`;
  emailLink.textContent = `✉ ${data.email}`;
  makeEditable(emailLink, v => {
    data.email = v.replace('✉ ', '').trim();
    emailLink.href = `mailto:${data.email}`;
  });

  const ghLink = el('a', 'contact-link');
  ghLink.href = data.github; ghLink.target = '_blank';
  ghLink.textContent = '⌥ GitHub';
  makeEditable(ghLink, v => { data.github = v; ghLink.href = v; });

  const liLink = el('a', 'contact-link');
  liLink.href = data.linkedin; liLink.target = '_blank';
  liLink.textContent = '⬡ LinkedIn';
  makeEditable(liLink, v => { data.linkedin = v; liLink.href = v; });

  links.append(emailLink, ghLink, liLink);
  inner.append(blurb, links);
  section.append(inner);
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
    showToast('✏️  Edit mode — click any text to edit. Saves automatically.');
  } else {
    disableAllEditing();
    showToast('🔒  View mode — all changes saved.');
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
  document.getElementById('nav-logo').textContent =
    data.initials || data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  renderHero();
  renderAbout();
  renderProjects();
  renderSkills();
  renderHobbies();
  renderContact();

  // Footer
  const existing = document.querySelector('footer');
  if (existing) existing.remove();
  const footer = document.createElement('footer');
  footer.innerHTML = `© ${new Date().getFullYear()} ${data.name} &nbsp;·&nbsp; Built with HTML, CSS &amp; JS &nbsp;·&nbsp; GitHub Pages`;
  document.querySelector('main').after(footer);
}

render();
