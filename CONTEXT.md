# КВИНТ — Project Context

Full context for a new Claude Code session. Last updated: 2026-06-14.

---

## Quick Start

```bash
npm install       # first time only
npm run dev       # http://localhost:3000
npm run build     # production build check
git push          # Vercel auto-deploys from main branch
```

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom globals.css |
| Animations | Framer Motion |
| Forms | react-hook-form |
| Email | Resend API |
| Notifications | Telegram Bot API |
| Analytics | Yandex Metrika (id: 109826277) |
| Hosting | Vercel (auto-deploy on push to main) |
| Domain | kvint.agency |
| Font | Montserrat (headings) + Space Grotesk (mono/labels) |

---

## Environment Variables

File: `.env.local` (never commit, already in .gitignore)

```env
# Analytics
NEXT_PUBLIC_YM_ID=109826277

# Email via Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@kvint.agency
RESEND_TO_EMAIL=hello@kvint.agency

# Telegram notifications
TELEGRAM_BOT_TOKEN=8313335781:AAEb-...
TELEGRAM_CHAT_ID=585908803

# Google Sheets (not yet wired up — see TODO)
GOOGLE_SHEET_ID=xxxxxx
GOOGLE_SERVICE_ACCOUNT_KEY=eyJ0eXBlIjoic2VydmljZV9hY2NvdW50Ii4uLn0=
```

---

## Design System

### Colors (tailwind.config.ts)

```
bg:         #0A0A0F   — page background
bg-2:       #12121A   — card/section background
accent:     #1A6EFF   — brand blue
accent-dim: rgba(26,110,255,0.13)
text:       #F0F0F5   — primary text
muted:      #888899   — secondary text
border:     rgba(255,255,255,0.06)
```

### Typography

- Headings: `font-sans` → Montserrat 700–800
- Labels/mono: `font-grotesk` → Space Grotesk 400–500
- `section-title`: clamp(28px, 4vw, 56px), font-bold, leading-tight
- `eyebrow`: 12px, uppercase, tracking-widest, text-accent

### Key CSS classes (globals.css)

- `.glass-card` — glassmorphism card: bg rgba(255,255,255,0.04), border rgba(255,255,255,0.06), border-radius 16px, backdrop-blur-md
- `.glass-card-hover` — adds translate-y(-2px) and brighter border on hover
- `.text-outline` — transparent fill, 1px accent stroke (used ONLY in Hero, Comparison, MainCTA)
- `.eyebrow` — styled label above section titles
- `.section-title` — responsive clamp font-size heading
- `.nav-link` — header navigation link style
- `.noise-overlay` — full-page SVG noise texture at 2% opacity
- `.bottom-sheet` — modal positioning helper for mobile

### Animation conventions

- Micro-interactions: 150–300ms, ease-out
- Section entrances: `useInView` with `once: true, margin: '-60px'`
- Stagger: 30–50ms per item (`i * 0.04` or `i * 0.08` delay)
- Spring cursor: damping 28, stiffness 350, mass 0.5
- Reduced-motion: all animations gated on `useReducedMotion()`
- Parallax: `useScroll` + `useTransform` on Hero background only
- Count-up: rAF-based easeOut cubic in Hero stats

---

## File Structure

```
app/
  layout.tsx          — root layout: fonts, Metrika, MessengerWidget, CustomCursor
  page.tsx            — homepage: section order (see below)
  globals.css         — all custom CSS, design tokens
  api/
    send-form/        — handles project + strategy form submissions (Resend + Telegram)
    send-presentation/ — handles lead magnet email/Telegram

components/
  layout/
    Header.tsx        — fixed nav, mobile fullscreen overlay
    Footer.tsx        — links, social, copyright
  sections/           — homepage sections (see Section Order below)
  shared/
    AnimatedSection.tsx   — useInView wrapper for fade-in-up
    ContactForm.tsx       — project inquiry form
    ContactSection.tsx    — contact section with tab toggle
    CustomCursor.tsx      — spring-physics ring cursor (desktop pointer only)
    LeadMagnetPopup.tsx   — modal: email/telegram form for PDF presentation
    MessengerWidget.tsx   — floating Telegram/WhatsApp button
    StrategyForm.tsx      — diagnostic session booking form
  ui/
    Badge.tsx             — small tag/chip
    Button.tsx            — primary / secondary / text variants
    Input.tsx             — form input with label + error

lib/
  data/
    cases.ts          — Case[] array (3 cases)
    services.ts       — audiences[], processSteps[], testimonials[], comparisonRows[]
    blog.ts           — BlogPost[] array (3 posts)
  utils.ts            — trackGoal(), cn() helpers
```

