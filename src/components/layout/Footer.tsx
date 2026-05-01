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
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Elaris</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
            Digital solutions for growing businesses.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Elaris. All rights reserved.
        </p>
      </div>
    </footer>
  );
}