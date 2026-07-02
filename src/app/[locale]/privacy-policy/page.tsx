import { LegalPage } from "@/components/legal-page";
import { SITE_CONFIG } from "@/config/site";

export default function PrivacyPolicyPage() {
  const page = SITE_CONFIG.legalPages.privacyPolicy;

  return (
    <LegalPage title={page.title}>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </LegalPage>
  );
}
