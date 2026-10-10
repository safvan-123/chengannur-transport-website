import type { Metadata } from 'next';
import './globals.css';
import { business } from '../lib/config';
export const metadata: Metadata = {
  title: `${business.name} | Local Travel & Sabarimala Transport`,
  description: 'Enquire about Chengannur local travel and Sabarimala pilgrim transport. Vehicle sizes from 7 seats to 49-seat buses. Request availability and a quote.',
  icons: { icon: '/favicon.svg' },
};
export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  const schema = business.nameConfirmed && business.websiteUrl && business.phone ? { '@context': 'https://schema.org', '@type':'LocalBusiness', name:business.name, url:business.websiteUrl, telephone:business.phone, areaServed:business.serviceArea, ...(business.address ? {address:business.address} : {}) } : null;
  return <html lang="en"><body>{schema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>}{children}</body></html>;
}
