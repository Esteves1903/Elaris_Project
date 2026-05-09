import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { IntroAnimation } from "@/components/ui/IntroAnimation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StickyQuoteCTA } from "@/components/ui/StickyQuoteCTA";
import { AIAssistant } from "@/components/ui/AIAssistant";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elaris.com"),
  title: {
    default: "Elaris",
    template: "%s | Elaris",
  },
  description:
    "Elaris builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
  icons: {
    icon: "/brand/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Elaris",
    title: "Elaris — Websites for growing businesses",
    description:
      "Elaris builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elaris — Websites for growing businesses",
    description:
      "Elaris builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Elaris",
  description: "Elaris builds modern, responsive websites for growing businesses.",
  url: "https://elaris.com",
  email: "contact@elaris.com",
  areaServed: ["Portugal", "International"],
  serviceType: ["Web Design", "Web Development", "Website Maintenance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={geist.className}>
        <ScrollProgress />
        <StickyQuoteCTA />
        <AIAssistant />
        <IntroAnimation />
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}