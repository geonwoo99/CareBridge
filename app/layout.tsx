import type { Metadata } from "next";
import { Gowun_Batang } from "next/font/google";
import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

const serif = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: `${siteConfig.brand} | ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${serif.variable} font-sans min-h-screen bg-background text-foreground antialiased`}>
        <header className="border-b-2 border-primary/20 print:hidden">
          <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-3">
            <Image
              src="/media/logo.png"
              alt="CareBridge Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="font-serif text-xl font-bold text-primary leading-tight">
                {siteConfig.brand}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{siteConfig.tagline}</p>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-8 text-center text-xs text-muted-foreground print:hidden">
          <div className="mx-auto max-w-2xl">
            <p>© 2026 {siteConfig.brand}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
