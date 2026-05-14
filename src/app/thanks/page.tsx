import type { Metadata } from "next";
import { ThanksContent } from "./ThanksContent";

export const metadata: Metadata = {
  title: "Request sent",
  description: "Your request has been received. The Helarys team will get back to you within 24 hours.",
  robots: { index: false },
};

export default function ThanksPage() {
  return <ThanksContent />;
}
