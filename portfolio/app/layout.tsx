import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { getDefaultPresentation, profile } from "@/data/profile";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const defaultPresentation = getDefaultPresentation();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.identity.name} \u2014 ${defaultPresentation.headline}`,
    template: `%s \u00b7 ${profile.identity.name}`,
  },
  description: defaultPresentation.bio,
  openGraph: {
    title: `${profile.identity.name} \u2014 ${defaultPresentation.headline}`,
    description: defaultPresentation.bio,
    url: siteUrl,
    siteName: profile.identity.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.identity.name} \u2014 ${defaultPresentation.headline}`,
    description: defaultPresentation.bio,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable}`}
      data-mode="product"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Providers>
          <ScrollProgress />
          <SiteHeader name={profile.identity.name} links={profile.links} />
          <main>{children}</main>
          <SiteFooter name={profile.identity.name} links={profile.links} />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
