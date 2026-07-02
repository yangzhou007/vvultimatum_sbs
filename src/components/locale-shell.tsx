import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { StickyAdBanner } from "@/components/ads";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { SITE_CONFIG } from "@/config/site";

export async function LocaleShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/android-chrome-512x512.png`,
    image: `${SITE_CONFIG.siteUrl}${SITE_CONFIG.heroImage}`,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AnalyticsScripts />
        <JsonLd data={organization} />
        <SiteHeader locale={locale} />
        <StickyAdBanner />
        {children}
        <SiteFooter locale={locale} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
