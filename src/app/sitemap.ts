import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { CONTENT_TYPES } from "@/config/navigation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vvultimatum.sbs";

  const staticPaths = [
    "/",
    ...CONTENT_TYPES.map((contentType) => `/${contentType}`),
    "/privacy-policy",
    "/terms-of-service",
    "/copyright",
    "/about",
  ];

  // Dynamic paths: scan English MDX content files, then let non-English locales
  // use their translated file or the existing English fallback.
  const contentPaths = await getAllContentPaths(routing.defaultLocale);
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : CONTENT_TYPES.some((contentType) => path === `/${contentType}`) ? 0.8 : 0.6,
    })),
  );
}
