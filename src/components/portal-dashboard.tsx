import { useState } from "react";
import {
  Activity,
  Car,
  CircleDollarSign,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

const DISTRIBUTION = [
  { name: "Commonwealth Casualty", value: 18, color: "#06D6A0" },
  { name: "Coterie Insurance", value: 22, color: "#1A56DB" },
  { name: "Ergo Next", value: 24, color: "#0EA5E9" },
  { name: "Foremost Insurance", value: 18, color: "#94A3B8" },
  { name: "Novo Insurance", value: 18, color: "#1E3A8A" },
];

const QUOTED_CARRIERS = [
  { name: "AssuranceAmerica", value: 8, color: "#1A56DB" },
  { name: "Berxi - Berkshire Hathaway Specialty Insurance Company", value: 8, color: "#1E3A8A" },
  { name: "Coterie Insurance", value: 8, color: "#0EA5E9" },
  { name: "Foxquilt", value: 8, color: "#1A56DB" },
  { name: "Hiscox Insurance Company", value: 8, color: "#06D6A0" },
  { name: "Kemper Auto", value: 8, color: "#1E3A8A" },
  { name: "Novo Insurance", value: 8, color: "#1A56DB" },
  { name: "RLI Surety", value: 8, color: "#1E3A8A" },
  { name: "RT Connector", value: 8, color: "#06D6A0" },
  { name: "Simply Business", value: 8, color: "#1A56DB" },
  { name: "Slice Insurance", value: 8, color: "#1E3A8A" },
  { name: "THREE by Berkshire Hathaway", value: 8, color: "#94A3B8" },
  { name: "ePremium", value: 8, color: "#1A56DB" },
];

const VISITS = [
  { agent: "Arantxa Montes", top: 0, bottom: 15, colors: ["#06D6A0"] },
  { agent: "aracely.hernandez", top: 8, bottom: 5, colors: ["#94A3B8", "#06D6A0"] },
];

const RECENT_ACTIVITY = [
  {
    date: "03/9/2026",
    client: "Juan Carlos Vega",
    vehicle: "2024 Honda Civic",
    premium: "$1,284.00",
    status: "ACTIVE" as const,
  },
  {
    date: "02/9/2026",
    client: "María Fernanda Ruiz",
    vehicle: "2023 Toyota RAV4",
    premium: "$1,462.50",
    status: "PENDING" as const,
  },
  {
    date: "01/9/2026",
    client: "Roberto Gómez",
    vehicle: "2025 Ford F-150",
    premium: "$1,890.75",
    status: "ACTIVE" as const,
  },
  {
    date: "29/8/2026",
    client: "Ana Lucía Torres",
    vehicle: "2022 Nissan Sentra",
    premium: "$1,045.20",
    status: "ACTIVE" as const,
  },
  {
    date: "28/8/2026",
    client: "Carlos Mendoza",
    vehicle: "2024 Chevrolet Silverado",
    premium: "$1,730.00",
    status: "PENDING" as const,
  },
];

/* -------------------------------------------------------------- fragments */

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PanelTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-[#1A56DB]">{title}</h3>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  valueClass,
  foot,
}: {
  label: string;
  value: string;
  icon: typeof Activity;
  accent: string;
  valueClass?: string;
  foot?: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(16,24,40,0.05)]"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-500">{label}</p>
        <Icon className="size-4 shrink-0" style={{ color: accent }} />
      </div>
      <p className={cn("mt-3 text-3xl font-bold text-[#1A56DB]", valueClass)}>{value}</p>
      {foot && <div className="mt-2 text-xs text-slate-400">{foot}</div>}
    </div>
  );
}

function Donut({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="58%"
              outerRadius="92%"
              paddingAngle={1}
              stroke="#ffffff"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {data.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="size-2 rounded-full" style={{ background: d.color }} />
            {d.name}
          </span>
        ))}
      </div>
    </>
  );
}

function DateField({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
        {label}
      </label>
      <input
        type="date"
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#1A56DB] outline-none focus:border-[#1A56DB]"
      />
    </div>
  );
}

function AutoQuoterModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#EEF0F4] px-7 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1A56DB] to-[#06D6A0]">
              <Car className="size-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#16305C]">Auto Insurance Quoter</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#16305C]"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-7 py-10 text-center text-sm text-slate-400">
          The auto quoting flow will live here.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ view */

