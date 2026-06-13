# КВИНТ — Маркетинговое агентство

Premium marketing agency website built with Next.js 14 (App Router), Tailwind CSS, Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_YM_ID` | Yandex.Metrika counter ID |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (e.g. `G-XXXXXXXXXX`) |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for email sending |
| `RESEND_FROM_EMAIL` | Sender email (must be verified in Resend) |
| `RESEND_TO_EMAIL` | Agency email — where form submissions are sent |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID (get via `getUpdates` API) |
| `GOOGLE_SHEET_ID` | Google Sheets spreadsheet ID |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Base64-encoded service account JSON |

## One-time Setup

### Telegram Bot
1. Message [@BotFather](https://t.me/BotFather) → `/newbot`
2. Copy the `BOT_TOKEN`
3. Message your bot, then visit `https://api.telegram.org/bot{TOKEN}/getUpdates` to get `chat_id`

### Resend (Email)
1. Register at [resend.com](https://resend.com)
2. Verify your sending domain
3. Copy the API key

### Google Sheets
1. Create a spreadsheet
2. Create a [service account](https://console.cloud.google.com/iam-admin/serviceaccounts) in Google Cloud
3. Enable the Sheets API
4. Share the spreadsheet with the service account email
5. Base64-encode the JSON key: `base64 -i service-account.json`

## Deployment

Deploy to Vercel:
```bash
vercel deploy
```

Set all environment variables in the Vercel dashboard under Project Settings → Environment Variables.

## Lead Magnet PDF

Replace `public/kvint-presentation.pdf` with the final presentation file before deploying.

## Tech Stack

- **Next.js 14** (App Router, SSG/SSR)
- **Tailwind CSS 3** with custom design tokens
- **Framer Motion** for scroll-triggered animations
- **React Hook Form** for form validation
- **Resend** for transactional email
- **Embla Carousel** for testimonials
- **Lucide React** for icons
- **next-sitemap** for automatic sitemap generation
