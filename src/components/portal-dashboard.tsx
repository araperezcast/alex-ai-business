import {
  Activity,
  CircleDollarSign,
  CheckCircle2,
  Copy,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data */

const QUOTE_EVOLUTION = [
  { m: "Jan", v: 0 },
  { m: "Feb", v: 0 },
  { m: "Mar", v: 0 },
  { m: "Apr", v: 0 },
  { m: "May", v: 0 },
  { m: "Jun", v: 0 },
  { m: "Jul", v: 0 },
  { m: "Aug", v: 27878 },
  { m: "Sep", v: 0 },
  { m: "Oct", v: 0 },
  { m: "Nov", v: 0 },
  { m: "Dec", v: 0 },
];

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

const RECENT_VISITS = [
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

/* ------------------------------------------------------------------ view */

export function PortalDashboard() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Panel className="bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DateField label="From" />
          <DateField label="To" />
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Agency
            </label>
            <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
              All Agencies
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
              Agent(s)
            </label>
            <div className="flex h-10 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#1A56DB]">
              All Agents <span className="text-[10px] text-slate-400">▼</span>
            </div>
          </div>
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
      </div>

      {/* KPIs */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Quoted Premium"
          value="$27,878.21"
          icon={CircleDollarSign}
          accent="#1A56DB"
        />
        <StatCard
          label="Accepted Premium"
          value="$3,218.43"
          icon={CheckCircle2}
          accent="#06D6A0"
          valueClass="text-[#06D6A0]"
        />
        <StatCard
          label="Commissions Generated"
          value="$374.36"
          icon={Activity}
          accent="#0EA5E9"
          valueClass="text-[#0EA5E9]"
          foot={<span className="font-semibold text-[#0EA5E9]">+$2,632.33 potential</span>}
        />
        <StatCard
          label="Pending Quotes"
          value="1"
          icon={Copy}
          accent="#F59E0B"
          foot={
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#F59E0B]" />1 require review
            </span>
          }
        />
        <StatCard
          label="Hit Ratio"
          value="100%"
          icon={TrendingUp}
          accent="#1A56DB"
          foot={
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#1A56DB]" />
              <b className="text-[#1A56DB]">3</b> ganadas de 3
            </span>
          }
        />
      </div>

      {/* Quote Evolution */}
      <Panel>
        <PanelTitle title="Quote Evolution" subtitle="Quoted premiums in the last quarter." />
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={QUOTE_EVOLUTION} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="transparent" />
              <XAxis
                dataKey="m"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
              />
              <YAxis
                ticks={[0, 7000, 14000, 21000, 28000]}
                tickFormatter={(v: number) => `$${v}`}
                tickLine={false}
                axisLine={false}
                width={70}
                tick={{ fill: "#94A3B8", fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#1A56DB"
                strokeWidth={2}
                dot={{ r: 3.5, fill: "#1A56DB" }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
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
                {RECENT_VISITS.map((v, i) => (
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
    </div>
  );
}
