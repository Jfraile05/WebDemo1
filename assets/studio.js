const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const preference = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : preference.matches;
function labelTheme() { themeButton.setAttribute('aria-label', isDark() ? 'Use light colors' : 'Use dark colors'); }
labelTheme();
preference.addEventListener('change', labelTheme);
themeButton.addEventListener('click', () => {
  const theme = isDark() ? 'light' : 'dark';
  root.dataset.theme = theme;
  try { localStorage.setItem('lodestar-theme', theme); } catch {}
  labelTheme();
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
matchMedia('(min-width: 851px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const form = document.getElementById('leadform');
const status = document.getElementById('lstatus');
const submit = form.querySelector('[type=submit]');
const field = name => form.elements.namedItem(name);
function report(message, type = '') { status.textContent = message; status.className = 'form-status ' + type; }
form.addEventListener('input', event => event.target.removeAttribute('aria-invalid'));
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled) return;
  const invalid = ['name', 'email', 'message'].map(field).find(input => !input.value.trim() || !input.checkValidity() || (input.name === 'email' && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(input.value.trim())));
  if (invalid) {
    invalid.setAttribute('aria-invalid', 'true');
    report(invalid.name === 'email' && invalid.value.trim() ? 'Please enter a valid email address so I can reply.' : 'Please add your name, email, and a little about your project.', 'err');
    invalid.focus();
    return;
  }
  submit.disabled = true;
  report('Sending your idea...');
  const body = Object.fromEntries(['name', 'email', 'company', 'service', 'message', 'website'].map(name => [name, field(name).value.trim()]));
  try {
    const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (response.status === 429) { report('A few messages have already been sent. Please try again later or email me directly.', 'err'); return; }
    if (!response.ok) throw new Error('Delivery failed');
    form.reset();
    report("Thanks for telling me about your project. I'll usually get back to you within a day.", 'ok');
  } catch {
    report('Your message did not send. Please try again or email Jorge@JorgeFraile.com.', 'err');
  } finally {
    submit.disabled = false;
  }
});

const runButton = document.getElementById('run-example');
const demoStatus = document.getElementById('demo-status');
const steps = [...document.querySelectorAll('[data-step]')];
const captions = [
  'A customer sends an inquiry from your website.',
  'The details go into your CRM, ready for you to review.',
  'A follow-up task is created so you know what needs your attention.',
  'Inquiry received. Details organized. Follow-up ready. One less thing to copy by hand.'
];
let machine = null;
let fallbackTimers = [];
function showStep(step) {
  steps.forEach((item, index) => item.classList.toggle('active', index <= step));
  demoStatus.textContent = captions[step];
  if (step === 3) {
    runButton.disabled = false;
    runButton.innerHTML = '<span class="play-icon" aria-hidden="true"></span>Run it again';
  }
}
runButton.addEventListener('click', () => {
  if (runButton.disabled) return;
  runButton.disabled = true;
  steps.forEach(item => item.classList.remove('active'));
  if (machine?.run(showStep)) return;
  fallbackTimers.forEach(clearTimeout);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { showStep(3); return; }
  showStep(0);
  fallbackTimers = [1, 2, 3].map(step => setTimeout(() => showStep(step), step * 1500));
});
const rotateLeft = document.getElementById('rotate-left');
const rotateRight = document.getElementById('rotate-right');
rotateLeft.disabled = true;
rotateRight.disabled = true;
rotateLeft.addEventListener('click', () => machine?.rotate(-0.22));
rotateRight.addEventListener('click', () => machine?.rotate(0.22));
try {
  const { initAutomationScene } = await import('./automation-scene.js');
  machine = initAutomationScene(document.getElementById('automation-scene'));
  rotateLeft.disabled = !machine;
  rotateRight.disabled = !machine;
  if (!machine) document.querySelector('.rotate-controls').hidden = true;
} catch {
  document.querySelector('.rotate-controls').hidden = true;
}
window.addEventListener('pagehide', event => {
  if (event.persisted) return;
  machine?.dispose();
  fallbackTimers.forEach(clearTimeout);
});
