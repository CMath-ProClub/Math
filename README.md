# Math — Multi-Site Workspace

A scalable workspace for hosting independent math-education website redesigns. Every site is self-contained, tagged with rich metadata for filtering, pricing, and portfolio management.

## Structure

```
Math/
├── .gitignore
├── README.md                           ← This file
├── shared/
│   ├── taxonomy.json                   ← Controlled vocabulary (tags, complexity, statuses)
│   └── templates/
│       └── site-template/              ← Copy this to start a new site
│           ├── index.html
│           ├── site.json               ← Per-site metadata template
│           ├── assets/
│           │   ├── css/styles.css
│           │   ├── js/main.js
│           │   ├── js/tailwind.config.js
│           │   └── images/.gitkeep
│           └── pages/.gitkeep
└── sites/
    ├── manifest.json                   ← Master index of all sites
    └── mathleague-redesign/
        ├── index.html
        ├── site.json                   ← Researched metadata profile
        ├── SITE-ARCHITECTURE.md
        ├── assets/
        │   ├── css/styles.css
        │   ├── js/main.js
        │   ├── js/tailwind.config.js
        │   └── images/
        └── pages/
            ├── about.html
            ├── competitions.html
            ├── summer-programs.html
            ├── results.html
            └── register.html
```

## Sites

| Slug | Tags | Complexity | Org Type | Traffic | Status |
|---|---|---|---|---|---|
| `mathleague-redesign` | American, International, Competition, Store, High-Traffic, Big | Moderate | For-profit | 1M+ students/yr | ✅ Complete |

> Machine-readable index: `sites/manifest.json`

---

## Metadata System

Every site includes a `site.json` with researched, factual metadata:

### Tags (up to 6 per site)

Tags are drawn from `shared/taxonomy.json`. Since every site in this workspace is math-education related, there is no generic "education" tag — tags focus on what differentiates sites from each other.

| Category | Available Tags |
|---|---|
| **Geographic** | American, Canadian, International, European, Asian, Regional, Statewide, Global |
| **Type** | Competition, Program, Store, Publisher, Tutoring, Camp, League, Club, Foundation, Resource |
| **Scale** | Big, Medium, Small |
| **Traffic** | High-Traffic, Medium-Traffic, Low-Traffic |
| **Features** | Registration, E-Commerce, Results-Portal, Blog, Events, Gallery, Video, Forum, Newsletter, Members-Only, Donations, Multi-Language |

**How traffic level is determined:**
- Research participation numbers (students, schools, teams)
- Check Google Trends relative to comparable organizations
- Count recurring traffic drivers (monthly results, newsletters, registration cycles)
- Compare to known benchmarks (AMC ~300K, MATHCOUNTS ~100K, Math League 1M+)

### Complexity (replaces pricing tiers)

Complexity describes the actual work involved, making pricing fairer than arbitrary tiers.

| Level | Pages | Description |
|---|---|---|
| **Simple** | 1–3 | Mostly informational. Minimal interactivity. No forms or e-commerce. |
| **Moderate** | 4–7 | Interactive elements: registration links, pricing tables, FAQ, galleries, external e-commerce. |
| **Complex** | 8–15 | Auth, CMS, dynamic leaderboards, payment processing, member portals, multi-step flows. |
| **Enterprise** | 15+ | Custom app logic, databases, APIs, admin dashboards, role-based access, multi-tenant. |

### Organization Profile

Each `site.json` includes researched organization data:

| Field | Purpose | Example (Math League) |
|---|---|---|
| `organization.type` | Legal structure | `for-profit` |
| `organization.isNonprofit` | Verified via ProPublica 501(c)(3) database | `false` |
| `audience.reach` | Participation scale | `1,000,000+ students annually` |
| `audience.primaryRegions` | Where they operate | `["United States", "Canada"]` |
| `trafficAssessment.level` | Research-based traffic estimate | `High-Traffic` |

### What This Enables

| Use Case | How |
|---|---|
| **"Show all competition sites"** | Filter `manifest.json` where `tags` contains `"Competition"` |
| **"Which sites are international?"** | Filter for `"International"` tag |
| **"Sort by project complexity"** | Sort by `complexity` field for workload/pricing estimates |
| **"What's the org structure?"** | Check `organization.type` and `organization.isNonprofit` |
| **"Which sites go on my portfolio?"** | Filter where `portfolio.visible === true` |
| **"Which are high-traffic?"** | Filter for `"High-Traffic"` tag |
| **"Show big vs small orgs"** | Filter by `"Big"` / `"Small"` tags |
| **"What has e-commerce?"** | Filter for `"Store"` tag |
| **"What's in progress?"** | Filter by `status` field |
| **"Client directory"** | Extract `organization` objects across all sites |

---

## Quick Start

No build step required. Open the hub to browse all sites:

```powershell
start index.html
```

Or open any site directly:

```powershell
start sites\mathleague-redesign\index.html
```

## Creating a New Site

```powershell
Copy-Item -Recurse shared\templates\site-template sites\new-site-slug
```

Then:

1. **Research the organization** — check their site, Wikipedia, ProPublica nonprofit database, participation numbers, Google Trends
2. **Fill in `site.json`** — tags (up to 6), complexity, organization details, traffic assessment, audience data
3. **Customize `assets/js/tailwind.config.js`** — set the site's color palette
4. **Build out `index.html`** and add inner pages to `pages/`
5. **Add an entry to `sites/manifest.json`**
6. **Use tags from `shared/taxonomy.json`** for consistency

## Architecture Rules

1. Every site lives under `sites/[slug]/` — no exceptions
2. All internal paths are **relative** (`./`, `../`) — never root-absolute
3. No site may depend on another site's files
4. Each site must work if extracted and hosted independently
5. `shared/` is for templates and reference only — never a runtime dependency
6. All tags must come from `shared/taxonomy.json` vocabulary
7. Every site must have a `site.json` with researched metadata
8. Nonprofit status must be verified (ProPublica, IRS, or org's own disclosures)

## Scaling

This structure is validated for **100+ sites**:

- Each site: ~50–200KB
- 100 sites: ~5–20MB total
- `manifest.json` stays under 500KB even at 200 entries
- Git handles this with zero performance issues
- Any static host (GitHub Pages, Netlify, Vercel, S3) can serve it
