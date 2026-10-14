import type { MetadataRoute } from "next";
import { business } from "../lib/config";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  // Section anchors belong to this one page; they are not separate URLs.
  return [{ url: `${business.websiteUrl}/` }];
}
