import type { Metadata } from "next";
import Link from "next/link";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, localizeHref } from "@/components/site";
import { CONTENT_TYPES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { getAllContent } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import en from "@/locales/en.json";

type Messages = typeof en;

export const metadata: Metadata = {
  title: `HTML Sitemap — ${SITE_CONFIG.siteName}`,
  description: `Browse all public pages on ${SITE_CONFIG.siteName}.`,
};

const STATIC_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Copyright", href: "/copyright" },
  { label: "XML Sitemap", href: "/sitemap.xml" },
] as const;

function contentTypeLabel(contentType: string, messages: Messages) {
  if (contentType === "tier-list") return messages.nav.tierList;
  if (contentType === "guide") return messages.nav.guides;

  const value = (messages.nav as unknown as Record<string, string>)[contentType];
  return value || contentType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function HtmlSitemapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages({ locale })) as Messages;

  const groups = await Promise.all(
    CONTENT_TYPES.map(async (contentType) => ({
      contentType,
      label: contentTypeLabel(contentType, messages),
      items: await getAllContent(contentType, locale),
    })),
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: messages.shared.home, href: localizeHref("/", locale) }, { label: "HTML Sitemap" }]} />
      <h1 className="break-words text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">HTML Sitemap</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        Browse the static pages, guide categories, and MDX articles exported by this site.
      </p>

      <section className="mt-10 rounded-2xl border border-border bg-card/70 p-6">
        <h2 className="text-xl font-bold text-foreground">Core Pages</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {STATIC_LINKS.map((item) => (
            <li key={item.href}>
              <Link className="text-sm font-semibold text-[hsl(var(--nav-theme))] hover:underline" href={item.href.endsWith(".xml") ? item.href : localizeHref(item.href, locale)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.contentType} className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-bold text-foreground">
              <Link className="hover:text-[hsl(var(--nav-theme))]" href={localizeHref(`/${group.contentType}`, locale)}>
                {group.label}
              </Link>
            </h2>
            {group.items.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={`${group.contentType}/${item.slug}`}>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href={localizeHref(`/${group.contentType}/${item.slug}`, locale)}>
                      {item.metadata.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">{messages.shared.noGuidesAvailable}</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
