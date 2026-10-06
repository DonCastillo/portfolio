import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Don Castillo · Full Stack Software Engineer",
  description: "Portfolio of Don Castillo, Full Stack Software Engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Sidebar />
        <MobileNav />
        <div className="lg:pl-60">
          <main className="max-w-252 px-5 py-12 lg:px-16 lg:py-22">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
