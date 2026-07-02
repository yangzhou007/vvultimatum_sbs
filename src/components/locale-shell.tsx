import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vvultimatum.sbs";

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
    name: "VV Ultimatum Wiki",
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    image: `${siteUrl}/images/hero.webp`,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <JsonLd data={organization} />
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
