import { LegalPage } from "@/components/legal-page";
import { SITE_CONFIG } from "@/config/site";

export default function TermsOfServicePage() {
  const page = SITE_CONFIG.legalPages.termsOfService;

  return (
    <LegalPage title={page.title}>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </LegalPage>
  );
}
