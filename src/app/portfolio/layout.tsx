import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore real projects built by Helarys — from café websites to sports platforms and barber booking apps. Modern web design in action.",
  alternates: { canonical: "https://helarys.com/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
