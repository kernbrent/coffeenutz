import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const orderUrl = "https://order.toasttab.com/online/coffee-nutz-nro-1-6951-south-custer-road-ste500";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Coffee+Nutz+6951+South+Custer+Road+McKinney+TX+75070";
const mapEmbedUrl = "https://www.google.com/maps?q=Coffee%20Nutz%2C%206951%20S%20Custer%20Rd%20Ste%20500%2C%20McKinney%2C%20TX%2075070&output=embed";

const concepts = [
  { slug: "pour-over-theatre", number: "01", name: "Pour-Over Theatre", bodyClass: "theatre-page", themeColor: "#171310" },
  { slug: "family-table", number: "02", name: "The Family Table", bodyClass: "family-page", themeColor: "#f8eddb" },
  { slug: "specialty-playground", number: "03", name: "Specialty Playground", bodyClass: "playground-page", themeColor: "#078be8", blueMan: true },
  { slug: "coffee-journal", number: "04", name: "The Coffee Journal", bodyClass: "journal-page", themeColor: "#f3eee4" },
  { slug: "neighborhood-destination", number: "05", name: "Neighborhood Destination", bodyClass: "destination-page", themeColor: "#182640" },
  { slug: "blue-man-forward", number: "06", name: "Blue Man Forward", bodyClass: "blue-forward-page", themeColor: "#078be8", blueMan: true }
];

const pages = {
  menu: {
    path: "menu",
    label: "Menu",
    title: "Coffee, Matcha, Breakfast & Lunch Menu in McKinney",
    description: "Explore Coffee Nutz specialty coffee, matcha, breakfast, lunch, and desserts at 6951 S. Custer Road in McKinney, Texas.",
    canonical: "/menu/",
    kicker: "Coffee shop menu · McKinney, Texas",
    heading: "Coffee, matcha, breakfast, and lunch—made for your day.",
    intro: "Start with carefully prepared espresso, pour-over, or siphon coffee. Add premium matcha, a fresh breakfast, a satisfying lunch, or a café dessert, all served at our neighborhood coffee shop on South Custer Road.",
    image: "breakfast-melt.webp",
    imageAlt: "Coffee Nutz breakfast melt served at the McKinney coffee shop"
  },
  story: {
    path: "why-coffee-nutz",
    label: "Our Story",
    title: "About Coffee Nutz, a Specialty Coffee Shop in McKinney",
    description: "Meet Coffee Nutz, a family-owned McKinney coffee shop serving specialty coffee, premium matcha, fresh breakfast, lunch, and desserts.",
    canonical: "/why-coffee-nutz/",
    kicker: "Family owned · McKinney made",
    heading: "Great coffee should be honest, thoughtful, and shared.",
    intro: "Coffee Nutz began with a love for the origins, science, and community behind a remarkable cup. Today, we bring that care to specialty coffee, premium matcha, and fresh café food in a welcoming McKinney neighborhood space.",
    image: "cafe-counter.webp",
    imageAlt: "The welcoming counter inside Coffee Nutz in McKinney, Texas"
  },
  faq: {
    path: "faq",
    label: "FAQ",
    title: "Coffee Nutz FAQ | Coffee Shop in McKinney, TX",
    description: "Find answers about Coffee Nutz coffee, matcha, breakfast, lunch, desserts, Wi-Fi, private events, ordering, and our McKinney location.",
    canonical: "/faq/",
    kicker: "Before your visit",
    heading: "Questions? Let’s make your next coffee run easy.",
    intro: "Learn what we brew, what we serve, and what to expect when you visit Coffee Nutz at 6951 South Custer Road in McKinney, Texas.",
    image: "cafe-seating.webp",
    imageAlt: "Comfortable seating inside the Coffee Nutz café in McKinney"
  }
};

