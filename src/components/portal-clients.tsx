import { useMemo, useState } from "react";
import { Search, Users, Building2, Mail, Phone, MapPin, FileText, ShieldCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Client = {
  id: string;
  name: string;
  industry: string;
  city: string;
  contact: string;
  email: string;
  phone: string;
  activePolicies: number;
  premium: string;
  status: "Active" | "Prospect" | "Renewal";
  since: string;
  brokers: string[];
  verticals: string[];
};

const CLIENTS: Client[] = [
  { id: "cl-01", name: "Grupo Joffroy", industry: "Customs & Logistics", city: "Nuevo Laredo, MX", contact: "Diego Joffroy", email: "diego@joffroy.com", phone: "+52 867 712 4400", activePolicies: 12, premium: "$482,300", status: "Active", since: "2019", brokers: ["Alex AI Desk"], verticals: ["Cargo", "Cyber", "GL"] },
  { id: "cl-02", name: "Younger Brothers Companies", industry: "Trucking", city: "Phoenix, AZ", contact: "Karen Younger", email: "ap@youngerbros.com", phone: "+1 602 233 1911", activePolicies: 8, premium: "$318,900", status: "Renewal", since: "2021", brokers: ["Alex AI Desk"], verticals: ["Auto", "Cargo"] },
  { id: "cl-03", name: "AP Bookkeeping", industry: "Professional Services", city: "Austin, TX", contact: "Alan Perez", email: "alan@apbooks.io", phone: "+1 512 660 2033", activePolicies: 3, premium: "$41,200", status: "Active", since: "2023", brokers: ["Alex AI Desk"], verticals: ["Cyber", "E&O"] },
  { id: "cl-04", name: "La Esperanza Car Audio", industry: "Retail", city: "McAllen, TX", contact: "Luis Ordoñez", email: "luis@laesperanza.mx", phone: "+1 956 220 8891", activePolicies: 2, premium: "$28,750", status: "Prospect", since: "2026", brokers: ["Alex AI Desk"], verticals: ["Property", "GL"] },
  { id: "cl-05", name: "Fortgreens Mexico", industry: "Agro Exports", city: "Culiacán, MX", contact: "Ana Salcedo", email: "ana@fortgreens.mx", phone: "+52 667 219 0011", activePolicies: 5, premium: "$164,500", status: "Active", since: "2022", brokers: ["Alex AI Desk"], verticals: ["Cargo", "Property"] },
  { id: "cl-06", name: "GREEN GODDESS HOUSE OF HERBS", industry: "Wholesale", city: "Los Angeles, CA", contact: "Priya Mehta", email: "priya@greengoddess.com", phone: "+1 213 445 7712", activePolicies: 4, premium: "$96,120", status: "Active", since: "2024", brokers: ["Alex AI Desk"], verticals: ["Product Liability"] },
  { id: "cl-07", name: "Noeme M. Feliciano Skinmates, LLC.", industry: "Health & Beauty", city: "San Juan, PR", contact: "Noeme Feliciano", email: "noeme@skinmates.co", phone: "+1 787 322 1180", activePolicies: 2, premium: "$22,300", status: "Prospect", since: "2026", brokers: ["Alex AI Desk"], verticals: ["Professional Liability"] },
  { id: "cl-08", name: "SJ Sizemore Cleaning Services, LLC", industry: "Facility Services", city: "Atlanta, GA", contact: "Steven Sizemore", email: "steven@sjsizemore.com", phone: "+1 404 553 2098", activePolicies: 6, premium: "$74,900", status: "Renewal", since: "2020", brokers: ["Alex AI Desk"], verticals: ["WC", "GL"] },
];

const STATUS_COLORS: Record<Client["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Prospect: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  Renewal: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
};

export function PortalClients() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      CLIENTS.filter((c) =>
        `${c.name} ${c.industry} ${c.city} ${c.contact}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  const selected = filtered.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-bold text-[#16305C]">Clients Directory</h1>
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#94A0B4]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client..."
            className="h-11 w-full rounded-full border border-[#E5DED2] bg-white/70 pl-10 pr-4 text-sm text-[#16305C] placeholder:text-[#94A0B4] focus:border-[#16305C] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* Left list */}
        <div className="rounded-2xl border border-[#EDE7DE] bg-white/80">
          <div className="border-b border-[#EDE7DE] px-5 py-4">
            <p className="font-semibold text-[#16305C]">{filtered.length} Clients found</p>
          </div>
          <div className="max-h-[640px] overflow-y-auto p-3">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-sm text-[#7A8494]">No matches</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F6F1E8]",
                    selected?.id === c.id && "bg-[#F1EBDE] ring-1 ring-inset ring-[#E5DED2]",
                  )}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#16305C]/5 text-[#16305C]">
                    <Building2 className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#16305C]">{c.name}</p>
                    <p className="truncate text-xs text-[#7A8494]">
                      {c.industry} · {c.city}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", STATUS_COLORS[c.status])}>
                        {c.status}
                      </span>
                      <span className="text-[11px] text-[#7A8494]">{c.activePolicies} pólizas</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right detail */}
        <div className="min-h-[640px] rounded-2xl border border-[#EDE7DE] bg-white/80">
          {!selected ? (
            <div className="flex h-full min-h-[640px] flex-col items-center justify-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#EFE9DC] text-[#94A0B4]">
                <Search className="size-7" />
              </div>
              <p className="mt-4 text-sm text-[#7A8494]">
                Select a client to view their 360° information
              </p>
            </div>
          ) : (
            <div className="space-y-6 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-[#16305C]/5 text-[#16305C]">
                    <Building2 className="size-7" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#16305C]">{selected.name}</h2>
                    <p className="text-sm text-[#7A8494]">
                      {selected.industry} · Cliente desde {selected.since}
                    </p>
                  </div>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", STATUS_COLORS[selected.status])}>
                  {selected.status}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard icon={FileText} label="Pólizas activas" value={String(selected.activePolicies)} />
                <StatCard icon={TrendingUp} label="Prima anual" value={selected.premium} />
                <StatCard icon={ShieldCheck} label="Verticales" value={String(selected.verticals.length)} />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Section title="Contacto principal">
                  <Detail icon={Users} label="Nombre" value={selected.contact} />
                  <Detail icon={Mail} label="Email" value={selected.email} />
                  <Detail icon={Phone} label="Teléfono" value={selected.phone} />
                  <Detail icon={MapPin} label="Ciudad" value={selected.city} />
                </Section>

                <Section title="Cobertura & desk">
                  <div className="flex flex-wrap gap-2">
                    {selected.verticals.map((v) => (
                      <span key={v} className="rounded-full bg-[#16305C]/5 px-3 py-1 text-xs font-semibold text-[#16305C]">
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide text-[#7A8494]">Broker asignado</p>
                    <p className="mt-1 text-sm font-semibold text-[#16305C]">{selected.brokers.join(", ")}</p>
                  </div>
                </Section>
              </div>

              <Section title="Historial reciente">
                <ul className="space-y-2 text-sm text-[#16305C]">
                  <li className="flex justify-between border-b border-dashed border-[#EDE7DE] py-2">
                    <span>Renovación Cargo — Marine Cargo</span>
                    <span className="text-[#7A8494]">Hace 12 días</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-[#EDE7DE] py-2">
                    <span>COI emitido — Pedimento 26 007823</span>
                    <span className="text-[#7A8494]">Hace 3 semanas</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span>Reunión trimestral — QBR Q2</span>
                    <span className="text-[#7A8494]">Hace 1 mes</span>
                  </li>
                </ul>
              </Section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#EDE7DE] bg-[#FCFAF6] p-4">
      <div className="flex items-center gap-2 text-[#7A8494]">
        <Icon className="size-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 font-serif text-2xl font-bold text-[#16305C]">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#EDE7DE] bg-[#FCFAF6] p-5">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#7A8494]">{title}</p>
      {children}
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-dashed border-[#EDE7DE] py-2 last:border-b-0">
      <Icon className="size-4 text-[#7A8494]" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-[#7A8494]">{label}</p>
        <p className="truncate text-sm font-medium text-[#16305C]">{value}</p>
      </div>
    </div>
  );
}
