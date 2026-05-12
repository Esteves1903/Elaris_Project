import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind Helarys — a small studio building modern websites for growing businesses.",
};

export default function AboutPage() {
  return <AboutContent />;
}
