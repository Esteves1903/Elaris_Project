import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and we will prepare a custom quote based on your goals and features.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
