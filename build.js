// Static site generator: `node build.js` writes all HTML pages to the project root.
const fs = require("fs");
const path = require("path");
const legal = require("./legal");

// ---- Edit these once and re-run `node build.js` ----
const SITE = {
  name: "CaliPartner",
  domain: "https://calipartner.app",
  email: "support@calipartner.app",
  legalName: "CaliPartner",
  address: "India",
  playUrl: "#",
  appStoreUrl: "#",
  updated: "6 October 2026",
};

const I = {
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  food: '<path d="M4 3v7a3 3 0 0 0 3 3v8M10 3v7a3 3 0 0 1-3 3M7 3v7M18 21V3c-2.5 1.5-4 4.5-4 8v3h4"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
  drop: '<path d="M12 2.7s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11z"/>',
  steps: '<path d="M4 16c0-2 1.5-3 3-3s2 1 2 3-1 4-3 4-2-2-2-4zM13 8c0-2 1-4 3-4s3 1.5 3 3.5-1.5 3.5-3 3.5S13 10 13 8z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  trophy: '<path d="M4 19h16M7 19V9M17 19V9M7 9h10M12 9V5M9 5h6"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>',
  heart: '<path d="M12 21s-8-5.3-8-11a5 5 0 0 1 8-3.9A5 5 0 0 1 20 10c0 5.7-8 11-8 11z"/>',
  hand: '<path d="M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V4a1.5 1.5 0 0 1 3 0v7M15 11V7a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7c-3 0-4.5-1.5-6-4l-2-3a1.5 1.5 0 0 1 2.3-1.8L9 15"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-4-1-7-4-9 0 4-4 6-4 12 0 4 3 8 7 8z"/>',
};
const icon = (n, cls = "") => `<div class="icon-chip ${cls}"><svg viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg></div>`;

const logo = `<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11" fill="none" stroke="#2a353f" stroke-width="2"/><path d="M14 3a11 11 0 0 1 0 22" fill="none" stroke="#b3de3e" stroke-width="3" stroke-linecap="round"/><path d="M14 25a11 11 0 0 1 0-22" fill="none" stroke="#50e0fa" stroke-width="3" stroke-linecap="round" stroke-dasharray="40 100"/><line x1="14" y1="6" x2="14" y2="22" stroke="#edf2f6" stroke-width="1.4"/></svg>`;

const playIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2.5v19l10-9.5z" fill="#50e0fa"/><path d="M14 12l3.2-3.2L6 2.4z" fill="#b3de3e"/><path d="M14 12l-8 9.6 11.2-6.4z" fill="#f2b13c"/><path d="M17.2 8.8L14 12l3.2 3.2 3.4-1.9c1-.6 1-2 0-2.6z" fill="#ff5a5a"/></svg>`;
const appleIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#edf2f6"><path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.200-.8-1.600 0-3.200 1-4 2.400-1.700 3-.4 7.400 1.200 9.800.8 1.200 1.800 2.500 3 2.500 1.200 0 1.700-.8 3.200-.8s1.900.8 3.200.8 2.100-1.200 2.900-2.400c.9-1.300 1.300-2.600 1.300-2.700-.1 0-2.500-1-2.500-3.800zM14 5.400c.7-.8 1.100-1.900 1-3-.9 0-2.100.6-2.800 1.400-.6.700-1.100 1.800-1 2.900 1 .1 2.100-.5 2.800-1.300z"/></svg>`;
const stores = `<div class="store-row">
  <a class="store-btn" href="${SITE.playUrl}" id="btn-google-play">${playIcon}<span><small>Get it on</small><strong>Google Play</strong></span></a>
  <a class="store-btn" href="${SITE.appStoreUrl}" id="btn-app-store">${appleIcon}<span><small>Download on the</small><strong>App Store</strong></span></a>
</div>`;

