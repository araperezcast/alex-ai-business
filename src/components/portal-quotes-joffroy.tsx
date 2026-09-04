import { useState } from "react";
import {
  Clock,
  Eye,
  Link2,
  Pencil,
  Plus,
  RefreshCw,
  Copy,
  UserPlus,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "Quoted" | "Pending Manager" | "Accepted";

type Row = {
  client: string;
  carrier: string;
  coberturas: string;
  creador: string;
  asignado: string;
  status: Status;
  action: "proposals" | "cotizar";
};

const ROWS: Row[] = [
  {
    client: "VZ Handyworks",
    carrier:
      "Berxi - Berkshire Hathaway Specialty Insurance Company, Simply Business, Slice Insurance, Hiscox Insurance Company",
    coberturas: "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property)",
    creador: "aracely.hernandez",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "SJ Grandma's Cleaning Services LLC.",
    carrier: "ePremium, AssuranceAmerica, Novo Insurance, Kemper Auto, Foxquilt, Simply Business, RLI Surety",
    coberturas: "Auto Personal, Inquilinos (Renters), Responsabilidad Civil General (GL), Otro / No Listado",
    creador: "aracely.hernandez",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "Patrimonia Legal LLC",
    carrier: "Hiscox Insurance Company, Simply Business, Coterie Insurance",
    coberturas: "Responsabilidad Cibernética (Cyber Liability), Responsabilidad Civil General (GL)",
    creador: "aracely.hernandez",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "Haro's Cleaning Specialist",
    carrier: "Coterie Insurance, RLI Surety, AmTrust Insurance, Chubb",
    coberturas: "Responsabilidad Civil General (GL), Otro / No Listado",
    creador: "aracely.hernandez",
    asignado: "Unassigned",
    status: "Pending Manager",
    action: "cotizar",
  },
  {
    client: "Yanel Saenz",
    carrier: "Commonwealth Casualty, Foremost Insurance",
    coberturas: "Propietarios (Homeowners)",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Accepted",
    action: "cotizar",
  },
  {
    client: "Yanel Saenz",
    carrier: "Novo Insurance",
    coberturas: "Auto Personal",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Accepted",
    action: "cotizar",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "Coterie Insurance, Ergo Next",
    coberturas: "Business Owner's Policy (BOP)",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Accepted",
    action: "cotizar",
  },
  {
    client: "La Esperanza Car Audio (DBA: Ledezma's Electronics)",
    carrier: "RT Connector, THREE by Berkshire Hathaway, Kemper Auto",
    coberturas: "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property), Auto Comercial",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "VZ Handyworks",
    carrier: "Coterie Insurance, Simply Business",
    coberturas: "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property)",
    creador: "aracely.hernandez",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "AP Bookkeping",
    carrier: "Coterie Insurance, Hiscox Insurance Company",
    coberturas: "Errores y Omisiones (E&O) / Professional Liability, Responsabilidad Cibernética (Cyber Liability)",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "TBD",
    coberturas: "Responsabilidad Civil General (GL), Auto Comercial",
    creador: "Josue Lopez",
    asignado: "Arantxa Montes",
    status: "Quoted",
    action: "proposals",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "Coterie Insurance",
    coberturas: "Business Owner's Policy (BOP)",
    creador: "Arantxa Montes",
    asignado: "Unassigned",
    status: "Quoted",
    action: "proposals",
  },
];

const FILTERS = ["All", "Assigned to me", "Created by me"] as const;

const STATUS_STYLES: Record<Status, string> = {
  Quoted: "border-[#C7D7FE] bg-[#EEF4FF] text-[#1A56DB]",
  "Pending Manager": "border-[#FBD9A8] bg-[#FEF3E2] text-[#C2761A]",
  Accepted: "border-[#B7E7CD] bg-[#E7F8EF] text-[#0E8A54]",
};

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0]"
    >
      {children}
    </button>
  );
}

export function PortalQuotesJoffroy() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black tracking-tight text-[#16305C]">Requests Inbox</h1>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === f
                  ? "bg-[#16305C] text-white"
                  : "bg-white text-[#5A6474] hover:bg-[#F1F5F9]",
              )}
            >
              {f}
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-full bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            <Plus className="size-4" /> New Quote
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead>
              <tr className="text-xs font-medium text-[#8A93A2]">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-4 py-4 font-medium">Carrier</th>
                <th className="px-4 py-4 font-medium">Coberturas</th>
                <th className="px-4 py-4 font-medium">Creador</th>
                <th className="px-4 py-4 font-medium">Asignado a</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-t border-[#EEF0F4] align-middle",
                    r.status === "Pending Manager" && "bg-[#FFF9F0]",
                  )}
                >
                  <td className="px-6 py-5 text-sm font-bold text-[#16305C]">{r.client}</td>
                  <td className="max-w-[220px] px-4 py-5 text-sm text-[#3F4A5C]">{r.carrier}</td>
                  <td className="max-w-[220px] px-4 py-5 text-sm text-[#3F4A5C]">{r.coberturas}</td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-[#7A8494]">{r.creador}</td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-[#7A8494]">{r.asignado}</td>
                  <td className="px-4 py-5">
                    <span
                      className={cn(
                        "inline-flex min-w-[100px] items-center justify-center rounded-full border px-4 py-1.5 text-xs font-bold",
                        STATUS_STYLES[r.status],
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn label="History">
                        <Clock className="size-4" />
                      </IconBtn>
                      <IconBtn label="View">
                        <Eye className="size-4" />
                      </IconBtn>
                      {r.status === "Accepted" || r.status === "Pending Manager" ? (
                        <IconBtn label="Assign">
                          <UserPlus className="size-4" />
                        </IconBtn>
                      ) : (
                        <IconBtn label="Copy link">
                          <Link2 className="size-4" />
                        </IconBtn>
                      )}
                      {r.status === "Accepted" || r.status === "Pending Manager" ? (
                        <IconBtn label="Duplicate">
                          <RefreshCw className="size-4" />
                        </IconBtn>
                      ) : (
                        <IconBtn label="Duplicate">
                          <Copy className="size-4" />
                        </IconBtn>
                      )}
                      {r.action === "proposals" ? (
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E9F6E] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                          View Proposals
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#16305C] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                          Cotizar
                        </button>
                      )}
                      <IconBtn label="Edit">
                        <Pencil className="size-4" />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