---

## Section Order (app/page.tsx)

1. `<Hero />` — full viewport, char animation, glitch word, count-up stats, 3-tier CTAs
2. `<ClientsMarquee />` — scrolling client logos (flush, py-0)
3. `<ForWho />` — 4 audience cards with left-border accent (`py-24`)
4. `<Services />` — flagship product + 9 service cards (`py-16`)
5. `<Process />` — 4 steps with decorative bg numbers, stagger, progressive line (`py-32`)
6. `<CasesPreview />` — featured case full-width + 2-col grid (`py-20`)
7. `<Testimonials />` — editorial list, no cards, separator lines (`py-16`)
8. `<LeadMagnetDivider />` — strip CTA for PDF presentation (flush)
9. `<Comparison />` — Квинт vs others table, hover glow on Квинт column (`py-24`)
10. `<Team />` — founder card + team member list (`py-32`)
11. `<MainCTA />` — diagnostic session offer card (`py-24`)
12. `<ContactSection id="contact" />` — tab toggle: project form / strategy form (`py-20`)

---

## 21 Changes Implemented (2026-06-14)

### Hero (complete rewrite)
1. Layout left-aligned, max-width 680px, flex row on desktop with decorative SVG "120" on right
2. H1 animates char-by-char per word (20ms stagger per character, staggered word delays)
3. "систему" outline word has glitch effect on hover (random y-offsets per letter)
4. Stats row with count-up animations: `120+`, `8 лет`, `от 80 000 ₽`
5. Three-tier CTA: primary "Обсудить проект" → secondary "Записаться на диагностику" → tertiary text "Получить презентацию агентства →"

### Typography / eyebrows
6. Eyebrow text updated: ForWho "Работаем там, где высока цена ошибки", Services "Инструменты под задачу", Process "От хаоса к системе", Cases "Результаты, которые можно проверить", Testimonials "Они уже проверили", Contact "Первый шаг"
7. Contact section h2: plain "Начнём работу?" (no outline span)
8. Services h2: plain "Полный спектр инструментов" (no outline span)
9. Process h2: plain "Четыре шага" (no outline span)
10. Cases h2: plain "Наши кейсы" (no outline span)
11. `text-outline` pattern restricted to Hero ("систему"), Comparison ("Квинт"), MainCTA ("которая приносит")

### Section redesigns
12. Process: decorative large SVG step numbers in bg, progressive animated connector line on desktop
13. CasesPreview: first case featured full-width, remaining in 2-col grid; hover sweep line (accent scaleX)
14. Testimonials: Embla carousel removed; vertical editorial list with separator `<hr>` lines
15. Comparison: row hover adds `inset 3px 0 0 #1A6EFF` box-shadow on Квинт column
16. ForWho cards: `borderLeft: '2px solid #1A6EFF'` on each card
17. Services grid cards: solid `#12121A` bg, top border only `rgba(255,255,255,0.08)`, no glass

### Padding normalization
18. All sections updated to spec: py-24 (ForWho, Comparison, MainCTA), py-32 (Process, Team), py-20 (Cases, Contact), py-16 (Services, Testimonials)

### Forms
19. StrategyForm: niche + budget selects are optional (removed required validation, added "(необязательно)" label)
20. Both forms (ContactForm, StrategyForm): success state links to `/cases`

### Infrastructure
21. `CustomCursor.tsx`: spring-physics ring cursor (20px, accent stroke), pointer-fine detection, added to `app/layout.tsx`
    LeadMagnetPopup: eyebrow removed, headline "Посмотрите, как мы работаем"

---

## API Routes

### POST /api/send-form
Handles both form types. Body: `{ name, contact, message?, niche?, budget?, formType: 'project'|'strategy' }`.
Sends email via Resend + Telegram message to TELEGRAM_CHAT_ID.

