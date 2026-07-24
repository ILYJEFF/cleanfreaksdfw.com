# Clean Freaks DFW

Carrollton-based cleaning company website focused on **commercial properties** and **Airbnb / short-term turnovers**, with residential available as a secondary service. Operating north of Carrollton across north DFW.

**Domain:** [cleanfreaksdfw.com](https://www.cleanfreaksdfw.com)

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

Update contact details in `lib/brand.ts`:

- Phone (placeholder until you set a real number)
- Email (`hello@cleanfreaksdfw.com` by default)
- Service cities

Wire email delivery in `app/api/contact/route.ts` (Resend, SendGrid, etc.) before going live.

## Deploy

```bash
npm run build
```

Deploy to Vercel and point `cleanfreaksdfw.com` / `www` at the project.
