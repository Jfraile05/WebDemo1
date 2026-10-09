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

// Each example is one made-up errand. All of the demo's words live here.
const SCENARIOS = {
  order: {
    title: 'A web order',
    business: 'Little Fern Bakery',
    day: 'Thursday',
    service: { glyph: '↳', name: 'Connecting the apps you already use' },
    rows: [
      { time: '9:12 pm', text: 'Dana orders 3 dozen cupcakes on your website. You closed at 6.' },
      { time: '9:12 pm', lead: 'New order.', text: 'It goes on your order sheet for Saturday at noon.' },
      { time: '9:13 pm', text: 'It emails Dana that you have it. Your note: send her a price.' },
    ],
    wait: null,
    close: 'In the morning, you check one note instead of digging through your inbox.',
    color: '#506048',
    visual: { glyph: 'form', sector: 0, approval: false },
  },
  call: {
    title: 'A missed call',
    business: 'Ortega Plumbing',
    day: 'Tuesday',
    service: { glyph: '◔', name: "Answering customers when you can't" },
    rows: [
      { time: '7:42 pm', text: "Marcus calls while you're under a sink. It texts him back." },
      { time: '7:43 pm', lead: 'Booking.', text: 'He says his sink is leaking. It finds Wednesday at 9\u00a0am.' },
      { time: '7:44 pm', text: 'It texts Marcus the time and puts the job on your calendar.' },
    ],
    wait: null,
    close: "If he'd said water was everywhere, it would have called your cell right away.",
    color: '#b44432',
    visual: { glyph: 'call', sector: 1, approval: false },
  },
  email: {
    title: 'An email question',
    business: 'Greenleaf Lawn Care',
    day: 'Monday',
    service: { glyph: '✳', name: 'AI that has a specific job' },
    rows: [
      { time: '7:05 am', text: 'Priya emails: do you do leaf cleanup in Killearn? How much?' },
      { time: '7:06 am', lead: 'Question.', text: 'It checks your price sheet and drafts a reply.' },
      { time: '7:31 am', text: "You say OK. The reply goes to Priya and she's added to your list." },
    ],
    wait: { time: '7:06 am', text: 'The draft waits for you. Nothing goes out until you say so.' },
    close: 'It answered from your own price sheet. You decided when it went out.',
    color: '#351e37',
    visual: { glyph: 'email', sector: 2, approval: true },
  },
};
const ORDER = ['order', 'call', 'email'];

const demo = document.getElementById('demo');
const demoStatus = document.getElementById('demo-status');
const stage = demo.querySelector('.machine-stage');
const chips = [...demo.querySelectorAll('.demo-chip')];
const labels = [...demo.querySelectorAll('.dymo')];
const approveButton = document.getElementById('approve-example');
const receipt = demo.querySelector('.demo-receipt');
const receiptTitle = receipt.querySelector('.receipt-title');
const receiptRows = [...receipt.querySelectorAll('.receipt-rows li')];
const receiptClose = receipt.querySelector('.receipt-close');
const receiptService = receipt.querySelector('.receipt-service');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let machine = null;
let fallbackTimers = [];
let usingFallback = false;
let current = 'order';
let approvedAt = -Infinity;
demo.dataset.state = 'idle';

