import type { Metadata } from "next";
import "./globals.css";
import { business } from "../lib/config";
export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: "PV TRAVELS Chengannur | Sabarimala Pilgrimage Transport",
  description:
    "Plan your Sabarimala pilgrimage with PV TRAVELS, Chengannur, Kerala. Swift Dzire, Innova, Winger, Tempo Traveller and 49-seat bus enquiries. Call +91 9446055334.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PV TRAVELS | Your Sabarimala Journey",
    description:
      "Pilgrimage transport from Chengannur and beyond. Vehicle options from 4 to 49 seats.",
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
    title: "PV TRAVELS Chengannur",
    description: "Sabarimala pilgrimage transport · 4 to 49 seat options",
    images: ["/images/fleet-banner.webp"],
  },
  icons: { icon: "/images/logo.webp", apple: "/images/logo.webp" },
  robots: { index: true, follow: true },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: business.name,
    url: business.websiteUrl,
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
    areaServed: "Kerala",
    hasMap: business.mapUrl,
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
