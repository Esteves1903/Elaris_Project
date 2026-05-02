import Link from "next/link";

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
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Elaris</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
            Digital solutions for growing businesses.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
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
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Elaris. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
