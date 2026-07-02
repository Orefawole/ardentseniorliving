import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "The Center" },
  { to: "/activities", label: "Activities" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-brand-navy/5">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col leading-none" aria-label="Ardent Senior Living home">
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-navy">
            ARDENT
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mt-0.5">
            Senior Living
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-brand-navy">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-brand-gold transition-colors"
              activeProps={{ className: "text-brand-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-block bg-brand-navy text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold transition-colors"
          >
            Inquire Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-brand-navy"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-brand-navy/5 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider font-medium text-brand-navy hover:text-brand-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="sm:hidden mt-2 bg-brand-navy text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-center"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
