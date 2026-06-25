# ACREInsure — Design System

Institutional-grade coverage for serious Alabama portfolios. A boutique
financial-advisory aesthetic with premium hospitality roots — Ritz-Carlton meets
Blackstone, not retail insurance.

**Producer:** Dan Wentz, USI Insurance Services, Birmingham, Alabama
**ICP:** Alabama CRE owners (hotels, multifamily, self-storage, strip centers) with $5M+ TIV

## Files

```
design-system/
├── index.html          Living style guide (open in a browser)
├── css/
│   ├── tokens.css      Source of truth — all custom properties
│   ├── typography.css  Font loading, reset, heading hierarchy, text utils
│   ├── layout.css      Containers, sections, responsive grid
│   ├── components.css  Buttons, cards, nav, hero, stats, form, footer, utils
│   └── main.css        Imports the above in order
└── README.md           This reference card
```

Open `index.html` directly in a browser — no build step. To use in a page,
link `css/main.css`.

## The one rule

**Never hard-code a color, size, or space.** Always reference a token. The system's
consistency depends on it. The only literal hex values in the codebase live in
`tokens.css`.

## Signature element

The **burnished gold horizontal rule** appears on every section:

- `.gold-rule-top` — 3px `linear-gradient(90deg, gold, transparent)` on dark panels/cards
- `.section-divider` — 1px champagne rule between light sections
- `.eyebrow--bordered` — 2px gold left border on labels

## Token reference

### Color

| Token | Hex | Role |
| --- | --- | --- |
| `--color-midnight` | `#1C2035` | Primary bg — deep navy-charcoal |
| `--color-obsidian` | `#10131E` | Deepest anchor — nav, footers, body type |
| `--color-gold` | `#BFA46A` | Accent — CTAs, dividers, icon highlights |
| `--color-gold-dark` | `#A8915A` | Gold hover (deeper, no glow) |
| `--color-champagne` | `#EDE2C8` | Warm accent — card borders, warm type |
| `--color-ivory` | `#F8F5EE` | Body background — breathing room |
| `--color-slate` | `#7A8494` | Supporting — body text on dark, captions |
| `--color-white` | `#FFFFFF` | High-contrast surfaces |

Semantic aliases: `--bg-primary`, `--bg-deep`, `--bg-light`, `--bg-surface`,
`--text-primary-dark`, `--text-primary-light`, `--text-body-dark`, `--text-accent`,
`--border-accent`, `--border-subtle`, `--border-divider`, `--border-dark`.

### Typography

| Token | Value | Use |
| --- | --- | --- |
| `--font-display` | Playfair Display | Headings, hero, card titles |
| `--font-body` | DM Sans | Body, eyebrows, buttons |
| `--font-mono` | DM Mono | Data, hex, figures |

Scale: `--text-xs` (11px) → `--text-4xl` (56px).
Line-height: `--leading-tight/snug/normal/loose`.
Tracking: `--tracking-tight` → `--tracking-widest`.

**Roles**
- Display headings — `--font-display` 700, `--tracking-tight`
- Card titles / subheads — `--font-display` 600
- Body — `--font-body` 400, `--leading-normal`
- Eyebrows / labels — `--font-body` 600, `--tracking-widest`, uppercase
- Buttons / CTAs — `--font-body` 600, `--tracking-wide`, uppercase
- Data / hex — `--font-mono`

### Spacing

`--space-1` (4px) → `--space-32` (128px), on a 4px base.

### Shape & shadow

Radius: `--radius-sm` (3px), `--radius-md` (6px), `--radius-lg` (10px), `--radius-full`.
Borders: `--border-width-thin/accent/rule` (1/2/3px).
Shadow: `--shadow-card`, `--shadow-elevated`, `--shadow-deep`.

## Components

`.btn-primary` · `.btn-secondary` (on dark) · `.btn-ghost`
`.card-property` · `.card-stat` · `.card-testimonial`
`.site-nav` · `.hero` · `.stats-bar` · `.quote-form` · `.site-footer`

## Utilities

`.eyebrow` · `.eyebrow--bordered` · `.gold-rule-top` · `.section-divider` ·
`.divider-fade` · `.text-on-dark` · `.text-body-dark` · `.text-accent` · `.lead` ·
`.mono` · `.container` · `.section` · `.grid` (`--2/3/4/5`) · `.split` · `.cluster`

## Restraint test

Before shipping any component: *would this look at home in a Ritz-Carlton brand
guide?* If it reads like a SaaS landing page, strip it back. The ghost watermark and
the gold rule are the only decorative elements — no text gradients, no type shadows,
no border-radius on hero panels, no glow.
