import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { JsonLd, WikiSidebar } from "@/components/site";
import { SITE_CONFIG } from "@/config/site";
import { getAllContent, getDynamicNavigation, type ContentItem, CONTENT_TYPES } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";

type Messages = typeof en;

export async function generateHomeMetadata(locale: string): Promise<Metadata> {
  setRequestLocale(locale);
  const messages = (await getMessages({ locale })) as Messages;
  return {
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.description,
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/" } },
    openGraph: { title: SITE_CONFIG.defaultTitle, description: SITE_CONFIG.description, url: SITE_CONFIG.siteUrl, images: [`${SITE_CONFIG.siteUrl}${SITE_CONFIG.heroImage}`] },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export async function HomePageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const loc = locale as Locale;
  const messages = (await getMessages({ locale })) as Messages;
  const navGroups = getDynamicNavigation(loc);
  const hasSidebar = navGroups.length > 0 || SITE_CONFIG.activeCodes.length > 0;
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_CONFIG.siteName, url: SITE_CONFIG.siteUrl, description: SITE_CONFIG.description };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: messages.home.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Load every MDX article under the configured content directories.
  const allArticles: ContentItem[] = [];
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, loc);
    allArticles.push(...items);
  }

  // Show the latest 8 articles by metadata date.
  const recentArticles = [...allArticles]
    .sort((a, b) => {
      const dateA = a.metadata.lastModified || a.metadata.date;
      const dateB = b.metadata.lastModified || b.metadata.date;
      return dateB.localeCompare(dateA);
    })
    .slice(0, 8);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webSite} />
      <JsonLd data={faqData} />
      <div className={`grid min-w-0 grid-cols-1 gap-10 ${hasSidebar ? "lg:grid-cols-[minmax(0,1fr)_300px]" : ""}`}>
        <div className="min-w-0">
          <HomePageClient home={messages.home} locale={locale} articles={allArticles} recentArticles={recentArticles} />
        </div>
        {hasSidebar && <WikiSidebar locale={locale} navGroups={navGroups} />}
      </div>
    </main>
  );
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePageContent locale={locale} />;
}
