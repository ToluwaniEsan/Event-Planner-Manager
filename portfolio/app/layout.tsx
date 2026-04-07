import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { profile } from "@/data/profile";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "@/components/Providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.identity.name} — ${profile.identity.headline}`,
    template: `%s · ${profile.identity.name}`,
  },
  description: profile.identity.bio,
  openGraph: {
    title: `${profile.identity.name} — ${profile.identity.headline}`,
    description: profile.identity.bio,
    url: siteUrl,
    siteName: profile.identity.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.identity.name} — ${profile.identity.headline}`,
    description: profile.identity.bio,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <SiteHeader name={profile.identity.name} links={profile.links} />
          <main>{children}</main>
          <SiteFooter name={profile.identity.name} links={profile.links} />
        </Providers>
      </body>
    </html>
  );
}
