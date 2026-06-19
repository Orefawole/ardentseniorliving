import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import serviceWellness from "@/assets/service-wellness.jpg";
import serviceSocial from "@/assets/service-social.jpg";
import serviceClinical from "@/assets/service-clinical.jpg";
import serviceNutrition from "@/assets/service-nutrition.jpg";
import servicePersonal from "@/assets/service-personal.jpg";
import serviceCommunication from "@/assets/service-communication.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Day Care, Wellness & Engagement | Ardent" },
      {
        name: "description",
        content:
          "Detailed services at Ardent: day care, wellness monitoring, personal care, engagement, nutrition, and family communication for seniors in Ikoyi, Lagos.",
      },
      {
        property: "og:title",
        content: "Services — Day Care, Wellness & Engagement | Ardent",
      },
      {
        property: "og:description",
        content:
          "Day care, wellness monitoring, personal care, engagement, nutrition, and family communication for seniors in Lagos.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "Adult Day Care",
    image: servicePersonal,
    alt: "Caregiver assisting an elderly woman on a sunlit veranda",
    desc: "A structured daytime residency: arrival from 8am, supervised activity, three chef-prepared meals, and safe return home in the evening.",
    items: [
      "Door-to-door transport on request",
      "Two snacks and a hot lunch",
      "Quiet rest periods in private rooms",
      "Daily progress note delivered to family",
    ],
  },
  {
    title: "Wellness Monitoring",
    image: serviceClinical,
    alt: "Nigerian nurse checking an elderly patient's blood pressure",
    desc: "Continuous clinical oversight by registered nurses with consultant geriatric review.",
    items: [
      "Daily vitals (BP, glucose, SpO₂, pulse)",
      "Medication scheduling and adherence",
      "Monthly geriatric consult included",
      "Coordination with your existing physicians",
    ],
  },
  {
    title: "Personal Care Support",
    image: servicePersonal,
    alt: "Personal care assistance on a residence veranda",
    desc: "Dignified, trained assistance with the activities of daily living — never rushed, always private.",
    items: [
      "Bathing, grooming, and dressing",
      "Mobility and transfer support",
      "Continence care with discretion",
      "Skin and pressure-care protocols",
    ],
  },
  {
    title: "Engagement & Activities",
    image: serviceSocial,
    alt: "Older women laughing together in a craft room",
    desc: "A curated daily programme that keeps minds sharp, bodies moving, and spirits warm.",
    items: [
      "Storytelling circles and Yoruba/Igbo language sessions",
      "Light yoga, chair fitness, and physiotherapy",
      "Arts, music therapy, and faith-based programmes",
      "Weekly outings within Ikoyi",
    ],
  },
  {
    title: "Nutrition & Meal Planning",
    image: serviceNutrition,
    alt: "Healthy Nigerian meal of steamed rice, vegetable stew, grilled fish, and soft plantain on a linen table",
    desc: "Menus designed by a clinical nutritionist around each resident's medical and cultural needs.",
    items: [
      "Diabetic, low-sodium, and renal options",
      "Familiar Nigerian dishes, expertly portioned",
      "Hydration tracking through the day",
      "Family-style communal dining",
    ],
  },
  {
    title: "Family Communication",
    image: serviceCommunication,
    alt: "Elderly woman on a video call with her daughter and son on a tablet",
    desc: "Built for diaspora families — you stay close, even from London or Houston.",
    items: [
      "Weekly written wellness summary",
      "On-demand WhatsApp updates",
      "Scheduled video visits with your loved one",
      "Quarterly care-plan review with the clinical lead",
    ],
  },
] as const;

const wellnessImage = serviceWellness; // referenced below in promo strip

function ServicesPage() {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            The Center
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-navy leading-tight text-balance">
            Six services. One promise: a meaningful day, every day.
          </h1>
          <div className="w-20 h-px bg-brand-gold mx-auto mt-8" />
          <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Each Ardent service is included in our day-care programme. We tailor the mix to your
            loved one's medical needs and the rhythm they enjoy.
          </p>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.title}
          className={i % 2 === 0 ? "bg-brand-stone py-24 px-6" : "py-24 px-6"}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className={i % 2 === 0 ? "" : "md:order-2"}>
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-5xl text-brand-gold mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-4">{s.title}</h2>
              <p className="text-stone-600 leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-sm text-stone-700">
                    <span className="text-brand-gold mt-0.5">◆</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Promo / closing */}
      <section
        className="relative px-6 py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${wellnessImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            Pricing & Enrollment
          </p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            Tailored packages for every family.
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            We share pricing privately after an initial consultation, so we can match your loved
            one's needs to the right level of care.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-brand-gold text-brand-navy px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
