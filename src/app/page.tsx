import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Helarys — Websites for growing businesses",
  description:
    "Helarys helps small businesses grow online with modern websites, digital tools and a clear development process.",
};

export default function Home() {
  return <HomeContent />;
}
