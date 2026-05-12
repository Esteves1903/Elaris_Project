import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website creation, improvement and ongoing support for small businesses. Modern, responsive and professionally built.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
