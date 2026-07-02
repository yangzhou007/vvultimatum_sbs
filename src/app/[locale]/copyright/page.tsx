import { LegalPage } from "@/components/legal-page";
import { SITE_CONFIG } from "@/config/site";

export default function CopyrightPage() {
  const page = SITE_CONFIG.legalPages.copyright;

  return (
    <LegalPage title={page.title}>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </LegalPage>
  );
}
