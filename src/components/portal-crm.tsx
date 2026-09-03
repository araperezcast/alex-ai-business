import { useMemo, useState } from "react";
import { Plus, MapPin, Users, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type VisitStatus = "Pending" | "Completed";
type Visit = {
  id: string;
  client: string;
  date: string;
  status: VisitStatus;
  tags: string[];
  companion?: string;
  notes: string;
  agreements?: string[];
  location?: string;
  agent: string;
};

const VISITS: Visit[] = [
  { id: "v-01", client: "Younger Brothers Companies", date: "27/AGO/2026 · 10:30 AM", status: "Pending", tags: ["Renovación", "Trucking"], notes: "Preparar comparativo de renovación de cargo. Revisar histórico de siniestralidad de los últimos 24 meses y presentar 3 opciones.", agent: "Diego J." },
  { id: "v-02", client: "Patrones a Legal LLC", date: "26/AGO/2026 · 4:00 PM", status: "Pending", tags: ["Nuevo", "Legal"], notes: "Prospecto referido. Presentar cobertura E&O + Cyber. Enviar solicitud firmada antes del viernes.", companion: "Laura R.", location: "Zoom", agent: "Diego J." },
  { id: "v-03", client: "SJ Sizemore Cleaning Services, LLC", date: "26/AGO/2026 · 11:00 AM", status: "Pending", tags: ["Renovación"], notes: "Renovación WC + GL. Solicitar payroll actualizado. Ajustar por incremento del 12% en headcount.", agent: "Diego J." },
  { id: "v-04", client: "MTM Tax & Accounting Services, LLC", date: "25/AGO/2026 · 9:15 AM", status: "Pending", tags: ["Nuevo"], notes: "Presentación inicial de portafolio. Cliente busca combo Cyber + E&O para su firma contable.", agent: "Diego J." },
  { id: "v-05", client: "Noeme M. Feliciano Skinmates, LLC.", date: "24/AGO/2026 · 3:30 PM", status: "Pending", tags: ["Nuevo"], notes: "Cotización Professional Liability. Confirmar cadena de suministro y verificar exclusiones específicas.", agent: "Diego J." },
  { id: "v-06", client: "Karla Anaya Suárez", date: "24/AGO/2026 · 11:00 AM", status: "Pending", tags: ["Renovación"], notes: "Renovación auto flotilla. Actualizar valores comerciales y confirmar deducibles.", agent: "Diego J." },
  { id: "v-07", client: "VZ Handyworks", date: "23/AGO/2026 · 2:00 PM", status: "Pending", tags: ["Nuevo", "Trades"], notes: "Cotización GL + Tools. Preparar propuesta antes del cierre de semana.", agent: "Diego J." },
  { id: "v-08", client: "A&A Professional Group", date: "22/AGO/2026 · 10:00 AM", status: "Completed", tags: ["Renovación"], notes: "Renovación colocada con carrier titular. Cliente muy conforme con el aumento del 4%.", agreements: ["Envío de COI el lunes", "Programar QBR en 60 días"], agent: "Diego J." },
  { id: "v-09", client: "La Esperanza Car Audio (DBA Lorenzo's Electronics)", date: "21/AGO/2026 · 4:30 PM", status: "Completed", tags: ["Nuevo"], notes: "Presentada cotización Property + GL. Cliente firmó y proceso de emisión iniciado.", agreements: ["Envío póliza en 48h", "Onboarding operativo"], agent: "Laura R." },
  { id: "v-10", client: "Yanel Suárez", date: "21/AGO/2026 · 1:00 PM", status: "Completed", tags: ["Auto"], notes: "Emisión de póliza auto personal. Cliente pagó anualidad completa.", agent: "Laura R." },
  { id: "v-11", client: "GREEN GODDESS HOUSE OF HERBS", date: "20/AGO/2026 · 11:30 AM", status: "Completed", tags: ["Producto"], notes: "Renovación Product Liability. Ajuste por nueva línea de productos.", agreements: ["Endoso adicional en 15 días"], agent: "Diego J." },
  { id: "v-12", client: "AP Bookkeeping", date: "20/AGO/2026 · 9:00 AM", status: "Completed", tags: ["Cyber"], notes: "Colocada Cyber + E&O. Cliente pidió capacitación anti-phishing.", agreements: ["Sesión de capacitación en Q4"], agent: "Diego J." },
  { id: "v-13", client: "Fortgreens Mexico", date: "19/AGO/2026 · 3:00 PM", status: "Completed", tags: ["Cargo"], notes: "Ajuste de suma asegurada en marine cargo por nueva ruta MX–TX. Endoso emitido.", agent: "Diego J." },
];

const STATUS_STYLES: Record<VisitStatus, string> = {
  Pending: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  Completed: "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
};

export function PortalCRM() {
  const [tab, setTab] = useState<VisitStatus>("Pending");
  const pending = useMemo(() => VISITS.filter((v) => v.status === "Pending"), []);
  const completed = useMemo(() => VISITS.filter((v) => v.status === "Completed"), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#16305C]">CRM & Activity Log</h1>
          <p className="mt-1 text-sm text-[#7A8494]">Registro de visitas, seguimientos y acuerdos con clientes.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#E5DED2] bg-white/70 px-4 py-2 text-sm font-medium text-[#16305C] hover:bg-[#F1ECE4]">
            <CalendarIcon className="size-4" /> New Task
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0048FF] to-[#07D6A0] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95">
            <Plus className="size-4" /> Log Visit
          </button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden">
        <div className="inline-flex rounded-full border border-[#E5DED2] bg-white p-1 text-xs font-semibold">
          {(["Pending", "Completed"] as VisitStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={cn(
                "rounded-full px-4 py-1.5",
                tab === s ? "bg-[#16305C] text-white" : "text-[#7A8494]",
              )}
            >
              {s} ({s === "Pending" ? pending.length : completed.length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Column
          title="Pending"
          count={pending.length}
          accent="amber"
          visits={pending}
          className={cn(tab === "Pending" ? "" : "hidden lg:block")}
        />
        <Column
          title="Completed"
          count={completed.length}
          accent="emerald"
          visits={completed}
          className={cn(tab === "Completed" ? "" : "hidden lg:block")}
        />
      </div>
    </div>
  );
}

function Column({
  title,
  count,
  accent,
  visits,
  className,
}: {
  title: string;
  count: number;
  accent: "amber" | "emerald";
  visits: Visit[];
  className?: string;
}) {
  const accentBg = accent === "amber" ? "text-amber-800" : "text-emerald-800";
  return (
    <section className={className}>
      <header className="mb-3 flex items-center justify-between">
        <h2 className={cn("text-sm font-bold uppercase tracking-[0.16em]", accentBg)}>{title}</h2>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#16305C] ring-1 ring-inset ring-[#EDE7DE]">
          {count}
        </span>
      </header>
      <div className="space-y-3">
        {visits.map((v) => (
          <VisitCard key={v.id} visit={v} />
        ))}
      </div>
    </section>
  );
}

function VisitCard({ visit }: { visit: Visit }) {
  return (
    <article className="rounded-2xl border border-[#EDE7DE] bg-white/85 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-[#16305C]">{visit.client}</h3>
          <p className="mt-0.5 text-xs text-[#7A8494]">{visit.date}</p>
        </div>
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide", STATUS_STYLES[visit.status])}>
          {visit.status === "Pending" ? "Pendiente" : "Completado"}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {visit.tags.map((t) => (
          <span key={t} className="rounded-full bg-[#F3EDE0] px-2 py-0.5 text-[10px] font-semibold text-[#7A6B44]">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#7A8494]">Comentarios</p>
      <p className="mt-1 text-sm leading-relaxed text-[#16305C]">{visit.notes}</p>

      {visit.agreements && visit.agreements.length > 0 && (
        <>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#7A8494]">Acuerdos</p>
          <ul className="mt-1 space-y-1">
            {visit.agreements.map((a) => (
              <li key={a} className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800 ring-1 ring-inset ring-emerald-200">
                {a}
              </li>
            ))}
          </ul>
        </>
      )}

      {(visit.companion || visit.location) && (
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-[#7A8494]">
          {visit.companion && (
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" /> Con {visit.companion}
            </span>
          )}
          {visit.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" /> {visit.location}
            </span>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-[#EDE7DE] pt-3 text-[11px] text-[#7A8494]">
        <span>Agente: {visit.agent}</span>
        <span>#{visit.id.toUpperCase()}</span>
      </div>
    </article>
  );
}
