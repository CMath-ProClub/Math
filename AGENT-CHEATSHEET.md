# 🤖 Agent Cheatsheet — Math Website Redesign System

> **Purpose:** This document gives any AI agent everything it needs to build a new math-education website redesign from just a URL, following all established conventions.
>
> **Owner:** Carter Matherne  
> **Repository:** `CMath-ProClub/Math` (GitHub)  
> **Live Hub:** `https://cmath-proclub.github.io/Math/`  
> **Workspace:** `c:\Users\Carter Matherne\Math\`  
> **Default Shell:** PowerShell 5.1 (Windows) — use `;` to join commands  
> **Date established:** February 18, 2026

---

## Table of Contents

1. [Mission & End Goal](#1-mission--end-goal)
2. [Repository Structure](#2-repository-structure)
3. [Step-by-Step: Building a New Site](#3-step-by-step-building-a-new-site)
4. [Technical Stack (Non-Negotiable)](#4-technical-stack-non-negotiable)
5. [File Structure Per Site](#5-file-structure-per-site)
6. [Color System & Theming](#6-color-system--theming)
7. [Page Template & Boilerplate](#7-page-template--boilerplate)
8. [CSS Classes Reference](#8-css-classes-reference)
9. [JavaScript Patterns](#9-javascript-patterns)
10. [Navigation & Linking Rules](#10-navigation--linking-rules)
11. [Metadata Requirements](#11-metadata-requirements)
12. [Manifest.json Entry Format](#12-manifestjson-entry-format)
13. [Taxonomy Reference](#13-taxonomy-reference)
14. [Multi-Language Sites (i18n)](#14-multi-language-sites-i18n)
15. [International Mathematical Olympiad (IMO) Master Plan](#15-international-mathematical-olympiad-imo-master-plan)
16. [Design Quality Standards](#16-design-quality-standards)
17. [Git Workflow](#17-git-workflow)
18. [Completed Sites Reference](#18-completed-sites-reference)
19. [Common Pitfalls](#19-common-pitfalls)
20. [Targets CSV Maintenance](#20-targets-csv-maintenance-targetscsv)

---

## 1. Mission & End Goal

Build premium-quality redesigns of math-education websites from around the world. Each is a static, self-contained site under `sites/[slug]/`. The hub page at `index.html` dynamically reads `sites/manifest.json` and displays all sites with search, filter, and sort.

**End vision:** All international/foreign-language math competition sites will eventually link through a redesign of the **International Mathematical Olympiad (IMO)** website (`imo-official.org`), acting as the central hub for all non-English sites.

---

## 2. Repository Structure

```
Math/
├── .gitignore
├── README.md
├── index.html                          ← Hub page (reads manifest.json dynamically)
├── AGENT-CHEATSHEET.md                 ← THIS FILE
├── shared/
│   ├── taxonomy.json                   ← Controlled tag vocabulary
│   └── templates/
│       └── site-template/              ← Copy to start a new site
│           ├── index.html
│           ├── site.json
│           ├── assets/
│           │   ├── css/styles.css
│           │   ├── js/main.js
│           │   ├── js/tailwind.config.js
│           │   └── images/.gitkeep
│           └── pages/.gitkeep
└── sites/
    ├── manifest.json                   ← Master index (hub reads this)
    ├── mathleague-redesign/            ← COMPLETED ✅
    └── wmc-redesign/                   ← COMPLETED ✅
