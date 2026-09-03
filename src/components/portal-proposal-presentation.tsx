import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import pdfAsset from "@/assets/executive-summary.pdf.asset.json";

export type ProposalRow = {
  client: string;
  business: string;
  coverages: string;
  premium: string;
  status: "Pending Presentation" | "Accepted";
};

const CARRIERS = [
  "Nirvana Insurance",
  "Sentry Insurance",
  "THREE by Berkshire Hathaway",
  "Cover Whale / Hanover",
  "RLI Transportation",
  "Canal Insurance",
];

function parsePremium(premium: string) {
  const n = Number(premium.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 ? 2 : 0,
  });
}

type Option = {
  carrier: string;
  premium: number;
  deductible: number;
  notes?: string;
};

function optionsFor(row: ProposalRow): Option[] {
  const base = parsePremium(row.premium) || 2400;
  const seed = row.client.length;
  const c1 = CARRIERS[seed % CARRIERS.length] ?? CARRIERS[0]!;
  const c2 = CARRIERS[(seed + 3) % CARRIERS.length] ?? CARRIERS[1]!;
  return [
    {
      carrier: c1,
      premium: Math.round(base * 0.52),
      deductible: 5000,
      notes: `Full coverage program for ${row.coverages.split(",")[0]}`,
    },
    {
      carrier: c2,
      premium: Math.round(base * 0.58),
      deductible: 2500,
    },
  ];
}

function firstName(client: string) {
  const first = client.trim().split(/\s+/)[0] ?? client;
  return first.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ'-]/g, "").toUpperCase() || "CLIENT";
}

function pdfName(client: string) {
  return `EXECUTIVE_SUMMARY_${client
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join("_")
    .toUpperCase()}.pdf`;
}

/** Small, subtle confetti burst using brand colors. */
function ConfettiBurst({ fire }: { fire: number }) {
  const pieces = useMemo(() => {
    if (!fire) return [];
    const colors = ["#1A56DB", "#06D6A0", "#16305C", "#93C5FD", "#6EE7B7", "#ffffff"];
    return Array.from({ length: 60 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.4;
      const dist = 90 + Math.random() * 160;
      return {
        id: `${fire}-${i}`,
        color: colors[i % colors.length],
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 60,
        rot: Math.random() * 540 - 270,
        delay: Math.random() * 0.12,
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 7,
        round: Math.random() > 0.6,
      };
    });
  }, [fire]);

  if (!fire) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: "50%",
              top: "42%",
              width: p.w,
              height: p.h,
              background: p.color,
              borderRadius: p.round ? "50%" : 2,
              animationDelay: `${p.delay}s`,
              "--cx": `${p.x}px`,
              "--cy": `${p.y}px`,
              "--cr": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function ProposalPresentation({
  row,
  onClose,
}: {
  row: ProposalRow | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"intro" | "compare">("intro");
  const [confirmed, setConfirmed] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const opts = useMemo(() => (row ? optionsFor(row) : []), [row]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStep("intro");
    setConfirmed(false);
    setConfetti(0);
  }, [row]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!row) return null;

  const reveal = () => {
    setConfetti((c) => c + 1);
    setStep("compare");
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <style>{`
        @keyframes confetti-fly {
          0% { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)) scale(0.6); opacity: 0; }
        }
        .confetti-piece { position: absolute; animation: confetti-fly 1.4s cubic-bezier(.2,.7,.3,1) forwards; }
      `}</style>

      {step === "intro" ? (
        <div
          ref={ref}
          className="relative w-full max-w-xl animate-scale-in overflow-hidden rounded-2xl bg-white p-10 text-center shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#8A93A2] hover:bg-[#F1F5F9]"
            aria-label="Close presentation"
          >
            <X className="size-5" />
          </button>

          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#1A56DB] to-[#06D6A0] text-white shadow-lg">
            <Sparkles className="size-7" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-[#0D1527]">
            Hello {firstName(row.client)}!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#64748B]">
            Thank you for trusting us. We took the time to create this proposal exclusively
            for you to keep your assets secure.
          </p>

          <button
            onClick={reveal}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#06D6A0] py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
          >
            Reveal Interactive Proposal
          </button>

          <a
            href={pdfAsset.url}
            download={pdfName(row.client)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-left transition hover:border-[#1A56DB]/50 hover:bg-[#EFF4FF]"
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#FEE2E2] text-[#DC2626]">
              <FileText className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#0D1527] group-hover:text-[#1A56DB]">
                {pdfName(row.client)}
              </p>
              <p className="text-xs text-[#8A93A2]">PDF · 0.7 MB · Click to download</p>
            </div>
            <Download className="size-4 shrink-0 text-[#94A3B8] group-hover:text-[#1A56DB]" />
          </a>

          <p className="mt-6 text-[11px] text-[#94A3B8]">
            Alex AI Insurtech · This proposal is valid for 30 days.
          </p>
        </div>
      ) : (
        <div
          className="relative w-full max-w-4xl animate-scale-in rounded-2xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <ConfettiBurst fire={confetti} />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-30 grid size-9 place-items-center rounded-full text-[#8A93A2] hover:bg-[#F1F5F9]"
            aria-label="Close presentation"
          >
            <X className="size-5" />
          </button>

          <div className="border-b border-[#EEF0F4] px-8 pb-5 pt-7">
            <h2 className="text-xl font-black tracking-tight text-[#0D1527]">
              Underwriting Proposals for {row.client}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              {row.coverages} · {usd(parsePremium(row.premium))} USD total premium
            </p>
          </div>

          <div className="grid gap-5 px-8 py-6 md:grid-cols-2">
            {opts.map((o, i) => (
              <div
                key={o.carrier}
                className={cn(
                  "rounded-2xl border p-6 shadow-sm transition",
                  i === 0 ? "border-[#1A56DB]/40" : "border-[#E2E8F0]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                      Option {i + 1}
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#0D1527]">{o.carrier}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D1527] px-3 py-1.5 text-[11px] font-semibold text-white">
                    <ShieldCheck className="size-3.5" /> Tier-1 A-Rated
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#F3F5F9] p-4">
                    <p className="text-xs text-[#64748B]">Premium</p>
                    <p className="mt-1 text-xl font-black text-[#1A56DB]">{usd(o.premium)}</p>
                  </div>
                  <div className="rounded-xl bg-[#F3F5F9] p-4">
                    <p className="text-xs text-[#64748B]">Deductible</p>
                    <p className="mt-1 text-xl font-black text-[#0D1527]">{usd(o.deductible)}</p>
                  </div>
                </div>

                {o.notes ? (
                  <p className="mt-4 flex items-center gap-2 text-sm text-[#3F4A5C]">
                    <CheckCircle2 className="size-4 shrink-0 text-[#06D6A0]" />
                    {o.notes}
                  </p>
                ) : (
                  <div className="mt-4 h-6" />
                )}

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#1A56DB] hover:underline"
                >
                  <ExternalLink className="size-3.5" /> Carrier payment link
                </a>

                <button className="mt-3 w-full rounded-xl bg-[#1A56DB] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1648C0]">
                  Pay &amp; Bind via Carrier
                </button>
              </div>
            ))}
          </div>

          <div className="px-8 pb-7">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#F3F5F9] px-5 py-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="size-4 rounded accent-[#1A56DB]"
              />
              <span className="text-sm text-[#3F4A5C]">
                I confirm the cargo details are accurate and authorize Alex AI to bind the
                selected carrier option.
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
