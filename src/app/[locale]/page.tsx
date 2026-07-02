import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { JsonLd, WikiSidebar } from "@/components/site";
import { getAllContent, getDynamicNavigation, type ContentItem, CONTENT_TYPES } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vvultimatum.sbs";

type Messages = typeof en;

export async function generateHomeMetadata(locale: string): Promise<Metadata> {
  setRequestLocale(locale);
  const messages = (await getMessages({ locale })) as Messages;
  return {
    title: messages.home.meta.title,
    description: messages.home.meta.description,
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/" } },
    openGraph: { title: messages.home.meta.title, description: messages.home.meta.description, url: siteUrl, images: [`${siteUrl}/images/hero.webp`] },
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
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: "VV Ultimatum Wiki", url: siteUrl, description: messages.home.meta.description };

  // 动态加载所有 content 目录下的文章
  const allArticles: ContentItem[] = [];
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, loc);
    allArticles.push(...items);
  }

  // 取最近更新的 8 篇文章（按 date 倒序）
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
      <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <HomePageClient home={messages.home} locale={locale} articles={allArticles} recentArticles={recentArticles} />
        </div>
        <WikiSidebar locale={locale} navGroups={navGroups} />
      </div>
    </main>
  );
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePageContent locale={locale} />;
}
