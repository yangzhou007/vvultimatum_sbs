import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/locale-shell";
import { SITE_CONFIG } from "@/config/site";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${SITE_CONFIG.siteUrl}${SITE_CONFIG.heroImage}`;
  return {
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    title: { default: SITE_CONFIG.defaultTitle, template: "%s" },
    description: SITE_CONFIG.description,
    openGraph: { type: "website", locale, url: SITE_CONFIG.siteUrl, siteName: SITE_CONFIG.siteName, images: [{ url: image }] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}