const products = [
  ["eggplant-toast.webp", "Eggplant Toast", "Breakfast & lunch", "Roasted eggplant and creamy burrata layered on crisp toast."],
  ["breakfast-melt.webp", "Breakfast Melt", "Breakfast", "A warm, satisfying café breakfast built for busy mornings."],
  ["breakfast-plate.webp", "Traditional Breakfast", "Breakfast", "Eggs, bacon, breakfast potatoes, toast, and a fresh side."],
  ["yogurt-bowl.webp", "Morning Yogurt Bowl", "Breakfast", "Greek yogurt, granola, banana, berries, and fresh fruit."],
  ["crab-sandwich.webp", "Crab Breakfast Sandwich", "Breakfast & lunch", "A stacked Coffee Nutz favorite with a savory, satisfying bite."],
  ["chicken-salad.webp", "Grilled Chicken Salad", "Lunch", "A fresh, balanced salad with grilled chicken, corn, and tomatoes."],
  ["momo-yuzu.webp", "Momo Yuzu", "Specialty drinks", "A bright, fruit-forward iced drink made for a refreshing afternoon."],
  ["lychee-matcha.webp", "Lychee Matcha", "Premium matcha", "Smooth Japanese matcha paired with fragrant lychee flavor."],
  ["tiramisu.webp", "Tiramisu", "Desserts", "A classic coffee-paired dessert with layers of creamy richness."],
  ["golden-brown.webp", "Golden Brown", "Coffee", "A warm specialty coffee with brown sugar and cinnamon notes."],
  ["iced-latte.webp", "Iced Specialty Latte", "Coffee", "Espresso, milk, and carefully balanced seasonal flavor."],
  ["biscoff-latte.webp", "Biscoff Latte", "Signature coffee", "Rich espresso, creamy sweetness, and warm Biscoff spice."]
];

const faqs = [
  ["Where is Coffee Nutz located?", `Coffee Nutz is at <a href="${mapsUrl}" target="_blank" rel="noopener">6951 South Custer Road, Suite 500, McKinney, TX 75070</a>, near the Frisco and Plano borders.`],
  ["What specialty coffee do you serve?", "We serve specialty coffee from renowned origins such as Panama, Colombia, and Ethiopia, roasted by exceptional partners from Seattle, Dubai, and Texas. Our baristas can help you choose espresso, pour-over, siphon coffee, or another brew that fits your taste."],
  ["What is pour-over coffee?", "Pour-over is an intentional brewing method that highlights the original character of specialty coffee beans. It often produces a cleaner, brighter, and more expressive cup than standard drip coffee."],
  ["What is siphon coffee?", "Siphon coffee uses heat, pressure, and vacuum brewing to create a clean, aromatic, and silky cup. It is a distinctive way to explore premium single-origin coffee."],
  ["Do you serve matcha drinks in McKinney?", "Yes. Coffee Nutz serves premium matcha drinks made with matcha sourced from Japan, including creative seasonal combinations and smooth café classics."],
  ["Do you serve breakfast and lunch?", "Yes. Our McKinney café serves freshly made breakfast and lunch, including toast, breakfast melts, sandwiches, salads, yogurt bowls, and other rotating favorites."],
  ["What desserts do you serve?", "Our café desserts include favorites such as tiramisu, canelé, Pastel de Nata, and other selections chosen to pair with espresso, pour-over, siphon coffee, and matcha."],
  ["Does Coffee Nutz have seating and Wi-Fi?", "Yes. We offer more than 20 seats and free Wi-Fi, making Coffee Nutz comfortable for meeting a friend, relaxing, or getting some work done."],
  ["Can I order Coffee Nutz online?", `Yes. Use our <a href="${orderUrl}" target="_blank" rel="noopener">live online menu</a> to see current availability, prices, and pickup options.`],
  ["Does Coffee Nutz host private events?", "Yes. We welcome inquiries for private gatherings, celebrations, workshops, and community occasions. Call us at (469) 678-5050 to ask about availability."]
];

const localBusinessSchema = `{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": "https://coffee-nutz.com/#coffee-shop",
  "name": "Coffee Nutz",
  "url": "https://coffee-nutz.com/",
  "image": "https://coffee-nutz.com/assets/images/cafe-counter.webp",
  "logo": "https://coffee-nutz.com/assets/images/coffee-nutz-logo.png",
  "telephone": "+1-469-678-5050",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6951 South Custer Road, Suite 500",
    "addressLocality": "McKinney",
    "addressRegion": "TX",
    "postalCode": "75070",
    "addressCountry": "US"
  },
  "servesCuisine": ["Specialty coffee", "Matcha", "Breakfast", "Lunch", "Desserts"],
  "menu": "https://coffee-nutz.com/menu/",
  "sameAs": [
    "https://www.instagram.com/coffeenutz_dtx",
    "https://www.facebook.com/956262774241507"
  ]
}`;