const NAV = [
  ["index.html", "Home"],
  ["features.html", "Features"],
  ["pricing.html", "Pricing"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function layout({ file, title, desc, body, bare }) {
  const nav = NAV.map(([f, l]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#090d11">
<link rel="canonical" href="${SITE.domain}/${file === "index.html" ? "" : file}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="index.html" id="nav-brand">${logo}${SITE.name}</a>
    <div class="nav-links" id="nav-links">${nav}</div>
    <div style="display:flex;gap:8px;align-items:center">
      <a class="btn btn-primary btn-sm" href="index.html#download" id="nav-download">Get the app</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="index.html">${logo}${SITE.name}</a>
        <p>One app for you and your people. Track food, water, steps and workouts, and see your day next to your partner's.</p>
        ${stores}
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="features.html">Features</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="index.html#faq">FAQ</a></li>
        <li><a href="about.html">About us</a></li>
      </ul></div>
      <div><h4>Legal</h4><ul>
        <li><a href="terms.html">Terms and conditions</a></li>
        <li><a href="privacy.html">Privacy policy</a></li>
        <li><a href="refund-policy.html">Refund and cancellation</a></li>
        <li><a href="community-guidelines.html">Community guidelines</a></li>
        <li><a href="child-safety.html">Child safety</a></li>
      </ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="contact.html">Contact us</a></li>
        <li><a href="delete-account.html">Delete your account</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2026 ${SITE.legalName}. All rights reserved.</span>
      <span>CaliPartner is a fitness and habit-tracking app. It is not a medical service.</span>
    </div>
  </div>
</footer>
<script src="js/main.js"></script>
</body>
</html>`;
}

const pageHead = (h, lead) => `<section class="page-head"><div class="wrap"><h1>${h}</h1><p class="lead">${lead}</p></div></section>`;
const cta = `<section class="section tight" id="download"><div class="wrap"><div class="cta">
  <h2>Find your person. Start today.</h2>
  <p class="lead">Free to download on Android and iOS. Solo logging is free forever.</p>
  ${stores}
</div></div></section>`;

// ---------- reusable visual: the paired room card ----------
function ringSvg(a, b) {
  const c1 = 2 * Math.PI * 70, c2 = 2 * Math.PI * 58;
  return `<svg viewBox="0 0 160 160" role="img" aria-label="Your goal, ${a} percent complete. Priya's goal, ${b} percent complete.">
    <circle cx="80" cy="80" r="70" fill="none" stroke="#182028" stroke-width="10"/>
    <circle cx="80" cy="80" r="58" fill="none" stroke="#182028" stroke-width="7"/>
    <circle cx="80" cy="80" r="70" fill="none" stroke="#b3de3e" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(c1 * a / 100).toFixed(1)} ${c1.toFixed(1)}"/>
    <circle cx="80" cy="80" r="58" fill="none" stroke="#50e0fa" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(c2 * b / 100).toFixed(1)} ${c2.toFixed(1)}"/>
  </svg>`;
}
const meals = (l, r) => ["Breakfast", "Lunch", "Dinner", "Snacks"].map((m, i) =>
  `<div class="meal"><span>${m}</span><span class="dot ${l[i] ? "fa" : ""}"></span></div>`).join("");
const mealsR = (r) => ["Breakfast", "Lunch", "Dinner", "Snacks"].map((m, i) =>
  `<div class="meal"><span>${m}</span><span class="dot ${r[i] ? "fb" : ""}"></span></div>`).join("");

function phone() {
  return `<div class="phone" role="img" aria-label="CaliPartner Room screen showing two people's day side by side">
  <div class="phone-screen">
    <div class="ph-status"><span>9:41</span><span>5G</span></div>
    <div class="ph-head"><span class="ph-title">Rahul and Priya</span><span class="pill"><b>12</b> day streak</span></div>
    <div class="ph-sub">You've both logged 11 days straight.</div>
    <div class="paired">
      <div class="ring-wrap">${ringSvg(78, 64)}
        <div class="ring-center"><strong>78%</strong><span>1,180 left</span></div>
        <span class="ring-pill">64%</span>
      </div>
      <div class="cols">
        <div class="pcol"><div class="who"><span class="avatar a">R</span>You</div><div class="pct hue-a">78%</div>${meals([1, 1, 1, 0])}</div>
        <div class="nudge"><svg viewBox="0 0 24 24">${I.hand}</svg></div>
        <div class="pcol right"><div class="who"><span class="avatar b">P</span>Priya</div><div class="pct hue-b">64%</div>${mealsR([1, 1, 0, 0])}</div>
      </div>
    </div>
    <div class="seam-label">Percent of each person's own goal.</div>
    <div class="ph-tabs"><span>Today</span><span class="on">Room</span><span>+ Log</span><span>Ranks</span><span>Me</span></div>
  </div>
</div>`;
}

// ---------- layout helpers (no card grids) ----------
const rows = (list) => `<div class="rows">${list.map(([t, p]) => `<div class="row"><h3>${t}</h3><p>${p}</p></div>`).join("")}</div>`;

const V = {
  rooms: `<div class="vis"><div class="vis-title">Invite to Sunday crew</div>
    <div class="vis-input">@pri</div>
    <div class="vis-line"><span class="avatar b">P</span><span class="vis-grow"><b>Priya S.</b><small>@priya.s</small></span><span class="pill">Invite</span></div>
    <div class="vis-line"><span class="avatar a">P</span><span class="vis-grow"><b>Pritam</b><small>@pritam_k</small></span><span class="pill">Invite</span></div>
    <div class="vis-line"><span class="avatar">+</span><span class="vis-grow"><b>Share link or code</b><small>Works before they install</small></span><span class="pill">Copy</span></div></div>`,
  food: `<div class="vis"><div class="seg"><span>Search</span><span>Scan</span><span>Photo</span><span class="on">Recent</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Masala oats</b><small>1 katori, 40 g</small></span><span class="kcal">168 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Boiled eggs</b><small>2 pieces</small></span><span class="kcal">156 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Whey protein</b><small>1 scoop, 30 g</small></span><span class="kcal">120 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Dal tadka</b><small>1 bowl</small></span><span class="kcal">190 kcal</span><span class="add">+</span></div></div>`,
  chat: `<div class="vis"><div class="bubble l">Logged lunch. Your turn?</div>
    <div class="bubble r">On it. Gym at 6 still on?</div>
    <div class="bubble l"><span class="img-ph"></span>Post-workout shake</div>
    <div class="bubble sys">Both of you closed today. Day 12.</div></div>`,
  workout: `<div class="vis"><div class="vis-title">Bench press <small>Last time: 3 x 8 at 40 kg</small></div>
    <table class="sets"><tr><th>Set</th><th>Reps</th><th>Weight</th></tr><tr><td>1</td><td>8</td><td>40 kg</td></tr><tr><td>2</td><td>8</td><td>42.5 kg</td></tr><tr><td>3</td><td>7</td><td>42.5 kg</td></tr></table>
    <div class="vis-line"><span class="vis-grow"><small>Total volume</small></span><b>877 kg</b></div></div>`,
  water: `<div class="vis"><div class="vis-title">Water <small>1,750 of 2,500 ml</small></div>
    <div class="bars">${[1, 1, 1, 1, 1, 1, 1, 0].map((x) => `<i class="${x ? "on" : ""}"></i>`).join("")}</div>
    <div class="vis-title" style="margin-top:20px">Steps <small>from Health Connect</small></div>
    <div class="big">7,420</div><div class="track"><i style="width:93%"></i></div></div>`,
  chart: `<div class="vis"><div class="chips"><span class="chip">7d</span><span class="chip on">30d</span><span class="chip">90d</span></div>
    <svg viewBox="0 0 300 130" class="spark" role="img" aria-label="Weight trend over 30 days, both members trending toward their own goals"><path d="M0 30 C40 36 70 50 110 62 S190 84 300 98" fill="none" stroke="#b3de3e" stroke-width="2" stroke-linecap="round"/><path d="M0 100 C50 92 90 80 140 66 S220 40 300 28" fill="none" stroke="#50e0fa" stroke-width="2" stroke-linecap="round"/><line x1="0" y1="120" x2="300" y2="120" stroke="#2a353f"/></svg>
    <div class="vis-line"><small>Progress toward each person's own goal</small></div></div>`,
};

const showcase = [
  ["rooms", "Rooms for 2 to 10 people", "Partners, gym buddies or a friend group. Invite by @username, link or code. Every connection needs consent, and anyone can mute, block or leave."],
  ["food", "Logging that takes seconds", "Search, barcode scan, AI photo estimate, custom foods and one-tap re-log of the foods you eat most. Indian foods and household units like katori are built in. Works offline."],
  ["chat", "A private chat for your room", "Text and photos, visible only to room members. No public feed and no messages from strangers. Report, mute and block are always one tap away."],
  ["workout", "Workouts in the same app", "Log strength, cardio and sports with sets, reps and weight from a library of 300+ exercises. See what you lifted last time right next to each exercise."],
  ["water", "Water and steps, mostly automatic", "Quick-add water against a goal based on your weight. Steps and distance flow in from Health Connect or Apple Health."],
  ["chart", "Progress you can read at a glance", "Weight trend, calories, macros, steps and workouts for you, and one shared chart for the room that compares everyone against their own goal."],
];
const showcaseHtml = showcase.map(([v, t, p], i) => `<div class="feat-row${i % 2 ? " flip" : ""}"><div class="feat-text"><h3>${t}</h3><p>${p}</p></div>${V[v]}</div>`).join("");

// ---------- pages ----------
const pages = {};

pages["index.html"] = layout({
  file: "index.html",
  title: "CaliPartner: calorie, workout and habit tracker you share with a partner",
  desc: "CaliPartner is one app for food, water, steps and workouts, built around a private room you share with your partner or friends. Available on Google Play and the App Store.",
  body: `
<section class="hero">
  <div class="hero-bg"></div>
  <div class="wrap hero-grid">
    <div>
      <h1>Your day, next to <span class="hue-a">your</span> <span class="hue-b">person's.</span></h1>
      <p class="lead">CaliPartner is a calorie and habit tracker built around one other person. Pair up in a private room, see each other's rings, steps and meals side by side, and stay in it together.</p>
      ${stores}
      <p class="hero-note">Solo logging is free forever. Rooms start with a 3-day free trial.</p>
    </div>
    ${phone()}
  </div>
</section>

<section class="section tight">
  <div class="wrap">
    <div class="statement">
      <p class="big-quote">Most trackers are built for one person, so most people quit. <span class="hue-a">CaliPartner</span> is built for two.</p>
    </div>
    ${rows([
      ["Companionship, not competition", "Everyone is measured against their own goal. A 1,600 kcal cut and a 3,100 kcal bulk can share the same screen and both feel seen."],
      ["One app for the whole routine", "Food, water, steps, workouts, weight and chat live in one place. No juggling a tracker, a step counter and WhatsApp."],
      ["Private by default", "Calories, meals and weight stay hidden until you choose to share them, and you can see exactly what your partner sees."],
    ])}
  </div>
</section>

<section class="section" id="features">
  <div class="wrap">
    <div class="section-head"><h2>Everything you need to stay consistent</h2><p class="lead" style="margin-top:14px">Fast logging for you, a shared view for the two of you.</p></div>
    ${showcaseHtml}
    <p style="margin-top:40px"><a class="btn btn-ghost" href="features.html" id="home-all-features">See the full feature list</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>See the day as two halves, joined by one seam</h2>
      <p class="lead" style="margin-top:14px">The Room screen puts you on the left and your partner on the right. A single line runs between you. It stays dashed until both of you have logged, then it lights up.</p>
      <ul class="checks">
        <li><span><b>Percent, not calories.</b> Comparisons show percent of each person's own goal, so nobody is measured against someone else's numbers.</span></li>
        <li><span><b>Identity colors, not score colors.</b> Lime and ice cyan belong to each person. There is no red for losing and no green for winning.</span></li>
        <li><span><b>Nudges that feel friendly.</b> One tap sends a pre-written, kind reminder, limited so it never turns into nagging.</span></li>
      </ul>
    </div>
    <div class="card" style="padding:28px">
      <div style="display:flex;justify-content:center;gap:28px;align-items:center;flex-wrap:wrap">
        <div class="ring-wrap" style="width:184px;height:184px;margin:0">${ringSvg(100, 100)}<div class="ring-center"><strong>Day 12</strong><span>Both closed</span></div></div>
      </div>
      <p style="text-align:center;margin-top:18px;color:var(--text-mid);font-size:14px">The one celebration in the app: both of you finish the day.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split flip">
    <div class="card" style="padding:12px 24px">
      <div class="privacy-list">
        <div class="priv-row"><div><strong>Partners can see my meal items</strong><span>Off. Only your completion percent is visible.</span></div><span class="switch" aria-hidden="true"></span></div>
        <div class="priv-row"><div><strong>Partners can see my weight</strong><span>Off. Others only see progress toward your own goal.</span></div><span class="switch" aria-hidden="true"></span></div>
        <div class="priv-row"><div><strong>Share steps and water</strong><span>On. Your partner sees totals, not your location.</span></div><span class="switch on" aria-hidden="true"></span></div>
        <div class="priv-row"><div><strong>Who can find me by username</strong><span>Everyone, or nobody.</span></div><span class="switch on" aria-hidden="true"></span></div>
      </div>
    </div>
    <div>
      <h2>You decide what your partner sees</h2>
      <p class="lead" style="margin-top:14px">Sharing is set per room and per data type, with conservative defaults. Changes apply immediately and hide earlier items too.</p>
      <ul class="checks">
        <li><span><b>Eye icon on every shared item</b> that explains in plain words what the other person can see.</span></li>
        <li><span><b>Hidden means hidden.</b> Locked items show a neutral lock, never a zero.</span></li>
        <li><span><b>Delete anytime.</b> Remove your account and data from inside the app.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <h2>Ranked on consistency, never on eating least</h2>
      <p class="lead" style="margin-top:14px">Weekly leaderboards are split into divisions and small cohorts so a beginner never competes with the global top 1%.</p>
      <ul class="checks">
        <li><span><b>Divisions:</b> cutting, bulking, maintain and beginner.</span></li>
        <li><span><b>Seasonal challenges</b> like Winter Arc, and occasion plans for birthdays, trips and weddings.</span></li>
        <li><span><b>Opt out any time.</b> Opted-out users are hidden entirely.</span></li>
      </ul>
    </div>
    <div class="card">
      <div class="challenge"><small>Seasonal challenge</small><strong>Winter Arc</strong><small>60 days, scored on consistency</small></div>
      <div class="rank-note"><b>Ranked on consistency and how close you get to your own goal.</b> Not on eating least.</div>
      <div class="chips"><span class="chip">Cutting</span><span class="chip on">Bulking</span><span class="chip">Beginner</span></div>
      <div class="rank-row"><span class="n">1</span><span class="avatar a">A</span><span class="nm">Aarav</span><span class="sc">96 consistency</span></div>
      <div class="rank-row"><span class="n">2</span><span class="avatar b">S</span><span class="nm">Sneha</span><span class="sc">94 consistency</span></div>
      <div class="rank-row"><span class="n">3</span><span class="avatar a">K</span><span class="nm">Karan</span><span class="sc">91 consistency</span></div>
      <div class="rank-row me"><span class="n">17</span><span class="avatar b">R</span><span class="nm">You</span><span class="sc">82 consistency</span></div>
    </div>
  </div>
</section>

<section class="section" id="how">
  <div class="wrap">
    <div class="section-head center"><h2>Up and running in minutes</h2><p class="lead" style="margin-top:14px">Log your first meal before you even create an account.</p></div>
    <ol class="timeline">
      <li><h3>Pick a goal</h3><p>Cut, bulk or maintain. Enter your stats and get a transparent calorie target.</p></li>
      <li><h3>Log your first meal</h3><p>Search, scan or snap a photo. Repeat foods take one tap.</p></li>
      <li><h3>Invite your partner</h3><p>Send a username request, link or code. They see a preview of your room first.</p></li>
      <li><h3>Stay in it together</h3><p>Compare progress, chat, nudge and build a shared streak.</p></li>
    </ol>
  </div>
</section>

<section class="section" id="pricing-teaser">
  <div class="wrap">
    <div class="section-head center"><h2>Simple pricing, per person</h2><p class="lead" style="margin-top:14px">Logging, your diary and your streak stay free. Rooms are a paid plan, billed per user.</p></div>
    <div class="plans">
      <div class="card plan"><span class="save">Monthly</span><div class="price">&#8377;99</div><div class="per">per month in India. $4.99 internationally.</div><a class="btn btn-ghost" href="pricing.html" id="plan-monthly">See plan details</a></div>
      <div class="card plan pre"><span class="save">3 months, best value</span><div class="price">&#8377;249</div><div class="per">for 3 months in India. $12.99 internationally.</div><a class="btn btn-primary" href="pricing.html" id="plan-quarterly">See plan details</a></div>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="wrap">
    <div class="section-head center"><h2>Questions, answered</h2></div>
    <div class="faq">
      <details><summary>Is CaliPartner free?</summary><p>Downloading is free and basic solo logging of food, water, steps, workouts and weight stays free forever. New users get a 3-day trial of rooms, then rooms need a paid plan.</p></details>
      <details><summary>Do both of us need to pay?</summary><p>Pricing is per user, not per room. Each person who wants to use a room needs an active trial or plan. If one partner's plan ends, the room pauses for both and the streak is saved for 30 days.</p></details>
      <details><summary>Can we have different goals?</summary><p>Yes. One of you can be cutting while the other bulks. Comparisons are always shown as a percent of each person's own goal.</p></details>
      <details><summary>What can my partner see about me?</summary><p>Only what you choose. By default your partner sees whether you logged today and your goal completion percent. Calories, individual meals and your weight number stay hidden unless you opt in.</p></details>
      <details><summary>How are calorie targets calculated?</summary><p>With fixed, published formulas shown on screen so you can see your inputs and result. They are estimates for healthy adults, not medical advice.</p></details>
      <details><summary>How do I cancel or get a refund?</summary><p>Subscriptions bought in the app are managed in Google Play or the App Store. See our <a href="refund-policy.html">refund and cancellation policy</a> for the steps.</p></details>
      <details><summary>How do I delete my account?</summary><p>Open Me, then Account, then Delete account, or follow the steps on our <a href="delete-account.html">account deletion page</a>.</p></details>
    </div>
  </div>
</section>
${cta}`,
});

const featureGroups = [
  ["users", "a", "Rooms and partners", "The shared layer that makes CaliPartner different.", [
    "Rooms for 2 to 10 people, with Host and Member roles",
    "Invite by unique @username, shareable link or short code",
    "Accept, decline and join requests with an inbox and 14-day expiry",
    "Side-by-side view: you on the left, your partner on the right",
    "Compare yourself with any member in larger rooms",
    "Activity feed, reactions and one-tap friendly nudges",
    "Block, mute and report tools for every member",
    "Rejoin screen that never shames a lapsed member",
  ]],
  ["food", "", "Food logging", "Built so logging takes seconds, not minutes.", [
    "Search with Previously logged and My Foods listed first",
    "Barcode scanning via Open Food Facts",
    "AI photo estimates you can review and edit, clearly labelled as estimates",
    "Custom foods, saved meals and recipes",
    "Five sections: Breakfast, Lunch, Dinner, Snacks and Extra",
    "Indian and regional foods with household units like katori and cup",
    "One-tap re-log with last-used quantity",
    "Works offline and syncs when you reconnect",
  ]],
  ["dumbbell", "a", "Workouts", "Everything you trained, in the same app.", [
    "Strength, cardio, sports, yoga, walks and more",
    "Library of 300+ exercises plus your own custom ones",
    "Sets, reps and weight with last-time performance shown",
    "Copy a previous workout to today in two taps",
    "History as a list and calendar",
    "Workout status visible to your room, according to your privacy settings",
  ]],
  ["steps", "", "Water, steps and weight", "The daily basics, tracked automatically where possible.", [
    "Water quick-add with a goal based on your body weight",
    "Steps and distance from Health Connect, Apple Health or your phone sensor",
    "Weight log with a 7-day moving average trend",
    "Weigh-in and water reminders with quiet hours",
  ]],
  ["calc", "a", "Transparent targets", "No black box. You can see how every number is made.", [
    "Goal-based calorie and macro targets from published formulas",
    "Choose your weekly rate and see the exact daily calories",
    "Safety floors and weekly caps that keep targets realistic",
    "A how-we-calculated-this screen with your inputs and result",
  ]],
  ["chart", "", "Progress", "See the trend, not just today.", [
    "Graphs for weight, calories, macros, steps, water and workouts",
    "Ranges from 7 days to all time",
    "Room progress chart with one line per member",
    "Shared charts show change and percent toward each person's own goal",
    "Streaks and a weekly consistency score from 0 to 100",
  ]],
  ["trophy", "a", "Ranks and challenges", "Healthy competition that never rewards undereating.", [
    "Weekly leaderboard by consistency",
    "Divisions: cutting, bulking, maintain and beginner",
    "Cohorts of about 100 matched by region",
    "Seasonal challenges like Winter Arc",
    "Occasion plans for birthdays, trips and weddings",
    "Opt out of ranks at any time",
  ]],
  ["lock", "", "Privacy and safety", "Conservative defaults and real control.", [
    "Per-room, per-data-type sharing controls",
    "Weight and meals hidden unless you opt in",
    "Preview exactly what your partner can see",
    "Chat images stripped of location data",
    "Reporting and blocking inside chat",
    "In-app account deletion",
  ]],
];

pages["features.html"] = layout({
  file: "features.html",
  title: "Features | CaliPartner",
  desc: "Explore CaliPartner features: partner rooms, food logging, workouts, water and steps, progress graphs, room chat, leaderboards and privacy controls.",
  body: `${pageHead("Everything in one app", "Food, water, steps, workouts, progress and chat, with a shared room at the center.")}
<section class="section tight"><div class="wrap">
<nav class="toc" aria-label="Feature sections">${featureGroups.map(([, , t]) => `<a href="#${t.toLowerCase().replace(/[^a-z]+/g, "-")}">${t}</a>`).join("")}</nav>
<div class="spec">
${featureGroups.map(([ic, cl, t, d, items]) => `<div class="spec-row" id="${t.toLowerCase().replace(/[^a-z]+/g, "-")}"><div class="spec-head"><h2>${t}</h2><p>${d}</p></div><ul class="spec-list">${items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("\n")}
</div>
</div></section>
<section class="section tight"><div class="wrap"><div class="section-head"><h2>See it in the app</h2></div>${showcaseHtml}</div></section>
<section class="section tight"><div class="wrap"><div class="section-head"><h2>Coming next</h2><p class="lead" style="margin-top:14px">Planned after launch: adaptive calorie recalibration, workout routines and rest timers, personal-record detection, body measurements and progress photos, streak freezes, data export, more languages and a home-screen widget.</p></div></div></section>
${cta}`,
});

pages["pricing.html"] = layout({
  file: "pricing.html",
  title: "Pricing | CaliPartner",
  desc: "CaliPartner pricing: free solo logging, a 3-day room trial, then Rs 99 per month or Rs 249 for 3 months in India, $4.99 or $12.99 internationally.",
  body: `${pageHead("Simple pricing, per person", "Solo logging is free forever. Rooms are a paid plan, billed per user and not per room.")}
<section class="section tight"><div class="wrap">
  <div class="plans">
    <div class="card plan"><span class="save">Monthly</span><div class="price">&#8377;99</div><div class="per">per month in India</div><p>International: $4.99 per month.</p><p style="margin-top:12px">Renews monthly until cancelled.</p></div>
    <div class="card plan pre"><span class="save">3 months, best value</span><div class="price">&#8377;249</div><div class="per">for 3 months in India</div><p>International: $12.99 for 3 months.</p><p style="margin-top:12px">Renews every 3 months until cancelled.</p></div>
  </div>
  <p class="muted" style="text-align:center;margin-top:20px">Prices in other countries are set by region in Google Play and the App Store. Taxes may apply.</p>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><h2>What is free and what is not</h2></div>
  <table class="compare">
    <thead><tr><th></th><th>Free forever</th><th>With a room plan</th></tr></thead>
    <tbody>
      <tr><td>Food, water, steps, workout and weight logging</td><td class="y">Included</td><td class="y">Included</td></tr>
      <tr><td>Diary, barcode scan and custom foods</td><td class="y">Included</td><td class="y">Included</td></tr>
      <tr><td>Personal progress graphs and streak</td><td class="y">Included</td><td class="y">Included</td></tr>
      <tr><td>Create or join rooms of up to 10 people</td><td>Trial only</td><td class="y">Included</td></tr>
      <tr><td>Side-by-side view and room chat</td><td>Trial only</td><td class="y">Included</td></tr>
      <tr><td>Room progress charts and shared streaks</td><td>Trial only</td><td class="y">Included</td></tr>
      <tr><td>Nudges, reactions and shared meals</td><td>Trial only</td><td class="y">Included</td></tr>
    </tbody>
  </table>
</div></section>

<section class="section tight"><div class="wrap">
  <div class="section-head"><h2>How billing works</h2></div>
  ${rows([
    ["3-day free trial", "Every new user gets 3 days to try rooms, chat and streaks, including one room of 2 people."],
    ["Billed by the store", "In-app purchases go through Google Play Billing and Apple In-App Purchase. Restore purchases is available on both."],
    ["Cancel anytime", "Manage or cancel in your store subscription settings. See the <a href=\"refund-policy.html\">refund and cancellation policy</a>."],
    ["If a partner's plan ends", "The room pauses for both people and your streak is saved for 30 days. Your own diary and logging are never affected. The partner who lapsed sees a simple Rejoin your room screen."],
  ])}
</div></section>
${cta}`,
});

pages["about.html"] = layout({
  file: "about.html",
  title: "About | CaliPartner",
  desc: "CaliPartner exists because fitness is easier with someone beside you. Learn about our product principles.",
  body: `${pageHead("Fitness is easier with someone beside you", "Most trackers are built for one person and most people quit within weeks. We built CaliPartner around the one thing that keeps people going: a person.")}
<section class="section tight"><div class="wrap">
  ${rows([
    ["Who it is for", "Adults 18 and over who train and eat with intention: gym partners, couples, friend groups running a challenge, and solo users who want to add someone later. We are starting in India and expanding to English-speaking markets."],
    ["What we believe", "Companionship beats competition. Nobody should feel they are losing. Fitness data is personal, so it stays private until you share it."],
  ])}
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2>Our product principles</h2></div>
  ${rows([
    ["Compare to your own goal", "Never to other people's numbers."],
    ["Private by default", "You opt in to sharing calories, weight and meals."],
    ["Never reward undereating", "No ranking, badge or streak is won by eating less."],
    ["Logging takes seconds", "Repeat foods are one tap."],
    ["A room survives absence", "One quiet member never ends the room."],
    ["Explainable numbers", "Targets come from published formulas you can see."],
  ])}
  <div class="callout amber" style="margin-top:32px">CaliPartner is a fitness and habit-tracking tool and not a medical service. It is not intended for medical or clinical nutrition, pregnancy or eating-disorder treatment. Talk to a qualified professional before changing your diet or exercise.</div>
</div></section>
${cta}`,
});

pages["contact.html"] = layout({
  file: "contact.html",
  title: "Contact and support | CaliPartner",
  desc: "Contact CaliPartner support for help with your account, billing, refunds, privacy requests or to report a concern.",
  body: `${pageHead("Contact us", "Questions about your account, billing or privacy? We reply within 2 business days.")}
<section class="section tight"><div class="wrap grid grid-2" style="align-items:start">
  <div class="card contact-list">
    <div class="contact-item"><strong>General and billing support</strong><a href="mailto:${SITE.email}">${SITE.email}</a></div>
    <div class="contact-item"><strong>Privacy and data requests</strong><a href="mailto:${SITE.email}?subject=Privacy%20request">${SITE.email}</a></div>
    <div class="contact-item"><strong>Report abuse or safety concern</strong><a href="mailto:${SITE.email}?subject=Safety%20report">${SITE.email}</a></div>
    <div class="contact-item"><strong>Business address</strong><span>${SITE.legalName}, ${SITE.address}</span></div>
    <div class="contact-item"><strong>Response time</strong><span>Within 2 business days. Safety reports are prioritised.</span></div>
  </div>
  <form class="card form" id="contact-form" action="mailto:${SITE.email}" method="post" enctype="text/plain">
    <label>Your name<input name="name" id="cf-name" required autocomplete="name"></label>
    <label>Email<input type="email" name="email" id="cf-email" required autocomplete="email"></label>
    <label>Topic<select name="topic" id="cf-topic"><option>Account help</option><option>Billing or refund</option><option>Privacy request</option><option>Report a problem</option><option>Other</option></select></label>
    <label>Message<textarea name="message" id="cf-message" required></textarea></label>
    <button class="btn btn-primary" type="submit" id="cf-submit">Send message</button>
  </form>
</div></section>`,
});

// legal pages
for (const [file, p] of Object.entries(legal.pages(SITE))) {
  pages[file] = layout({
    file, title: p.title + " | CaliPartner", desc: p.desc,
    body: `${pageHead(p.h1, p.lead)}<section><div class="wrap"><article class="prose"><p class="updated">Last updated: ${SITE.updated}</p>${p.html}</article></div></section>`,
  });
}

for (const [f, html] of Object.entries(pages)) fs.writeFileSync(path.join(__dirname, f), html);

fs.mkdirSync(path.join(__dirname, "assets"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "assets/favicon.svg"), logo.replace('class="brand-mark" ', 'xmlns="http://www.w3.org/2000/svg" '));
const urls = Object.keys(pages).map((f) => `<url><loc>${SITE.domain}/${f === "index.html" ? "" : f}</loc></url>`).join("");
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
fs.writeFileSync(path.join(__dirname, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`);
console.log("Built", Object.keys(pages).length, "pages");
