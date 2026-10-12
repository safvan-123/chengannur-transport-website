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
- `client-originals/`: all unchanged supplied JPEG images for future editing. This directory is not served or included in the static build.

Image mapping: first logo → logo.webp; composite fleet image → fleet-banner.webp (full-width homepage hero); Swift Dzire → dzire.webp; Tourist Bus → bus.webp; Tata Winger → winger.webp; Toyota Innova → innova.webp; Tempo Traveller → traveller.webp; previous final uploaded image → hero.webp (retained in gallery). Other supplied pilgrimage images appear in the gallery.

All five vehicles are displayed together without fleet pagination. Sabarimala route pages contain up to six cards. The eight related temple routes have image cards, paginated six per page. The gallery has previous/next controls, numbered progress, slide selectors and a keyboard-accessible image viewer.

## WhatsApp enquiries

Call and WhatsApp buttons use +91 9446055334. Vehicle and route cards prefill the enquiry form. Required fields, valid travel dates, return dates and passenger limits are validated. The form prepares an encoded WhatsApp message, opens WhatsApp and provides a fallback link and message preview. A visitor must press Send in WhatsApp. Availability, fare and booking must be confirmed by PV TRAVELS.

No online payments, automatic reservations or server database are included. Details are held only in page memory and sent to WhatsApp when the visitor chooses to send the message. The Google Maps iframe may contact Google when loaded; WhatsApp links open WhatsApp services.

The embedded map shows Chengannur generally. The **Open exact location** button uses the client's supplied Google Maps short link. For an exact office-pin embed, replace the iframe URL with the Google Maps “Share → Embed a map” URL for that office.

Confirm actual passenger seating, luggage space, availability, fares and permitted Sabarimala vehicle pickup/drop points directly with the operator. Route distances are supplied approximate references, not turn-by-turn navigation.

## Requested update

- Full-section fleet hero photograph with responsive cover fitting.
- Header uses one line: PV Travels Chengannur, aligned beside the logo.
- Call and WhatsApp number throughout: +91 9446055334.
- All five fleet cards displayed together. Tata Winger and the other full-sized fleet images use locally hosted lossless WebP files.
- Eight temple cards in the supplied order: Chenkal (203 km), Mannarasala (112 km), Padmanabhaswamy (175 km), Chettikulangara (143 km), Haripad (111 km), Oachira (108 km), Vadakkumnathan (198 km), Ettumanoor (119 km). Distances remain the client's approximate references.
- Temple photo mapping follows the upload order supplied in the request. Original JPEGs are preserved. Lossless WebP conversion adds no further lossy compression; it does not create detail beyond the original photographs.
- Source files are formatted with normal indentation and line breaks for easier editing.

Temple name references (official tourism/temple sources):
- Chenkal Maheswaram Sri Sivaparvathi Temple: https://www.keralatourism.org/destination/maheswaram-sri-sivaparvathi-temple/753/
- Mannarasala Sree Nagaraja Temple: https://www.keralatourism.org/destination/mannarasala-sree-nagaraja-temple/63/
- Sree Padmanabhaswamy Temple: https://spst.in/
- Chettikulangara Devi Temple: https://www.chettikulangara.org/abode.php
- Haripad Sree Subrahmanya Temple: https://www.keralatourism.org/1000festivals/index.php/preview/festival_info?fest_id=400
- Oachira Sree Parabrahma Temple: https://www.keralatourism.org/monsoon-festivals/festival.php?id=37
- Vadakkumnathan Temple: https://www.keralatourism.org/temples/thrissur/vadakkumnathan
- Ettumanoor Sree Mahadeva Temple: https://www.keralatourism.org/destination/ettumanoor-mahadeva-temple/469/

## Image fitting update

Hero, About photo, fleet photos, temple photos and gallery photos fill their frames with `object-fit: cover`. The About photo uses the source banner's natural aspect ratio to avoid cutting off the vehicle lineup. The portrait bus image has a lower focal point so the bus stays prominent. Gallery previews now use full-resolution files. Fleet cards use flex layout for aligned enquiry buttons.

The fleet banner is saved from the supplied original using lossless WebP. Existing photos retain their available pixel dimensions; no artificial HD detail or resolution is claimed. Cover fitting can crop photo edges when the photo and container have different proportions. The original logo retains its uncropped proportions.

All business content, contacts, routes, navigation, booking behavior and existing pagination are preserved. No Git history is included in this ZIP; when updating your existing Git-linked folder, keep its `.git` directory.