function conceptPath(concept, pageKey = "home") {
  const suffix = pageKey === "home" ? "" : `${pages[pageKey].path}/`;
  return `/concepts/${concept.slug}/${suffix}`;
}

function head(concept, page) {
  const canonicalUrl = `https://coffee-nutz.com${page.canonical}`;
  return `  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${page.title} | ${concept.name} Preview</title>
    <meta name="description" content="${page.description}">
    <meta name="robots" content="noindex, follow">
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="theme-color" content="${concept.themeColor}">
    <meta property="og:title" content="${page.title} | Coffee Nutz">
    <meta property="og:description" content="${page.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="https://coffee-nutz.com/assets/images/${page.image}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/images/favicon.png">
    <link rel="stylesheet" href="/assets/concepts.css?v=1.2.0">
    <link rel="stylesheet" href="/assets/concept-pages.css?v=1.2.0">
    <link rel="stylesheet" href="/assets/universal.css?v=1.2.0">
    <script type="application/ld+json">${localBusinessSchema}</script>
    <script src="/assets/concepts.js?v=1.2.0" defer></script>
    <script src="/assets/universal.js?v=1.2.0" defer></script>
  </head>`;
}

function reviewBar(concept, pageKey) {
  const index = concepts.findIndex((candidate) => candidate.slug === concept.slug);
  const previous = concepts[(index - 1 + concepts.length) % concepts.length];
  const next = concepts[(index + 1) % concepts.length];
  const rootDestination = pageKey === "home" ? "/" : `/${pages[pageKey].path}/`;
  const options = [
    `<option value="${rootDestination}">00 — Current site</option>`,
    ...concepts.map((candidate) => `<option value="${conceptPath(candidate, pageKey)}"${candidate.slug === concept.slug ? " selected" : ""}>${candidate.number} — ${candidate.name}</option>`)
  ].join("\n          ");

  return `    <aside class="review-bar" aria-label="Concept review controls">
      <a class="review-bar__back" href="/choose.html">← All concepts</a>
      <label class="review-bar__switcher">Switch design
        <select data-concept-select aria-label="Switch design while staying on ${pageKey === "home" ? "the homepage" : pages[pageKey].label}">
          ${options}
        </select>
      </label>
      <nav class="review-bar__pages" aria-label="Previous and next concept">
        <a href="${conceptPath(previous, pageKey)}">← ${previous.number}</a>
        <a href="${conceptPath(next, pageKey)}">${next.number} →</a>
      </nav>
    </aside>`;
}

function blueManOrder(concept) {
  if (!concept.blueMan) return `    <a class="floating-order" href="${orderUrl}" target="_blank" rel="noopener">Order online</a>`;
  return `    <a class="blue-man-order" href="${orderUrl}" target="_blank" rel="noopener" aria-label="Blue Man says: Order online">
      <span class="blue-man-order__bubble"><small>Blue Man says</small><strong>Order online</strong></span>
      <img src="/assets/images/coffee-nutz-blue-man.png" alt="">
    </a>`;
}

function header(concept, activeKey) {
  const navItems = [
    ["home", "Home", conceptPath(concept)],
    ["menu", "Menu", conceptPath(concept, "menu")],
    ["story", "Our Story", conceptPath(concept, "story")],
    ["faq", "FAQ", conceptPath(concept, "faq")]
  ];
  const links = navItems.map(([key, label, href]) => `<a href="${href}"${key === activeKey ? ` aria-current="page"` : ""}>${label}</a>`).join("\n        ");
  return `    <header class="concept-site-header">
      <a class="concept-logo" href="${conceptPath(concept)}" aria-label="Coffee Nutz ${concept.name} home"><img src="/assets/images/coffee-nutz-logo.png" alt="Coffee Nutz"></a>
      <button class="concept-nav-toggle" type="button" aria-controls="${concept.slug}-nav" aria-expanded="false" data-concept-nav-toggle>Explore</button>
      <nav class="concept-nav" id="${concept.slug}-nav" data-concept-nav data-open="false" aria-label="Primary navigation">
        ${links}
        <a class="concept-nav__order" href="${orderUrl}" target="_blank" rel="noopener">Order Online</a>
      </nav>
    </header>`;
}