export function PortalDashboard({ isSeller = false }: { isSeller?: boolean }) {
  const [quoterOpen, setQuoterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Panel className="bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <DateField label="From" />
          <DateField label="To" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="h-9 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Clear
          </button>
          <button className="h-9 rounded-lg bg-gradient-to-r from-[#1A56DB] to-[#06D6A0] px-4 text-sm font-semibold text-white shadow-sm hover:opacity-90">
            Apply Filters
          </button>
        </div>
      </Panel>

      {/* Title */}
      <div className="flex items-center gap-5">
        <div className="flex size-14 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-br from-[#1A56DB] to-[#06D6A0] shadow-sm">
          <Sparkles className="size-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-[#1A56DB]">Dashboard</h1>
          <div className="mt-2 flex h-8 max-w-md items-center gap-2 rounded-full bg-slate-100 px-3">
            <Activity className="size-3.5 text-[#06D6A0]" />
          </div>
        </div>
        <button
          onClick={() => setQuoterOpen(true)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#06D6A0] px-5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
        >
          <Plus className="size-4" /> New Auto Quote
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Auto Quotes"
          value="128"
          icon={Car}
          accent="#1A56DB"
        />
        <StatCard
          label="Active Policies"
          value="74"
          icon={ShieldCheck}
          accent="#06D6A0"
          valueClass="text-[#06D6A0]"
        />
        <StatCard
          label="Total Premium ($)"
          value="$96,412.80"
          icon={CircleDollarSign}
          accent="#0EA5E9"
          valueClass="text-[#0EA5E9]"
        />
        {!isSeller && (
          <StatCard
            label="Commission Generated"
            value="$8,214.55"
            icon={TrendingUp}
            accent="#F59E0B"
            valueClass="text-[#F59E0B]"
            foot={<span className="font-semibold text-[#F59E0B]">+$1,180.40 this month</span>}
          />
        )}
      </div>

      {/* Recent Activity */}
      <Panel>
        <PanelTitle title="Recent Activity" subtitle="Last 5 vehicles quoted." />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-[0.08em] text-slate-400">
                <th className="py-2 pr-3 text-left font-semibold">Date</th>
                <th className="py-2 pr-3 text-left font-semibold">Client</th>
                <th className="py-2 pr-3 text-left font-semibold">Vehicle</th>
                <th className="py-2 pr-3 text-left font-semibold">Total Premium</th>
                <th className="py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ACTIVITY.map((v, i) => (
                <tr key={i} className="border-b border-slate-100 align-middle last:border-0">
                  <td className="py-3 pr-3 whitespace-nowrap text-slate-600">{v.date}</td>
                  <td className="py-3 pr-3 font-medium text-[#1A56DB]">{v.client}</td>
                  <td className="py-3 pr-3 text-slate-600">{v.vehicle}</td>
                  <td className="py-3 pr-3 font-semibold tabular-nums text-slate-700">
                    {v.premium}
                  </td>
                  <td className="py-3">
                    <span
                      className={cn(
                        "inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-wide",
                        v.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700",
                      )}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Donuts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelTitle title="Distribution by Carrier" subtitle="Policies issued this month." />
          <Donut data={DISTRIBUTION} />
        </Panel>
        <Panel>
          <PanelTitle
            title="Quoted Carriers"
            subtitle="Distribution of quoted requests by carrier."
          />
          <Donut data={QUOTED_CARRIERS} />
        </Panel>
      </div>

      {/* Secondary date range */}
      <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-slate-500">
        <span>From:</span>
        <input
          type="date"
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#1A56DB]"
        />
        <span>To:</span>
        <input
          type="date"
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#1A56DB]"
        />
      </div>

      {/* Visits */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelTitle title="Visits Activity" subtitle="Summary of visits registered by agents." />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VISITS} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="transparent" />
                <XAxis
                  dataKey="agent"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <YAxis
                  ticks={[0, 4, 8, 12, 16]}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Bar dataKey="bottom" stackId="a" fill="#06D6A0" isAnimationActive={false} />
                <Bar dataKey="top" stackId="a" fill="#1A56DB" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle title="Recent Visits" subtitle="Last 5 visits registered in the agency." />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] uppercase tracking-[0.08em] text-slate-400">
                  <th className="py-2 pr-3 text-left font-semibold">Date</th>
                  <th className="py-2 pr-3 text-left font-semibold">Agent</th>
                  <th className="py-2 pr-3 text-left font-semibold">Client</th>
                  <th className="py-2 pr-3 text-left font-semibold">Status</th>
                  <th className="py-2 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: "28/8/2026",
                    agent: "aracely.hernandez",
                    client: "Younger Brothers Companies",
                    status: "PENDING" as const,
                    notes: "Se hizo una visita en frío de acuerdo a",
                  },
                  {
                    date: "27/8/2026",
                    agent: "aracely.hernandez",
                    client: "A&A Professional Group",
                    status: "COMPLETED" as const,
                    notes: "Tendremos una reunion de...",
                  },
                  {
                    date: "27/8/2026",
                    agent: "aracely.hernandez",
                    client: "Patrimonia Legal LLC",
                    status: "PENDING" as const,
                    notes: "Hablamos acerca de su seguro y...",
                  },
                  {
                    date: "27/8/2026",
                    agent: "Arantxa Montes",
                    client: "La Esperanza Car Audio (DBA: Ledezma's Electronics)",
                    status: "COMPLETED" as const,
                    notes: "Acordando próxima cita en persona...",
                  },
                  {
                    date: "27/8/2026",
                    agent: "Arantxa Montes",
                    client: "Yanel Saenz",
                    status: "COMPLETED" as const,
                    notes: "-",
                  },
                ].map((v, i) => (
                  <tr key={i} className="border-b border-slate-100 align-top last:border-0">
                    <td className="py-3 pr-3 text-slate-600">{v.date}</td>
                    <td className="py-3 pr-3 text-slate-600">{v.agent}</td>
                    <td className="py-3 pr-3 font-medium text-[#1A56DB]">{v.client}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={cn(
                          "inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-wide",
                          v.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700",
                        )}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-slate-500">{v.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {quoterOpen && <AutoQuoterModal onClose={() => setQuoterOpen(false)} />}
    </div>
  );
}
