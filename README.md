# PV TRAVELS — Chengannur

Premium, responsive Sabarimala pilgrimage transport website. Built with Next.js and React; exports to static HTML, CSS and JavaScript with no hosting backend required.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Validate and build

```bash
npm test
npm run typecheck
npm run build
```

The build exports a deployable website to `out/`. The ZIP includes a ready-built `out/` folder as well as editable source code. Keep `_next/`, `images/` and all other files in `out/` together when uploading.

## Hosting

- Cloudflare Pages (Git-based): framework preset **None**, build command `npm run build`, output directory `out`, Node.js 22. Root directory is the folder containing `package.json`.
- Cloudflare Pages (direct upload): upload the contents of `out/`.
- Netlify: included `netlify.toml` uses `npm run build` and publishes `out/`.
- Vercel: import as Next.js; the existing `next.config.ts` enables static export.
- Static hosting: upload the contents of `out/` to your public web root.

The target domain is `www.pvtravelschengannur.com`. Adding the domain in metadata does not register it or configure DNS; connect that domain with your chosen hosting provider and enable HTTPS.

## Content and images

- `lib/config.ts`: contact details, vehicle inventory, routes, approximate distances and FAQs.
- `components/TransportSite.tsx`: layout, booking enquiry, pagination and gallery.
- `app/globals.css`: styling and mobile/tablet/desktop rules.
- `app/layout.tsx`: SEO metadata and TravelAgency structured data.
- `public/images/`: locally hosted, optimized WebP images. Images retain source pixel dimensions; no artificial upscaling was used. Smaller gallery previews load separately.
- `client-originals/`: all 12 unchanged supplied JPEG images for future editing. This directory is not served or included in the static build.

Image mapping: first logo → logo.webp; original composite fleet image → fleet-banner.webp; Swift Dzire → dzire.webp; Tourist Bus → bus.webp; Tata Winger → winger.webp; Toyota Innova → innova.webp; Tempo Traveller → traveller.webp; final uploaded image → hero.webp. Other supplied pilgrimage images appear in the gallery.

Fleet pages contain up to three cards and Sabarimala route pages up to six. Three related temple routes are shown together. The gallery has previous/next controls, numbered progress, slide selectors and a keyboard-accessible image viewer.

## WhatsApp enquiries

Call and WhatsApp buttons use +91 8547651523. Vehicle and route cards prefill the enquiry form. Required fields, valid travel dates, return dates and passenger limits are validated. The form prepares an encoded WhatsApp message, opens WhatsApp and provides a fallback link and message preview. A visitor must press Send in WhatsApp. Availability, fare and booking must be confirmed by PV TRAVELS.

No online payments, automatic reservations or server database are included. Details are held only in page memory and sent to WhatsApp when the visitor chooses to send the message. The Google Maps iframe may contact Google when loaded; WhatsApp links open WhatsApp services.

The embedded map shows Chengannur generally. The **Open exact location** button uses the client's supplied Google Maps short link. For an exact office-pin embed, replace the iframe URL with the Google Maps “Share → Embed a map” URL for that office.

Confirm actual passenger seating, luggage space, availability, fares and permitted Sabarimala vehicle pickup/drop points directly with the operator. Route distances are supplied approximate references, not turn-by-turn navigation.
