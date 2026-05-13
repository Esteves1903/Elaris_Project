import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the people behind Helarys — a web studio from Portugal building modern, high-performance websites for small businesses worldwide.",
  alternates: { canonical: "https://helarys.com/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
