// TODO: Replace placeholder address, email, and embedded map with real Ardent details.
import { createFileRoute } from "@tanstack/react-router";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book a Visit — Ardent Senior Living, Ikoyi" },
      {
        name: "description",
        content:
          "Book a visit to Ardent in Ikoyi, Lagos. Call +234 811 401 8598, message us on WhatsApp, or submit an inquiry online.",
      },
      {
        property: "og:title",
        content: "Contact & Book a Visit — Ardent Senior Living",
      },
      {
        property: "og:description",
        content: "Book a private visit to Ardent in Ikoyi, Lagos.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            Book a Visit
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-navy leading-tight text-balance">
            Come visit us in Ikoyi.
          </h1>
          <div className="w-20 h-px bg-brand-gold mx-auto mt-8" />
          <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Walk through the residence, meet our clinical team, and ask the questions that matter
            most. Tours are private and unhurried.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Info side */}
          <div className="space-y-10">
            <ContactItem
              icon={<MapPin size={18} />}
              label="Visit"
              lines={["Ikoyi, Lagos", "Nigeria"]}
            />
            <ContactItem
              icon={<Clock size={18} />}
              label="Hours"
              lines={["Mon – Sat · 8am – 6pm", "Sunday by appointment"]}
            />
            <ContactItem
              icon={<Phone size={18} />}
              label="Call"
              lines={[
                <a key="p" href="tel:+2348114018598" className="hover:text-brand-gold">
                  +234 811 401 8598
                </a>,
              ]}
            />
            <ContactItem
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              lines={[
                <a
                  key="w"
                  href="https://wa.me/2348114018598"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-brand-gold"
                >
                  Chat with us instantly
                </a>,
              ]}
            />
            <ContactItem
              icon={<Mail size={18} />}
              label="Email"
              lines={[
                <a key="e" href="mailto:care@ardentliving.com" className="hover:text-brand-gold">
                  care@ardentliving.com
                </a>,
              ]}
            />

            <div className="w-full aspect-[4/3] overflow-hidden border border-brand-navy/10">
              <iframe
                title="Ardent location in Ikoyi, Lagos"
                src="https://www.google.com/maps?q=Glover+Road,+Ikoyi,+Lagos,+Nigeria&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form side */}
          <div className="bg-brand-stone p-8 md:p-12 border border-brand-navy/5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
              Inquiry Form
            </p>
            <h2 className="font-serif text-3xl text-brand-navy mb-2">Send us a message</h2>
            <p className="text-sm text-stone-600 mb-8">
              We respond to every inquiry within one business day.
            </p>
            <InquiryForm variant="light" />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  lines,
}: {
  icon: React.ReactNode;
  label: string;
  lines: React.ReactNode[];
}) {
  return (
    <div className="flex gap-4">
      <span className="size-10 shrink-0 bg-brand-navy text-brand-gold flex items-center justify-center">
        {icon}
      </span>
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2">
          {label}
        </p>
        <div className="text-stone-700 text-sm space-y-1">
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
