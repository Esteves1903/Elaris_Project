import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design and development services for small businesses: new websites, redesigns, maintenance plans and client portals — all built by Helarys.",
  alternates: { canonical: "https://helarys.com/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
