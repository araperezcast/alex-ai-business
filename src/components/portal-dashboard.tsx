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
  { name: "Commonwealth Casualty", value: 18, color: "#E7C79B" },
  { name: "Coterie Insurance", value: 22, color: "#16305C" },
  { name: "Ergo Next", value: 24, color: "#B0563C" },
  { name: "Foremost Insurance", value: 18, color: "#6B7C93" },
  { name: "Novo Insurance", value: 18, color: "#1141E8" },
];

const QUOTED_CARRIERS = [
  { name: "AssuranceAmerica", value: 8, color: "#121826" },
  { name: "Berxi - Berkshire Hathaway Specialty Insurance Company", value: 8, color: "#121826" },
  { name: "Coterie Insurance", value: 8, color: "#16305C" },
  { name: "Foxquilt", value: 8, color: "#121826" },
  { name: "Hiscox Insurance Company", value: 8, color: "#B0563C" },
  { name: "Kemper Auto", value: 8, color: "#1141E8" },
  { name: "Novo Insurance", value: 8, color: "#121826" },
  { name: "RLI Surety", value: 8, color: "#121826" },
  { name: "RT Connector", value: 8, color: "#E7C79B" },
  { name: "Simply Business", value: 8, color: "#121826" },
  { name: "Slice Insurance", value: 8, color: "#121826" },
  { name: "THREE by Berkshire Hathaway", value: 8, color: "#6B7C93" },
  { name: "ePremium", value: 8, color: "#121826" },
];

const VISITS = [
  { agent: "Arantxa Montes", top: 0, bottom: 15, colors: ["#B0563C"] },
  { agent: "aracely.hernandez", top: 8, bottom: 5, colors: ["#6B7C93", "#B0563C"] },
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
        "rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
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
      <h3 className="font-serif text-lg font-bold text-[#16305C]">{title}</h3>
      {subtitle && <p className="mt-0.5 text-sm text-[#7A8494]">{subtitle}</p>}
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
      className="relative overflow-hidden rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-[#5A6474]">{label}</p>
        <Icon className="size-4 shrink-0" style={{ color: accent }} />
      </div>
      <p className={cn("mt-3 font-serif text-3xl font-bold text-[#16305C]", valueClass)}>{value}</p>
      {foot && <div className="mt-2 text-xs text-[#7A8494]">{foot}</div>}
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
              stroke="#FCFAF7"
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
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-[#3F4959]">
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
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A93A2]">
        {label}
      </label>
      <input
        type="date"
        className="h-10 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#16305C] outline-none focus:border-[#16305C]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ view */

export function PortalDashboard() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Panel className="bg-[#FBF9F6] p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DateField label="From" />
          <DateField label="To" />
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A93A2]">
              Agency
            </label>
            <div className="flex h-10 items-center rounded-lg border border-[#E2E8F0] bg-[#F3F4F6] px-3 text-sm text-[#5A6474]">
              All Agencies
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A93A2]">
              Agent(s)
            </label>
            <div className="flex h-10 items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#16305C]">
              All Agents <span className="text-[10px] text-[#8A93A2]">▼</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="h-9 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#3F4959] hover:bg-[#F8FAFC]">
            Clear
          </button>
          <button className="h-9 rounded-lg bg-[#16305C] px-4 text-sm font-semibold text-white hover:opacity-90">
            Apply Filters
          </button>
        </div>
      </Panel>

      {/* Title */}
      <div className="flex items-center gap-5">
        <div className="flex size-14 items-center justify-center rounded-full border border-[#EDE7DE] bg-[#FBF6EE] shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <Sparkles className="size-6 text-[#16305C]" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-3xl font-bold text-[#16305C]">Dashboard</h1>
          <div className="mt-2 flex h-8 max-w-md items-center gap-2 rounded-full bg-[#F3F0EB] px-3">
            <Activity className="size-3.5 text-[#07D6A0]" />
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Quoted Premium"
          value="$27,878.21"
          icon={CircleDollarSign}
          accent="#16305C"
        />
        <StatCard
          label="Accepted Premium"
          value="$3,218.43"
          icon={CheckCircle2}
          accent="#12A150"
          valueClass="text-[#12A150]"
        />
        <StatCard
          label="Commissions Generated"
          value="$374.36"
          icon={Activity}
          accent="#C79A5B"
          valueClass="text-[#B98A46]"
          foot={<span className="font-semibold text-[#B98A46]">+$2,632.33 potential</span>}
        />
        <StatCard
          label="Pending Quotes"
          value="1"
          icon={Copy}
          accent="#B0563C"
          foot={
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#B0563C]" />1 require review
            </span>
          }
        />
        <StatCard
          label="Hit Ratio"
          value="100%"
          icon={TrendingUp}
          accent="#16305C"
          foot={
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#16305C]" />
              <b className="text-[#16305C]">3</b> ganadas de 3
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
                tick={{ fill: "#7A8494", fontSize: 12 }}
              />
              <YAxis
                ticks={[0, 7000, 14000, 21000, 28000]}
                tickFormatter={(v: number) => `$${v}`}
                tickLine={false}
                axisLine={false}
                width={70}
                tick={{ fill: "#7A8494", fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#16305C"
                strokeWidth={2}
                dot={{ r: 3.5, fill: "#16305C" }}
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
      <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-[#5A6474]">
        <span>From:</span>
        <input
          type="date"
          className="h-9 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#16305C]"
        />
        <span>To:</span>
        <input
          type="date"
          className="h-9 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#16305C]"
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
                  tick={{ fill: "#7A8494", fontSize: 12 }}
                />
                <YAxis
                  ticks={[0, 4, 8, 12, 16]}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  tick={{ fill: "#7A8494", fontSize: 12 }}
                />
                <Bar dataKey="bottom" stackId="a" fill="#B0563C" isAnimationActive={false} />
                <Bar dataKey="top" stackId="a" fill="#6B7C93" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle title="Recent Visits" subtitle="Last 5 visits registered in the agency." />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EDE7DE] text-[11px] uppercase tracking-[0.08em] text-[#8A93A2]">
                  <th className="py-2 pr-3 text-left font-semibold">Date</th>
                  <th className="py-2 pr-3 text-left font-semibold">Agent</th>
                  <th className="py-2 pr-3 text-left font-semibold">Client</th>
                  <th className="py-2 pr-3 text-left font-semibold">Status</th>
                  <th className="py-2 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_VISITS.map((v, i) => (
                  <tr key={i} className="border-b border-[#F1ECE4] align-top last:border-0">
                    <td className="py-3 pr-3 text-[#3F4959]">{v.date}</td>
                    <td className="py-3 pr-3 text-[#3F4959]">{v.agent}</td>
                    <td className="py-3 pr-3 font-medium text-[#16305C]">{v.client}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={cn(
                          "inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-wide",
                          v.status === "PENDING"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#DCFCE7] text-[#166534]",
                        )}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-[#7A8494]">{v.notes}</td>
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