### POST /api/send-presentation
Handles lead magnet. Body: `{ contact, type: 'email'|'telegram' }`.
If email: sends PDF via Resend. If Telegram: sends instructions to Telegram bot.

---

## Data Files

### lib/data/cases.ts — Case[]
3 cases: `ai-saas-startup`, `hr-consulting-webinar`, `premium-grey-zone`
Fields: slug, niche, tag, title, task, mainMetric, metricLabel, metricSecondary, description, tags[], results[], what_we_did[], duration, date

### lib/data/services.ts — multiple exports
- `audiences[]` — 4 items (Code2/ShoppingBag/Factory/Building2 icons)
- `processSteps[]` — 4 steps (number, title, description)
- `testimonials[]` — 4 items (name, company, niche, text)
- `comparisonRows[]` — rows with feature/competitor/kvint fields

### lib/data/blog.ts — BlogPost[]
3 posts: `system-marketing`, `performance-b2b`, `seo-2024`

---

## TODO

### High Priority
- [ ] **Real team photos** — replace initials placeholders in `Team.tsx`. Add images to `/public/team/`. Component has `{/* REPLACE: add <Image> */}` comments at the right spots.
- [ ] **Real client testimonials** — update `lib/data/services.ts` → `testimonials[]` array with actual client quotes, names, companies.
- [ ] **Google Sheets integration** — `GOOGLE_SHEET_ID` + `GOOGLE_SERVICE_ACCOUNT_KEY` are stubbed in `.env.local`. Wire up in `app/api/send-form/route.ts` to append rows on each form submission. The service account key must be base64-encoded JSON.
- [ ] **Lead magnet PDF** — create the actual agency PDF. Store at `/public/kvint-presentation.pdf`. Update `app/api/send-presentation/route.ts` to attach it in Resend email.

### Medium Priority
- [ ] **/about page** — `app/about/page.tsx` doesn't exist yet. Should reuse Team section content plus extended founder bio and agency story.
- [ ] **Blog content** — 3 placeholder posts in `lib/data/blog.ts`. Need real articles. Blog list at `/blog`, post at `/blog/[slug]`.
- [ ] **Cases — real metrics** — current cases in `lib/data/cases.ts` use illustrative numbers. Replace with real client data when approved.
- [ ] **ClientsMarquee logos** — currently text-only. Add real SVG client logos to `/public/clients/` and update `ClientsMarquee.tsx`.
- [ ] **OG image** — `/public/og-image.svg` exists. Consider a `.png` version for better Twitter card compatibility.

### Low Priority
- [ ] **Cookie consent** — no banner yet. Add if needed for GDPR (site targets RU market, current law doesn't strictly require it).
- [ ] **/services detail pages** — individual service landing pages (`/services/seo`, `/services/performance`, etc.)
- [ ] **Sitemap auto-update** — `next-sitemap` runs on build. Config at `next-sitemap.config.js`. Currently generates `/sitemap.xml`.
- [ ] **Remove NEXT_PUBLIC_GA_ID** — GA was removed but env variable stub remains. Clean up from `.env.local`.

---

## Deployment

- **Auto-deploy**: push to `main` → Vercel picks it up automatically
- **Preview**: every branch/PR gets a Vercel preview URL
- **Domain**: kvint.agency (configured in Vercel dashboard)
- **Build command**: `next build` (runs `next-sitemap` as postbuild)
- **Node**: 18+

Vercel environment variables must be set in the Vercel dashboard (Settings → Environment Variables) mirroring `.env.local`.

---

## Known Issues / Notes

- `embla-carousel-react` is still in `package.json` but no longer used after Testimonials rewrite. Can be removed with `npm uninstall embla-carousel-react embla-carousel`.
- The `text-outline` CSS class uses `-webkit-text-stroke` which has limited browser support on older Android. Acceptable for the target audience.
- `CustomCursor.tsx` uses `useState` to detect `pointer: fine` after mount to avoid SSR mismatch. This means there's a single frame without the cursor on load — acceptable.
- Yandex Metrika counter ID `109826277` is hardcoded both in `layout.tsx` Script and in `lib/utils.ts` `trackGoal()`. Both must match.
