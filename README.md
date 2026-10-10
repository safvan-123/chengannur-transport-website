# Chengannur transport website

A responsive Next.js App Router website, exported as static HTML/CSS/JavaScript. No server, database, payment, login or booking management is included.

## Quick start

Install Node.js 20.9 or newer (Node 22/24 recommended), extract the ZIP and open the project directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check and export:

```sh
npm test
npm run typecheck
npm run build
```

`out/` is the complete production static export. Rebuild after changing content. Do not double-click `out/index.html`: serve it over HTTP, because asset paths start at `/`.

## Before publishing — edit `lib/config.ts`

All client content is in this file. Search for `PLACEHOLDER` and `CLIENT CONFIRMATION REQUIRED`.

- Replace the draft business name and set `nameConfirmed: true` only when correct.
- Set `phone` to the real international telephone number. Call links use `tel:`.
- Set `whatsapp` to the real international number with country code, digits only, no plus, spaces or initial local zero. It must be a WhatsApp-enabled number.
- Add confirmed address, HTTPS Google Maps link, hours, email, HTTPS social links, website URL and exact service routes where applicable. Blank optional details are hidden.
- Check service descriptions. Station pickup is disabled until the client confirms it.
- Confirm actual fleet names and capacities. The initial cards are illustrative categories, not an inventory. Replace SVGs with permitted real photos in `public/images/`, then update image paths and alt text. Provide confirmed AC/luggage details; blank details are hidden. Use reasonably sized WebP/AVIF/JPEG files.
- Edit introduction, strengths and FAQ answers to reflect the operator’s confirmed arrangements. There are no invented prices, reviews, certifications or experience claims.
- For more vehicle preferences add them to vehicle configuration; they appear in the form automatically.

Without valid phone/WhatsApp numbers, contact buttons guide visitors to the enquiry form with a clear prelaunch help message. A valid enquiry can be reviewed, but cannot be sent until a WhatsApp number is supplied. Fill these fields before publishing.

Structured LocalBusiness data is emitted only when name confirmation, website URL and phone are configured. The confirmed service area and optional address are included. No ratings or fabricated facts are emitted. Update page metadata in `app/layout.tsx` if needed. Favicon is locally bundled.

## Behaviour and accessibility

- One page with Home, Services, Vehicles, About and Contact anchors, a compact mobile menu, Escape-to-close and visible keyboard focus.
- Fleet buttons select the vehicle capacity in the enquiry form.
- Required fields, whole passenger counts from 1–49, local-calendar travel dates and conditional return dates are validated. Larger parties should contact the operator about multiple vehicles.
- Valid submission opens a URL-encoded WhatsApp message in a new tab. The visitor must press Send, and the operator must confirm booking and fare. A persistent direct link and message preview allow recovery if the browser blocks a popup.
- No enquiry data is stored or sent to this website. Once the visitor follows WhatsApp, that service handles their data.
- Native expandable FAQs, subtle vehicle movement, hover transitions and section entrance motion. Reduced-motion settings disable motion. Core content remains visible even without animation or IntersectionObserver.
- Local vector illustrations, system fonts and no tracking or remote image dependencies.

## Deployment

**Vercel:** import the folder/repository, use the Next.js framework preset and `npm run build`. `output: 'export'` is configured, so the project has no runtime backend.

**Netlify:** use build command `npm run build`, publish directory `out`. A `netlify.toml` is included; no Next server plugin is needed for the static output.

**Any static host:** upload the contents of `out/` to the site root. This project assumes root hosting; for a subdirectory configure `basePath` and asset paths before building.

Do not upload `node_modules`, `.next` or test files as the static site.

## Project map

- `lib/config.ts`: client configuration and content
- `lib/enquiry.mjs`: contact links, validation, WhatsApp message
- `components/TransportSite.tsx`: page components and interactions
- `app/globals.css`: responsive styles and motion
- `app/layout.tsx`: metadata and conditional structured data
- `public/`: local SVG artwork and favicon
- `tests/enquiry.test.mjs`: automated validation and link tests
- `out/`: generated static production site

## Verification

See `VERIFICATION.md` for the checks completed for this delivered ZIP. Before public launch, use actual configured numbers to test calls and WhatsApp on a phone, and check the client’s fleet and routes.
