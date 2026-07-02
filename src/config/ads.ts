function optionalPublicEnv(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "0") return undefined;
  return trimmed;
}

function optionalAdsterraKey(value: string | undefined) {
  const trimmed = optionalPublicEnv(value);
  if (!trimmed || !isLikelyAdsterraKey(trimmed)) return undefined;
  return trimmed;
}

export function isLikelyAdsterraKey(value: string | undefined): value is string {
  if (!value || value === "0") return false;
  return /^[a-f0-9]{32}$/i.test(value);
}

export const ANALYTICS_CONFIG = {
  googleAnalyticsId: optionalPublicEnv(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID),
  microsoftClarityId: optionalPublicEnv(process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID),
  googleAdsenseId: optionalPublicEnv(process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID),
} as const;

export const AD_CONFIG = {
  mobile320x50: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_MOBILE_320X50),
  banner728x90: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_BANNER_728X90),
  banner300x250: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_BANNER_300X250),
  banner468x60: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_BANNER_468X60),
  sidebar160x600: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600),
  sidebar160x300: optionalAdsterraKey(process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300),
} as const;

export type AdSlot = keyof typeof AD_CONFIG;
