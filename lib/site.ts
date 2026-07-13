/** Public path for link-preview image (Open Graph / WhatsApp / iMessage). */
export const OG_IMAGE_PATH = "/assets/cover.png";

export const OG_IMAGE_WIDTH = 4640;
export const OG_IMAGE_HEIGHT = 6960;

export const DEFAULT_SITE_URL = "https://sayeeciya.netlify.app";

/** Resolves the canonical site URL for absolute OG/Twitter image links. */
export function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.URL) {
    return new URL(process.env.URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.NODE_ENV === "production") {
    return new URL(DEFAULT_SITE_URL);
  }

  return new URL("http://localhost:3000");
}