function locationSection() {
  return `    <section class="universal-location" aria-labelledby="location-title">
      <div class="universal-location__copy">
        <p class="universal-location__eyebrow">Coffee shop in McKinney, Texas</p>
        <h2 id="location-title">Your next cup is nearby.</h2>
        <div>
          <p class="universal-location__address">6951 South Custer Road, Suite 500<br>McKinney, TX 75070</p>
          <p class="universal-location__note">Near the Frisco and Plano borders · Storefront parking · Free Wi-Fi</p>
          <p><a class="universal-location__phone" href="tel:+14696785050">(469) 678-5050</a></p>
          <a class="universal-location__link" href="${mapsUrl}" target="_blank" rel="noopener">Get directions in Google Maps →</a>
        </div>
      </div>
      <div class="universal-map"><iframe title="Map showing Coffee Nutz at 6951 South Custer Road in McKinney, Texas" src="${mapEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </section>`;
}

function footer(concept) {
  return `    <footer class="universal-footer">
      <div class="universal-footer__brand"><img src="/assets/images/coffee-nutz-logo.png" alt="Coffee Nutz"><p>Specialty coffee, premium matcha, fresh breakfast, lunch, and desserts in McKinney, Texas.</p></div>
      <div class="universal-footer__visit"><h2>Visit</h2><p class="universal-footer__location">6951 S. Custer Rd, Suite 500<br>McKinney, TX 75070<br><a href="tel:+14696785050">(469) 678-5050</a></p></div>
      <nav aria-label="Footer navigation"><h2>Explore</h2><ul><li><a href="${conceptPath(concept)}">Home</a></li><li><a href="${conceptPath(concept, "menu")}">Menu</a></li><li><a href="${conceptPath(concept, "story")}">Our Story</a></li><li><a href="${conceptPath(concept, "faq")}">FAQ</a></li><li><a href="/choose.html">Compare designs</a></li></ul></nav>
      <div><h2>Connect</h2><ul><li><a href="https://www.instagram.com/coffeenutz_dtx" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://www.facebook.com/956262774241507" target="_blank" rel="noopener">Facebook</a></li><li><a href="${orderUrl}" target="_blank" rel="noopener">Order online</a></li></ul></div>
      <div class="universal-footer__legal"><span>© 2026 Coffee Nutz. All rights reserved.</span><span>Brewed bold. Crafted fresh.</span></div>
    </footer>`;
}

function hero(page) {
  return `      <section class="concept-inner-hero" aria-labelledby="page-title">
        <div class="concept-inner-hero__copy">
          <p class="concept-kicker">${page.kicker}</p>
          <h1 id="page-title">${page.heading}</h1>
          <p>${page.intro}</p>
          <div class="concept-inner-actions">
            <a class="concept-button" href="${page.path === "menu" ? orderUrl : mapsUrl}" target="_blank" rel="noopener">${page.path === "menu" ? "View live menu" : "Plan your visit"}</a>
            <a class="concept-button concept-button--outline" href="tel:+14696785050">Call (469) 678-5050</a>
          </div>
        </div>
        <figure class="concept-inner-hero__visual">
          <img src="/assets/images/${page.image}" alt="${page.imageAlt}">
          <figcaption>6951 S. Custer Rd · McKinney, TX</figcaption>
        </figure>
      </section>`;
}

function menuContent() {
  const cards = products.map(([image, name, category, description]) => `        <article class="concept-menu-card">
          <img src="/assets/images/${image}" alt="${name} from Coffee Nutz in McKinney" loading="lazy">
          <div><p>${category}</p><h2>${name}</h2><span>${description}</span></div>
        </article>`).join("\n");
  return `      <section class="concept-inner-section" aria-labelledby="menu-favorites-title">
        <div class="concept-inner-heading"><div><p class="concept-kicker">Explore the café</p><h2 id="menu-favorites-title">Coffee Nutz favorites</h2></div><p>Selections change, so visit the live ordering menu for current availability and prices.</p></div>
        <div class="concept-menu-grid">
${cards}
        </div>
        <div class="concept-inner-cta"><div><p class="concept-kicker">Ready when you are</p><h2>Order ahead for pickup.</h2><p>Browse the current menu and send your order directly to the Coffee Nutz team.</p></div><a class="concept-button" href="${orderUrl}" target="_blank" rel="noopener">Order online</a></div>
      </section>`;
}