```

---

## 3. Step-by-Step: Building a New Site

### Phase 1: Research (DO THIS FIRST)

1. **Scrape the source URL** — Fetch the website content thoroughly. Understand every page, section, feature.
2. **Identify the organization** — Name, type (nonprofit/for-profit), founding year, country, reach.
3. **Determine the native language** — If NOT English, you will build the site in the native language first with an English toggle (see [Section 14](#14-multi-language-sites-i18n)).
4. **Map the site architecture** — List every page that should exist. Aim for 5–8 pages typically.
5. **Find media assets** — YouTube video IDs, image URLs, social media links, logos.
6. **Extract the brand colors** — Identify the source site's primary colors from its logo, nav, buttons, and headings. Derive your palette from these colors so the redesign still feels like the original organization (see [Section 6](#6-color-system--theming)).

### Phase 2: Create Files

7. **Create the directory:** `sites/[slug]/` with `assets/css/`, `assets/js/`, `pages/`
8. **Create `tailwind.config.js`** — Define the custom color palette.
9. **Create `main.js`** — Mobile menu + scroll-reveal + language toggle (if applicable).
10. **Create `styles.css`** — Adapt the shared CSS patterns, swap color values to match the new palette.
11. **Create `index.html`** — Landing page (the most important page — see [Section 7](#7-page-template--boilerplate)).
12. **Create all `pages/*.html`** — Each sub-page with full nav, footer, metadata.

### Phase 3: Register & Deploy

13. **Add entry to `sites/manifest.json`** — Follow the exact format (see [Section 12](#12-manifestjson-entry-format)).
14. **Git add, commit, push** — Descriptive commit message listing all pages.
15. **Verify** the hub at `cmath-proclub.github.io/Math/` picks up the new site.

---

## 4. Technical Stack (Non-Negotiable)

| Component | Choice | Notes |
|-----------|--------|-------|
| **CSS Framework** | Tailwind CSS via CDN | `<script src="https://cdn.tailwindcss.com"></script>` |
| **Tailwind Config** | Inline `tailwind.config` via external JS | Loaded AFTER the CDN script tag |
| **Font** | Inter (400, 500, 600, 700, 800) | Via Google Fonts CDN |
| **JavaScript** | Vanilla JS only | No frameworks, no jQuery, no build step |
| **Hosting** | GitHub Pages (static) | All paths must be relative |
| **Images** | External URLs or `assets/images/` | No base64 blobs in HTML |

### Critical Constraints

- **`@apply` does NOT work** with Tailwind CDN — use plain CSS in `styles.css` instead
- **No build step** — everything runs directly in the browser
- **No dependencies** — no `package.json`, no `node_modules`
- **No absolute paths** — all links are relative (`./`, `../`, `../../`)
- **No site may depend on another site's files** — each site is fully self-contained

---

## 5. File Structure Per Site

```
sites/[slug]/
├── index.html                          ← Landing page
├── assets/
│   ├── css/styles.css                  ← Custom CSS (animations, backgrounds, patterns)
│   ├── js/tailwind.config.js           ← Color palette & font config
│   └── js/main.js                      ← Mobile menu, scroll-reveal, language toggle
└── pages/
    ├── page-a.html                     ← Sub-page (name varies per site)
    ├── page-b.html
    └── ...
```

### Path conventions from different levels:

| From file | To hub (`index.html` at root) | To Tailwind config | To styles.css |
|-----------|-------------------------------|--------------------|----|
| `sites/[slug]/index.html` | `../../index.html` | `assets/js/tailwind.config.js` | `assets/css/styles.css` |
| `sites/[slug]/pages/*.html` | `../../../index.html` | `../assets/js/tailwind.config.js` | `../assets/css/styles.css` |

---

## 6. Color System & Theming

Every site's color palette should be **derived from the original website's existing branding**. The goal is a premium redesign that still *feels* like the original organization — not a random new color scheme.

### How to derive the palette:

1. **Visit the source website** and identify its primary brand color(s) — look at the logo, nav bar, buttons, headings, and any brand guidelines.
2. **Extract the dominant hue family** (e.g., if their logo is red and their nav is dark red → your palette is crimson/red).
3. **Generate 5–6 shades** in that hue family (darkest for backgrounds → lightest for accents), keeping the feel of the original but polishing it to a premium standard.
4. **If the original site has no clear branding or uses generic gray**, pick a color that fits the organization's identity (e.g., a Japanese math olympiad might use a deep indigo inspired by traditional Japanese aesthetics).
5. **If the derived palette collides with an existing site's palette**, shift the hue slightly (e.g., if they're also navy, go slate-blue or indigo instead) to keep each site visually distinct.
6. **Gold remains the universal accent / CTA color** across all sites — do not replace gold with the source site's accent color.

### Existing palettes (avoid duplicating these exact hues):

| Site | Primary Colors | Derived From | Used Shades |
|------|---------------|--------------|-------------|
| **Math League** | Navy blue | mathleague.com's blue branding | 900:`#0C1D3A`, 800:`#132B50`, 700:`#1E3A5F`, 600:`#2B4C7E`, 500:`#3A6298` |
| **WMC** | Teal/emerald | wmc.eunoia.ventures's green/teal branding | 950:`#041F1A`, 900:`#0A3830`, 800:`#0D5247`, 700:`#0F6B5E`, 600:`#149177`, 500:`#17A689` |
| **Hub** | Navy (same as Math League) | N/A — portfolio hub | Shared palette |

### Shared accent (used by ALL sites — never change):

```
gold-500: #D4A017
gold-400: #E8B931
gold-300: #F0CC5B
```

### Palette creation steps:

1. Identify the source site's primary brand color hex code(s)
2. Use that hue to generate 5–6 shades (darkest → lightest)
3. The darkest shade (950/900) is for the nav bar and hero backgrounds
4. Mid shades (700–600) are for borders, hover states, and text accents
5. Lightest shade (500) is for subtle text highlights
6. Keep gold as the universal accent / CTA color
7. Define it in `tailwind.config.js`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#XXXXXX',  // darkest — nav, hero bg
          900: '#XXXXXX',
          800: '#XXXXXX',
          700: '#XXXXXX',
          600: '#XXXXXX',
          500: '#XXXXXX',  // lightest — text accents
        },
        gold: {
          500: '#D4A017',
          400: '#E8B931',
          300: '#F0CC5B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
};
```

### Adapting `styles.css` to a new palette:

When copying CSS patterns, you must replace the `rgba()` color values used in backgrounds, glows, and patterns. Map as follows:

| In Math League CSS | Replace with |
|--------------------|-------------|
| `rgba(8,15,31,...)` (navy-950) | Your darkest primary shade in RGB |
| `rgba(58,98,152,...)` (navy-500-ish) | Your mid primary shade in RGB |
| `rgba(212,160,23,...)` (gold-500) | Keep as-is (gold is shared) |
| `rgba(139,92,246,...)` (purple accent) | Optional third accent color |

---

## 7. Page Template & Boilerplate

### `<head>` section (EVERY page):

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Page Title] — [Site Name]</title>
  <meta name="description" content="[Unique page description, 150-160 chars]" />
  <meta name="keywords" content="[relevant, comma, separated, keywords]" />
  <meta name="author" content="[Organization Name]" />

  <!-- Open Graph -->
  <meta property="og:title" content="[Page Title]" />
  <meta property="og:description" content="[Short description]" />
  <meta property="og:image" content="[Image URL]" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Page Title]" />
  <meta name="twitter:description" content="[Short description]" />
  <meta name="twitter:image" content="[Image URL]" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="[favicon URL or path]" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="[relative path to]/assets/js/tailwind.config.js"></script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="[relative path to]/assets/css/styles.css" />
</head>
```

### Navigation pattern:

Every page has a **fixed top nav** with:
- Logo (left) — links to site's `index.html`
- Desktop links (hidden on mobile) — all pages + "⬅ Hub" link + primary CTA button
- Mobile hamburger (hidden on desktop) — same links in dropdown
- The CURRENT page's nav link is highlighted with `text-gold-400` (others use `text-[primary]-200`)

### Footer pattern:

Every page has a footer with:
- Brand section (logo + tagline + social links)
- 2–3 column link groups (Competition, Community, Portfolio, etc.)
- Bottom bar: `© [Year range] [Organization]. [Trademark notes if any.]`
- Credit line: `Redesign by CMath ProClub`

### Section pattern:

Pages are built from alternating sections:
- **Dark sections:** `bg-gradient-to-br from-[primary]-950 via-[primary]-900 to-[primary]-950`
- **Light sections:** `bg-white` or `bg-gray-50`
- **Sections separated by wave dividers** where tone changes
- **Every section** uses `py-20 lg:py-28` for vertical spacing
- **Content wraps** in `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section headers** follow: badge → h2 → subtitle paragraph

---

## 8. CSS Classes Reference

These classes are defined in `styles.css` and MUST be adapted for each site's color palette:

### Background Patterns (light sections):
| Class | Effect |
|-------|--------|
| `dot-grid-bg` | Subtle dot grid pattern |
| `diagonal-lines-bg` | 45° stripe pattern |
| `cross-pattern-bg` | Tiny plus-sign pattern |
| `gradient-mesh-bg` | Soft blurry gradient blobs |
| `floating-particles` | Animated drifting dots |

### Background Patterns (dark sections):
| Class | Effect |
|-------|--------|
| `math-bg-symbols` | Floating `∑ π √ ∞ Δ ∫ θ` symbols |
| `hero-glow` | Animated radial gradient glow |

### Decorative:
| Class | Effect |
|-------|--------|
| `math-watermark` | Giant faded math symbol (default: ∫) |
| `math-watermark-pi` | Giant π |
| `math-watermark-sigma` | Giant Σ |
| `math-watermark-delta` | Giant Δ |
| `math-watermark-theta` | Giant θ |
| `math-watermark-omega` | Giant Ω |
| `math-watermark-left` | Position on left instead of right |
| `wave-divider` | SVG wave separator between sections |
| `wave-divider-flip` | Flipped wave (for bottom-to-top transitions) |

### Interactive:
| Class | Effect |
|-------|--------|
| `card-glow-hover` | Animated gradient border glow on hover |
| `corner-accents` | Decorative L-shaped corner borders |
| `pulse-dot` | Pulsing animated dot (for badges) |
| `reveal-on-scroll` | Fade-up on scroll (needs JS `IntersectionObserver`) |
| `scrollbar-hide` | Hides scrollbar on overflow elements |

### WMC-specific (add to other sites if relevant):
| Class | Effect |
|-------|--------|
| `golden-ticket` | Shimmering gold gradient animation |

### Wave divider HTML (place between sections):

```html
<!-- Light → Dark transition -->
<div class="wave-divider bg-white">
  <svg viewBox="0 0 1440 64" preserveAspectRatio="none" fill="#041F1A">
    <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,56 1440,56 L1440,64 L0,64 Z"/>
  </svg>
</div>

<!-- Dark → Light transition -->
<div class="wave-divider bg-gradient-to-br from-primary-950 to-primary-950">
  <svg viewBox="0 0 1440 64" preserveAspectRatio="none" fill="white">
    <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,56 1440,56 L1440,64 L0,64 Z"/>
  </svg>
</div>
```

---

## 9. JavaScript Patterns

### `main.js` — Base template:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Mobile menu ---- */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Scroll-reveal ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});
```

The `reveal-on-scroll` class is paired with CSS:
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 10. Navigation & Linking Rules

### From `sites/[slug]/index.html`:
```
To hub:                    ../../index.html
To sub-page:               pages/pagename.html
To own assets:             assets/css/styles.css, assets/js/*.js
```

### From `sites/[slug]/pages/*.html`:
```
To hub:                    ../../../index.html
To site landing:           ../index.html
To sibling page:           pagename.html  (same directory)
To assets:                 ../assets/css/styles.css, ../assets/js/*.js
```

### External links:
- Always add `target="_blank"` and `rel="noopener"` for external URLs
- Login/auth links go to the original site's login page
- "Sign In" or primary CTA appears as a gold button in the nav

### Nav highlighting:
- The **current page** uses `text-gold-400` (desktop) or `text-gold-400 bg-[primary]-800/30` (mobile)
- All other pages use `text-[primary]-200 hover:text-white hover:bg-[primary]-800/50`
- The "⬅ Hub" link uses `text-[primary]-400 hover:text-gold-400` and smaller text (`text-xs`)

---

## 11. Metadata Requirements

Every page MUST have:

1. **`<title>`** — Format: `[Page Name] — [Site Name]`
2. **`<meta name="description">`** — Unique per page, 150–160 characters
3. **Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:type`
4. **Twitter Card tags** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
5. **Favicon** — `<link rel="icon">` pointing to the organization's logo/icon
6. **`lang` attribute** on `<html>` — `en` for English, or appropriate ISO code for other languages

---

## 12. Manifest.json Entry Format

When a new site is complete, add an entry to `sites/manifest.json` inside the `"sites"` array:

```json
{
  "slug": "site-slug-here",
  "name": "Organization Name — Full Redesign",
  "sourceUrl": "https://original-website.com",
  "status": "complete",
  "created": "YYYY-MM-DD",
  "updated": "YYYY-MM-DD",

  "tags": ["Tag1", "Tag2", "Tag3"],
  "complexity": "moderate",

  "organization": {
    "name": "Organization Legal Name",
    "type": "for-profit",
    "isNonprofit": false,
    "website": "https://original-website.com"
  },

  "audience": {
    "reach": "Description of reach",
    "primaryRegions": ["Country1", "Country2"],
    "hasInternationalPresence": true
  },

  "scope": {
    "pageCount": 7,
    "hasShop": false,
    "hasRegistration": true,
    "hasCMS": false,
    "hasAuth": false
  },

  "tech": ["HTML5", "Tailwind CSS (CDN)", "Vanilla JavaScript"],

  "portfolio": {
    "visible": true,
    "featured": true,
    "shortDescription": "One-liner describing the redesign (shown in hub)."
  }
}
```

### Rules:
- `slug` = directory name under `sites/`
- `tags` must come from `shared/taxonomy.json` vocabulary
- `complexity` must be one of: `simple`, `moderate`, `complex`, `enterprise`  
- `status` must be one of: `prospect`, `in-progress`, `review`, `complete`, `deployed`, `archived`, `paused`
- For multi-language sites, add `"Multi-Language"` to the tags array

---

## 13. Taxonomy Reference

### Tags (pick up to 6 per site):

| Category | Values |
|----------|--------|
| **Geographic** | American, Canadian, International, European, Asian, Regional, Statewide, Global |
| **Type** | Competition, Program, Store, Publisher, Tutoring, Camp, League, Club, Foundation, Resource |
| **Scale** | Big, Medium, Small |
| **Traffic** | High-Traffic, Medium-Traffic, Low-Traffic |
| **Features** | Registration, E-Commerce, Results-Portal, Blog, Events, Gallery, Video, Forum, Newsletter, Members-Only, Donations, Multi-Language |

### Complexity levels:

| Level | Pages | Description |
|-------|-------|-------------|
| Simple | 1–3 | Informational only. Minimal interactivity. |
| Moderate | 4–7 | Registration, pricing tables, galleries, FAQ. |
| Complex | 8–15 | Auth, CMS, dynamic content, payment processing. |
| Enterprise | 15+ | Custom app logic, databases, APIs, admin dashboards. |

### Organization types:
`nonprofit`, `for-profit`, `government`, `school-district`, `university`, `individual`, `volunteer-run`, `unknown`

### Statuses:
`prospect`, `in-progress`, `review`, `complete`, `deployed`, `archived`, `paused`

---

## 14. Multi-Language Sites (i18n)

### When to apply:

If the source website's **native/primary language is NOT English**, the redesign MUST:

1. **Build the entire site in the native language first** — all headings, body text, labels, nav items, buttons, footer text.
2. **Add a language toggle button** in the navigation bar that switches between the native language and English.
3. **Set `<html lang="xx">` appropriately** (e.g., `lang="ja"` for Japanese, `lang="zh"` for Chinese, `lang="fr"` for French).

### Implementation pattern:

#### HTML structure for translatable content:

Wrap all translatable text nodes in `<span>` elements with `data-i18n` attributes:

```html
<h1>
  <span data-i18n="hero.title">ネイティブ言語のタイトル</span>
</h1>
<p>
  <span data-i18n="hero.subtitle">ネイティブ言語のサブタイトル</span>
</p>
```

#### Language toggle button (in nav, before the Sign In button):

```html
<button id="lang-toggle" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[primary]-700/40 text-[primary]-200 hover:text-white hover:border-gold-400/60 transition" aria-label="Switch language">
  <span id="lang-label">EN</span>
  <svg class="w-3.5 h-3.5 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
</button>
```

#### Translation dictionary in `main.js`:

```javascript
/* ---- Language toggle ---- */
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.competitions': 'Competitions',
    'nav.results': 'Results',
    'nav.contact': 'Contact',
    'hero.title': 'English Title Here',
    'hero.subtitle': 'English subtitle here.',
    // ... ALL translatable strings
    'footer.copyright': '© 2026 Organization Name',
    'footer.credit': 'Redesign by CMath ProClub',
  },
  // Native language is the DEFAULT (already in the HTML)
};

