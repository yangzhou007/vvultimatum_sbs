import Script from "next/script";
import { ANALYTICS_CONFIG } from "@/config/ads";

export function AnalyticsScripts() {
  const { googleAnalyticsId, microsoftClarityId, googleAdsenseId } = ANALYTICS_CONFIG;

  return (
    <>
      {googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(googleAnalyticsId)});
            `}
          </Script>
        </>
      )}
      {microsoftClarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", ${JSON.stringify(microsoftClarityId)});
          `}
        </Script>
      )}
      {googleAdsenseId && (
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseId}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
