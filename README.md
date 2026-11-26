# bestCRM — Public Website (Frontend UI)

Public-facing multi-page marketing and onboarding website for **bestCRM**, a CRM platform offering ready-made CRMs for small businesses (Catering, Hostel, Hotel, Karam Podi, Pickles Sales, and Lunch Box).

> **Note:** This is a frontend-only application with simulated forms and simulated checkout. Look for `// TODO: connect to API` comments when wiring a backend or admin panel.

## Tech Stack

- **React 19 + TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router (`react-router-dom`)**
- **Lucide React** (inline SVG icons)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server on port 3000:
   ```bash
   npm run dev
   ```
3. Type-check and lint:
   ```bash
   npm run lint
   ```
4. Build for production:
   ```bash
   npm run build
   ```
   Output is generated in `dist/`.

## Editing Site Content

All marketing copy, pricing plans, industry CRMs, services, stats, FAQs, contact details, app store URLs, and per-page SEO metadata live in one centralized file:

- `src/data/content.ts`

To update prices, add a new industry CRM, change contact numbers/hours, or connect a future Admin API:
1. Open `src/data/content.ts`.
2. Edit `PRICING_PLANS`, `CRM_PRODUCTS`, `SERVICES_LIST`, `STATS_ROW`, or `SITE_INFO`.
3. Replace static exports or `// TODO: connect to API` markers in `src/pages/CheckoutPage.tsx`, `src/pages/ContactPage.tsx`, and `src/components/Modals.tsx` when integrating live endpoints.

## Pages Included

- `/` — Home (Hero with dashboard + phone mockup, Why Choose bestCRM, 6 Industry CRMs, Services, Packages Banner, Stats, Closing CTA)
- `/packages` — Explore Packages (Monthly/Yearly billing toggle with 20% discount, Starter/Professional/Enterprise plans, Compare Plans table, FAQ accordion)
- `/services` — Services (5 expanded service cards with consultation modal, 4-step How It Works sequence)
- `/about` — About Us (Office illustration, feature chips, Vision/Mission/Values, Business expertise)
- `/contact` — Contact Us (Direct info, WhatsApp chat link, validated enquiry form, Download Our Apps card)
- `/checkout` — Simulated 3-step checkout (Select CRM -> Business Details -> Demo Payment Review)
- `/download` — Download Your App confirmation screen with selected Plan & CRM persisted in `sessionStorage`
- `/privacy-policy` & `/terms` — Legal pages
- `*` — 404 Not Found page
