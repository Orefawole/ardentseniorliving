import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import facility from "@/assets/facility-interior.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ardent — Our Mission for Nigerian Seniors" },
      {
        name: "description",
        content:
          "Why Ardent exists: our mission, our team, and our promise to families who entrust us with their parents in Lagos.",
      },
      {
        property: "og:title",
        content: "About Ardent — Our Mission for Nigerian Seniors",
      },
      {
        property: "og:description",
        content:
          "Why Ardent exists: our mission, our team, and our promise to families in Lagos.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            About Ardent
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-navy leading-tight text-balance">
            Care built on the values we hold for our own parents.
          </h1>
          <div className="w-20 h-px bg-brand-gold mx-auto mt-8" />
          <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Ardent Senior Living was founded to bring world-class day care, clinical oversight, and
            warmth to seniors across Lagos — and peace of mind to the families who love them.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-brand-stone py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-6">
              To honour the elders who built us with care that's clinically excellent and deeply
              human.
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Every routine, meal, and consultation at Ardent is designed around dignity. We don't
              run a facility — we run a residence where Nigerian seniors are seen, heard, and
              tended to as family.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
              Our Vision
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-6">
              A new standard for elder care in West Africa.
            </h2>
            <p className="text-stone-600 leading-relaxed">
              We believe ageing well at home should not depend on a relative being constantly
              available. Ardent gives families a trustworthy, professional partner so loved ones can
              flourish at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img
            src={facility}
            alt="Sunlit interior lounge of the Ardent residence in Ikoyi"
            loading="lazy"
            width={1536}
            height={1024}
            className="w-full aspect-[4/3] object-cover"
          />
          <div>
            <SectionHeader eyebrow="Our Story" title="Born from a daughter's question." />
            <p className="text-stone-600 leading-relaxed mb-4">
              Ardent began with a simple, painful question asked by a Lagos-born professional living
              abroad: <em>"Who will look after my mother during the day?"</em>
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              In 2012, our founders opened a small Ikoyi residence with three registered nurses and
              a promise: combine the standards of international geriatric medicine with the warmth
              of a Nigerian home.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Today Ardent serves over 200 families in Lagos and abroad — and that founding promise
              still shapes everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-navy text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Our Values"
            title={
              <span className="text-white">What we will not compromise on.</span>
            }
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                t: "Safety, without exception",
                b: "Trained clinicians, vetted staff, and infection-control protocols on every shift.",
              },
              {
                t: "Family involvement",
                b: "Care plans designed with you. Regular updates wherever in the world you are.",
              },
              {
                t: "Cultural warmth",
                b: "Food, music, stories, and faith that feel like home — not a foreign institution.",
              },
            ].map((v) => (
              <div key={v.t}>
                <div className="w-10 h-px bg-brand-gold mb-6" />
                <h3 className="font-serif text-2xl mb-3">{v.t}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 px-6 bg-brand-stone">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            Credentials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-10 max-w-2xl mx-auto">
            Held to the standards families expect — and a few they don't.
          </h2>
          <div className="flex flex-col items-center gap-4 text-stone-500">
            <span className="font-serif italic text-lg">Lagos State Health Council</span>
            <span className="font-serif italic text-lg">Nigerian Medical Association</span>
            <span className="font-serif italic text-lg">Geriatric Care Standards 2026</span>
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/contact"
              className="bg-brand-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors"
            >
              Visit Our Residence
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