let currentLang = 'native';  // 'native' or 'en'
const nativeStrings = {};

// On load, cache all native strings
document.querySelectorAll('[data-i18n]').forEach(el => {
  nativeStrings[el.dataset.i18n] = el.textContent;
});

const langToggle = document.getElementById('lang-toggle');
const langLabel = document.getElementById('lang-label');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    if (currentLang === 'native') {
      // Switch to English
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations.en[key]) el.textContent = translations.en[key];
      });
      document.documentElement.lang = 'en';
      langLabel.textContent = 'XX';  // Show native lang code
      currentLang = 'en';
    } else {
      // Switch back to native
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (nativeStrings[key]) el.textContent = nativeStrings[key];
      });
      document.documentElement.lang = 'xx';  // Native lang code
      langLabel.textContent = 'EN';
      currentLang = 'native';
    }
  });
}
```

#### Key rules for i18n:
- The **native language is the DEFAULT** — the HTML ships with native text.
- The toggle button shows `EN` when the page is in native mode (click to switch to English).
- The toggle button shows the native language code (e.g., `日本語`, `中文`, `FR`) when in English mode.
- **Alt text for images** should also have `data-i18n` attributes for accessibility.
- **`<html lang="">` must update** when the language changes.
- Store the user's preference in `localStorage` so it persists across page loads:

```javascript
// At top of lang toggle handler:
localStorage.setItem('preferred-lang', currentLang);

