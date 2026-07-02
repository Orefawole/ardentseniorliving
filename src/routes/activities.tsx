import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities & Daily Life — Ardent Senior Living" },
      {
        name: "description",
        content:
          "A sample day and full Week 1 programme at Ardent Senior Living in Ikoyi, Lagos — plus our meal philosophy, excursion safety, and climate care.",
      },
      { property: "og:title", content: "Activities & Daily Life — Ardent Senior Living" },
      {
        property: "og:description",
        content:
          "A sample day and full Week 1 programme at Ardent Senior Living in Ikoyi, Lagos.",
      },
      { property: "og:url", content: "https://ardentlivinglagos.com/activities" },
    ],
    links: [{ rel: "canonical", href: "https://ardentlivinglagos.com/activities" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Schedule",
          name: "Ardent Senior Living — Sample Daily Schedule",
          scheduleTimezone: "Africa/Lagos",
          repeatFrequency: "P1D",
          byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          startTime: "08:00",
          endTime: "19:00",
          description:
            "Daily structure for Ardent's Ikoyi day programme: arrival, breakfast, gentle movement, activities, meals, rest, crafts and pick-up.",
        }),
      },
    ],
  }),
  component: ActivitiesPage,
});

const DAILY = [
  ["8:00 – 9:00 AM", "Arrival & Welcome"],
  ["9:00 – 9:30 AM", "Coffee / Tea & Light Breakfast"],
  ["9:30 – 9:50 AM", "Daily Announcements & News of the Day"],
  ["9:50 – 10:20 AM", "Morning Stretch & Light Movement"],
  ["10:20 – 11:30 AM", "Morning Activity"],
  ["11:30 AM – 12:30 PM", "Midday Meal"],
  ["12:30 – 1:30 PM", "Quiet Time / Rest"],
  ["1:30 – 4:15 PM", "Afternoon Activities, Movie & Crafts"],
  ["4:15 – 4:45 PM", "Late Afternoon Stretch & Relaxation"],
  ["5:00 – 6:00 PM", "Light Supper"],
  ["6:00 – 7:00 PM", "Wind-Down & Client Pick-Up"],
] as const;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

// Week 1 — Theme: "Culture & Community"
// Rows: [time, mon, tue, wed, thu, fri]; meal rows flagged with isMeal for italic styling.
type Row = {
  time: string;
  values: readonly [string, string, string, string, string];
  isMeal?: boolean;
};

