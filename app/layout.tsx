import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sayeethan & Prasanciya — Wedding Invitation",
  description:
    "Join us in celebrating our wedding on September 6th, 2026 at Palais du Grand Paris, Champigny Sur Marne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} antialiased`}
    >
      <body className="min-h-screen bg-neutral-900">
        <div className="relative w-full bg-neutral-50">
          {children}
        </div>
      </body>
    </html>
  );
}
