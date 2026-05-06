import Link from "next/link";
import { Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:items-start">
        <div>
          <img
            src="/brand/logo-horizontal-transparent.svg"
            alt="Elaris"
            className="h-9 w-auto"
          />
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
            href="mailto:contact@elaris.com"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <Mail className="h-4 w-4 text-cyan-400" />
            contact@elaris.com
          </a>

          <div className="mt-2 flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-zinc-500 transition hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-zinc-500 transition hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Elaris. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