// On DOMContentLoaded:
const saved = localStorage.getItem('preferred-lang');
if (saved === 'en') langToggle.click();  // Auto-switch if user previously chose English
```

- Add `"Multi-Language"` to the tags array in `manifest.json` for these sites.

---

## 15. International Mathematical Olympiad (IMO) Master Plan

### The big picture:

The **IMO website** (`imo-official.org`) will serve as the **connecting hub** for all international/foreign-language math competition site redesigns.

### Architecture:

```
sites/
├── imo-redesign/                       ← The IMO hub (links to all international sites)
│   ├── index.html                      ← Main IMO redesign
│   └── pages/
│       ├── countries.html              ← Directory of all country math olympiads
│       ├── ...
│
├── [country]-math-olympiad-redesign/   ← Individual country sites
│   ├── index.html                      ← In native language with EN toggle
│   └── pages/...
│
└── manifest.json                       ← All sites registered here
```

### How it connects:

1. Each foreign math competition site links TO the IMO redesign as an "International" hub
2. The IMO redesign's `countries.html` page links OUT to each country's individual redesign
3. In each foreign site's nav/footer, include a link: `🌐 IMO Hub` → `../imo-redesign/index.html`
4. The IMO site itself acts as a directory, grouping sites by continent/region

### When building a foreign site:

- Always include a nav link or footer link to the IMO redesign (even if it doesn't exist yet — use `#` as placeholder and leave a `<!-- TODO: Link to IMO redesign when built -->` comment)
- Tag it with `"International"` in manifest.json
- Note the country in `audience.primaryRegions`

