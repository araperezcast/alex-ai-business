import { useCallback, useEffect, useState } from "react";

export type Status = "pending" | "quoted" | "paid";

export type QuoteOption = {
  carrier: string;
  premium: number;
  deductible: number;
  paymentUrl: string;
  notes?: string;
  internalFile?: string;
};

export type Operation = {
  id: string;
  vertical: string;
  origin: string;
  destination: string;
  value: number;
  status: Status;
  createdAt: string;
  quotedAt?: string;
  paidAt?: string;
  files: string[];
  quotes: QuoteOption[];
  boundCarrier?: string;
};

export const VERTICALS = [
  "Maquiladora & Manufacturing",
  "Mining & Extraction",
  "Automotive Import",
  "Agribusiness & Perishables",
  "Chemicals & Hazmat",
  "Logistics, 3PL & Transfers",
];

export const CARRIER_CATALOG = [
  "Cover Whale / Hanover",
  "THREE by Berkshire Hathaway",
  "Nirvana Insurance",
  "RLI Transportation",
  "Canal Insurance",
  "Acuity Insurance",
  "Sentry Insurance",
  "Northland",
  "eMAXX Assurance",
];

/** Expected first-response SLA for the Alex AI desk, in hours. */
export const SLA_HOURS = 4;

const STORAGE_KEY = "joffroy-operations-v1";
const EVENT = "joffroy-operations-changed";

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

export const SEED: Operation[] = [
  {
    id: "#PED-2026-8841",
    vertical: "Agribusiness & Perishables",
    origin: "Nogales, SON",
    destination: "Phoenix, AZ",
    value: 185000,
    status: "quoted",
    createdAt: hoursAgo(26),
    quotedAt: hoursAgo(23),
    files: ["commercial-invoice-8841.pdf", "packing-list-8841.pdf"],
    quotes: [
      {
        carrier: "Cover Whale / Hanover",
        premium: 480,
        deductible: 1000,
        paymentUrl: "https://pay.coverwhale.com/checkout/ped-8841",
        notes: "Inland Marine door-to-door · Reefer breakdown guarantee",
      },
      {
        carrier: "THREE by Berkshire Hathaway",
        premium: 520,
        deductible: 500,
        paymentUrl: "https://three.ai/pay/ped-8841",
        notes: "Comprehensive cargo · Delay protection",
      },
    ],
  },
  {
    id: "#PED-2026-8837",
    vertical: "Maquiladora & Manufacturing",
    origin: "Tijuana, BC",
    destination: "San Diego, CA",
    value: 412500,
    status: "paid",
    createdAt: hoursAgo(72),
    quotedAt: hoursAgo(69),
    paidAt: hoursAgo(66),
    files: ["invoice-8837.pdf"],
    boundCarrier: "RLI Transportation",
    quotes: [
      {
        carrier: "RLI Transportation",
        premium: 1240,
        deductible: 2500,
        paymentUrl: "https://pay.rlicorp.com/ped-8837",
      },
      {
        carrier: "Canal Insurance",
        premium: 1385,
        deductible: 1500,
        paymentUrl: "https://pay.canalinsurance.com/ped-8837",
      },
    ],
  },
  {
    id: "#PED-2026-8829",
    vertical: "Chemicals & Hazmat",
    origin: "Ciudad Juárez, CHIH",
    destination: "El Paso, TX",
    value: 96400,
    status: "pending",
    createdAt: hoursAgo(6),
    files: ["hazmat-manifest-8829.pdf"],
    quotes: [],
  },
  {
    id: "#PED-2026-8812",
    vertical: "Mining & Extraction",
    origin: "Hermosillo, SON",
    destination: "Tucson, AZ",
    value: 748000,
    status: "quoted",
    createdAt: hoursAgo(48),
    quotedAt: hoursAgo(44),
    files: [],
    quotes: [
      {
        carrier: "Nirvana Insurance",
        premium: 2180,
        deductible: 5000,
        paymentUrl: "https://pay.nirvanatech.com/ped-8812",
        notes: "Heavy equipment & ore transit",
      },
      {
        carrier: "Sentry Insurance",
        premium: 2340,
        deductible: 2500,
        paymentUrl: "https://pay.sentry.com/ped-8812",
      },
    ],
  },
  {
    id: "#PED-2026-8804",
    vertical: "Automotive Import",
    origin: "Monterrey, NL",
    destination: "Laredo, TX",
    value: 265900,
    status: "paid",
    createdAt: hoursAgo(120),
    quotedAt: hoursAgo(117),
    paidAt: hoursAgo(115),
    files: [],
    boundCarrier: "Acuity Insurance",
    quotes: [
      {
        carrier: "Acuity Insurance",
        premium: 890,
        deductible: 1000,
        paymentUrl: "https://pay.acuity.com/ped-8804",
      },
      {
        carrier: "Northland",
        premium: 940,
        deductible: 1000,
        paymentUrl: "https://pay.northland.com/ped-8804",
      },
    ],
  },
  {
    id: "#PED-2026-8798",
    vertical: "Logistics, 3PL & Transfers",
    origin: "Mexicali, BC",
    destination: "Calexico, CA",
    value: 54300,
    status: "pending",
    createdAt: hoursAgo(1),
    files: [],
    quotes: [],
  },
];

function read(): Operation[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as Operation[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED;
  } catch {
    return SEED;
  }
}

function write(next: Operation[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Shared operations store: syncs the Joffroy portal and the Alex AI back-office. */
export function useOperations() {
  const [rows, setRows] = useState<Operation[]>(SEED);

  useEffect(() => {
    const sync = () => setRows(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((fn: (prev: Operation[]) => Operation[]) => {
    const next = fn(read());
    write(next);
    setRows(next);
  }, []);

  const addOperation = useCallback(
    (op: Operation) => update((prev) => [op, ...prev]),
    [update],
  );

  const sendProposals = useCallback(
    (id: string, quotes: QuoteOption[]) =>
      update((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, quotes, status: "quoted" as Status, quotedAt: new Date().toISOString() }
            : r,
        ),
      ),
    [update],
  );

  const markPaid = useCallback(
    (id: string, carrier?: string) =>
      update((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status: "paid" as Status,
                paidAt: new Date().toISOString(),
                boundCarrier: carrier ?? r.boundCarrier ?? r.quotes[0]?.carrier,
              }
            : r,
        ),
      ),
    [update],
  );

  const resetDemo = useCallback(() => update(() => SEED), [update]);

  return { rows, addOperation, sendProposals, markPaid, resetDemo };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function slaHoursElapsed(op: Operation) {
  const end = op.quotedAt ? new Date(op.quotedAt).getTime() : Date.now();
  return (end - new Date(op.createdAt).getTime()) / 3600_000;
}

export function slaState(op: Operation): "on-track" | "at-risk" | "breached" {
  const h = slaHoursElapsed(op);
  if (h < SLA_HOURS * 0.6) return "on-track";
  if (h < SLA_HOURS) return "at-risk";
  return "breached";
}

export const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    : "—";
