import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:items-start">
        <div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent select-none">
            Helarys
          </span>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Digital solutions for growing businesses. Websites, improvements and
            ongoing support.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Navigation
          </p>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>
          <a
            href="mailto:contact@helarys.com"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <Mail className="h-4 w-4 text-cyan-400" />
            contact@helarys.com
          </a>

        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Helarys. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
