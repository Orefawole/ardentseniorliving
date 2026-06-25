import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import { InquiryForm } from "@/components/site/InquiryForm";
import heroPortrait from "@/assets/hero-portrait.jpg";
import serviceWellness from "@/assets/service-wellness.jpg";
import serviceSocial from "@/assets/service-social.jpg";
import serviceClinical from "@/assets/service-clinical.jpg";
import serviceNutrition from "@/assets/service-nutrition.jpg";
import servicePersonal from "@/assets/service-personal.jpg";
import serviceCommunication from "@/assets/service-communication.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ardent Senior Living — Premium Elder Day Care in Ikoyi, Lagos",
      },
      {
        name: "description",
        content:
          "Dignified adult day care, clinical wellness monitoring, and engagement for seniors in Ikoyi, Lagos. Built for Nigerian families at home and abroad.",
      },
      {
        property: "og:title",
        content: "Ardent Senior Living — Premium Elder Day Care in Ikoyi, Lagos",
      },
      {
        property: "og:description",
        content:
          "Dignified adult day care and clinical wellness for seniors in Ikoyi, Lagos.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  {
    title: "Day Care & Companionship",
    blurb:
      "Structured daytime residency with warm meals, gentle activity, and the ease of constant attention.",
    image: servicePersonal,
    alt: "Caregiver assisting an elderly woman along a sunlit veranda",
  },
  {
    title: "Wellness Monitoring",
    blurb:
      "Daily vitals, medication management, and continuous oversight by registered nurses.",
    image: serviceClinical,
    alt: "Nigerian nurse gently checking an elderly patient's blood pressure",
  },
  {
    title: "Active Longevity",
    blurb:
      "Light physiotherapy, mobility coaching, and gentle exercise to keep strength and balance.",
    image: serviceWellness,
    alt: "Group of older adults practicing gentle stretching in a sunlit studio",
  },
  {
    title: "Social & Cultural Engagement",
    blurb:
      "Storytelling circles, art, music and curated luncheons that honour Nigerian heritage.",
    image: serviceSocial,
    alt: "Elderly Nigerian women laughing together in a warm craft room",
  },
  {
    title: "Nutrition & Meal Planning",
    blurb:
      "Chef-prepared meals tailored to dietary needs, served in our communal dining pavilion.",
    image: serviceNutrition,
    alt: "Beautifully plated Nigerian healthy meal on a linen table",
  },
  {
    title: "Family Communication",
    blurb:
      "Regular wellness reports and virtual visits keep Nigeria-based and diaspora families close to home.",
    image: serviceCommunication,
    alt: "Elderly Nigerian woman on a video call with her family",
  },
];

const values = [
  {
    n: "01",
    title: "Clinical Excellence",
    body: "Registered nurses and geriatric advisors on-site every day — never a junior aide alone.",
  },
  {
    n: "02",
    title: "Dignity, Always",
    body: "Care delivered the way you'd want for your own parent. Quiet, respectful, never rushed.",
  },
  {
    n: "03",
    title: "Family at the Centre",
    body: "Daily updates and virtual visits so loved ones in Lagos, London, or Houston stay close.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[80vh] items-center gap-12 px-6 py-16">
          <div className="z-10">
            <span className="text-brand-gold font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">
              Lagos' Premier Wellness Sanctuary
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6 text-brand-navy text-balance">
              Dignified Care for the <span className="italic">Golden Years.</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-lg leading-relaxed">
              Ardent provides premium adult day care in the heart of Ikoyi, offering Nigeria-based and
              diaspora families complete peace of mind through world-class wellness and warm social
              engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-brand-navy text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors text-center"
              >
                Book a Private Tour
              </Link>
              <Link
                to="/services"
                className="border border-brand-navy/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-navy hover:bg-brand-stone transition-colors text-center"
              >
                View Our Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroPortrait}
              alt="Dignified elderly Nigerian gentleman in a sunlit Lagos lounge"
              width={1024}
              height={1280}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand-gold p-8 text-white hidden lg:block">
              <p className="text-3xl font-serif mb-1">24/7</p>
              <p className="text-[10px] uppercase tracking-widest opacity-90">
                Medical Monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-brand-stone py-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-8">
            Trusted by families in London · Houston · Lagos · Toronto
          </p>
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Stat n="1:3" label="Staff Ratio" />
            <Stat n="24/7" label="Nursing Cover" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="What We Offer"
            title="Holistic Wellness Programs"
            intro="From clinical monitoring to social enrichment, every Ardent service is designed for safety, dignity, and meaningful days."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <article key={s.title} className="group">
                <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-brand-stone">
                  <img
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-brand-navy">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{s.blurb}</p>
                <Link
                  to="/services"
                  className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/0 hover:border-brand-gold transition-all"
                >
                  Discover more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-brand-stone py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why Ardent"
            title="The standard of care your parent deserves."
          />
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div key={v.n}>
                <p className="font-serif text-5xl text-brand-gold mb-4">{v.n}</p>
                <h3 className="font-serif text-2xl text-brand-navy mb-3">{v.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="bg-brand-navy py-24 text-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
              Start the Conversation
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Schedule a Private Visit</h2>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Visit our Ikoyi residence, meet the clinical team, and see if Ardent is the right
              place for your loved one. A wellness advisor will call back within one business day.
            </p>
          </div>
          <InquiryForm variant="dark" />
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="font-serif text-4xl md:text-5xl text-brand-navy mb-1">{n}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{label}</p>
    </div>
  );
}