const WEEK1: readonly Row[] = [
  {
    time: "8:00 – 9:00 AM",
    values: [
      "Arrival & Welcome",
      "Arrival & Welcome",
      "Arrival & Welcome",
      "Arrival & Welcome",
      "Arrival & Welcome",
    ],
  },
  {
    time: "9:00 – 9:30 AM",
    isMeal: true,
    values: [
      "Oat porridge with evaporated milk & banana; Zobo drink",
      "Bean cakes (akara), boiled plantain, tea",
      "Steamed bean pudding, soft-boiled egg, corn pap or Milo",
      "Bread & butter, fried egg, Milo or tea",
      "Corn pap with honey, groundnut cake, tea",
    ],
  },
  {
    time: "9:30 – 9:50 AM",
    values: [
      "Daily Announcements & News of the Day",
      "Daily Announcements & News of the Day",
      "Daily Announcements & News of the Day",
      "Daily Announcements & News of the Day",
      "Daily Announcements & News of the Day",
    ],
  },
  {
    time: "9:50 – 10:20 AM",
    values: [
      "Morning Stretch & Light Movement",
      "Morning Stretch & Light Movement",
      "Morning Stretch & Light Movement",
      "Morning Stretch & Light Movement",
      "Morning Stretch & Light Movement",
    ],
  },
  {
    time: "10:20 – 11:00 AM",
    values: [
      "Highlife Music Listening & Appreciation Circle",
      "Memory & Reminiscence Cards",
      "Gentle Seated Yoga",
      "Inspirational Poetry & Spoken Word",
      "Storytelling: Memories of Lagos in the 60s & 70s",
    ],
  },
  {
    time: "11:00 – 11:30 AM",
    values: [
      "Free Socialization / Rest",
      "Free Socialization / Rest",
      "Free Socialization / Rest",
      "Free Socialization / Rest",
      "Free Socialization / Rest",
    ],
  },
  {
    time: "11:30 AM – 12:30 PM",
    isMeal: true,
    values: [
      "Vegetable soup with soft swallow & stewed fish",
      "Bitter leaf soup with pounded yam & turkey",
      "Vegetable rice with grilled chicken & coleslaw",
      "Melon seed soup with semolina & minced meat",
      "Mixed vegetable soup with pounded yam & assorted fish",
    ],
  },
  {
    time: "12:30 – 1:30 PM",
    values: [
      "Quiet Time / Rest / Light Reading",
      "Quiet Time / Rest / Light Reading",
      "Quiet Time / Rest / Light Reading",
      "Quiet Time / Rest / Light Reading",
      "Quiet Time / Rest / Light Reading",
    ],
  },
  {
    time: "1:30 – 2:30 PM",
    values: [
      "Beadwork & Jewelry Making",
      "Word & Number Puzzles",
      "Excursion: Pool Session (leisure centre)",
      "Cooking Demo: Puff-Puff & Biscuits",
      "Painting & Watercolours",
    ],
  },
  {
    time: "2:30 – 3:00 PM",
    values: [
      "Movie / Documentary Time",
      "Movie / Documentary Time",
      "Movie / Documentary Time",
      "Movie / Documentary Time",
      "Movie / Documentary Time",
    ],
  },
  {
    time: "3:00 – 3:30 PM",
    values: [
      "Small Group Discussion / Reminiscing",
      "Small Group Discussion / Reminiscing",
      "Small Group Discussion / Reminiscing",
      "Small Group Discussion / Reminiscing",
      "Small Group Discussion / Reminiscing",
    ],
  },
  {
    time: "3:30 – 4:15 PM",
    values: [
      "Crafts / Creative Activity",
      "Crafts / Creative Activity",
      "Crafts / Creative Activity",
      "Crafts / Creative Activity",
      "Crafts / Creative Activity",
    ],
  },
  {
    time: "4:15 – 4:45 PM",
    values: [
      "Late Afternoon Stretch / Relaxation",
      "Late Afternoon Stretch / Relaxation",
      "Late Afternoon Stretch / Relaxation",
      "Late Afternoon Stretch / Relaxation",
      "Late Afternoon Stretch / Relaxation",
    ],
  },
  {
    time: "5:00 – 6:00 PM",
    isMeal: true,
    values: [
      "Soft noodles with diced vegetables & egg; warm Milo",
      "Yam porridge with smoked fish & spinach",
      "Bread & bean stew; warm tea",
      "Soft yam swallow with bean & vegetable soup",
      "Mild fried rice & coleslaw; fruit juice",
    ],
  },
  {
    time: "6:00 – 7:00 PM",
    values: [
      "Wind-Down & Pick-Up Time",
      "Wind-Down & Pick-Up Time",
      "Wind-Down & Pick-Up Time",
      "Wind-Down & Pick-Up Time",
      "Wind-Down & Pick-Up Time",
    ],
  },
];

const SAFETY = [
  {
    icon: "🍽",
    title: "Meal Philosophy",
    body: "Every meal is prepared with senior dietary needs in mind: soft textures, moderate salt and pepper, low oil, and the familiar Lagos and South-West Nigerian flavours our residents know. Diabetic- and hypertension-friendly adjustments are made per each individual care plan, and clients with swallowing difficulties receive modified textures under care-staff direction.",
  },
  {
    icon: "⛵",
    title: "Excursion Safety",
    body: "All excursions require signed family consent. Pool sessions run a maximum of 30 minutes of gentle water movement at a 1:3 carer-to-client ratio, and every resident must be medically cleared before joining. Nature Centre and waterfront walks follow shaded routes with mobility aids as needed, and cool refreshments (water, Zobo) are provided throughout.",
  },
  {
    icon: "🌡",
    title: "Climate Considerations",
    body: "Given Lagos' tropical climate, all indoor activities take place in air-conditioned or fan-cooled spaces. Outdoor stretches are scheduled in the cool morning window before peak heat, hydration reminders are built into every activity session, and sun protection — hats, shade, sunscreen — is mandatory on every excursion.",
  },
] as const;