// Beats that land in the same task are read out as one message.
let pendingAnnouncement = '';
const announce = message => {
  if (!pendingAnnouncement) queueMicrotask(() => { demoStatus.textContent = pendingAnnouncement; pendingAnnouncement = ''; });
  pendingAnnouncement += (pendingAnnouncement ? ' ' : '') + message;
};
const rowLine = row => `${row.time}. ${row.lead ? row.lead + ' ' : ''}${row.text}`;
function fillRow(item, row, mark) {
  item.querySelector('.receipt-mark').textContent = mark;
  item.querySelector('.receipt-time').textContent = row.time;
  const text = item.querySelector('.receipt-text');
  text.textContent = row.text;
  if (!row.lead) return;
  const lead = document.createElement('b');
  lead.className = 'receipt-lead';
  lead.textContent = row.lead;
  text.prepend(lead, ' ');
}
function printRow(number, row, waiting = false) {
  const item = receiptRows[number - 1];
  fillRow(item, row, waiting ? '' : String(number));
  item.classList.toggle('waiting', waiting);
  if (item.classList.contains('printed')) {
    item.classList.remove('printed');
    void item.offsetWidth; // Restart the print wipe for a reprinted line.
  }
  item.classList.add('printed');
}
function renderReceipt(key) {
  const scenario = SCENARIOS[key];
  receiptTitle.textContent = `${scenario.business} · ${scenario.day}`;
  const glyph = document.createElement('span');
  glyph.setAttribute('aria-hidden', 'true');
  glyph.textContent = scenario.service.glyph;
  receiptService.replaceChildren(glyph, ' ' + scenario.service.name);
  receipt.style.setProperty('--mark', scenario.color);
  receiptRows.forEach((item, index) => {
    fillRow(item, scenario.rows[index], String(index + 1));
    item.classList.remove('printed', 'waiting');
  });
  receiptClose.firstElementChild.textContent = scenario.close;
  receiptClose.classList.remove('printed');
  void receipt.offsetWidth; // Restart the print wipe when row 1 prints in this same task.
}
// Tape sizes only change when a tape lights, the approval wait starts or ends, the fonts load or the stage resizes, so they are measured then and not every frame.
let tapeSizes = null;
let tapeStageWidth = 0;
let labelTimer = 0;
document.fonts?.ready.then(() => { tapeSizes = null; });
function activateLabel(station) {
  clearTimeout(labelTimer);
  labels.forEach((label, index) => label.classList.toggle('is-active', index + 1 === station));
  tapeSizes = null;
}
function placeLabels(points, width) {
  if (!tapeSizes?.[0][0] || width !== tapeStageWidth) {
    tapeSizes = labels.map(label => [label.offsetWidth, label.offsetHeight + (label.classList.contains('is-active') ? 2 : 0)]);
    tapeStageWidth = width;
  }
  // Turned toward the left limit, Take in drifts under Sort. Slide it left until the tapes clear.
  const [[x1, y1], [x2, y2]] = points;
  const [[w1, h1], [w2, h2]] = tapeSizes;
  const push = y1 - h1 < y2 && y2 - h2 < y1 ? Math.max(0, x1 + w1 / 2 + 4 - (x2 - w2 / 2)) : 0;
  points.forEach(([x, y, shown], index) => {
    const left = index ? x : x - push;
    const [w, h] = tapeSizes[index];
    labels[index].style.transform = `translate3d(${left}px,${y}px,0) translate(-50%,calc(-100% - var(--lift,0px))) rotate(-2deg)`;
    // A tape that would be cut by the stage edge hides at once, before any of it is clipped. Only the way back in fades.
    labels[index].classList.toggle('is-away', !(shown && left - w / 2 >= 0 && left + w / 2 <= width && y - h >= 0));
  });
}

function onBeat(beat) {
  const scenario = SCENARIOS[current];
  if (beat === 'wait') {
    printRow(3, scenario.wait, true);
    // While it waits, Sort stays lit next to the glowing button. In the compact layout the CSS keeps it to its number so it does not cover the button.
    activateLabel(2);
    approveButton.hidden = false;
    demo.dataset.state = 'waiting';
    const { top, bottom } = approveButton.getBoundingClientRect();
    const active = document.activeElement;
    // A focused rotate button is about to be hidden, so its focus always moves. A chip only hands focus over when the button is fully on screen.
    if (stage.contains(active) || (chips.includes(active) && top >= 0 && bottom <= innerHeight)) approveButton.focus({ preventScroll: true });
    announce(`${scenario.wait.time}. ${scenario.wait.text} Press Looks good, send it.`);
  } else if (beat === 'done') {
    receiptClose.classList.add('printed');
    activateLabel(0);
    demo.dataset.state = 'done';
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    chips.find(chip => chip.dataset.example === next).classList.add('nudge');
    announce(`${scenario.close} Next, try ${SCENARIOS[next].title}.`);
  } else {
    // The slip drops in past the Take in tape, so that tape lights once the slip lands.
    if (beat === 1 && !reducedMotion.matches) labelTimer = setTimeout(() => activateLabel(1), 350);
    else activateLabel(beat);
    // After an approval, row 3 is already printed and announced.
    if (beat === 3 && scenario.wait) return;
    printRow(beat, scenario.rows[beat - 1]);
    announce((beat === 1 ? `Made-up example for ${scenario.business}. ` : '') + rowLine(scenario.rows[beat - 1]));
  }
}

