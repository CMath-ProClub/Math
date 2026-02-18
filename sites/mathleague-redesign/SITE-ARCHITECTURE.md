# Math League Redesign — Site Architecture

## Directory Structure

```
sites/mathleague-redesign/
├── index.html                  ← Site homepage (root)
├── SITE-ARCHITECTURE.md        ← This file
├── assets/
│   ├── css/
│   │   └── styles.css          ← Custom CSS (x-cloak utility)
│   ├── js/
│   │   ├── tailwind.config.js  ← Shared Tailwind config (colors, fonts)
│   │   └── main.js             ← Mobile menu toggle + shared JS
│   └── images/                 ← Site-specific images (empty for now)
└── pages/
    ├── about.html
    ├── competitions.html
    ├── summer-programs.html
    ├── results.html
    └── register.html
```

## Link Conventions

| From             | To homepage       | To sibling page       | To assets            |
|------------------|-------------------|-----------------------|----------------------|
| `index.html`     | `#` / self        | `pages/about.html`    | `assets/css/...`     |
| `pages/*.html`   | `../index.html`   | `about.html` (same dir)| `../assets/css/...`  |

## Tech Stack

- **Tailwind CSS** — loaded via CDN (`https://cdn.tailwindcss.com`) + external config
- **Google Fonts** — Inter (400, 500, 600, 700, 800)
- **No build step required** — open `index.html` directly in a browser

## Custom Tailwind Colors

| Token     | Navy                                             | Gold                             |
|-----------|--------------------------------------------------|----------------------------------|
| `900`     | `#0C1D3A`                                        | —                                |
| `800`     | `#132B50`                                        | —                                |
| `700`     | `#1E3A5F`                                        | —                                |
| `600`     | `#2B4C7E`                                        | —                                |
| `500`     | `#3A6298`                                        | `#D4A017`                        |
| `400`     | —                                                | `#E8B931`                        |
| `300`     | —                                                | `#F0CC5B`                        |

## External Services

- **Shop / Online Store** → `pages/shop.html` (local product catalog page)
  - Individual "Add to Cart" buttons link to e-junkie per-product URLs
  - "View Cart" links to `https://www.e-junkie.com/ecom/gb.php?c=cart&cl=34277&ejc=2`
  - Linked in: utility bar, desktop nav ("Shop"), mobile menu, footer Resources

## Multi-Site Scalability

This structure lives under `sites/mathleague-redesign/`. The parent `sites/` directory can host 50+ independent site folders. Shared cross-site assets can be placed in `shared/` at the workspace root.

```
Math/                       ← Workspace root
├── shared/                 ← Cross-site shared assets (future)
├── sites/
│   ├── mathleague-redesign/  ← THIS SITE
│   ├── another-site/         ← Future site
│   └── ...
└── README.md               ← Workspace-level documentation
```
