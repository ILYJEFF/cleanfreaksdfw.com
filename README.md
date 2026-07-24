# Northline Cleaning

Carrollton-based cleaning company website focused on **commercial properties** and **Airbnb / short-term turnovers**, with residential available as a secondary service. Operating north of Carrollton across north DFW.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide icons

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configure

Update contact details and branding in `lib/brand.ts`:

- Phone / email (placeholder number is currently set for demo)
- Service cities
- Site URL for production SEO

Wire email delivery in `app/api/contact/route.ts` (Resend, SendGrid, etc.) before going live.

## Deploy

```bash
npm run build
```

Deploy the project to Vercel or any Node host that supports Next.js.
