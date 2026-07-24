# Clean Freaks DFW

Carrollton-based cleaning company. **Commercial** and **Airbnb turnovers** first. Residential available.

**Brand:** A little obsessed. Extremely thorough.  
**Domain:** [cleanfreaksdfw.com](https://www.cleanfreaksdfw.com)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Unbounded + Manrope
- Lucide icons

## Develop

```bash
npm install
cp .env.example .env.local
# Fill Supabase + PrivateMail SMTP values
npm run dev
```

## Backend

- **Supabase:** shared project with ApplySharp / Hammitt Group. This app only uses `cf_*` tables (see `supabase/migrations/`).
- **Contact form:** `POST /api/contact` saves to `cf_quote_requests` and emails via Namecheap PrivateMail (`mail.privateemail.com`).
- Env template: `.env.example`

## Brand tokens

- Ink `#0b0d0c`
- Lime `#c8f000`
- Paper `#f5f7f2`
- Hard borders + offset “punch” shadows
- Display: Unbounded · Body: Manrope

Update phone/email in `lib/brand.ts` before launch.
