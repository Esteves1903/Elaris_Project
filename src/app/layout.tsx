import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elaris",
    template: "%s | Elaris",
  },
  description:
    "Elaris builds modern, responsive websites for small businesses. Website creation, improvement and ongoing support.",
  icons: {
    icon: "/brand/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}