---

## 16. Design Quality Standards

The bar is set by the Math League and WMC redesigns. Every new site must match this level:

### Must-haves:
- [ ] Hero section with gradient background, animated glow, and clear CTA
- [ ] Impact stats section (numbers in large bold text)
- [ ] Card-based content layouts with hover effects
- [ ] Wave dividers between contrasting sections
- [ ] At least 2 different background patterns per page
- [ ] Scroll-reveal animations on all sections
- [ ] Mobile-responsive (test at 375px, 768px, 1024px, 1440px)
- [ ] Consistent nav on every page with proper highlighting
- [ ] Footer with organized link groups
- [ ] All external links open in new tab
- [ ] YouTube embeds use `loading="lazy"` and `rel=0`
- [ ] Proper semantic HTML (sections, headings, labels)
- [ ] Accessible (aria-labels on icon buttons, alt text on images)

### Section rhythm (typical page):
1. **Hero** (dark gradient + glow) → wave divider
2. **Content section** (light bg + pattern) → wave divider  
3. **Feature section** (different light bg + pattern)
4. **Dark section** (gradient + math symbols)  → wave divider
5. **Content section** (light)
6. **CTA section** (dark gradient + glow)
7. **Footer** (darkest shade)

### Typography scale:
- Page title (hero): `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold`
- Section headings: `text-3xl lg:text-4xl font-extrabold`
- Sub-headings: `text-lg font-bold` or `text-xl font-bold`
- Body text: `text-sm` or `text-base`
- Captions/badges: `text-xs font-semibold uppercase tracking-widest`

