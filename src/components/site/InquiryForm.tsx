import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitInquiry } from "@/lib/inquiries.functions";

const INQUIRY_TYPES = [
  "Day Care Enrollment",
  "Wellness Consultation",
  "Book a Private Tour",
  "Family Information",
  "Other",
] as const;

type Variant = "light" | "dark";

export function InquiryForm({ variant = "light" }: { variant?: Variant }) {
  const submit = useServerFn(submitInquiry);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("loading");
    setError(null);
    try {
      await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          inquiry_type: String(fd.get("inquiry_type") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  const isDark = variant === "dark";
  const labelCls = isDark
    ? "text-[10px] uppercase tracking-widest opacity-60 text-white"
    : "text-[10px] uppercase tracking-widest text-brand-navy/60 font-semibold";
  const inputCls = isDark
    ? "w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors"
    : "w-full bg-white border border-brand-navy/10 px-4 py-3 text-sm text-brand-navy placeholder:text-stone-400 focus:outline-none focus:border-brand-gold transition-colors";
  const btnCls = isDark
    ? "w-full bg-brand-gold text-brand-navy font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors disabled:opacity-60"
    : "w-full bg-brand-navy text-white font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-brand-navy transition-colors disabled:opacity-60";

  if (status === "success") {
    return (
      <div
        className={
          isDark
            ? "border border-brand-gold/40 bg-white/5 p-10 text-center"
            : "border border-brand-gold/40 bg-brand-stone p-10 text-center"
        }
      >
        <p className={"text-[10px] tracking-[0.3em] uppercase mb-3 text-brand-gold font-bold"}>
          Thank You
        </p>
        <h3
          className={
            "font-serif text-2xl mb-3 " + (isDark ? "text-white" : "text-brand-navy")
          }
        >
          Your inquiry is with us.
        </h3>
        <p className={isDark ? "text-white/60 text-sm" : "text-stone-600 text-sm"}>
          A wellness advisor will reach out within one business day. For urgent matters, please
          call{" "}
          <a href="tel:+2348114018598" className="underline">
            +234 811 401 8598
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[10px] tracking-[0.3em] uppercase font-bold text-brand-gold hover:underline"
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="if-name" className={labelCls}>
          Your Name
        </label>
        <input
          id="if-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={200}
          className={inputCls}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="if-phone" className={labelCls}>
          Phone
        </label>
        <input
          id="if-phone"
          name="phone"
          type="tel"
          required
          maxLength={50}
          placeholder="+234 ..."
          className={inputCls}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="if-email" className={labelCls}>
          Email
        </label>
        <input
          id="if-email"
          name="email"
          type="email"
          maxLength={255}
          className={inputCls}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="if-type" className={labelCls}>
          Inquiry Type
        </label>
        <select id="if-type" name="inquiry_type" className={inputCls + " appearance-none"}>
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t} className="text-brand-navy">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="if-msg" className={labelCls}>
          Tell us about your loved one
        </label>
        <textarea
          id="if-msg"
          name="message"
          rows={4}
          maxLength={2000}
          className={inputCls + " resize-none"}
        />
      </div>
      {error && (
        <p className="md:col-span-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      <div className="md:col-span-2 pt-2">
        <button type="submit" disabled={status === "loading"} className={btnCls}>
          {status === "loading" ? "Submitting…" : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
}
