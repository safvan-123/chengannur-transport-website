# Delivery verification

## Passed

- Next.js production build with `output: 'export'`; homepage and not-found page generated in `out/`.
- TypeScript check (`npm run typecheck`).
- Six automated checks: local date formatting; required fields/passenger bounds; travel/return date rules; telephone/WhatsApp placeholder handling; encoded complete WhatsApp message; navigation target/accessibility markup.
- Static export inspection: all section anchors resolve and bundled image/script assets exist. Title and meta description are present.
- Responsive stylesheet reviewed at desktop, tablet and mobile breakpoints; no remote photos/fonts required.

## Limits and client launch checks

No browser automation was available, so live visual checks, menu clicks, keyboard navigation and device layout have not been browser-tested. Calls and actual WhatsApp delivery require the client’s real numbers and a device/app. The supplied contact fields are intentionally blank.

Before launch, view at 360px, 768px and desktop widths; test the mobile menu and Escape key, FAQ toggles, vehicle selection, form errors and valid enquiry. Configure real contact numbers and press Call/WhatsApp on a phone. Check the fallback link if popups are blocked. Ask the operator to verify routes, pickup/drop access, fleet details and every company claim. No booking is automatically confirmed.