---

## 17. Git Workflow

```powershell
# From workspace root: c:\Users\Carter Matherne\Math

# 1. Stage new site files + updated manifest
git add sites/[slug]/ sites/manifest.json

# 2. Commit with detailed message
git commit -m "feat: Complete [Site Name] redesign — N pages + assets" `
  -m "- Landing page with [sections list]" `
  -m "- [Page name]: [brief description]" `
  -m "- [repeat for each page]" `
  -m "- Updated manifest.json with [slug] entry"

# 3. Push
git push origin main
```

**Branch:** Always work on `main` (direct push).  
**Commit prefix:** `feat:` for new sites, `fix:` for corrections, `style:` for visual polish.

---

## 18. Completed Sites Reference

### Math League (`mathleague-redesign`)
- **Source:** https://mathleague.com
- **Palette:** Navy blue (900→500) + gold
- **Pages:** index, about, competitions, summer-programs, results, shop, register (7 pages)
- **Org:** Mathematics Leagues, Inc. (for-profit)
- **Language:** English only
- **Key design:** Navy dark theme, gold accents, competition-focused, e-commerce

### WMC (`wmc-redesign`)
- **Source:** https://wmc.eunoia.ventures
- **Palette:** Teal (950→500) + gold
- **Pages:** index, experience, rounds, regionals, finals, partners, contact (7 pages)
- **Org:** Eunoia Ventures (for-profit)
- **Language:** English only
- **Key design:** Teal/emerald theme, 25+ year timeline, YouTube round previews, Golden Ticket system

