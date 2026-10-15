import type { Metadata } from "next";
import "./globals.css";
import { business } from "../lib/config";
export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: "PV Travels Chengannur | Sabarimala Pilgrimage Transport",
  description:
    "Book Sabarimala pilgrimage transport with PV Travels, Chengannur. Vehicle options for families and groups, 4–49 seats. Enquire on WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PV Travels Chengannur | Sabarimala Pilgrimage Transport",
    description:
      "Book Sabarimala pilgrimage transport with PV Travels, Chengannur. Vehicle options for families and groups, 4–49 seats. Enquire on WhatsApp.",
    url: business.websiteUrl,
    siteName: business.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/fleet-banner.webp",
        width: 1920,
        height: 1079,
        alt: "PV TRAVELS pilgrimage fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PV Travels Chengannur | Sabarimala Pilgrimage Transport",
    description: "Book Sabarimala pilgrimage transport with PV Travels, Chengannur. Vehicle options for families and groups, 4–49 seats. Enquire on WhatsApp.",
    images: ["/images/fleet-banner.webp"],
  },
  icons: { icon: "/icon.png", apple: "/images/logo.webp" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const homeUrl = `${business.websiteUrl}/`;
  const businessId = `${homeUrl}#business`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: business.name,
        url: homeUrl,
        telephone: business.phone,
        email: business.email,
        image: `${business.websiteUrl}/images/fleet-banner.webp`,
        logo: `${business.websiteUrl}/images/logo.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chengannur",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Place", name: "Kerala, India" },
        hasMap: business.mapUrl,
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: "PV Travels Chengannur",
        url: homeUrl,
        inLanguage: "en-IN",
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        name: "PV Travels Chengannur | Sabarimala Pilgrimage Transport",
        url: homeUrl,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${homeUrl}#website` },
        about: { "@id": businessId },
        mainEntity: { "@id": `${homeUrl}#transport-service` },
      },
      {
        "@type": "Service",
        "@id": `${homeUrl}#transport-service`,
        name: "Sabarimala pilgrimage transport",
        serviceType: "Family and group pilgrimage transportation",
        provider: { "@id": businessId },
        url: `${homeUrl}#vehicles`,
        areaServed: business.mainPickups.map((route) => ({ "@type": "Place", name: `${route.name}, Kerala, India` })),
        description: "Car, Tempo Traveller and bus enquiries for 4–49 passengers. Vehicle availability, permitted access points and fares are confirmed directly with PV Travels.",
      },
    ],
  };
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
