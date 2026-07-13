import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Noto_Serif_Tamil, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSerifTamil = Noto_Serif_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const isTamil = locale === "ta";
  const fontClass = `${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${notoSerifTamil.variable}`;

  return (
    <html
      lang={locale}
      className={`${fontClass} antialiased`}
      data-locale={locale as Locale}
    >
      <body
        className={`min-h-screen bg-neutral-900 ${isTamil ? "font-tamil" : ""}`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative w-full bg-neutral-50">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