---

## 19. Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Using `@apply` in CSS | ❌ Doesn't work with Tailwind CDN. Use plain CSS. |
| Absolute paths (`/sites/...`) | ❌ Will break on GitHub Pages. Always use relative paths. |
| Forgetting manifest.json | ❌ Site won't appear on hub. Always add the entry. |
| Reusing a color palette | ❌ Every site must be visually distinct. Check Section 6. |
| Missing `<html lang="">` | ❌ Required for accessibility and SEO. |
| Missing wave dividers | ❌ Sections look jarring without smooth transitions. |
| No scroll-reveal | ❌ Pages feel static. Add `reveal-on-scroll` to every section. |
| No mobile menu | ❌ Site is broken on phones. Always implement hamburger nav. |
| Forgetting Hub link | ❌ Every nav must include "⬅ Hub" linking back to root `index.html`. |
| Not scraping the source thoroughly | ❌ Missing content = incomplete redesign. Scrape EVERYTHING first. |
| Hard-coding dates without checking | ❌ Verify all dates, prices, and details from the source. |
| Images without lazy loading | ❌ Add `loading="lazy"` to all images and iframes below the fold. |

---

## 20. Targets CSV Maintenance (`targets.csv`)

A master CSV file at the repo root lists **every** math competition and summer program we aim to redesign. Agents **must** update this file whenever they complete or revisit a site.

