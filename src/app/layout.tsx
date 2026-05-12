import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { IntroAnimation } from "@/components/ui/IntroAnimation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AIAssistant } from "@/components/ui/AIAssistant";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://helarys.com"),
  title: {
    default: "Helarys",
    template: "%s | Helarys",
  },
  description:
    "Helarys builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
  icons: {
    icon: "/brand/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Helarys",
    title: "Helarys — Websites for growing businesses",
    description:
      "Helarys builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helarys — Websites for growing businesses",
    description:
      "Helarys builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Helarys",
  description: "Helarys builds modern, responsive websites for growing businesses.",
  url: "https://helarys.com",
  email: "contact@helarys.com",
  areaServed: ["Portugal", "International"],
  serviceType: ["Web Design", "Web Development", "Website Maintenance"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={geist.className}>
        <ScrollProgress />
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