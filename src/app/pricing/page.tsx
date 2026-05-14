import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for professional websites in Portugal. Three plans from €799 — no hidden fees, no subscriptions, you own everything.",
  alternates: { canonical: "https://helarys.com/pricing" },
};

export default function PricingPage() {
  return <PricingContent />;
}