### CSV Columns

| Column | Description |
|--------|-------------|
| `Section` | `Competition` or `Summer Program` |
| `Name` | Human-readable name of the organization / event |
| `Website URL` | Official website (the source being redesigned) |
| `Contact Info` | Email or phone from the source site (if found) |
| `Revamp Status` | One of: **F** / **M** / **P** / **N** (see below) |

### Revamp Status Codes

| Code | Meaning | When to use |
|------|---------|-------------|
| **F** | **Full** | Redesign is 100% complete — all pages, all content, manifest entry, committed & pushed. |
| **M** | **Mostly** | Redesign covers ≥75% of source content but is missing minor pages or polish. |
| **P** | **Partial** | Some pages exist but the redesign is clearly incomplete. |
| **N** | **None** | No redesign has been started (or a previous attempt was deleted). |
| *(blank)* | **Unknown** | Row has not been evaluated yet. |

### Update Rules

1. **After completing a redesign:** Set the row's status to `F` (or `M`/`P` if incomplete).
2. **After auditing an earlier site:** If quality has degraded or new source content has appeared, downgrade the status (e.g., `F` → `M`).
3. **When adding a new target:** Append the row in alphabetical order within its section. Leave status blank.
4. **Keep sorted:** Competitions first (A–Z), then Summer Programs (A–Z).
5. **Deduplicate:** If the same organization appears under two names, keep one canonical row. Use the most specific name.
6. **Fill in blanks:** If you visit a source site and find contact info that was previously missing, add it.

### Example Workflow

```
1. Receive task: "Redesign https://www.mathkangaroo.org/"
2. Build the site per Sections 3–17.
3. Open targets.csv, find the "Math Kangaroo" row.
4. Set Revamp Status to F (or M/P).
5. If contact info is blank, fill it in from the source site.
6. Commit targets.csv alongside the site files.
```

---

## Quick Reference Card

```
REPO:     CMath-ProClub/Math
LIVE:     cmath-proclub.github.io/Math/
STACK:    Tailwind CDN + Inter font + Vanilla JS
PATH:     sites/[slug]/  (index.html + pages/*.html + assets/)
MANIFEST: sites/manifest.json
TAXONOMY: shared/taxonomy.json
TEMPLATE: shared/templates/site-template/
COLORS:   Unique primary palette + shared gold (#D4A017, #E8B931, #F0CC5B)
i18n:     Native language default + EN toggle for non-English sites
IMO GOAL: imo-official.org redesign = hub for all international sites
```

---

*Last updated: February 18, 2026*
