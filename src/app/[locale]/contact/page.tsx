import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE_CONFIG.siteName}`,
  description: `Contact details for ${SITE_CONFIG.siteName}.`,
};

export default function ContactPage() {
  const page = SITE_CONFIG.legalPages.contact;

  return (
    <LegalPage title={page.title}>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {SITE_CONFIG.contactEmail ? (
        <p>
          Email: <Link className="font-semibold text-[hsl(var(--nav-theme))]" href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</Link>
        </p>
      ) : (
        <p className="rounded-xl border border-border bg-muted p-4 text-sm">
          No contact email is configured in this mother template. Set <code>SITE_CONFIG.contactEmail</code> in the child site before launch.
        </p>
      )}
    </LegalPage>
  );
}