function storyContent() {
  return `      <section class="concept-story" aria-labelledby="story-heading">
        <div class="concept-story__images">
          <img src="/assets/images/coffee-bar.webp" alt="Specialty coffee beans and brewing equipment at Coffee Nutz" loading="lazy">
          <img src="/assets/images/cafe-seating.webp" alt="Tables and seating inside the Coffee Nutz McKinney café" loading="lazy">
        </div>
        <div class="concept-story__copy">
          <p class="concept-kicker">Our story</p>
          <h2 id="story-heading">Coffee craft without shortcuts.</h2>
          <p>We work with carefully selected coffees rated 85+ by Specialty Coffee Association standards. Our baristas dial in daily, tasting and adjusting so each espresso, pour-over, and siphon brew reflects the best expression of the coffee.</p>
          <p>But Coffee Nutz is not only about caffeine. It is a place to slow down, meet a neighbor, share a thoughtful meal, or turn a quick pickup into a better part of your day.</p>
          <a class="concept-button" href="${mapsUrl}" target="_blank" rel="noopener">Visit Coffee Nutz</a>
        </div>
      </section>
      <section class="concept-values" aria-labelledby="values-title">
        <div class="concept-inner-heading"><div><p class="concept-kicker">What guides us</p><h2 id="values-title">Care you can taste and feel.</h2></div></div>
        <div class="concept-values__grid">
          <article><span>01</span><h3>Selected thoughtfully</h3><p>Specialty beans, premium matcha, and ingredients chosen for quality and character.</p></article>
          <article><span>02</span><h3>Prepared carefully</h3><p>Daily dialing, precise brewing, and food made fresh in the Coffee Nutz kitchen.</p></article>
          <article><span>03</span><h3>Shared warmly</h3><p>A welcoming neighborhood café with more than 20 seats, free Wi-Fi, and room to connect.</p></article>
        </div>
      </section>`;
}

function faqContent() {
  const details = faqs.map(([question, answer], index) => `        <details class="concept-faq-item"${index === 0 ? " open" : ""}>
          <summary>${question}</summary>
          <div><p>${answer}</p></div>
        </details>`).join("\n");
  return `      <section class="concept-faq" aria-labelledby="answers-title">
        <div class="concept-inner-heading"><div><p class="concept-kicker">Helpful answers</p><h2 id="answers-title">Know before you go</h2></div><p>For current menu availability or a specific request, call the café or view the live ordering menu.</p></div>
        <div class="concept-faq-list">
${details}
        </div>
        <div class="concept-inner-cta"><div><p class="concept-kicker">Still wondering?</p><h2>Talk with the Coffee Nutz team.</h2><p>We’re happy to help with menu questions, private events, and planning your visit.</p></div><a class="concept-button" href="tel:+14696785050">Call the café</a></div>
      </section>`;
}

function pageHtml(concept, pageKey) {
  const page = pages[pageKey];
  const content = pageKey === "menu" ? menuContent() : pageKey === "story" ? storyContent() : faqContent();
  return `<!doctype html>
<html lang="en">
${head(concept, page)}
  <body class="concept-page concept-inner-page ${concept.bodyClass} concept-inner-page--${page.path}">
    <a class="concept-skip-link" href="#main">Skip to content</a>
    <div class="proof-banner" role="status"><strong>Draft status</strong><span>${concept.name} — full site preview</span></div>
${blueManOrder(concept)}
${reviewBar(concept, pageKey)}
${header(concept, pageKey)}
    <main id="main">
${hero(page)}
${content}
    </main>
${locationSection()}
${footer(concept)}
  </body>
</html>
`;
}

