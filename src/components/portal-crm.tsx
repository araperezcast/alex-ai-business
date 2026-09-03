import {
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageSquareText,
  Plus,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Visit = {
  client: string;
  date: string;
  type: string;
  comments: string;
  agreements?: string[];
  companion?: string;
  location?: string;
  agent?: string;
};

const pendingVisits: Visit[] = [
  { client: "Younger Brothers Companies", date: "27 AGO 2026, 10:30 AM", type: "FOLLOW UP", comments: "Contactar al cliente para revisar la renovación y confirmar información pendiente. Preparar comparativo de coberturas y próximos pasos.", agent: "Diego J." },
  { client: "Patriotrise Legal LLC", date: "26 AGO 2026, 4:00 PM", type: "PROSPECTING", comments: "Presentación inicial del portafolio comercial. El cliente está interesado en opciones de responsabilidad profesional y protección cyber.", agreements: ["Enviar cuestionario", "Preparar propuesta"], companion: "Laura R.", location: "Zoom", agent: "Diego J." },
  { client: "SJ Sizemore Cleaning Services, LLC", date: "26 AGO 2026, 11:00 AM", type: "RENEWAL", comments: "Dar seguimiento a la renovación de Workers Compensation y General Liability. Solicitar payroll actualizado.", agreements: ["Revisar siniestralidad"], agent: "Diego J." },
  { client: "MTM Tax & Accounting Services, LLC", date: "25 AGO 2026, 9:15 AM", type: "PROSPECTING", comments: "Reunión para presentar alternativas Cyber y E&O para la firma contable.", agent: "Diego J." },
  { client: "Noeme M. Feliciano Skinmates, LLC.", date: "24 AGO 2026, 3:30 PM", type: "FOLLOW UP", comments: "Confirmar información de operaciones y exclusiones para concluir la cotización de Professional Liability.", agreements: ["Actualizar solicitud"], agent: "Diego J." },
  { client: "Karla Anaya Gomez", date: "24 AGO 2026, 11:00 AM", type: "RENEWAL", comments: "Actualizar valores comerciales de la flotilla y confirmar deducibles antes de presentar opciones.", agent: "Diego J." },
  { client: "V7 Handyman", date: "23 AGO 2026, 2:00 PM", type: "PROSPECTING", comments: "Revisión de exposición y actividades. Preparar propuesta de General Liability y Tools antes del cierre de semana.", agreements: ["Enviar aplicación"], location: "Presencial", agent: "Diego J." },
];

const completedVisits: Visit[] = [
  { client: "A&A Professional Group", date: "22 AGO 2026, 10:00 AM", type: "RENEWAL", comments: "Renovación colocada con el carrier titular. El cliente aprobó términos y prima.", agreements: ["Enviar COI", "Programar QBR"], agent: "Diego J." },
  { client: "La Esperanza Car Audio DBA Lorenzo's Electronics", date: "21 AGO 2026, 4:30 PM", type: "PROSPECTING", comments: "Se presentó la cotización de Property + GL y se inició el proceso de emisión.", agreements: ["Enviar póliza", "Iniciar onboarding"], agent: "Laura R." },
  { client: "Yanel Suárez", date: "21 AGO 2026, 1:00 PM", type: "FOLLOW UP", comments: "Emisión de póliza auto. El cliente completó el pago de la anualidad.", agent: "Laura R." },
  { client: "Yanel Suárez", date: "20 AGO 2026, 4:10 PM", type: "FOLLOW UP", comments: "Confirmación de documentos y beneficiarios de la póliza.", agent: "Laura R." },
  { client: "Yanel Suárez", date: "20 AGO 2026, 1:20 PM", type: "SERVICE", comments: "Revisión final de datos y entrega de documentación digital.", agent: "Laura R." },
  { client: "La Esperanza Car Audio DBA Lorenzo's Electronics", date: "19 AGO 2026, 5:00 PM", type: "FOLLOW UP", comments: "Revisión de coberturas y límites solicitados para la ubicación principal.", agreements: ["Ajustar límites", "Enviar comparativo"], agent: "Laura R." },
  { client: "La Esperanza Car Audio DBA Lorenzo's Electronics", date: "19 AGO 2026, 11:30 AM", type: "PROSPECTING", comments: "Levantamiento de información del negocio y activos asegurables.", agreements: ["Fotos del local", "Inventario actualizado"], agent: "Laura R." },
  { client: "La Esperanza Car Audio DBA Lorenzo's Electronics", date: "18 AGO 2026, 3:00 PM", type: "SERVICE", comments: "Seguimiento de requisitos de suscripción y documentación pendiente.", agreements: ["Enviar solicitud"], agent: "Laura R." },
  { client: "GREEN GODDESS HOUSE OF HERBS", date: "18 AGO 2026, 10:00 AM", type: "RENEWAL", comments: "Revisión de renovación Product Liability y nueva línea de productos.", agreements: ["Solicitar ventas", "Revisar etiquetas"], agent: "Diego J." },
  { client: "GREEN GODDESS HOUSE OF HERBS", date: "17 AGO 2026, 2:30 PM", type: "FOLLOW UP", comments: "Se confirmaron operaciones, productos y canales de distribución.", agreements: ["Actualizar propuesta"], agent: "Diego J." },
  { client: "AP Bookkeeping", date: "16 AGO 2026, 12:00 PM", type: "PROSPECTING", comments: "Presentación de alternativas Cyber y E&O. Cliente solicitó incluir capacitación anti-phishing.", agreements: ["Enviar cotización"], agent: "Diego J." },
  { client: "AP Bookkeeping", date: "15 AGO 2026, 9:00 AM", type: "FOLLOW UP", comments: "Seguimiento de documentación y confirmación de facturación anual.", agreements: ["Completar aplicación"], agent: "Diego J." },
  { client: "Altec", date: "14 AGO 2026, 4:00 PM", type: "SERVICE", comments: "Revisión de certificados vigentes y actualización de asegurados adicionales.", agent: "Diego J." },
  { client: "Toro Taxes", date: "13 AGO 2026, 11:00 AM", type: "PROSPECTING", comments: "Reunión exploratoria para conocer las necesidades de la firma y presentar el portafolio de coberturas comerciales.", agreements: ["Enviar brochure"], agent: "Diego J." },
  { client: "Fortgreen Mexico", date: "12 AGO 2026, 3:00 PM", type: "RENEWAL", comments: "Ajuste de suma asegurada para marine cargo por apertura de nueva ruta México–Texas.", agreements: ["Emitir endoso"], agent: "Diego J." },
  { client: "GREEN GODDESS HOUSE OF HERBS", date: "11 AGO 2026, 10:30 AM", type: "FOLLOW UP", comments: "Validación de información y revisión de condiciones de renovación.", agreements: ["Confirmar pago"], agent: "Diego J." },
  { client: "AP Bookkeeping", date: "10 AGO 2026, 9:30 AM", type: "SERVICE", comments: "Entrega de póliza y explicación de coberturas contratadas.", agent: "Diego J." },
];

export function PortalCRM() {
  return (
    <div className="mx-auto w-full max-w-[1540px] pb-12">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div>
          <h1 className="font-serif text-[26px] font-bold leading-tight text-[#102C55]">CRM &amp; Activity Log</h1>
          <p className="mt-1 text-[12px] text-[#7D8797]">Manage visits, follow-ups, tasks and agreements with your clients.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 rounded-md border-[#DDD8D1] bg-[#FFFDFC] px-3 text-[11px] text-[#33445F] shadow-none">
            <CalendarDays className="size-3.5" /> New Task
          </Button>
          <Button size="sm" className="h-8 rounded-md bg-[#102C55] px-3 text-[11px] text-white hover:bg-[#102C55]/90">
            <Plus className="size-3.5" /> Log Visit
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <VisitColumn title="Pending" visits={pendingVisits} pending />
        <VisitColumn title="Completed" visits={completedVisits} />
      </div>
    </div>
  );
}

function VisitColumn({ title, visits, pending = false }: { title: string; visits: Visit[]; pending?: boolean }) {
  return (
    <section>
      <div className="mb-2 flex h-6 items-center gap-2 px-1">
        <span className={`flex size-4 items-center justify-center rounded-full ${pending ? "bg-[#FFF0CD] text-[#C88418]" : "bg-[#DDF8EE] text-[#0B9E74]"}`}>
          {pending ? <Clock3 className="size-2.5" /> : <Check className="size-2.5" />}
        </span>
        <h2 className="text-[12px] font-semibold text-[#263B5B]">{title}</h2>
        <span className="text-[10px] text-[#9AA2AE]">{visits.length}</span>
      </div>
      <div className="space-y-2">
        {visits.map((visit, index) => (
          <VisitCard key={`${visit.client}-${visit.date}-${index}`} visit={visit} pending={pending} />
        ))}
      </div>
    </section>
  );
}

function VisitCard({ visit, pending }: { visit: Visit; pending: boolean }) {
  return (
    <article className="overflow-hidden rounded-[7px] border border-[#E8E6E2] bg-[#FFFDFC] shadow-[0_1px_4px_rgba(30,44,67,0.05)]">
      <div className="flex items-start justify-between gap-3 px-3.5 pb-2 pt-3">
        <div className="min-w-0">
          <h3 className="truncate text-[11px] font-semibold leading-4 text-[#203657]">{visit.client}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-[8px] text-[#929AA6]"><CalendarDays className="size-2.5" /> {visit.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${pending ? "bg-[#FFF2D8] text-[#C88619]" : "bg-[#DDF8EE] text-[#12916F]"}`}>
            {pending ? "Pending" : "Completed"}
          </span>
          <span className="flex size-5 items-center justify-center rounded-md border border-[#ECE9E4] text-[#85909F]"><MessageSquareText className="size-2.5" /></span>
        </div>
      </div>

      <div className="border-y border-[#F0EEE9] bg-[#F7F8F9] px-3.5 py-2.5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="rounded border border-[#DFE3E7] bg-white px-1.5 py-0.5 text-[7px] font-medium text-[#6F7886]">{visit.type}</span>
          <span className="rounded border border-[#DFE3E7] bg-white px-1.5 py-0.5 text-[7px] font-medium text-[#6F7886]">COMMERCIAL</span>
        </div>
        <p className="text-[8px] font-semibold uppercase text-[#657185]">Comments / Notes</p>
        <p className="mt-1 text-[9px] leading-[1.55] text-[#5D6878]">{visit.comments}</p>
      </div>

      {visit.agreements && (
        <div className="px-3.5 py-2">
          <p className="text-[8px] font-semibold uppercase text-[#657185]">Agreements</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {visit.agreements.map((agreement) => (
              <span key={agreement} className="rounded border border-[#DDE1E6] bg-[#FAFAFA] px-1.5 py-0.5 text-[7px] text-[#5F6978]">{agreement}</span>
            ))}
          </div>
        </div>
      )}

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#F0EEE9] px-3.5 py-2 text-[7px] text-[#87909D]">
        {visit.companion && <span className="inline-flex items-center gap-1"><UsersRound className="size-2.5" /> {visit.companion}</span>}
        {visit.location && <span className="inline-flex items-center gap-1"><MapPin className="size-2.5" /> {visit.location}</span>}
        <span className="inline-flex items-center gap-1"><UserRound className="size-2.5" /> {visit.agent ?? "Diego J."}</span>
      </footer>
    </article>
  );
}