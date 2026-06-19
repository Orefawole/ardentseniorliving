import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Ardent Senior Living Ltd",
  description:
    "Premium elderly wellness and adult day care in Ikoyi, Lagos. Dignified day care, clinical monitoring, and engagement for Nigerian seniors and diaspora families.",
  telephone: "+2348114018598",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "Ikoyi",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  areaServed: "Lagos, Nigeria",
  openingHours: "Mo-Sa 08:00-18:00",
  priceRange: "Premium",
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
          Page Not Found
        </p>
        <h1 className="font-serif text-6xl text-brand-navy">404</h1>
        <p className="mt-4 text-sm text-stone-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-brand-navy text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-brand-navy">This page didn't load</h1>
        <p className="mt-3 text-sm text-stone-600">
          Something went wrong on our end. Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-brand-navy text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-brand-navy/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-brand-navy hover:bg-brand-stone transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ardent Senior Living — Premium Adult Day Care in Lagos" },
      {
        name: "description",
        content:
          "Premium adult day care and wellness for seniors in Ikoyi, Lagos. Dignified care, clinical oversight, and family communication built for Nigerian families at home and abroad.",
      },
      { name: "author", content: "Ardent Senior Living Ltd" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ardent Senior Living" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F172A" },
      { property: "og:title", content: "Ardent Senior Living — Premium Adult Day Care in Lagos" },
      { name: "twitter:title", content: "Ardent Senior Living — Premium Adult Day Care in Lagos" },
      { name: "description", content: "Ardent Senior Living is a premium Adult day care and wellness center in Ikoyi, Lagos." },
      { property: "og:description", content: "Ardent Senior Living is a premium Adult day care and wellness center in Ikoyi, Lagos." },
      { name: "twitter:description", content: "Ardent Senior Living is a premium Adult day care and wellness center in Ikoyi, Lagos." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/3e9RzZlbYoP0CoXGK5ayxg0pCoA3/social-images/social-1781429997378-Ardent_Logo.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/3e9RzZlbYoP0CoXGK5ayxg0pCoA3/social-images/social-1781429997378-Ardent_Logo.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
