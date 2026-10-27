// Static site generator: `node build.js` writes all HTML pages to the project root.
const fs = require("fs");
const path = require("path");
const legal = require("./legal");

// ---- Site Configuration ----
const SITE = {
  name: "CaliPartner",
  domain: "https://calipartner.site",
  appUrl: "https://app.calipartner.site",
  email: "support@calipartner.site",
  legalName: "CaliPartner",
  address: "India",
  updated: "October 2026",
};

// ---- Official Brand Logo SVG ----
const officialLogoSvg = `<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="34" height="34" role="img" aria-label="CaliPartner Logo">
  <!-- Rounded Brown Background (Transparent Outside) -->
  <rect x="0" y="0" width="1000" height="1000" rx="225" ry="225" fill="#471A06" />

  <g fill="#FDECCF">
    <!-- Left Person -->
    <circle cx="386" cy="347" r="49" />
    <path d="M 162 725 C 215 670, 238 620, 248 550 C 260 465, 305 398, 376 402 C 430 405, 475 392, 523 364 C 531 360, 533 367, 527 375 C 495 420, 452 446, 405 458 C 382 464, 372 488, 381 498 C 418 518, 446 552, 458 598 C 459 603, 444 609, 437 608 C 408 575, 365 560, 333 572 C 321 577, 314 590, 303 608 C 268 668, 224 708, 165 728 C 161 729, 160 727, 162 725 Z" />

    <!-- Right Person -->
    <circle cx="653" cy="181" r="51" />
    <path d="M 548 353 C 585 305, 632 252, 680 232 C 735 210, 785 238, 812 302 C 838 364, 832 432, 815 488 C 813 493, 799 493, 797 487 C 788 442, 775 412, 754 412 C 735 412, 705 438, 668 480 C 632 522, 602 562, 577 593 C 574 596, 582 572, 595 540 C 625 468, 665 405, 681 362 C 692 332, 682 306, 658 310 C 628 315, 588 345, 556 358 C 548 361, 544 358, 548 353 Z" />

    <!-- Step 1 (Left Bar) -->
    <path d="M 195 732 H 322 A 36 36 0 0 1 358 768 V 861 H 195 A 64.5 64.5 0 0 1 195 732 Z" />

    <!-- Step 2 (Middle Bar) -->
    <path d="M 432 616 H 570 A 52 52 0 0 1 622 668 V 861 H 380 V 668 A 52 52 0 0 1 432 616 Z" />

    <!-- Step 3 (Right Bar) -->
    <path d="M 698 502 H 835 A 54 54 0 0 1 889 556 V 807 A 54 54 0 0 1 835 861 H 644 V 556 A 54 54 0 0 1 698 502 Z" />
  </g>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <!-- Rounded Brown Background (Transparent Outside) -->
  <rect x="0" y="0" width="1000" height="1000" rx="225" ry="225" fill="#471A06" />

  <g fill="#FDECCF">
    <!-- Left Person -->
    <circle cx="386" cy="347" r="49" />
    <path d="M 162 725 C 215 670, 238 620, 248 550 C 260 465, 305 398, 376 402 C 430 405, 475 392, 523 364 C 531 360, 533 367, 527 375 C 495 420, 452 446, 405 458 C 382 464, 372 488, 381 498 C 418 518, 446 552, 458 598 C 459 603, 444 609, 437 608 C 408 575, 365 560, 333 572 C 321 577, 314 590, 303 608 C 268 668, 224 708, 165 728 C 161 729, 160 727, 162 725 Z" />

    <!-- Right Person -->
    <circle cx="653" cy="181" r="51" />
    <path d="M 548 353 C 585 305, 632 252, 680 232 C 735 210, 785 238, 812 302 C 838 364, 832 432, 815 488 C 813 493, 799 493, 797 487 C 788 442, 775 412, 754 412 C 735 412, 705 438, 668 480 C 632 522, 602 562, 577 593 C 574 596, 582 572, 595 540 C 625 468, 665 405, 681 362 C 692 332, 682 306, 658 310 C 628 315, 588 345, 556 358 C 548 361, 544 358, 548 353 Z" />

    <!-- Step 1 (Left Bar) -->
    <path d="M 195 732 H 322 A 36 36 0 0 1 358 768 V 861 H 195 A 64.5 64.5 0 0 1 195 732 Z" />

    <!-- Step 2 (Middle Bar) -->
    <path d="M 432 616 H 570 A 52 52 0 0 1 622 668 V 861 H 380 V 668 A 52 52 0 0 1 432 616 Z" />

    <!-- Step 3 (Right Bar) -->
    <path d="M 698 502 H 835 A 54 54 0 0 1 889 556 V 807 A 54 54 0 0 1 835 861 H 644 V 556 A 54 54 0 0 1 698 502 Z" />
  </g>
</svg>`;

// ---- Icons ----
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
  sparkle: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  growth: '<path d="M22 7L13.5 15.5L8.5 10.5L2 17"/><polyline points="16 7 22 7 22 13"/>',
};

const icon = (n, cls = "") => `<div class="icon-chip ${cls}"><svg viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg></div>`;

const playIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2.5v19l10-9.5z" fill="#1FBDB6"/><path d="M14 12l3.2-3.2L6 2.4z" fill="#B49AFC"/><path d="M14 12l-8 9.6 11.2-6.4z" fill="#F4B67D"/><path d="M17.2 8.8L14 12l3.2 3.2 3.4-1.9c1-.6 1-2 0-2.6z" fill="#F65C58"/></svg>`;
const appleIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#F7F0E7"><path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8 2.1-1.2 2.9-2.4c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z"/></svg>`;

const stores = `<div class="store-row">
  <a class="store-btn store-btn-web" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer" id="btn-web-app">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    <span><small>Available Now</small><strong>Launch Web App</strong></span>
  </a>
  <button class="store-btn js-store-btn" data-platform="Android" id="btn-google-play" type="button" aria-label="Download on Google Play (Coming Soon)">
    ${playIcon}<span><small>Get it on</small><strong>Google Play</strong></span><span class="store-badge">Coming Soon</span>
  </button>
  <button class="store-btn js-store-btn" data-platform="iOS" id="btn-app-store" type="button" aria-label="Download on the App Store (Coming Soon)">
    ${appleIcon}<span><small>Download on the</small><strong>App Store</strong></span><span class="store-badge">Coming Soon</span>
  </button>
</div>`;

