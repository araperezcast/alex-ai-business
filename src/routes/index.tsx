import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nebula } from "@/components/nebula";
import { SiteFooter } from "@/components/site-footer";
import carrierLogos from "@/assets/logos.png.asset.json";
import alexLogo from "@/assets/alex-logo.png.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Truck,
  Youtube,
  Music2,
  BarChart3,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import cargoImg from "@/assets/bentoGrid.png.asset.json";
const cargoUrl = cargoImg.url;
import partnersAsset from "@/assets/partners.jpg.asset.json";
const partnersImg = partnersAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex AI Business | Commercial Insurance for Arizona Fleets" },
      {
        name: "description",
        content:
          "Multi-carrier commercial insurance underwriting with 90-second automated COI issuance for Arizona fleets, cross-border freight and enterprises.",
      },
      { property: "og:title", content: "Alex AI Business | Commercial Insurance Platform" },
      {
        property: "og:description",
        content:
          "Real-time underwriting across 53+ top-tier US carriers and instant Certificates of Insurance for fleets and cross-border freight.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});


function GradientButton({
  children,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`bg-gradient-brand inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold text-brand-foreground transition-all hover:brightness-110 hover:shadow-[0_0_40px_-8px_var(--brand)] ${className}`}
    >
      {children}
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Products", to: "/" },
    { label: "Solutions", to: "/" },
    { label: "Alex Portal B2B", to: "/portal" },
    { label: "Company", to: "/" },
    { label: "Customers", to: "/" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-deep/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src={alexLogo.url}
            alt="Alex AI Insurtech"
            className="h-7 w-auto mix-blend-screen"
          />
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Contact
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/"
            className="bg-gradient-brand rounded-full px-5 py-2 text-sm font-bold text-brand-foreground transition-all hover:brightness-110"
          >
            Get started
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-navy-deep px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-5 border-t border-white/10 pt-4">
              <Link to="/" className="text-sm font-medium text-white/80 hover:text-white">
                Contact
              </Link>
              <Link to="/" className="text-sm font-medium text-white/80 hover:text-white">
                Login
              </Link>
              <Link
                to="/"
                className="bg-gradient-brand rounded-full px-5 py-2 text-sm font-bold text-brand-foreground"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-navy-deep group relative flex min-h-screen flex-col justify-center overflow-hidden">
      <Nebula intensity={0.9} interactive />
      <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">

        <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Embedded Insurance Infrastructure for Customs & Logistics.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/70">
          Transform your customs clearance flow into a highly profitable digital business unit.
          Protect cross-border freight with digital COI issuance in under 90 seconds, backed by
          53+ A-Rated US carriers.
        </p>
        <div className="mt-9">
          <GradientButton>Join our partner program</GradientButton>
        </div>
      </div>
      <div className="relative overflow-hidden pb-8">
        <div className="animate-marquee flex w-max [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          {[0, 1].map((copy) => (
            <img
              key={copy}
              src={carrierLogos.url}
              alt="Carrier partners: Nirvana, RLI Transportation, Canal Insurance, Chubb, Sentry, Northland Insurance"
              aria-hidden={copy === 1}
              className="h-16 w-auto shrink-0"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const perks = [
  {
    title: "Port-of-Entry Agility",
    body: "Instant digital Certificate of Insurance (COI) generation per entry, eliminating delays at fiscal yards.",
  },
  {
    title: "Institutional Capacity",
    body: "Direct API connection with 53+ Tier-1 carriers for algorithmic risk placement without bottlenecks.",
  },
  {
    title: "Zero-CapEx Revenue",
    body: "Monetize your existing transactional volume with our embedded revenue share model.",
  },
  {
    title: "Zero Admin Burden",
    body: "We handle 100% of risk underwriting, technical support, and end-to-end claims management.",
  },
];

function Perks() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="bg-navy-deep rounded-full px-8 py-4 text-center text-sm font-medium text-white">
          Grupo Jofroy integrates Alex AI infrastructure to streamline cross-border freight
          insurance and port-of-entry COI issuance.
        </div>

        <p className="mt-16 text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
          Key Partnership Benefits
        </p>
        <h2 className="text-gradient-brand mt-5 max-w-4xl text-3xl leading-snug font-extrabold tracking-tight sm:text-4xl">
          Build a custom commercial insurance program
          <br />
          backed by Alex AI&apos;s multi-carrier underwriting and dedicated service.
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="border-t border-foreground pt-5">
              <h3 className="text-base font-bold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const valueCards = [
  {
    number: "01",
    title: "Zero-Friction Risk Management",
    body: "Alex AI handles 100% of underwriting workflows, compliance, and dedicated 24/7 claims support—eliminating administrative overhead for your enterprise.",
  },
  {
    number: "02",
    title: "53+ Top-Tier Institutional Carriers",
    body: "Direct, real-time appetite matching across leading A-Rated US commercial insurers, delivering scalable capacity and optimal rates.",
  },
  {
    number: "03",
    title: "Instant 90-Second COI Issuance",
    body: "Automated digital Certificate of Insurance (COI) generation for logistics dispatch, freight transit, and commercial compliance without delays.",
  },
];

function ValueCards() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {valueCards.map((c) => (
          <div
            key={c.number}
            className="group border-border bg-card rounded-2xl border p-8 transition-shadow hover:shadow-card"
          >
            <span className="text-gradient-brand text-sm font-extrabold tracking-[0.18em]">
              {c.number}
            </span>
            <h3 className="mt-4 text-xl font-extrabold tracking-tight">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Bento() {
  return (
    <section className="bg-polar px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-gradient-brand text-3xl font-extrabold tracking-tight sm:text-4xl">
            Built for Arizona&apos;s Core Industries
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Institutional-grade coverage tailored to your operational reality.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <article className="relative col-span-1 min-h-[420px] overflow-hidden rounded-2xl lg:col-span-2">
            <img
              src={cargoUrl}
              alt="Row of commercial trucks parked at a cross-border logistics hub"
              width={1200}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
            <div className="absolute right-8 bottom-8 left-8">
              <h3 className="text-2xl font-bold text-white">Cross-Border Cargo & Agribusiness</h3>
              <p className="mt-2 max-w-lg text-sm text-white/75">
                Instant inland marine and refrigerated cargo coverage across Nogales and Phoenix
                freight corridors.
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7">
            <div>
              <div className="grid size-11 place-items-center rounded-xl bg-brand/10">
                <Truck className="size-5 text-brand" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Commercial Fleets & Logistics</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tailored policies for 5 to 500+ commercial vehicles, service vans, and hazmat
                transport.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-border bg-background p-5 shadow-card">
              <p className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                Est. monthly savings
              </p>
              <p className="mt-2 text-2xl font-extrabold text-emerald">
                +$56.00 <span className="text-sm font-medium text-muted-foreground">/ unit</span>
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-emerald" />
              </div>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-2xl border border-border bg-mint p-7">
            <div>
              <div className="grid size-11 place-items-center rounded-xl bg-emerald/15">
                <Building2 className="size-5 text-emerald" />
              </div>
              <h3 className="mt-6 text-xl font-bold">SMB & General Liability (BOP)</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Comprehensive property, income protection, and contractor liability underwritten in
                minutes.
              </p>
            </div>
            <dl className="mt-8 rounded-xl border border-border bg-background p-5 text-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">Property Limit</dt>
                <dd className="font-bold">$2.5M</dd>
              </div>
              <div className="flex items-center justify-between pt-3">
                <dt className="text-muted-foreground">Liability (Occ)</dt>
                <dd className="font-bold">$1M/$2M</dd>
              </div>
            </dl>
          </article>

          <article className="relative col-span-1 min-h-[420px] overflow-hidden rounded-2xl lg:col-span-2">
            <img
              src={partnersImg}
              alt="Business risk advisors joining hands in a team huddle"
              width={1200}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent" />
            <div className="absolute right-8 bottom-8 left-8 flex flex-wrap items-end justify-between gap-6">
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-white">Alex Risk Partners</h3>
                <p className="text-sm font-semibold text-emerald">E&S & Mining Operations</p>
                <p className="mt-2 max-w-md text-sm text-white/75">
                  High-limit specialized risk placement and custom underwriting for heavy industrial
                  infrastructure.
                </p>
              </div>
              <div className="w-56 shrink-0 rounded-xl border border-white/10 bg-navy-deep/90 p-4">
                <p className="flex items-center justify-between text-xs text-white/60">
                  Site Risk Analysis <span className="size-2 rounded-full bg-emerald" />
                </p>
                <p className="mt-2 flex items-baseline gap-2 text-3xl font-extrabold text-white">
                  A+ <span className="text-xs font-semibold text-emerald">Top 5% Tier</span>
                </p>
                <div className="mt-3 flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-emerald" : "bg-white/15"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const programs = [
  {
    title: "Customs & 3PL Integration",
    intro:
      "Automate cargo insurance and instant COI generation directly inside your freight clearance workflow.",
    items: [
      "Automated 90-second COI issuance at port of entry",
      "Dedicated API integration for freight dispatchers & coolers",
      "Direct underwriting access to 53+ institutional carriers",
      "Monthly volume reporting and real-time binder tracking",
    ],
  },
  {
    title: "Fleet & Commercial Programs",
    intro: "Optimize fleet premium costs and risk assessments across Arizona trade corridors.",
    items: [
      "Tailored underwriting for 5 to 500+ commercial units",
      "Telematics-aligned premium optimization",
      "24/7 dedicated licensed human claims adjusters",
      "Unified billing for general liability, inland marine, and auto",
    ],
  },
  {
    title: "Strategic Referral Network",
    intro:
      "Connect your business clients to top-tier commercial coverage and earn institutional referral incentives.",
    items: [
      "Co-branded quoting portals for your association or enterprise",
      "Dedicated sales enablement and licensed underwriter support",
      "Real-time lead tracking and partner commission structure",
      "Priority onboarding for complex commercial risks (E&S)",
    ],
  },
];

function Programs() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find the right partnership for your business.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Our partner success team will work with you to determine which program makes the most
          sense for your business.
        </p>
        <div className="mt-8">
          <GradientButton>Join our partner program</GradientButton>
        </div>

        <div className="mt-16 grid gap-6 text-left lg:grid-cols-3">
          {programs.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-2xl border border-border bg-polar"
            >
              <div className="bg-navy-deep px-7 py-8 text-center">
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 text-sm text-white/70">{p.intro}</p>
              </div>
              <div className="px-7 py-7">
                <p className="text-sm font-semibold">What you get:</p>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const advantages = [
  {
    title: "Multi-Carrier Real-Time Underwriting",
    body: "Best rates automatically compared and appetite matched across our network.",
  },
  {
    title: "Instant COI Generation",
    body: "Issue binding Certificates of Insurance in under 90 seconds from your dashboard.",
  },
  {
    title: "24/7 Human Licensed Underwriters",
    body: "Dedicated Arizona-based experts and claims adjusters ready when you need them.",
  },
];

function Advantage() {
  return (
    <section className="bg-polar px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-gradient-brand text-3xl font-extrabold tracking-tight sm:text-4xl">
            Technology is the Advantage.
            <br />
            Insurance is the Business.
          </h2>
          <ul className="mt-10 space-y-8">
            {advantages.map((a) => (
              <li key={a.title} className="flex gap-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald" />
                <div className="min-w-0">
                  <h3 className="font-bold text-brand">{a.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{a.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-navy-deep overflow-hidden rounded-2xl border border-white/10 shadow-card">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-white/25" />
              ))}
            </span>
            <p className="flex flex-1 items-center justify-center gap-2 text-xs text-white/60">
              <ShieldCheck className="size-3.5" /> Enterprise Dashboard
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-white">Active Policies</h3>
                <p className="text-sm text-white/50">Fleet & Cargo Operations</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                <BarChart3 className="size-3.5" /> Reports
              </span>
            </div>

            {[
              { name: "Commercial Auto", id: "POL-8492-AZ", price: "$12,400/yr" },
              { name: "Inland Marine", id: "POL-9921-MX", price: "$8,250/yr" },
            ].map((p) => (
              <div
                key={p.id}
                className="mt-4 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald/15">
                  <ShieldCheck className="size-4 text-emerald" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-white/45">{p.id}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-white">{p.price}</p>
                  <p className="text-xs text-emerald">Fully Paid</p>
                </div>
                <span className="shrink-0 rounded-lg bg-brand/25 px-3 py-1.5 text-xs font-semibold text-white">
                  Get COI
                </span>
              </div>
            ))}

            <div className="bg-gradient-brand mt-6 rounded-xl py-3 text-center text-sm font-bold text-brand-foreground">
              Instant Endorsement Control
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-background px-6 py-16">
      <div className="bg-navy-deep group relative mx-auto max-w-6xl overflow-hidden rounded-2xl p-10 sm:p-14">
        <Nebula intensity={0.75} />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald/20 px-4 py-1.5 text-xs font-bold text-emerald">
            <span className="size-2 rounded-full bg-emerald" /> 53+ Top-Tier US Carriers Connected
          </span>
          <blockquote className="mt-8 max-w-3xl text-xl leading-relaxed font-bold text-white sm:text-2xl">
            &ldquo;We built Alex AI to eliminate the operational friction of commercial insurance.
            By connecting directly with over 53 top-tier US carriers, we empower fleets,
            cross-border freight operators, and Arizona enterprises to secure custom underwriting
            and instant Certificates of Insurance (COI) in under 90 seconds—backed by dedicated,
            licensed risk advisors available 24/7.&rdquo;
          </blockquote>
          <hr className="mt-10 max-w-3xl border-white/15" />
          <button className="mt-8 rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}

const formBullets = [
  "Manage a safer and more efficient fleet while complying with industry standards and regulations.",
  "Real-time multi-carrier underwriting across 53+ top-tier US insurers.",
  "Automated Certificate of Insurance (COI) issuance in under 90 seconds.",
];

function QuoteForm() {
  const [consent, setConsent] = useState(false);

  return (
    <section id="quote" className="bg-navy-deep group relative overflow-hidden px-6 py-24">
      <Nebula intensity={0.65} />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-white/50 uppercase">
            Connect with our team
          </p>
          <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
            We would love to show you what Alex AI can do for your business.
          </h2>
          <p className="mt-8 text-sm text-white/60">With Alex AI you can:</p>
          <ul className="mt-5 space-y-4">
            {formBullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-white/85">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thanks — our team will reach out shortly.");
          }}
          className="rounded-2xl bg-card p-8 shadow-card"
        >
          <h3 className="text-center text-xl font-bold text-brand">Get a Commercial Quote</h3>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder="First Name" className="h-12" />
              <Input required placeholder="Last Name" className="h-12" />
            </div>
            <div className="flex items-stretch overflow-hidden rounded-md border border-input">
              <span className="flex items-center gap-1.5 border-r border-input px-4 text-sm text-muted-foreground">
                🇺🇸 +1
              </span>
              <Input
                required
                type="tel"
                placeholder="Phone Number"
                className="h-12 rounded-none border-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Input required type="email" placeholder="Work Email" className="h-12" />
            <Input required placeholder="Company Name" className="h-12" />
            <Select>
              <SelectTrigger className="!h-12 w-full">
                <SelectValue placeholder="Fleet Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-4">1 – 4 units</SelectItem>
                <SelectItem value="5-25">5 – 25 units</SelectItem>
                <SelectItem value="26-100">26 – 100 units</SelectItem>
                <SelectItem value="100+">100+ units</SelectItem>
              </SelectContent>
            </Select>
            <label className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
              <Checkbox
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5"
              />
              <span>
                Yes, I would like to receive information about Alex AI&apos;s products, services and
                events, and I understand that I can unsubscribe at any time.
              </span>
            </label>
            <GradientButton type="submit" className="w-full">
              Request Demo
            </GradientButton>
            <p className="text-center text-[11px] text-muted-foreground">
              I agree to receive commercial insurance updates and quotes from Alex AI. Unsubscribe
              anytime.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Which type of insurance companies do you partner with?",
    a: "We work with 53+ top-tier US commercial carriers spanning fleet auto, inland marine, general liability, property and E&S markets.",
  },
  {
    q: "How does Alex AI work?",
    a: "You submit your operational profile once; our underwriting engine matches appetite across carriers in real time and returns bindable quotes.",
  },
  {
    q: "How does Alex AI help businesses scale?",
    a: "Coverage lines, billing and COI issuance stay unified as you add units, so growth never means a new broker negotiation.",
  },
  {
    q: "Can I cancel or modify my policy?",
    a: "Yes. Endorsements, additions and cancellations are handled from your dashboard with licensed underwriters on call 24/7.",
  },
  {
    q: "How does Alex AI help protect fleets?",
    a: "Telematics-aligned pricing, proactive risk scoring and dedicated claims adjusters keep drivers and cargo protected.",
  },
];

function Faq() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-10 border-t border-border">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-4">
        <div>
          <img
            src={alexLogo.url}
            alt="Alex AI Insurtech"
            className="h-16 w-auto object-contain mix-blend-screen"
          />
          <p className="mt-5 max-w-xs text-sm text-white/60">
            Smart insurance for modern life. Powered by intelligence, driven by humans.
          </p>
          <div className="mt-6 flex gap-5 text-white/70">
            <Facebook className="size-5" aria-label="Facebook" />
            <Instagram className="size-5" aria-label="Instagram" />
            <Youtube className="size-5" aria-label="YouTube" />
            <Music2 className="size-5" aria-label="TikTok" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">Products</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>Car Insurance</li>
            <li>Home Insurance</li>
            <li>Renters Insurance</li>
            <li className="flex items-center gap-2">
              Alex Sign
              <span className="rounded bg-brand/30 px-1.5 py-0.5 text-[10px] font-bold text-white">
                NEW
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">Company</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>About Us</li>
            <li>Ambassadors</li>
            <li>Blog</li>
            <li>Contact Support</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-white uppercase">
            Contact & Access
          </p>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-brand" /> +1 480-630-9630
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-brand" /> hello@alexai.cloud
            </li>
          </ul>
          <div className="mt-6 space-y-3">
            {[
              { top: "Download on", bottom: "App Store" },
              { top: "Get it on", bottom: "Google Play" },
            ].map((s) => (
              <div
                key={s.bottom}
                className="flex w-48 items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5"
              >
                <span className="text-lg text-white"></span>
                <span className="leading-tight">
                  <span className="block text-[10px] text-white/60">{s.top}</span>
                  <span className="block text-sm font-bold text-white">{s.bottom}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/60">
        <SiteFooter />
        <ul className="flex flex-wrap gap-6">
          {[
            "Terms of Service",
            "Privacy Policy",
            "Privacy Settings",
            "Do Not Sell",
            "Disclaimer",
            "Sitemap",
          ].map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Perks />
      <ValueCards />
      <Bento />
      <Programs />
      <Advantage />
      <Testimonial />
      <QuoteForm />
      <Faq />
      <Footer />
    </main>
  );
}
