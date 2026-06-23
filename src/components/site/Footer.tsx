// TODO: Replace placeholder address / email / hours with the real Ardent details.
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-white border-t border-brand-navy/10 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <p className="font-serif text-xl font-bold text-brand-navy">Ardent Senior Living Ltd</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mt-1">
            LAGOS ·
          </p>
          <p className="text-xs text-stone-500 mt-6 max-w-xs leading-relaxed">
            Premium elderly wellness and adult day care in the heart of Ikoyi — built for Nigerian
            families at home and abroad.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-navy">
            Visit
          </p>
          <address className="not-italic text-sm text-stone-600 leading-relaxed">
            Ikoyi, Lagos
            <br />
            Nigeria
          </address>
          <p className="text-xs text-stone-500 mt-4">Mon – Sat · 8am – 6pm</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-navy">
            Contact
          </p>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>
              <a href="tel:+2348114018598" className="hover:text-brand-gold">
                +234 811 401 8598
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/2348114018598"
                target="_blank"
                rel="noopener"
                className="hover:text-brand-gold"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:care@ardentliving.com" className="hover:text-brand-gold">
                care@ardentliving.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-navy">
            Explore
          </p>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>
              <Link to="/about" className="hover:text-brand-gold">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-gold">
                Services
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="hover:text-brand-gold">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-gold">
                Book a Visit
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-navy/5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Ardent Senior Living Ltd. All rights reserved.
        </p>
        <p className="text-[10px] text-stone-400 uppercase tracking-widest">
          Registered in Nigeria
        </p>
      </div>
    </footer>
  );
}
