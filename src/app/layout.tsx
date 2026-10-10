import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/data/site";
import "./globals.css";

// Set only in Netlify's production environment, so dev and preview builds don't send stats.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: `Portfolio of ${site.name}, ${site.title}.`,
  // Images come from the opengraph-image files; X falls back to og:image.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SkipLink />
        <Sidebar />
        <MobileNav />
        <div className="lg:pl-60">
          <main
            id="main"
            tabIndex={-1}
            // box-content: the 760px cap is the text column, not including padding.
            className="mx-auto box-content max-w-190 px-5 py-12 outline-none lg:px-16 lg:py-22"
          >
            {children}
          </main>
        </div>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