const NAV = [
  ["index.html", "Home"],
  ["features.html", "Features"],
  ["pricing.html", "Pricing"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function comingSoonModal() {
  return `<div class="modal-overlay" id="coming-soon-modal" aria-hidden="true" role="dialog" aria-labelledby="modal-title">
  <div class="modal-box">
    <button class="modal-close-btn" id="modal-close-btn" aria-label="Close dialog">&times;</button>
    <div class="modal-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${I.zap}</svg>
    </div>
    <h3 id="modal-title"><span id="modal-platform-name">Mobile</span> App Coming Soon!</h3>
    <p>We are putting the final touches on our native Android and iOS mobile apps. In the meantime, you can track food, water, workouts, and pair up right now using our web application.</p>
    <div class="modal-actions">
      <a class="btn btn-primary" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">
        Open Web App (app.calipartner.site) &rarr;
      </a>
      <button class="btn btn-ghost" id="modal-dismiss-btn" type="button">Got it</button>
    </div>
  </div>
</div>`;
}

function layout({ file, title, desc, body }) {
  const nav = NAV.map(([f, l]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0E0B08">
<link rel="canonical" href="${SITE.domain}/${file === "index.html" ? "" : file}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..700&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="index.html" id="nav-brand">${officialLogoSvg}<span>${SITE.name}</span></a>
    <div class="nav-links" id="nav-links">${nav}</div>
    <div style="display:flex;gap:10px;align-items:center">
      <a class="btn btn-primary btn-sm" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer" id="nav-get-started">Get Started &rarr;</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
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
        <a class="brand" href="index.html">${officialLogoSvg}<span>${SITE.name}</span></a>
        <p>One app for you and your accountability partner. Track food, water, steps, workouts, and see your progress side by side.</p>
        ${stores}
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="features.html">Features &amp; Specs</a></li>
        <li><a href="pricing.html">Plans &amp; Pricing</a></li>
        <li><a href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Launch Web App</a></li>
        <li><a href="index.html#faq">Frequently Asked Questions</a></li>
        <li><a href="about.html">About CaliPartner</a></li>
      </ul></div>
      <div><h4>Legal &amp; Privacy</h4><ul>
        <li><a href="terms.html">Terms and Conditions</a></li>
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="refund-policy.html">Refund &amp; Cancellation</a></li>
        <li><a href="community-guidelines.html">Community Guidelines</a></li>
        <li><a href="child-safety.html">Child Safety Standards</a></li>
      </ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="contact.html">Contact Us</a></li>
        <li><a href="delete-account.html">Delete Account</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul></div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2026 ${SITE.legalName}. All rights reserved.</span>
      <span>CaliPartner is a fitness, nutrition and habit-tracking app. It is not a medical service.</span>
    </div>
  </div>
</footer>
${comingSoonModal()}
<script src="js/main.js"></script>
</body>
</html>`;
}

const pageHead = (h, lead) => `<section class="page-head"><div class="wrap"><h1>${h}</h1><p class="lead">${lead}</p></div></section>`;

const cta = `<section class="section tight" id="download"><div class="wrap"><div class="cta">
  <h2>Find your person. Start today.</h2>
  <p class="lead">Solo tracking and free 1-on-1 partner rooms are free forever. Try our web app instantly or check mobile availability.</p>
  ${stores}
  <p style="margin-top:20px"><a class="cta-web-link" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Instant Web App access &rarr; app.calipartner.site</a></p>
</div></div></section>`;

// ---------- Paired Room Card Visual ----------
function ringSvg(a, b) {
  const c1 = 2 * Math.PI * 70, c2 = 2 * Math.PI * 58;
  return `<svg viewBox="0 0 160 160" role="img" aria-label="Your goal, ${a} percent complete. Priya's goal, ${b} percent complete.">
    <circle cx="80" cy="80" r="70" fill="none" stroke="#241E18" stroke-width="10"/>
    <circle cx="80" cy="80" r="58" fill="none" stroke="#241E18" stroke-width="7"/>
    <circle cx="80" cy="80" r="70" fill="none" stroke="#B49AFC" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(c1 * a / 100).toFixed(1)} ${c1.toFixed(1)}"/>
    <circle cx="80" cy="80" r="58" fill="none" stroke="#1FBDB6" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(c2 * b / 100).toFixed(1)} ${c2.toFixed(1)}"/>
  </svg>`;
}

const meals = (l) => ["Breakfast", "Lunch", "Dinner", "Snacks"].map((m, i) =>
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
    <div class="seam-label">Percent of each person's own goal. Joined by one seam.</div>
    <div class="ph-tabs"><span>Today</span><span class="on">Room</span><span>+ Log</span><span>Ranks</span><span>Me</span></div>
  </div>
</div>`;
}

const rows = (list) => `<div class="rows">${list.map(([t, p]) => `<div class="row"><h3>${t}</h3><p>${p}</p></div>`).join("")}</div>`;

const V = {
  rooms: `<div class="vis"><div class="vis-title">Invite to Sunday crew</div>
    <div class="vis-input">@priya</div>
    <div class="vis-line"><span class="avatar b">P</span><span class="vis-grow"><b>Priya S.</b><small>@priya.s</small></span><span class="pill">Invite</span></div>
    <div class="vis-line"><span class="avatar a">P</span><span class="vis-grow"><b>Pritam</b><small>@pritam_k</small></span><span class="pill">Invite</span></div>
    <div class="vis-line"><span class="avatar">+</span><span class="vis-grow"><b>Share room link or code</b><small>Guest joins free &bull; Host pays</small></span><span class="pill">Copy</span></div></div>`,
  food: `<div class="vis"><div class="seg"><span>Search</span><span>Scan</span><span>AI Photo</span><span class="on">Recent</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Masala oats</b><small>1 katori, 40 g</small></span><span class="kcal">168 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Boiled eggs</b><small>2 pieces</small></span><span class="kcal">156 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Whey protein</b><small>1 scoop, 30 g</small></span><span class="kcal">120 kcal</span><span class="add">+</span></div>
    <div class="vis-line"><span class="vis-grow"><b>Dal tadka</b><small>1 bowl</small></span><span class="kcal">190 kcal</span><span class="add">+</span></div></div>`,
  chat: `<div class="vis"><div class="bubble l">Logged lunch! 45g protein in. Your turn?</div>
    <div class="bubble r">Bench session done! Gym at 6 tomorrow still on?</div>
    <div class="bubble l"><span class="img-ph"></span>Post-workout shake logged</div>
    <div class="bubble sys">Both of you closed today. Day 12 streak locked!</div></div>`,
  workout: `<div class="vis"><div class="vis-title">Bench press <small>Last time: 3 x 8 at 40 kg</small></div>
    <table class="sets"><tr><th>Set</th><th>Reps</th><th>Weight</th></tr><tr><td>1</td><td>8</td><td>40 kg</td></tr><tr><td>2</td><td>8</td><td>42.5 kg</td></tr><tr><td>3</td><td>7</td><td>42.5 kg</td></tr></table>
    <div class="vis-line"><span class="vis-grow"><small>Total workout volume</small></span><b>877 kg</b></div></div>`,
  water: `<div class="vis"><div class="vis-title">Hydration <small>1,750 of 2,500 ml</small></div>
    <div class="bars">${[1, 1, 1, 1, 1, 1, 1, 0].map((x) => `<i class="${x ? "on" : ""}"></i>`).join("")}</div>
    <div class="vis-title" style="margin-top:20px">Steps <small>Apple Health / Health Connect</small></div>
    <div class="big">7,420</div><div class="track"><i style="width:93%"></i></div></div>`,
  chart: `<div class="vis"><div class="chips"><span class="chip">7d</span><span class="chip on">30d</span><span class="chip">90d</span></div>
    <svg viewBox="0 0 300 130" class="spark" role="img" aria-label="Weight trend over 30 days, both members trending toward their own goals"><path d="M0 30 C40 36 70 50 110 62 S190 84 300 98" fill="none" stroke="#B49AFC" stroke-width="2.5" stroke-linecap="round"/><path d="M0 100 C50 92 90 80 140 66 S220 40 300 28" fill="none" stroke="#1FBDB6" stroke-width="2.5" stroke-linecap="round"/><line x1="0" y1="120" x2="300" y2="120" stroke="#3A3228"/></svg>
    <div class="vis-line"><small>Shared progress toward each person's own goal</small></div></div>`,
};

const showcase = [
  ["rooms", "Rooms for 2 to 20 people", "Partners, gym buddies or your transformation squad. Invite by @username, link or code. The room host's plan covers the room, and invited members join free."],
  ["food", "Logging that takes seconds", "Search over 70,000 foods (IFCT Indian foods first), barcode scan, AI photo estimate, custom foods and one-tap re-log of recurring meals. Works 100% offline."],
  ["chat", "A private chat for your room", "Send text, cheer each other on, and share photos & videos (Pro). No public feed, no algorithm, and no messages from strangers."],
  ["workout", "Workouts in the same app", "Log strength, cardio and sports with sets, reps and weights. Track personal records (PRs), auto-rest countdowns, and share routines with your room."],
  ["water", "Water, steps and fasting", "Track water with smart reminders, sync steps from Apple Health or Health Connect, and log intermittent fasting windows (16:8, 18:6)."],
  ["chart", "Adaptive progress & growth checks", "Weight moving averages, macro compliance, and scheduled macro recalculations (monthly on Plus, weekly on Pro) that prevent plateaus."],
];
const showcaseHtml = showcase.map(([v, t, p], i) => `<div class="feat-row${i % 2 ? " flip" : ""}"><div class="feat-text"><h3>${t}</h3><p>${p}</p></div>${V[v]}</div>`).join("");

// ---------- Pages ----------
const pages = {};

// Home Page
pages["index.html"] = layout({
  file: "index.html",
  title: "CaliPartner: Calorie, Workout & Habit Tracker You Share with a Partner",
  desc: "CaliPartner is the accountability fitness app built for two. Pair up in a private room, track food, water, steps and workouts side by side, and stay consistent together.",
  body: `
<section class="hero">
  <div class="hero-bg"></div>
  <div class="wrap hero-grid">
    <div>
      <h1>Your day, next to <span class="hue-a">your</span> <span class="hue-b">person's.</span></h1>
      <p class="lead">CaliPartner is a calorie and habit tracker built around one other person. Pair up in a private room, see each other's rings, steps and meals side by side, and stay in it together.</p>
      <div class="hero-cta-group">
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer" id="hero-get-started">
            Get Started Free &rarr;
          </a>
        </div>
        ${stores}
        <div class="hero-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg>
          <span>Free 1-on-1 partner rooms included forever &bull; 7-day free trial on Plus</span>
        </div>
      </div>
    </div>
    ${phone()}
  </div>
</section>

<section class="section tight">
  <div class="wrap">
    <div class="statement">
      <p class="big-quote">Most trackers are built for one person, so most people quit. <span class="hue-apricot">CaliPartner</span> is built for two.</p>
    </div>
    ${rows([
      ["Companionship, not competition", "Everyone is measured against their own goal. A 1,600 kcal cut and a 3,100 kcal bulk can share the same screen and both feel supported."],
      ["One app for your complete routine", "Food diary, water, steps, workouts, weight, focus timer, and private room chat all live in one place. No juggling multiple disjointed apps."],
      ["Private by default", "Calories, meals and weight numbers stay private until you explicitly choose to share them, and you can see exactly what your partner sees."],
    ])}
  </div>
</section>

<section class="section" id="features">
  <div class="wrap">
    <div class="section-head">
      <h2>Everything you need to stay consistent</h2>
      <p class="lead" style="margin-top:14px">Fast offline logging for you, a shared live view for the two of you.</p>
    </div>
    ${showcaseHtml}
    <p style="margin-top:40px"><a class="btn btn-ghost" href="features.html" id="home-all-features">Explore all features &amp; full specs &rarr;</a></p>
  </div>
</section>

<!-- Breakthrough Feature: Dynamic Growth Checks -->
<section class="section">
  <div class="wrap split">
    <div>
      <div class="pill" style="margin-bottom:14px"><b>New</b> Macro Recalculation Engine</div>
      <h2>Goals change as you progress. Your targets should too.</h2>
      <p class="lead" style="margin-top:14px">As you lose body fat or gain muscle, your Total Daily Energy Expenditure (TDEE) and metabolism shift. CaliPartner provides scheduled, proactive growth reviews so you never hit an unexplained plateau.</p>
      <ul class="checks">
        <li><span><b>Plus Plan: Monthly Growth Review (30 Days).</b> Analyzes your 30-day weight trend and consistency to recompute calories and macros for the upcoming month.</span></li>
        <li><span><b>Pro Plan: Weekly AI Coach Review (7 Days).</b> The AI Coach checks your 7-day rolling weight average, workout volume, and adherence to recommend refined macro distributions.</span></li>
        <li><span><b>Strict Safety Floors Enforced.</b> Calorie minimums (1,200 kcal women, 1,500 kcal men) and weekly rate caps (1% body weight/week) are never compromised.</span></li>
      </ul>
    </div>
    <div class="card" style="padding:28px">
      <div class="info-card" style="background:var(--s2);margin-bottom:18px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          ${icon("calc", "iris")}
          <h3 style="margin:0;font-size:18px">Monthly Growth Check</h3>
        </div>
        <p style="font-size:14px;color:var(--text-mid)">Current weight: <strong>72.4 kg</strong> (&minus;1.8 kg this month)</p>
        <p style="font-size:14px;color:var(--text-mid)">Updated target: <strong class="hue-apricot">1,820 kcal</strong> &bull; 140g P &bull; 190g C &bull; 55g F</p>
      </div>
      <div class="info-card" style="background:var(--s2)">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          ${icon("sparkle", "teal")}
          <h3 style="margin:0;font-size:18px">AI Coach Insight</h3>
        </div>
        <p style="font-size:14px;color:var(--text-mid)">&ldquo;Your workout volume increased by 14% this week. Let's shift 15g from fats to carbs on training days to fuel recovery.&rdquo;</p>
      </div>
    </div>
  </div>
</section>

<!-- Room Sponsorship Model -->
<section class="section">
  <div class="wrap split flip">
    <div class="card" style="padding:28px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        ${icon("users", "iris")}
        <div>
          <h3 style="margin:0">Room Sponsorship</h3>
          <small style="color:var(--apricot)">Host Pays &bull; Members Join Free</small>
        </div>
      </div>
      <p style="font-size:14.5px;color:var(--text-mid);line-height:1.6">The room creator's tier covers the entire room. Your partner or gym buddies don't need a paid subscription to experience shared accountability, chats, focus sessions, and leaderboards.</p>
      <div style="margin-top:20px;padding:14px;background:var(--s2);border-radius:var(--radius-control);border:1px solid var(--hairline)">
        <div style="font-size:13px;color:var(--text-mid)">Free Tier: <strong>1 Room (2 People)</strong></div>
        <div style="font-size:13px;color:var(--text-mid);margin-top:6px">Plus Plan: <strong>3 Rooms (5 People each)</strong></div>
        <div style="font-size:13px;color:var(--text-mid);margin-top:6px">Pro Plan: <strong>5 Rooms (20 People each)</strong></div>
      </div>
    </div>
    <div>
      <h2>Host pays. Your people progress together.</h2>
      <p class="lead" style="margin-top:14px">No more asking your partner to subscribe just to train with you. Free users get a dedicated 1-on-1 pair room forever, while Plus and Pro hosts can sponsor squad rooms.</p>
      <ul class="checks">
        <li><span><b>Free pair room included forever</b> for you and your accountability partner.</span></li>
        <li><span><b>Guests join any paid room free</b> with full access to shared features.</span></li>
        <li><span><b>30-day grace protection:</b> If a host lapses, the room pauses with all streaks and history preserved until someone sponsors it.</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- Pricing Teaser Section -->
<section class="section" id="pricing-teaser">
  <div class="wrap">
    <div class="section-head center">
      <h2>Transparent tiers for every journey</h2>
      <p class="lead" style="margin-top:14px">Solo logging and 1-on-1 partner rooms are free forever. Upgrade for community power or elite AI coaching.</p>
    </div>

    <!-- Billing Cycle Controls -->
    <div class="pricing-controls">
      <div class="toggle-group" role="group" aria-label="Billing cycle selection">
        <button class="toggle-btn js-bill-btn" data-billing="monthly" type="button">Monthly</button>
        <button class="toggle-btn js-bill-btn active" data-billing="annual" type="button">Annual <span class="badge-save">Save up to 61%</span></button>
      </div>
    </div>

    <!-- 3 Tier Cards -->
    <div class="plans-3">
      <!-- Free Card -->
      <div class="plan-card">
        <div class="plan-header">
          <div class="plan-name">Free (Basic)</div>
          <div class="plan-position">Core daily tracking and free 1-on-1 accountability</div>
          <div class="plan-price-wrap">
            <span class="plan-price" id="price-free">&#8377;0</span>
            <span class="plan-period">forever</span>
          </div>
          <div class="plan-equiv">Free forever for solo &amp; pairs</div>
          <div class="plan-trial-badge no-trial">Free Forever</div>
        </div>
        <ul class="plan-features">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>1 hosted room</strong> (up to 2 people)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Free 1-on-1 partner room</strong> included</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Food, water, steps, workouts &amp; weight</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>70k+ Indian food database &amp; barcode scan</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>On-demand manual macro recalculation</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>3 one-time AI Photo food scans</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>100% offline-first SQLite logging</span></li>
        </ul>
        <a class="btn btn-ghost" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Get Started Free</a>
      </div>

      <!-- Plus Card -->
      <div class="plan-card featured">
        <div class="plan-pill">Most Popular &bull; 7-Day Free Trial</div>
        <div class="plan-header">
          <div class="plan-name">Plus Plan</div>
          <div class="plan-position">The habit and community powerhouse</div>
          <div class="plan-price-wrap">
            <span class="plan-price" id="price-plus">&#8377;1,499</span>
            <span class="plan-period" id="period-plus">/ year</span>
          </div>
          <div class="plan-equiv" id="equiv-plus">&#8377;125 / month &bull; ~50% savings</div>
          <div class="plan-trial-badge">7-Day Free Trial Included</div>
        </div>
        <ul class="plan-features">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>3 hosted rooms</strong> (up to 5 people each)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Monthly Growth Checks (30d):</strong> Guided macro adjustments</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Host pays:</strong> invited members join free</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Send &amp; read room text chat &amp; shared workouts</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Live synchronized focus rooms &amp; challenges</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>150+ Recipe library &amp; fasting window timer</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Meal planner, grocery lists &amp; photo vault</span></li>
        </ul>
        <a class="btn btn-primary" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Start 7-Day Free Trial</a>
      </div>

      <!-- Pro Card -->
      <div class="plan-card pro">
        <div class="plan-pill pro-pill">Elite AI Coaching</div>
        <div class="plan-header">
          <div class="plan-name">Pro Plan</div>
          <div class="plan-position">Elite AI-coached nutrition &amp; body transformation</div>
          <div class="plan-price-wrap">
            <span class="plan-price" id="price-pro">&#8377;2,499</span>
            <span class="plan-period" id="period-pro">/ year</span>
          </div>
          <div class="plan-equiv" id="equiv-pro">&#8377;192 / month &bull; ~58% savings</div>
          <div class="plan-trial-badge no-trial">0-Day Trial (Immediate Billing)</div>
        </div>
        <ul class="plan-features">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>5 hosted rooms</strong> (up to 20 people each)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Personal AI Coach</strong> (10 context-aware msgs/day)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>AI Photo Food Logging</strong> (5 scans/day)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Weekly AI Growth Review (7d)</strong> with macro refinement</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Chat-to-Log (&ldquo;I ate 2 eggs and toast&rdquo;)</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>&ldquo;Fits My Day&rdquo; AI smart recipe collections</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Room photo &amp; video sharing + Priority support</span></li>
        </ul>
        <a class="btn btn-ghost" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Upgrade to Pro</a>
      </div>
    </div>

    <p style="text-align:center;margin-top:36px">
      <a class="btn btn-ghost" href="pricing.html">Compare all 45+ features across tiers &rarr;</a>
    </p>
  </div>
</section>

<!-- FAQ Section -->
<section class="section" id="faq">
  <div class="wrap">
    <div class="section-head center"><h2>Questions, answered</h2></div>
    <div class="faq">
      <details><summary>Is CaliPartner free to use?</summary><p>Yes. Downloading and using CaliPartner for solo tracking (food diary, water, steps, workout logs, weight trends, and habit streaks) is completely free forever. You also get 1 free hosted room for you and an accountability partner (up to 2 people) at zero cost.</p></details>
      <details><summary>How does the 7-day free trial work?</summary><p>The 7-day free trial is available exclusively on <strong>CaliPartner Plus</strong> (both monthly and annual). You are charged &#8377;0 / $0 upfront and have 7 full days to experience multi-person rooms, monthly growth checks, live focus sessions, and advanced micronutrients. You can cancel anytime before day 7 without being billed.</p></details>
      <details><summary>Why does Pro not have a free trial?</summary><p>CaliPartner Pro utilizes cutting-edge vision models for AI photo food recognition and advanced Claude Haiku inference for personalized daily coaching. Because these incur immediate, non-trivial compute costs, Pro is billed immediately upon signup with 0 trial days.</p></details>
      <details><summary>Do both of us need to pay for a room?</summary><p>No! CaliPartner uses a <strong>Host Pays</strong> model. The room creator's tier covers the whole room. If you subscribe to Plus or Pro, your invited partners or friends join and participate completely free.</p></details>
      <details><summary>What happens if a room host cancels or their plan lapses?</summary><p>The room enters a protected <strong>30-day grace period</strong>. Streaks, routines, workouts, and chat history are never lost. Any room member can sponsor the room by upgrading their own plan to reactivate it immediately.</p></details>
      <details><summary>What are Dynamic Growth Checks?</summary><p>Nutrition isn't one-size-fits-all, and calorie needs change as you lose weight or build muscle. Plus users receive a guided review every 30 days to adjust targets, while Pro users receive active weekly adjustments from their AI Coach. Strict safety floors (1,200 kcal women, 1,500 kcal men) are always preserved.</p></details>
      <details><summary>Can I use CaliPartner on the web?</summary><p>Yes! Our full web application is live at <a href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">app.calipartner.site</a>. You can sign in and start tracking immediately from any browser on phone, tablet, or laptop.</p></details>
    </div>
  </div>
</section>
${cta}`,
});

// Features Page
pages["features.html"] = layout({
  file: "features.html",
  title: "Features & Specifications | CaliPartner",
  desc: "Explore complete CaliPartner features: food diary, Indian nutrition database, partner rooms, workout logging, dynamic macro recalculation, AI coaching, and privacy.",
  body: `${pageHead("Built for two. Engineered for consistency.", "Food, water, steps, workouts, progress and AI coaching, with a shared accountability room at the center.")}

<section class="section tight"><div class="wrap">
  <!-- 4 Pillars TOC -->
  <nav class="toc" aria-label="Feature sections">
    <a href="#core-tracking">1. Core Tracking &amp; Daily Diary</a>
    <a href="#social-rooms">2. Social, Accountability &amp; Rooms</a>
    <a href="#nutrition-wellness">3. Nutrition, Wellness &amp; Content</a>
    <a href="#ai-coaching">4. AI Intelligence &amp; Coaching</a>
  </nav>

  <div class="spec">
    <!-- Pillar 1 -->
    <div class="spec-row" id="core-tracking">
      <div class="spec-head">
        <h2>1. Core Tracking &amp; Daily Diary</h2>
        <p>100% offline-first logging with Indian foods first and transparent formulas.</p>
      </div>
      <ul class="spec-list">
        <li><strong>5 Meal Slots:</strong> Breakfast, Lunch, Dinner, Snacks, and Extra.</li>
        <li><strong>70,000+ Nutrition Database:</strong> Indian foods (IFCT) prioritized alongside global staples.</li>
        <li><strong>Barcode Scanner:</strong> Fast camera and image gallery barcode recognition.</li>
        <li><strong>Custom Foods &amp; My Meals:</strong> Save personal recipes and repeat meals in one tap.</li>
        <li><strong>Safety Floors:</strong> Hard floors (1,200 kcal women, 1,500 kcal men) strictly enforced.</li>
        <li><strong>Water Logging:</strong> Quick-add with smart volume reminders based on weight.</li>
        <li><strong>Steps &amp; Distance:</strong> Seamless integration with Apple Health and Health Connect.</li>
        <li><strong>GPS Activity Tracking:</strong> Live route, distance, and pace for walks, runs, and rides.</li>
        <li><strong>Workout Logging:</strong> Catalog of 300+ exercises, sets, reps, and volume history.</li>
        <li><strong>Weight Tracking &amp; Trends:</strong> 7-day moving averages that smooth out water retention.</li>
        <li><strong>Personal Focus Timer:</strong> Stopwatch &amp; pomodoro timer for focused study/work blocks.</li>
        <li><strong>Offline-First SQLite:</strong> Logging never hangs or requires an active connection.</li>
      </ul>
    </div>

    <!-- Pillar 2 -->
    <div class="spec-row" id="social-rooms">
      <div class="spec-head">
        <h2>2. Social, Accountability &amp; Rooms</h2>
        <p>A private room where you and your people stay in it together without toxic competition.</p>
      </div>
      <ul class="spec-list">
        <li><strong>Room Capacity:</strong> Free: 2 people | Plus: 5 people | Pro: 20 people.</li>
        <li><strong>Room Sponsorship Model:</strong> Host pays, invited members join free.</li>
        <li><strong>Free 1-on-1 Partner Room:</strong> Included free forever on all accounts.</li>
        <li><strong>Two Halves, One Seam:</strong> You on the left, your partner on the right.</li>
        <li><strong>Percent, Not Calories:</strong> Comparisons based on % of individual goal achieved.</li>
        <li><strong>Identity Hues:</strong> Iris (Person A) and Teal (Person B)—never green for winning or red for losing.</li>
        <li><strong>Room Text Chat:</strong> Read-only on Free; Send &amp; Read on Plus and Pro.</li>
        <li><strong>Room Media Sharing:</strong> Share photos and workout videos (Pro exclusive).</li>
        <li><strong>Live Shared Focus Sessions:</strong> Study or work simultaneously with peers.</li>
        <li><strong>Room-Only Leaderboard:</strong> Filtered cohort ranks for just your room members.</li>
        <li><strong>Pair &amp; Seasonal Challenges:</strong> 1, 7, and 30-day challenges (Winter Arc, etc.).</li>
        <li><strong>Partner Finder:</strong> Deterministic matching engine (gender, goal, age band).</li>
      </ul>
    </div>

    <!-- Pillar 3 -->
    <div class="spec-row" id="nutrition-wellness">
      <div class="spec-head">
        <h2>3. Nutrition, Wellness &amp; Content</h2>
        <p>Curated recipes, intermittent fasting windows, and comprehensive body metrics.</p>
      </div>
      <ul class="spec-list">
        <li><strong>Recipe Library:</strong> 10 starter recipes on Free; 150+ macro-balanced recipes on Plus/Pro.</li>
        <li><strong>&ldquo;Fits My Day&rdquo; AI Collections:</strong> Smart recipes that hit your remaining daily macros (Pro).</li>
        <li><strong>Fasting Tracker:</strong> 16:8, 18:6, and custom intermittent fasting timers with notifications.</li>
        <li><strong>Advanced Micronutrients:</strong> Fibre, saturated fat, sodium, cholesterol, and sugar tracking.</li>
        <li><strong>Meal Planner &amp; Auto Grocery:</strong> Plan week-long splits and auto-compile shopping lists.</li>
        <li><strong>Workout Routines:</strong> Save multi-day split programs with exercise progressions.</li>
        <li><strong>Auto Rest Timer &amp; PRs:</strong> Countdown rest intervals and automated 1RM / PR tracking.</li>
        <li><strong>Body Circumferences:</strong> Chest, waist, and hip tape measurement trend lines.</li>
        <li><strong>Private Photo Vault:</strong> Encrypted side-by-side visual progress comparison.</li>
        <li><strong>Full Data Export:</strong> Export your full nutrition, workout, and biometric data to JSON/CSV.</li>
      </ul>
    </div>

    <!-- Pillar 4 -->
    <div class="spec-row" id="ai-coaching">
      <div class="spec-head">
        <h2>4. AI Intelligence &amp; Coaching</h2>
        <p>Context-aware nutrition intelligence and automated metabolic recalculation.</p>
      </div>
      <ul class="spec-list">
        <li><strong>Personal AI Coach:</strong> Context-aware Claude Haiku coach (10 msgs/day on Pro).</li>
        <li><strong>AI Photo Food Logging:</strong> Snap a photo to estimate multi-item portions and macros (5 scans/day on Pro).</li>
        <li><strong>Chat-to-Log:</strong> Type &ldquo;I ate 2 boiled eggs and toast with chai&rdquo; to auto-log instantly.</li>
        <li><strong>Monthly Macro Growth Check:</strong> 30-day guided recalculation on Plus based on weight trend.</li>
        <li><strong>Weekly AI Growth Review:</strong> 7-day rolling adherence and metabolic review on Pro.</li>
        <li><strong>Weekly AI Progress Summary:</strong> Deep-dive metabolic and consistency analysis every Sunday.</li>
        <li><strong>Priority Support Queue:</strong> Direct fast-track customer support for Pro members.</li>
      </ul>
    </div>
  </div>
</div></section>

<section class="section tight"><div class="wrap"><div class="section-head"><h2>See it in action</h2></div>${showcaseHtml}</div></section>
${cta}`,
});

// Pricing Page
pages["pricing.html"] = layout({
  file: "pricing.html",
  title: "Plans, Features and Pricing | CaliPartner",
  desc: "Official CaliPartner pricing: Free Basic tier with 1-on-1 partner room, Plus Plan with 7-day trial at Rs 249/mo, and Pro Plan with AI coaching at Rs 499/mo.",
  body: `${pageHead("Plans, Features &amp; Pricing", "Solo logging and 1-on-1 partner rooms are free forever. Upgrade for community power or elite AI coaching.")}

<section class="section tight"><div class="wrap">
  <!-- Billing Cycle Controls -->
  <div class="pricing-controls">
    <div class="toggle-group" role="group" aria-label="Billing cycle selection">
      <button class="toggle-btn js-bill-btn" data-billing="monthly" type="button">Monthly</button>
      <button class="toggle-btn js-bill-btn active" data-billing="annual" type="button">Annual <span class="badge-save">Save up to 61%</span></button>
    </div>
  </div>

  <!-- 3 Tier Cards -->
  <div class="plans-3">
    <!-- Free Card -->
    <div class="plan-card">
      <div class="plan-header">
        <div class="plan-name">Free (Basic)</div>
        <div class="plan-position">Core daily tracking and free 1-on-1 accountability</div>
        <div class="plan-price-wrap">
          <span class="plan-price" id="price-free">&#8377;0</span>
          <span class="plan-period">forever</span>
        </div>
        <div class="plan-equiv">Free forever for solo &amp; pairs</div>
        <div class="plan-trial-badge no-trial">Free Forever</div>
      </div>
      <ul class="plan-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>1 hosted room</strong> (2 people capacity)</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Free 1-on-1 Partner Room</strong> included</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Full food, water, steps, workout &amp; weight diary</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>70k+ Indian food database &amp; barcode scanner</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Basic room nutrition sharing (cals, protein, carbs)</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>On-demand manual macro recalculation</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>3 one-time AI Photo food scans</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>100% offline-first SQLite logging</span></li>
      </ul>
      <a class="btn btn-ghost" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Get Started Free</a>
    </div>

    <!-- Plus Card -->
    <div class="plan-card featured">
      <div class="plan-pill">Most Popular &bull; 7-Day Free Trial</div>
      <div class="plan-header">
        <div class="plan-name">Plus Plan</div>
        <div class="plan-position">The habit and community powerhouse</div>
        <div class="plan-price-wrap">
          <span class="plan-price" id="price-plus">&#8377;1,499</span>
          <span class="plan-period" id="period-plus">/ year</span>
        </div>
        <div class="plan-equiv" id="equiv-plus">&#8377;125 / month &bull; ~50% savings</div>
        <div class="plan-trial-badge">7-Day Free Trial on Monthly &amp; Annual</div>
      </div>
      <ul class="plan-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>3 hosted rooms</strong> (up to 5 people per room)</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Monthly Growth Checks (30d):</strong> Proactive macro updates</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Host pays:</strong> invited members join completely free</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Full shared diary &amp; send/read room text chat</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Live synchronized focus rooms &amp; pair challenges</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>150+ Recipe library &amp; fasting window timer</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Advanced micronutrients (fibre, sat fat, sodium, sugar)</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Meal planner, grocery lists, PRs &amp; photo vault</span></li>
      </ul>
      <a class="btn btn-primary" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Start 7-Day Free Trial</a>
    </div>

    <!-- Pro Card -->
    <div class="plan-card pro">
      <div class="plan-pill pro-pill">Elite AI Coaching</div>
      <div class="plan-header">
        <div class="plan-name">Pro Plan</div>
        <div class="plan-position">Elite AI-coached nutrition &amp; body transformation</div>
        <div class="plan-price-wrap">
          <span class="plan-price" id="price-pro">&#8377;2,499</span>
          <span class="plan-period" id="period-pro">/ year</span>
        </div>
        <div class="plan-equiv" id="equiv-pro">&#8377;192 / month &bull; ~58% savings</div>
        <div class="plan-trial-badge no-trial">0-Day Trial (Immediate Billing)</div>
      </div>
      <ul class="plan-features">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>5 hosted rooms</strong> (up to 20 people per room)</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Weekly Growth Checks (7d)</strong> with AI Coach review</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Personal AI Coach:</strong> 10 context-aware msgs/day</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>AI Photo Food Logging:</strong> 5 scans/day</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>Chat-to-Log:</strong> natural language food parsing</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span><strong>&ldquo;Fits My Day&rdquo;</strong> AI recipes matching remaining macros</span></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${I.check}</svg><span>Room photo &amp; video sharing + Priority support</span></li>
      </ul>
      <a class="btn btn-ghost" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Upgrade to Pro</a>
    </div>
  </div>

  <p class="muted" style="text-align:center;margin-top:24px">
    Prices include all taxes. Payments processed securely via Dodo Payments (Web) &amp; Google Play / App Store (Mobile).
  </p>
</div></section>

<!-- Dynamic Growth Checks Matrix -->
<section class="section"><div class="wrap">
  <div class="section-head">
    <h2>Dynamic Growth Checks &amp; Macro Recalculation</h2>
    <p class="lead" style="margin-top:14px">Nutrition goals are not static. As you drop fat or build muscle, your TDEE shifts. CaliPartner ensures you never hit a wall.</p>
  </div>
  <div class="compare-wrap">
    <table class="compare">
      <thead>
        <tr><th>Plan Tier</th><th>Recalculation Cadence</th><th>How It Works</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Free (Basic)</strong></td>
          <td>On-Demand (Manual)</td>
          <td>Re-trigger the onboarding calculator from settings at any time based on updated scale weight.</td>
        </tr>
        <tr>
          <td><strong>Plus Plan</strong></td>
          <td class="y"><strong>Every Month (30 Days)</strong></td>
          <td>App prompts a Monthly Growth Review: analyzes weight trends, verifies goal pace, and calculates updated macro targets for confirmation.</td>
        </tr>
        <tr>
          <td><strong>Pro Plan</strong></td>
          <td class="y"><strong>Every Week (7 Days)</strong></td>
          <td>The AI Coach actively reviews rolling 7-day weights, workout volume, and compliance, recommending micro calorie and macro refinements to prevent plateaus.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout amber" style="margin-top:20px">
    <strong>Safety Enforcement:</strong> In both Plus and Pro, calorie floors (1,200 kcal women, 1,500 kcal men) and weekly rate caps (maximum 1% body weight per week) remain strictly enforced.
  </div>
</div></section>

<!-- Comprehensive 4-Part Comparison Matrix -->
<section class="section"><div class="wrap">
  <div class="section-head">
    <h2>Comprehensive Feature Comparison Matrix</h2>
    <p class="lead" style="margin-top:14px">Detailed breakdown across all four core pillars of the CaliPartner platform.</p>
  </div>

  <div class="compare-wrap">
    <table class="compare">
      <thead>
        <tr>
          <th style="width:40%">Feature</th>
          <th style="width:20%">Free (Basic)</th>
          <th style="width:20%">Plus Plan</th>
          <th style="width:20%">Pro Plan</th>
        </tr>
      </thead>
      <tbody>
        <!-- Section 3.1 -->
        <tr class="category-row"><td colspan="4">3.1 Core Tracking &amp; Daily Diary</td></tr>
        <tr><td>Food Diary (5 meal slots)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>70,000+ Food Database (IFCT Indian foods first)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Barcode Scanner (Camera &amp; Gallery)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Custom Foods &amp; &ldquo;My Meals&rdquo;</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Calorie &amp; Macro Targets with Safety Floors</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Water Logging &amp; Smart Hydration Reminders</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Steps &amp; Distance (Apple Health / Health Connect)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>GPS Activity Tracking (Walks, Runs, Rides)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Workout Logging (300+ Exercise Catalog)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Weight Tracking &amp; 7-Day Moving Trends</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Personal Progress Graphs &amp; Consistency Score</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Personal Focus Timer &amp; Stopwatch</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Weekly Community Leaderboard</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>100% Offline-First SQLite Architecture</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>

        <!-- Section 3.2 -->
        <tr class="category-row"><td colspan="4">3.2 Social, Accountability &amp; Rooms</td></tr>
        <tr><td>Hosted Rooms Count</td><td><strong>1 room</strong></td><td class="y"><strong>3 rooms</strong></td><td class="y"><strong>5 rooms</strong></td></tr>
        <tr><td>Capacity Per Hosted Room</td><td><strong>2 people</strong></td><td class="y"><strong>5 people</strong></td><td class="y"><strong>20 people</strong></td></tr>
        <tr><td>Member Free Join (Host Pays)</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Free 1-on-1 Partner Room</td><td class="y">Included</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Shared Nutrition in Room</td><td>Basic (cals/protein/carbs)</td><td class="y">Full Diary</td><td class="y">Full Diary</td></tr>
        <tr><td>Room Text Chat</td><td>Read-only</td><td class="y">Send &amp; Read</td><td class="y">Send &amp; Read</td></tr>
        <tr><td>Room Media Sharing (Photos &amp; Videos)</td><td>&mdash;</td><td>&mdash;</td><td class="y">Included (Cloudflare R2)</td></tr>
        <tr><td>Shared Workouts in Room Feed</td><td>Read-only</td><td class="y">Share &amp; Read</td><td class="y">Share &amp; Read</td></tr>
        <tr><td>Live Synchronized Focus Sessions</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Room-Only Leaderboard</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Pair Challenges (1, 7, 30 days)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Seasonal Challenges (Winter Arc, etc.)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Username Search &amp; Friend Requests</td><td>3 requests / 7 days</td><td class="y">Unlimited</td><td class="y">Unlimited</td></tr>
        <tr><td>Partner Finder</td><td>Receive &amp; Accept</td><td class="y">Browse &amp; Send</td><td class="y">Browse &amp; Send</td></tr>

        <!-- Section 3.3 -->
        <tr class="category-row"><td colspan="4">3.3 Nutrition, Wellness &amp; Content</td></tr>
        <tr><td>Recipe Library</td><td>10 starter</td><td class="y">Full (150+)</td><td class="y">Full (150+)</td></tr>
        <tr><td>&ldquo;Fits My Day&rdquo; AI Recipe Collections</td><td>&mdash;</td><td>&mdash;</td><td class="y">Included</td></tr>
        <tr><td>Fasting Tracker &amp; Eating Windows (16:8, 18:6)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Advanced Micronutrients (Fibre, Sat Fat, Sodium, Sugar)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Meal Planner &amp; Auto Grocery Lists</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Workout Routines &amp; Exercise Programs</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Workout Rest Timer &amp; Personal Records (PRs)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Body Circumferences (Chest, Waist, Hips)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Private Progress Photo Vault (Encrypted)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>
        <tr><td>Full Data Export (JSON / CSV)</td><td>&mdash;</td><td class="y">Included</td><td class="y">Included</td></tr>

        <!-- Section 3.4 -->
        <tr class="category-row"><td colspan="4">3.4 AI Intelligence &amp; Coaching</td></tr>
        <tr><td>Personal AI Nutrition &amp; Fitness Coach</td><td>Locked preview</td><td>&mdash;</td><td class="y">10 msgs / day (Claude Haiku)</td></tr>
        <tr><td>AI Photo Food Logging</td><td>3 one-time trial</td><td>&mdash;</td><td class="y">5 scans / day</td></tr>
        <tr><td>Chat-to-Log (&ldquo;I ate 2 eggs and toast&rdquo;)</td><td>&mdash;</td><td>&mdash;</td><td class="y">Included</td></tr>
        <tr><td>Macro Growth Recalculation</td><td>Manual</td><td class="y">Monthly (30 days)</td><td class="y">Weekly (7 days)</td></tr>
        <tr><td>Weekly AI Progress &amp; Metabolic Summary</td><td>&mdash;</td><td>&mdash;</td><td class="y">Included</td></tr>
        <tr><td>Priority Support Queue</td><td>Standard</td><td>Standard</td><td class="y">Priority</td></tr>
      </tbody>
      <tfoot>
        <tr class="table-cta-row">
          <td><strong>Choose your plan &amp; start today</strong></td>
          <td><a class="btn btn-ghost btn-sm" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Get Started Free</a></td>
          <td><a class="btn btn-primary btn-sm" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Start 7-Day Free Trial</a></td>
          <td><a class="btn btn-ghost btn-sm" href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">Upgrade to Pro</a></td>
        </tr>
      </tfoot>
    </table>
  </div>
</div></section>

<!-- Billing Rules & Key Architecture -->
<section class="section tight"><div class="wrap">
  <div class="section-head"><h2>Key Billing &amp; Architectural Rules</h2></div>
  ${rows([
    ["Room Sponsorship Model", "The room host's plan determines room capacity. Invited members do not need to pay to participate. If a host's subscription lapses, the room enters a 30-day protected grace state where any member can upgrade to sponsor it."],
    ["7-Day Free Trial on Plus", "Available exclusively on Plus (both monthly and annual). Cancel anytime before day 7 in your store or web dashboard and you will not be billed."],
    ["Pro Immediate Billing", "Pro has 0 trial days due to underlying Claude Haiku and computer vision compute costs. Billing begins immediately upon subscription confirmation."],
    ["Privacy and Safety", "Strangers in Partner Finder only see banded demographics (age bracket, fitness goal, training style, city)—never your weight, calories, or exact location before mutual pairing."],
  ])}
</div></section>
${cta}`,
});

// About Page
pages["about.html"] = layout({
  file: "about.html",
  title: "About | CaliPartner",
  desc: "CaliPartner exists because fitness is easier with someone beside you. Learn about our product principles, companionships over competition, and team.",
  body: `${pageHead("Fitness is easier with someone beside you", "Most trackers are built for one person and most people quit within weeks. We built CaliPartner around the one thing that keeps people going: a person.")}
<section class="section tight"><div class="wrap">
  ${rows([
    ["Who it is for", "Adults 18 and over who train and eat with intention: gym partners, couples, friend groups running a challenge, and solo users who want to add an accountability partner. India-first, expanding globally."],
    ["What we believe", "Companionship beats competition. Nobody should feel they are losing. Two people with completely different goals—a 1,600 kcal cut and a 3,100 kcal bulk—can look at the same screen and both feel supported."],
  ])}
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2>Our product principles</h2></div>
  ${rows([
    ["Compare to your own goal", "Comparisons show percent of personal target achieved, never raw numbers against someone else's calories."],
    ["Private by default", "Calories, meals, and body weight numbers stay private until you explicitly choose to share them."],
    ["Never reward undereating", "No ranking, badge, or streak is won by eating less than your nutritional safety floor."],
    ["Logging takes seconds", "Barcode scan, AI photo estimate, voice/chat-to-log, and repeat foods take one tap."],
    ["A room survives absence", "If a host lapses, rooms enter a 30-day protected grace state preserving streaks."],
    ["Explainable numbers", "Macro targets and growth recalculations come from published formulas you can inspect."],
  ])}
  <div class="callout amber" style="margin-top:32px">CaliPartner is a fitness and habit-tracking tool and not a medical service. It is not intended for medical or clinical nutrition, pregnancy, or eating-disorder treatment. Consult a physician before changing your diet or exercise routine.</div>
</div></section>
${cta}`,
});

// Contact Page
pages["contact.html"] = layout({
  file: "contact.html",
  title: "Contact and Support | CaliPartner",
  desc: "Contact CaliPartner support for help with your account, billing, refunds, privacy requests or to report a concern.",
  body: `${pageHead("Contact us", "Questions about your account, billing, or privacy? We reply within 2 business days.")}
<section class="section tight"><div class="wrap grid grid-2" style="align-items:start">
  <div class="card contact-list">
    <div class="contact-item"><strong>General and billing support</strong><a href="mailto:${SITE.email}">${SITE.email}</a></div>
    <div class="contact-item"><strong>Privacy and data requests</strong><a href="mailto:${SITE.email}?subject=Privacy%20request">${SITE.email}</a></div>
    <div class="contact-item"><strong>Report abuse or safety concern</strong><a href="mailto:${SITE.email}?subject=Safety%20report">${SITE.email}</a></div>
    <div class="contact-item"><strong>Web Application</strong><a href="${SITE.appUrl}" target="_blank" rel="noopener noreferrer">${SITE.appUrl}</a></div>
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

// Legal Pages
for (const [file, p] of Object.entries(legal.pages(SITE))) {
  pages[file] = layout({
    file,
    title: p.title + " | CaliPartner",
    desc: p.desc,
    body: `${pageHead(p.h1, p.lead)}<section><div class="wrap"><article class="prose"><p class="updated">Last updated: ${SITE.updated}</p>${p.html}</article></div></section>`,
  });
}

// Write out all pages
for (const [f, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, f), html);
}

// Write favicon
fs.mkdirSync(path.join(__dirname, "assets"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "assets/favicon.svg"), faviconSvg);

// Generate sitemap & robots.txt
const urls = Object.keys(pages).map((f) => `<url><loc>${SITE.domain}/${f === "index.html" ? "" : f}</loc></url>`).join("");
fs.writeFileSync(path.join(__dirname, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
fs.writeFileSync(path.join(__dirname, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`);

console.log("Successfully built", Object.keys(pages).length, "pages with Apricot on Espresso branding & October 2026 tiers.");