function updateConceptHome(concept) {
  const filePath = join(rootDir, "concepts", concept.slug, "index.html");
  let html = readFileSync(filePath, "utf8");

  // Remove the block managed by this generator so reruns stay idempotent.
  html = html
    .replace(/\n\s*<meta name="robots" content="noindex, follow">\n\s*<link rel="canonical" href="https:\/\/coffee-nutz\.com\/">\n\s*<meta property="og:title"[^>]*>\n\s*<meta property="og:description"[^>]*>\n\s*<meta property="og:type"[^>]*>\n\s*<meta property="og:url"[^>]*>\n\s*<meta property="og:image"[^>]*>\n\s*<meta name="twitter:card"[^>]*>/, "")
    .replace(/\n\s*<script type="application\/ld\+json">\{[\s\S]*?"@id": "https:\/\/coffee-nutz\.com\/#coffee-shop"[\s\S]*?<\/script>/, "");

  html = html
    .replace(/<title>.*?<\/title>/, `<title>Coffee Shop in McKinney, TX | Coffee Nutz | ${concept.name} Preview</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Coffee Nutz is a McKinney coffee shop serving specialty coffee, premium matcha, fresh breakfast, lunch, and desserts on South Custer Road.">`)
    .replace(/(<meta name="description"[^>]*>)/, `$1\n    <meta name="robots" content="noindex, follow">\n    <link rel="canonical" href="https://coffee-nutz.com/">\n    <meta property="og:title" content="Coffee Nutz | Specialty Coffee Shop in McKinney, TX">\n    <meta property="og:description" content="Specialty coffee, premium matcha, breakfast, lunch, and desserts at 6951 S. Custer Road in McKinney.">\n    <meta property="og:type" content="website">\n    <meta property="og:url" content="https://coffee-nutz.com/">\n    <meta property="og:image" content="https://coffee-nutz.com/assets/images/cafe-counter.webp">\n    <meta name="twitter:card" content="summary_large_image">`)
    .replace(/(<link rel="stylesheet" href="\/assets\/concepts\.css\?v=)[^"]+/, (_match, prefix) => `${prefix}1.2.0`)
    .replace(/(<link rel="stylesheet" href="\/assets\/universal\.css\?v=)[^"]+/, (_match, prefix) => `${prefix}1.2.0`)
    .replace(/(<script src="\/assets\/concepts\.js\?v=)[^"]+/, (_match, prefix) => `${prefix}1.2.0`)
    .replace(/(<script src="\/assets\/universal\.js\?v=)[^"]+/, (_match, prefix) => `${prefix}1.2.0`)
    .replace(/<\/head>/, `    <script type="application/ld+json">${localBusinessSchema}</script>\n  </head>`)
    .replace(/<a class="concept-logo" href="[^"]*"/, `<a class="concept-logo" href="${conceptPath(concept)}"`)
    .replace(/<button class="concept-nav-toggle"[\s\S]*?<\/button>/, `<button class="concept-nav-toggle" type="button" aria-controls="${concept.slug}-nav" aria-expanded="false" data-concept-nav-toggle>Explore</button>`)
    .replace(/<nav class="concept-nav"[\s\S]*?<\/nav>/, header(concept, "home").match(/<nav class="concept-nav"[\s\S]*?<\/nav>/)[0])
    .replaceAll('href="/menu/"', `href="${conceptPath(concept, "menu")}"`)
    .replaceAll('href="/why-coffee-nutz/"', `href="${conceptPath(concept, "story")}"`)
    .replaceAll('href="/faq/"', `href="${conceptPath(concept, "faq")}"`)
    .replace(/<section class="universal-location"[\s\S]*?<\/section>/, locationSection().trim())
    .replace(/<footer class="universal-footer">[\s\S]*?<\/footer>/, footer(concept).trim());

  writeFileSync(filePath, html, "utf8");
}

for (const concept of concepts) {
  for (const pageKey of Object.keys(pages)) {
    const outputDir = join(rootDir, "concepts", concept.slug, pages[pageKey].path);
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(join(outputDir, "index.html"), pageHtml(concept, pageKey), "utf8");
  }
  updateConceptHome(concept);
}

console.log(`Generated ${concepts.length * Object.keys(pages).length} themed pages and updated ${concepts.length} concept homepages.`);
