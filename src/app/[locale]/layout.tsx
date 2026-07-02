import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/locale-shell";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vvultimatum.sbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${siteUrl}/images/hero.webp`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: "VV: ULTIMATUM Wiki", template: "%s" },
    description: "Complete VV: ULTIMATUM fan wiki with codes, bosses, builds, races, guides and progression walkthroughs.",
    openGraph: { type: "website", locale, url: siteUrl, siteName: "VV Ultimatum Wiki", images: [{ url: image }] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}
