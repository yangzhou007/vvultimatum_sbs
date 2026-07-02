type ActiveCode = {
  code: string;
  reward: string;
};

function getRequiredSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SITE_URL");
  }

  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${value}`);
  }

  return value.replace(/\/+$/, "");
}

export function getRequiredEnv(name: string) {
  if (name === "NEXT_PUBLIC_SITE_URL") return getRequiredSiteUrl();

  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const officialLinks = {
  game: "",
  discord: "",
  youtube: "",
  builder: "",
} as const;

export const SITE_CONFIG = {
  siteUrl: getRequiredSiteUrl(),
  gameName: "Game Wiki",
  siteName: "Game Wiki Template",
  shortName: "Game Wiki",
  logoText: "GW",
  description:
    "Reusable static game wiki template for guides, codes, bosses, maps, tier lists, and progression walkthroughs.",
  defaultTitle: "Game Wiki Template",
  heroImage: "/images/hero.webp",
  trailerThumbnail: "/images/hero-trailer-thumbnail.jpg",
  trailerYoutubeId: "",
  officialLinks,
  activeCodes: [] as ActiveCode[],
  footerGuideLinks: {
    beginnerGuide: "/guide/vv-ultimatum-beginner-guide-2026",
    raceGuides: "/races",
    bossGuides: "/bosses",
    buildGuide: "/guide/VV-Ultimatum-builder",
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
  },
  legalPages: {
    about: {
      title: "About",
      paragraphs: [
        "This repository is a reusable static game wiki template for fan guide sites.",
        "Child sites should replace this template copy, content, images, official links, and analytics configuration in their own repositories.",
      ],
    },
    privacyPolicy: {
      title: "Privacy Policy",
      paragraphs: [
        "This static wiki template does not request account credentials, game passwords, or private payment information.",
        "Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages when a child site enables those services.",
        "External links configured by child sites are governed by their own privacy policies.",
      ],
    },
    termsOfService: {
      title: "Terms of Service",
      paragraphs: [
        "This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.",
        "Game systems, codes, drops, and update details may change without notice. Always verify important information in-game or through official channels.",
        "By using this site, you agree not to misuse it, attempt unauthorized access, or present a fan wiki as an official property unless the child site is actually operated by the rights holder.",
      ],
    },
    copyright: {
      title: "Copyright",
      paragraphs: [
        "Game names, logos, media, and related intellectual property belong to their respective owners.",
        "This template is intended for static guide presentation and must be customized by each child site operator.",
        "If you own rights to content displayed here and have a concern, please contact the site operator for review.",
      ],
    },
  },
} as const;
