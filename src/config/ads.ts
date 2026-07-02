function optionalPublicEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value || value === "0") return undefined;
  return value;
}

export const ANALYTICS_CONFIG = {
  googleAnalyticsId: optionalPublicEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"),
  microsoftClarityId: optionalPublicEnv("NEXT_PUBLIC_MICROSOFT_CLARITY_ID"),
  googleAdsenseId: optionalPublicEnv("NEXT_PUBLIC_GOOGLE_ADSENSE_ID"),
} as const;

export const AD_CONFIG = {
  mobile320x50: optionalPublicEnv("NEXT_PUBLIC_AD_MOBILE_320X50"),
  banner728x90: optionalPublicEnv("NEXT_PUBLIC_AD_BANNER_728X90"),
  banner300x250: optionalPublicEnv("NEXT_PUBLIC_AD_BANNER_300X250"),
  banner468x60: optionalPublicEnv("NEXT_PUBLIC_AD_BANNER_468X60"),
  sidebar160x600: optionalPublicEnv("NEXT_PUBLIC_AD_SIDEBAR_160X600"),
  sidebar160x300: optionalPublicEnv("NEXT_PUBLIC_AD_SIDEBAR_160X300"),
} as const;

export type AdSlot = keyof typeof AD_CONFIG;

export function isLikelyAdsterraKey(value: string | undefined): value is string {
  return Boolean(value && /^[a-f0-9]{32}$/i.test(value));
}
