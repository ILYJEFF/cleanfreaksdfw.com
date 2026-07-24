# Clean Freaks DFW

Carrollton-based cleaning company. **Commercial** and **Airbnb turnovers** first. Residential available.

**Brand:** A little obsessed. Extremely thorough.  
**Domain:** [cleanfreaksdfw.com](https://www.cleanfreaksdfw.com)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (database)
- Unbounded + Manrope
- Lucide icons

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret)

### 3. Create the database table

Run the SQL in `supabase/migrations/001_create_cleanfreaks_leads.sql` in your Supabase SQL Editor to create the `cleanfreaks_leads` table.

### 4. Run locally

```bash
npm run dev
```

## Deployment (Vercel)

Add these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Brand tokens

- Ink `#0b0d0c`
- Lime `#c8f000`
- Paper `#f5f7f2`
- Hard borders + offset "punch" shadows
- Display: Unbounded / Body: Manrope

Update phone/email in `lib/brand.ts` before launch.
