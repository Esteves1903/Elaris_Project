import Link from "next/link";
import { UserCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-3 items-center px-6">
        <Link href="/" className="flex items-center justify-self-start">
          <img
            src="/brand/logo-horizontal-transparent.svg"
            alt="Elaris"
            className="h-10 w-auto object-contain shrink-0"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <Link
            href="/client-area"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
          >
            <UserCircle className="h-4 w-4 text-cyan-400" />
            Client Area
          </Link>

          <Link
            href="/contact"
            className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