function ActivitiesPage() {
  return (
    <>
      {/* HERO */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            A Day at Ardent
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-brand-navy leading-tight text-balance">
            Meaningful days, thoughtfully planned.
          </h1>
          <div className="w-20 h-px bg-brand-gold mx-auto mt-8" />
          <p className="mt-8 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Our programme blends culturally engaging activities, gentle movement, nourishing meals,
            and regular community outings to support physical, cognitive, social, and emotional
            wellbeing — Monday through Friday.
          </p>
        </div>
      </section>

      {/* DAILY SCHEDULE */}
      <section className="bg-brand-stone py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Sample Daily Schedule"
            title="A typical day, hour by hour."
            align="center"
            intro="The rhythm below anchors every day at Ardent. Specific activities and meals vary by week — see the sample week below."
          />
          <ol className="divide-y divide-brand-navy/10 border-y border-brand-navy/10 bg-white">
            {DAILY.map(([time, label]) => (
              <li
                key={time}
                className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 px-5 sm:px-8 py-5"
              >
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-brand-gold font-semibold pt-0.5">
                  {time}
                </span>
                <span className="font-serif text-lg text-brand-navy leading-snug">{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WEEKLY PROGRAMME */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Sample Weekly Programme"
            title={
              <>
                Week 1 — <span className="italic">Culture &amp; Community.</span>
              </>
            }
            align="center"
            intro="Below is a full sample week. Each of our four rotating weeks carries its own theme, meals and outings — download the complete four-week schedule for the full picture."
          />

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto border border-brand-navy/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="text-left font-semibold uppercase tracking-widest text-[10px] px-4 py-4 w-40">
                    Time
                  </th>
                  {DAYS.map((d) => (
                    <th
                      key={d}
                      className="text-left font-semibold uppercase tracking-widest text-[10px] px-4 py-4"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEK1.map((row, i) => (
                  <tr
                    key={row.time}
                    className={i % 2 === 0 ? "bg-white" : "bg-brand-stone/60"}
                  >
                    <td className="align-top px-4 py-4 text-xs uppercase tracking-widest text-brand-gold font-semibold whitespace-nowrap border-t border-brand-navy/10">
                      {row.time}
                    </td>
                    {row.values.map((v, j) => (
                      <td
                        key={j}
                        className={
                          "align-top px-4 py-4 leading-relaxed border-t border-brand-navy/10 text-stone-700 " +
                          (row.isMeal ? "italic text-brand-navy/80" : "")
                        }
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible defaultValue="Monday" className="w-full">
              {DAYS.map((day, dayIdx) => (
                <AccordionItem
                  key={day}
                  value={day}
                  className="border-b border-brand-navy/10"
                >
                  <AccordionTrigger className="font-serif text-lg text-brand-navy hover:no-underline">
                    {day}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-3">
                      {WEEK1.map((row) => (
                        <li key={row.time}>
                          <p className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
                            {row.time}
                          </p>
                          <p
                            className={
                              "text-sm text-stone-700 leading-relaxed " +
                              (row.isMeal ? "italic text-brand-navy/80" : "")
                            }
                          >
                            {row.values[dayIdx]}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-xs text-stone-500 mt-6 text-center italic">
            Italic entries are meal suggestions. Activities may be adjusted for individual client
            needs.
          </p>

          <div className="mt-10 text-center">
            <a
              href="/ardent-4week-schedule.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors"
            >
              <Download size={16} aria-hidden="true" />
              Download full 4-week schedule (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* SAFETY & WELLBEING */}
      <section className="bg-brand-stone py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Safety & Wellbeing"
            title="How we keep every day safe and comfortable."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {SAFETY.map((s) => (
              <article key={s.title} className="bg-white p-8 border border-brand-navy/5">
                <p className="text-4xl mb-4" aria-hidden="true">
                  {s.icon}
                </p>
                <h3 className="font-serif text-2xl text-brand-navy mb-3">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white py-20 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">See it for yourself.</h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
          Book a private tour of our Ikoyi residence and sit in on an activity or a meal service.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-brand-gold text-brand-navy px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          Book a Private Tour
        </Link>
      </section>
    </>
  );
}
