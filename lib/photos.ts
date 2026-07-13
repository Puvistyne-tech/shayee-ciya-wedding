const PHOTOS_DIR = "/assets/photos";

/** Primary path — tries .jpg first; FlexiblePhoto falls back to .jpeg automatically */
export function photoPath(name: string): string {
  return `${PHOTOS_DIR}/${name}.jpg`;
}

export function alternatePhotoSrc(src: string): string | null {
  if (/\.jpe?g$/i.test(src)) {
    return src.endsWith(".jpeg")
      ? src.replace(/\.jpeg$/i, ".jpg")
      : src.replace(/\.jpg$/i, ".jpeg");
  }
  return null;
}

export const PHOTO_PATHS = {
  /** Small round portraits in the invitation header */
  groom: photoPath("groom"),
  bride: photoPath("bride"),
  coupleHero: photoPath("couple-hero"),

  /** Background for the Two Hearts, One Love section heading */
  momentsBackground: photoPath("couple-hero-2"),

  gallery: [
    photoPath("gallery-1"),
    photoPath("gallery-2"),
    photoPath("gallery-3"),
    photoPath("gallery-4"),
    photoPath("gallery-5"),
    photoPath("gallery-6"),
  ],
} as const;
