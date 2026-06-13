import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mb-12 md:mb-16" : "mb-12 md:mb-16"}>
      {eyebrow && (
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-5xl text-brand-navy leading-tight max-w-3xl mx-auto text-balance">
        {title}
      </h2>
      <div
        className={
          "w-20 h-px bg-brand-gold mt-6 " + (align === "center" ? "mx-auto" : "")
        }
      />
      {intro && (
        <p
          className={
            "mt-6 text-stone-600 leading-relaxed max-w-2xl text-pretty " +
            (align === "center" ? "mx-auto" : "")
          }
        >
          {intro}
        </p>
      )}
    </div>
  );
}
