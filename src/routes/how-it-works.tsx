import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Enrolling at Ardent Senior Living" },
      {
        name: "description",
        content:
          "Five gentle steps from first call to ongoing care at Ardent: inquiry, assessment, plan, first day, and continuous communication.",
      },
      { property: "og:title", content: "How It Works — Enrolling at Ardent Senior Living" },
      {
        property: "og:description",
        content: "Five gentle steps from first call to ongoing care at Ardent.",
      },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((q) => ({
            "@type": "Question",
            name: q.q,
            acceptedAnswer: { "@type": "Answer", text: q.a },
          })),
        }),
      },
    ],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  {
    n: "01",
    title: "Inquiry & Consultation",
    body: "Reach us by phone, WhatsApp, or the website. A wellness advisor calls back within one business day to understand your situation.",
  },
  {
    n: "02",
    title: "Assessment & Family Meeting",
    body: "We meet you and your loved one — at our Ikoyi residence or your home — for a clinical and lifestyle assessment.",
  },
  {
    n: "03",
    title: "Customized Care Plan",
    body: "Our clinical lead drafts a written plan covering medical needs, daily routines, meals, and family communication.",
  },
  {
    n: "04",
    title: "Enrollment & First Day",
    body: "We agree the schedule, complete paperwork, and welcome your loved one. The first week includes daily settling-in calls.",
  },
  {
    n: "05",
    title: "Ongoing Care & Communication",
    body: "Weekly written updates, on-demand WhatsApp messages, and quarterly care-plan reviews keep everyone in sync.",
  },
] as const;

const FAQS = [
  {
    q: "What are your operating hours?",
    a: "Our day-care centre is open Monday through Saturday, 8am to 6pm. Overnight respite arrangements are available on request.",
  },
  {
    q: "Do you provide transport to and from home?",
    a: "Yes. We offer safe, assisted door-to-door transport within Lagos at an additional cost, included in many of our care packages.",
  },
  {
    q: "Can my parent join if they have a chronic condition?",
    a: "In most cases, yes. Our clinical team manages conditions like diabetes, hypertension, mild dementia, and post-stroke recovery. Severe acute conditions are referred to hospital partners.",
  },
  {
    q: "How do you communicate with families abroad?",
    a: "Nigeria-based and diaspora families receive a weekly wellness summary, on-demand WhatsApp updates, and scheduled video visits with their loved one.",
  },
  {
    q: "What is the staff-to-resident ratio?",
    a: "We operate at a 1:3 ratio across the day, with at least one registered nurse on the floor at all times.",
  },
  {
    q: "How is pricing structured?",
    a: "Packages are tailored to each resident's clinical and lifestyle needs. We share pricing privately after the initial consultation.",
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            The Journey
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-navy leading-tight text-balance">
            From first call to a meaningful day — in five steps.
          </h1>
          <div className="w-20 h-px bg-brand-gold mx-auto mt-8" />
          <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Choosing day care for a parent is a significant decision. Our process is unhurried,
            transparent, and designed to give families clarity at every stage.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-brand-stone py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l border-brand-gold/40 pl-8 md:pl-12 space-y-12">
            {STEPS.map((step) => (
              <li key={step.n} className="relative">
                <span className="absolute -left-[3.25rem] md:-left-[4rem] top-0 size-12 md:size-14 rounded-full bg-brand-navy text-brand-gold font-serif text-lg md:text-xl flex items-center justify-center">
                  {step.n}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed max-w-xl">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="FAQ" title="Common questions, answered." align="center" />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="border-b border-brand-navy/10"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-brand-navy hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white py-20 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">Start your journey.</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
          Book a private consultation. We'll guide you through every step from here.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-brand-gold text-brand-navy px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          Start Your Journey
        </Link>
      </section>
    </>
  );
}
