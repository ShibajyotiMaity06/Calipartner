// Legal and policy page content. `pages(SITE)` returns { "file.html": {title,desc,h1,lead,html} }
module.exports.pages = (S) => ({
  "terms.html": {
    title: "Terms and conditions",
    desc: "The terms that govern your use of the CaliPartner app and website, including subscriptions, rooms, chat, AI coaching, and acceptable use.",
    h1: "Terms and conditions",
    lead: "Please read these terms before using CaliPartner. By creating an account or using the app you agree to them.",
    html: `
<div class="toc"><a href="#about">About</a><a href="#eligibility">Eligibility</a><a href="#accounts">Accounts</a><a href="#subs">Subscriptions</a><a href="#rooms">Rooms and chat</a><a href="#health">Health disclaimer</a><a href="#liability">Liability</a><a href="#contact">Contact</a></div>
<h2 id="about">1. About the service</h2>
<p>CaliPartner (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by ${S.legalName}, ${S.address}. CaliPartner is a mobile app and web application for tracking food, water, steps, workouts, and body progress, and for sharing selected information with other people in private &ldquo;rooms&rdquo;. The service is delivered digitally; there is no physical product or shipping.</p>
<h2 id="eligibility">2. Eligibility</h2>
<p>You must be at least <strong>18 years old</strong> to use CaliPartner. We collect your date of birth and block users under 18. If we learn that an account belongs to someone under 18, we will close it.</p>
<h2 id="accounts">3. Your account</h2>
<ul>
<li>You can sign in with phone OTP, Google, Apple or email, and you choose a unique @username.</li>
<li>You are responsible for the accuracy of the information you provide and for keeping your login secure.</li>
<li>You may delete your account at any time from the app or by following our <a href="delete-account.html">account deletion page</a>.</li>
</ul>
<h2 id="subs">4. Plans, billing and free trial</h2>
<ul>
<li><strong>Free Tier (Basic):</strong> Personal logging of food, water, steps, workouts and weight, your diary, personal progress, personal streaks, and your free 1-on-1 partner room (capacity 2 people) are free forever.</li>
<li><strong>Plus Plan:</strong> The habit and community powerhouse. India: &#8377;249 per month or &#8377;1,499 per year (~50% annual savings). Global: $4.99 per month or $29.99 per year (~53% annual savings). Includes a <strong>7-day free trial</strong> on both monthly and annual plans. Features hosting up to 3 rooms (up to 5 people per room), monthly macro growth checks (every 30 days), full shared diary, send &amp; read room text chat, shared workouts, live focus sessions, room leaderboards, fasting timer, and advanced micronutrient tracking.</li>
<li><strong>Pro Plan:</strong> The elite AI-coached nutrition and body transformation tier. India: &#8377;499 per month or &#8377;2,499 per year (~58% annual savings). Global: $9.99 per month or $49.00 per year (~61% annual savings). <strong>No free trial (0 days)</strong> due to high underlying vision and language model compute costs. Billed immediately upon confirmation. Features hosting up to 5 rooms (up to 20 people per room), weekly AI growth &amp; macro recalculation checks (every 7 days), context-aware Personal AI Coach (10 msgs/day), AI Photo Food Logging (5 scans/day), Chat-to-Log, &ldquo;Fits My Day&rdquo; AI recipe collections, room photo &amp; video sharing, weekly AI progress summaries, and priority support.</li>
<li><strong>Room Sponsorship Model (Host Pays):</strong> The room creator/host's plan determines the room capacity (Free: 2, Plus: 5, Pro: 20 members). Invited members join any paid room for free without needing their own subscription. If a host's plan lapses, the room enters a 30-day grace/paused state where any member can sponsor it, preserving all streaks and history.</li>
<li><strong>Auto-renewal:</strong> Plans renew automatically at the end of each period until you cancel. Cancel before the renewal date through your store or web subscription settings to avoid the next charge.</li>
<li><strong>Payment processing:</strong> In-app purchases are processed by Google Play Billing, Apple In-App Purchase, or RevenueCat. Web purchases are processed by our payment partner, Dodo Payments, which acts as the merchant of record for web transactions.</li>
<li><strong>Refunds:</strong> See our <a href="refund-policy.html">refund and cancellation policy</a>.</li>
</ul>
<h2 id="rooms">5. Rooms, chat and your content</h2>
<p>Rooms are private. Only room members can read or send chat messages and images. You keep ownership of the content you create, and you give us a limited licence to store, process and display it as needed to run the service for you and the members you share with.</p>
<p>You agree to follow our <a href="community-guidelines.html">community guidelines</a>. We may remove content, limit features or suspend accounts that break them. You can report, mute and block other members.</p>
<h2>6. Acceptable use</h2>
<ul>
<li>Do not harass, threaten, impersonate or spam others, or share unlawful, hateful, sexual or exploitative content.</li>
<li>Do not use CaliPartner to encourage eating disorders, extreme restriction or unsafe weight loss. Calorie safety floors (1,200 kcal women, 1,500 kcal men) and weekly rate caps (1% body weight per week) are strictly enforced.</li>
<li>Do not scrape, reverse engineer, overload or attempt to break into the service.</li>
</ul>
<h2 id="health">7. Health disclaimer</h2>
<div class="callout amber">CaliPartner provides general fitness and nutrition information and estimates. It is <strong>not medical advice</strong> and does not diagnose or treat any condition. Calorie targets, calorie burn and AI photo estimates are approximations. Speak to a doctor or registered dietitian before starting a diet or exercise programme, especially if you are pregnant, have a medical condition or a history of disordered eating.</div>
<h2>8. Third-party services</h2>
<p>The app may use Google Health Connect, Apple HealthKit, Open Food Facts, push notification services and app store billing. Their own terms and privacy policies apply to your use of them.</p>
<h2>9. Intellectual property</h2>
<p>The CaliPartner name, logo, design and software belong to ${S.legalName} or its licensors. We grant you a personal, non-exclusive, non-transferable licence to use the app for its intended purpose.</p>
<h2 id="liability">10. Disclaimers and limitation of liability</h2>
<p>The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the maximum extent allowed by law, we are not liable for indirect or consequential losses, and our total liability for any claim is limited to the amount you paid us in the 3 months before the claim. Nothing in these terms limits liability that cannot be limited by law.</p>
<h2>11. Termination</h2>
<p>You may stop using CaliPartner at any time. We may suspend or terminate access if you breach these terms or misuse the service. Terminating your account does not by itself cancel a store subscription; you must cancel that in the store.</p>
<h2>12. Changes</h2>
<p>We may update these terms. If changes are material, we will notify you in the app or by email. Continued use after the effective date means you accept the updated terms.</p>
<h2>13. Governing law and disputes</h2>
<p>These terms are governed by the laws of India. Courts in India have jurisdiction, subject to any consumer protection rights you have where you live. Please contact us first so we can try to resolve the issue informally.</p>
<h2 id="contact">14. Contact</h2>
<p>Email <a href="mailto:${S.email}">${S.email}</a> or use our <a href="contact.html">contact page</a>.</p>`,
  },

  "privacy.html": {
    title: "Privacy policy",
    desc: "How CaliPartner collects, uses, shares and protects your personal and health-related data, and the controls you have.",
    h1: "Privacy policy",
    lead: "Your fitness data is personal. This policy explains what we collect, why, who sees it and how you stay in control.",
    html: `
<div class="toc"><a href="#collect">What we collect</a><a href="#use">How we use it</a><a href="#share">Sharing</a><a href="#rights">Your rights</a><a href="#retention">Retention</a><a href="#security">Security</a></div>
<h2 id="collect">1. Information we collect</h2>
<h3>Information you give us</h3>
<ul>
<li>Account details: nickname, @username, email or phone number, date of birth, profile picture.</li>
<li>Body and goal data: sex, height, weight, activity level, goal and target weight.</li>
<li>Logs: foods, meals, photos you submit for estimation, water, workouts, weight and notes.</li>
<li>Room content: chat messages and images, reactions, nudges, invitations and join requests.</li>
<li>Messages you send to our support team.</li>
</ul>
<h3>Information from your device</h3>
<ul>
<li>Steps, distance and workouts from Health Connect (Android) or Apple Health (iOS), only if you grant permission, requested when you first use that feature.</li>
<li>Camera and photo library access for barcode scanning, meal photos and chat images, only when you use those features.</li>
<li>Push notification token, device model, operating system, app version, crash logs and basic usage analytics.</li>
</ul>
<h3>Purchase information</h3>
<p>We receive subscription status and a transaction identifier from Google Play, the App Store, RevenueCat or Dodo Payments. We do <strong>not</strong> receive or store your full card or UPI details.</p>
<h2 id="use">2. How we use your information</h2>
<ul>
<li>To provide the app: calculate targets, store your diary, show progress and sync across devices.</li>
<li>To run rooms: display the data you chose to share to your room members and deliver chat and notifications.</li>
<li>To process subscriptions and prevent fraud.</li>
<li>To provide AI photo estimates and coaching. Photos and food text queries are sent to secure AI inference endpoints solely to generate nutrition analysis and coaching feedback.</li>
<li>To keep the community safe: handle reports, enforce rules and prevent abuse.</li>
<li>To improve reliability and product quality using aggregated analytics.</li>
</ul>
<p>We do <strong>not</strong> sell your personal data and we do not use your health data for advertising.</p>
<h2 id="share">3. Who can see your data</h2>
<h3>Other room members</h3>
<p>Sharing is controlled by you, per room and per data type. By default, room members see only whether you logged today, your streak and your goal-completion percent. Calories, macros, individual meals and your weight number stay hidden unless you opt in. Chat messages and media are visible only to members of that specific room.</p>
<h3>Leaderboards</h3>
<p>Leaderboards show only your nickname, avatar and consistency score. You can opt out at any time.</p>
<h3>Service providers</h3>
<p>We share data with providers that help us operate: cloud infrastructure (Cloudflare R2, database), push notifications, AI inference providers, subscription management (RevenueCat) and payment processing (Dodo Payments). They may only use data to provide services to us.</p>
<h3>Legal reasons</h3>
<p>We may disclose information if required by law or to protect the safety of users or the public.</p>
<h2 id="rights">4. Your choices and rights</h2>
<ul>
<li>Change what you share at any time under Me, then Privacy. Changes apply immediately.</li>
<li>Access, correct or export your data. Full JSON/CSV data export is available in the app.</li>
<li>Delete your account and data in the app or through our <a href="delete-account.html">account deletion page</a>.</li>
<li>Withdraw permissions (health data, camera, notifications) in your device settings.</li>
<li>Choose &ldquo;Nobody&rdquo; under who can find you by username.</li>
<li>If you are in India, you have rights under the Digital Personal Data Protection Act, 2023. If you are in the EEA or UK, you have rights under GDPR. Contact us to exercise them.</li>
</ul>
<h2 id="retention">5. How long we keep data</h2>
<p>We keep your data while your account is active. When you delete your account, we remove personal data within 30 days, except limited records we must keep for legal, tax, fraud-prevention or dispute purposes. Backups are overwritten on a rolling basis.</p>
<h2 id="security">6. Security</h2>
<p>We use encryption in transit, access controls and server-side security definers on every room read and write. Location (EXIF) metadata is stripped from images you upload. No system is perfectly secure, so please use a strong login and tell us right away if you suspect misuse.</p>
<h2>7. Children</h2>
<p>CaliPartner is for adults aged 18 and over. We do not knowingly collect data from anyone under 18. See our <a href="child-safety.html">child safety page</a>.</p>
<h2>8. International transfers</h2>
<p>Your data may be processed in countries other than where you live. We use appropriate safeguards when we do so.</p>
<h2>9. Changes to this policy</h2>
<p>If we make material changes we will let you know in the app or by email before they take effect.</p>
<h2>10. Contact and grievance officer</h2>
<p>For privacy questions or complaints, email <a href="mailto:${S.email}?subject=Privacy%20request">${S.email}</a>. We aim to respond within 7 days.</p>`,
  },

  "refund-policy.html": {
    title: "Refund and cancellation policy",
    desc: "How to cancel your CaliPartner subscription and when refunds are available for Google Play, App Store and web purchases.",
    h1: "Refund and cancellation policy",
    lead: "Cancel anytime. Here is how cancellation works and how to request a refund.",
    html: `
<h2>1. Free trial</h2>
<p>CaliPartner Plus includes a <strong>7-day free trial</strong> on both Monthly and Annual subscriptions. You can test all room hosting, chat, focus sessions, and advanced micronutrients for 7 days without being charged. If you cancel during the trial, you will not be billed. CaliPartner Pro does not include a free trial due to immediate vision and AI compute costs.</p>
<h2>2. Cancelling your subscription</h2>
<p>You can cancel at any time. Your plan stays active until the end of the period you have already paid for, and then it does not renew. Deleting the app or your CaliPartner account does <strong>not</strong> cancel a store or web subscription, so please cancel first.</p>
<ul>
<li><strong>Google Play:</strong> open Play Store, tap your profile, choose Payments and subscriptions, then Subscriptions, select CaliPartner and tap Cancel.</li>
<li><strong>App Store:</strong> open Settings, tap your name, choose Subscriptions, select CaliPartner and tap Cancel Subscription.</li>
<li><strong>Web purchases (Dodo Payments):</strong> use the cancellation link in your receipt email from Dodo Payments, or manage your subscription in your web account settings.</li>
</ul>
<h2>3. Refunds</h2>
<ul>
<li><strong>Google Play and App Store purchases:</strong> The stores process these refunds under their own policies. Request one through <a href="https://support.google.com/googleplay/answer/2479637">Google Play refunds</a> or <a href="https://reportaproblem.apple.com">Apple's Report a Problem</a>. We cannot issue refunds for store purchases directly, but we will support your request where we can.</li>
<li><strong>Web purchases (Dodo Payments):</strong> If you subscribed through our website and wish to cancel outside the trial window, you may request a refund within <strong>7 days</strong> of the initial charge, provided you have not meaningfully utilized high-compute AI coaching or photo scanning. Email us with your registered email and receipt.</li>
<li><strong>Accidental or duplicate charges:</strong> We will refund duplicate or erroneous charges in full upon verification.</li>
<li><strong>Not eligible:</strong> Partial-period refunds after the 7-day window, and plans terminated for serious violations of our community guidelines.</li>
</ul>
<h2>4. How long refunds take</h2>
<p>Approved web refunds are issued to the original payment method and typically take 5 to 10 business days to appear on your bank statement.</p>
<h2>5. If a host's plan ends (Room Sponsorship)</h2>
<p>Because CaliPartner uses a host-sponsorship model, room members enjoy room features at no charge under the host's plan. If the host's plan lapses, the room enters a <strong>30-day grace/paused state</strong> where all streaks, routines, and chat history are preserved. Any room member can upgrade to sponsor the room to reactivate it immediately.</p>
<h2>6. Delivery</h2>
<p>CaliPartner is a digital application. Access to paid features begins immediately upon successful payment confirmation.</p>
<h2>7. Contact</h2>
<p>For billing help email <a href="mailto:${S.email}?subject=Billing%20or%20refund">${S.email}</a> with your registered email and, if available, your transaction ID.</p>`,
  },

  "community-guidelines.html": {
    title: "Community guidelines",
    desc: "The rules for chat, images and behavior in CaliPartner rooms, and how reporting, blocking and moderation work.",
    h1: "Community guidelines",
    lead: "Rooms are small, private spaces for people who support each other. These rules keep them that way.",
    html: `
<h2>Be supportive</h2>
<ul>
<li>Encourage progress. Do not shame anyone for what they eat, weigh or miss.</li>
<li>Respect each person's own goal. A cut and a bulk are equally valid.</li>
<li>Do not pressure anyone to share data they have chosen to keep private.</li>
</ul>
<h2>Not allowed</h2>
<ul>
<li>Harassment, bullying, threats, hate speech or discrimination.</li>
<li>Sexual, graphic, violent or exploitative images or messages.</li>
<li>Content that promotes eating disorders, extreme restriction, purging or unsafe weight loss.</li>
<li>Impersonation, spam, scams, advertising or selling products.</li>
<li>Sharing someone else's private information or images without their consent.</li>
<li>Any content involving minors in an unsafe or inappropriate context.</li>
</ul>
<h2>Your safety tools</h2>
<ul>
<li><strong>Report</strong> a message, profile or username from within the app.</li>
<li><strong>Block</strong> a person so they cannot find, invite or request you.</li>
<li><strong>Mute</strong> a member to hide their nudges, reactions and chat from you.</li>
<li><strong>Leave</strong> any room at any time.</li>
<li>Choose &ldquo;Nobody&rdquo; under who can find you by username.</li>
</ul>
<h2>How we enforce</h2>
<p>Reports go to a moderation queue. Depending on severity we may remove content, warn, restrict chat or suspend the account. Serious violations may be reported to the authorities. Send urgent reports to <a href="mailto:${S.email}?subject=Safety%20report">${S.email}</a>.</p>
<div class="callout">If you or someone you know is struggling with an eating disorder or in crisis, please contact a local helpline or a medical professional right away.</div>`,
  },

  "child-safety.html": {
    title: "Child safety",
    desc: "CaliPartner is for adults 18 and over. Our age gate, our standards against child sexual abuse and exploitation, and how to report.",
    h1: "Child safety standards",
    lead: "CaliPartner is an adults-only app. We have zero tolerance for child sexual abuse and exploitation.",
    html: `
<h2>Age requirement</h2>
<p>You must be 18 or older to use CaliPartner. We collect date of birth at sign-up and block anyone under 18. Accounts found to belong to under-18s are closed.</p>
<h2>Our standards</h2>
<ul>
<li>We prohibit child sexual abuse material (CSAM) and any content that sexualises or endangers minors.</li>
<li>Chat is private to room members, includes reporting and blocking, and uses moderation tools for reported content.</li>
<li>Reported content is reviewed, removed and the account is permanently banned where appropriate.</li>
<li>We report apparent CSAM to the relevant authorities and child protection organisations as required by law.</li>
</ul>
<h2>Report a concern</h2>
<p>Use the in-app report option, or email <a href="mailto:${S.email}?subject=Child%20safety%20report">${S.email}</a>. In India you can also report online child abuse content at <a href="https://cybercrime.gov.in">cybercrime.gov.in</a>.</p>`,
  },

  "delete-account.html": {
    title: "Delete your account",
    desc: "How to delete your CaliPartner account and data from the app, or request deletion by email.",
    h1: "Delete your account",
    lead: "You can delete your account and personal data at any time.",
    html: `
<h2>Option 1: in the app</h2>
<ul>
<li>Open CaliPartner and go to <strong>Me</strong>.</li>
<li>Tap <strong>Account</strong>, then <strong>Delete account</strong>.</li>
<li>Confirm. Your session ends and deletion begins.</li>
</ul>
<h2>Option 2: by email</h2>
<p>If you cannot access the app, email <a href="mailto:${S.email}?subject=Delete%20my%20account">${S.email}</a> from your registered email address (or include your @username) with the subject &ldquo;Delete my account&rdquo;. We may ask you to verify ownership. We complete requests within 30 days.</p>
<h2>What gets deleted</h2>
<ul>
<li>Your profile, goals, body data, food, water, steps, workout and weight logs.</li>
<li>Your room memberships and the chat messages and images you sent.</li>
<li>Your leaderboard entries and your username, which is held for 30 days before others can claim it.</li>
</ul>
<h2>What we may keep</h2>
<p>Limited records needed for legal, tax, fraud-prevention or dispute purposes, such as transaction records, may be retained for the period required by law. Backups are overwritten on a rolling basis.</p>
<div class="callout amber"><strong>Cancel your subscription first.</strong> Deleting your account does not cancel a Google Play, App Store, or web subscription. See <a href="refund-policy.html">how to cancel</a>.</div>
<p>Your room partners will see that you left the room. Your streak cannot be restored after deletion.</p>`,
  },
});