function clearFallback() {
  fallbackTimers.forEach(clearTimeout);
  fallbackTimers = [];
}
const later = (delay, beat) => fallbackTimers.push(setTimeout(() => onBeat(beat), delay));
// Without the 3D scene, the same beats run on timers.
function fallbackRun(key) {
  const { visual } = SCENARIOS[key];
  const reduced = reducedMotion.matches;
  onBeat(1);
  later(reduced ? 2400 : 2700, 2);
  if (visual.approval) later(reduced ? 4800 : 4400, 'wait');
  else if (reduced) {
    fallbackTimers.push(setTimeout(() => { onBeat(3); onBeat('done'); }, 4800));
  } else {
    later(4400, 3);
    later(5800, 'done');
  }
}
function resumeFallback() {
  if (reducedMotion.matches) {
    onBeat(3);
    onBeat('done');
    return;
  }
  later(900, 3);
  later(2300, 'done');
}

function play(key) {
  clearFallback();
  current = key;
  chips.forEach(chip => {
    chip.classList.remove('nudge');
    if (chip.dataset.example === key) chip.setAttribute('aria-current', 'true');
    else chip.removeAttribute('aria-current');
  });
  renderReceipt(key);
  activateLabel(0);
  demo.dataset.state = 'running';
  approveButton.hidden = true;
  usingFallback = !machine?.run(SCENARIOS[key].visual, onBeat);
  // A timer run keeps the drawing up even if the 3D scene comes back partway through.
  demo.dataset.path = usingFallback ? 'timer' : '3d';
  if (!usingFallback) return;
  machine?.reset();
  fallbackRun(key);
}
// Focus lands on the chip after approving, so a second Enter or Space there should not restart the example.
chips.forEach(chip => chip.addEventListener('click', () => { if (performance.now() - approvedAt >= 600) play(chip.dataset.example); }));
demo.querySelector('.demo-picker').addEventListener('keydown', event => { if (event.repeat && event.key === 'Enter') event.preventDefault(); });
approveButton.addEventListener('click', () => {
  if (demo.dataset.state !== 'waiting') return;
  const row = SCENARIOS[current].rows[2];
  printRow(3, row);
  announce(rowLine(row));
  const focused = document.activeElement === approveButton;
  approvedAt = performance.now();
  approveButton.hidden = true;
  demo.dataset.state = 'running';
  // In the compact layout Sort grows back to its full tape.
  tapeSizes = null;
  if (focused) chips.find(chip => chip.dataset.example === current).focus();
  if (usingFallback) resumeFallback();
  else machine?.approve();
});

const rotateLeft = document.getElementById('rotate-left');
const rotateRight = document.getElementById('rotate-right');
rotateLeft.disabled = true;
rotateRight.disabled = true;
// A double click on approve should not also turn the machine through the rotate button that takes its place.
const rotateBy = delta => () => { if (performance.now() - approvedAt >= 400) machine?.rotate(delta); };
rotateLeft.addEventListener('click', rotateBy(-0.22));
rotateRight.addEventListener('click', rotateBy(0.22));
// Losing the 3D scene hides the rotate buttons, so a focused one hands focus to the current chip.
document.getElementById('automation-scene').addEventListener('webglcontextlost', () => {
  if (document.activeElement === rotateLeft || document.activeElement === rotateRight) chips.find(chip => chip.dataset.example === current).focus({ preventScroll: true });
}, true);
try {
  const { initAutomationScene } = await import('./automation-scene.js');
  machine = initAutomationScene(document.getElementById('automation-scene'), { onLayout: placeLabels });
  rotateLeft.disabled = !machine;
  rotateRight.disabled = !machine;
  if (!machine) document.querySelector('.rotate-controls').hidden = true;
} catch {
  document.querySelector('.rotate-controls').hidden = true;
}
window.addEventListener('pagehide', event => {
  if (event.persisted) return;
  machine?.dispose();
  clearFallback();
});
