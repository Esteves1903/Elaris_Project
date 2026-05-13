import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Helarys — Websites for growing businesses",
  description:
    "Helarys builds custom websites for small businesses. Modern design, fast delivery and ongoing support — helping your business grow online.",
  alternates: { canonical: "https://helarys.com" },
};

export default function Home() {
  return <HomeContent />;
}
