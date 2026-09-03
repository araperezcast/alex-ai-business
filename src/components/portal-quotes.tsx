import { useState } from "react";
import { Copy, Eye, History, Pencil, Repeat2, UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

type Row = {
  client: string;
  carrier: string;
  coverages: string;
  creator: string;
  assignee: string;
  status: "Quoted" | "Pending Manager" | "Accepted";
};

const ROWS: Row[] = [
  {
    client: "VZ Handyworks",
    carrier:
      "Berxi - Berkshire Hathaway Specialty Insurance Company, Simply Business, Slice Insurance, Hiscox Insurance Company",
    coverages: "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property)",
    creator: "aracely.hernandez",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "SJ Grandma's Cleaning Services LLC.",
    carrier:
      "ePremium, AssuranceAmerica, Novo Insurance, Kemper Auto, Foxquilt, Simply Business, RLI Surety",
    coverages:
      "Auto Personal, Inquilinos (Renters), Responsabilidad Civil General (GL), Otro / No Listado",
    creator: "aracely.hernandez",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "Patrimonia Legal LLC",
    carrier: "Hiscox Insurance Company, Simply Business, Coterie Insurance",
    coverages:
      "Responsabilidad Cibernética (Cyber Liability), Responsabilidad Civil General (GL)",
    creator: "aracely.hernandez",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "Haro's Cleaning Specialist",
    carrier: "Coterie Insurance, RLI Surety, AmTrust Insurance, Chubb",
    coverages: "Responsabilidad Civil General (GL), Otro / No Listado",
    creator: "aracely.hernandez",
    assignee: "Unassigned",
    status: "Pending Manager",
  },
  {
    client: "Yanel Saenz",
    carrier: "Commonwealth Casualty, Foremost Insurance",
    coverages: "Propietarios (Homeowners)",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Accepted",
  },
  {
    client: "Yanel Saenz",
    carrier: "Novo Insurance",
    coverages: "Auto Personal",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Accepted",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "Coterie Insurance, Ergo Next",
    coverages: "Business Owner's Policy (BOP)",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Accepted",
  },
  {
    client: "La Esperanza Car Audio (DBA: Ledezma's Electronics)",
    carrier: "RT Connector, THREE by Berkshire Hathaway, Kemper Auto",
    coverages:
      "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property), Auto Comercial",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "VZ Handyworks",
    carrier: "Coterie Insurance, Simply Business",
    coverages: "Responsabilidad Civil General (GL), Propiedad Comercial (Commercial Property)",
    creator: "aracely.hernandez",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "AP Bookkeping",
    carrier: "Coterie Insurance, Hiscox Insurance Company",
    coverages:
      "Errores y Omisiones (E&O) / Professional Liability, Responsabilidad Cibernética (Cyber Liability)",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Quoted",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "TBD",
    coverages: "Responsabilidad Civil General (GL), Auto Comercial",
    creator: "Josue Lopez",
    assignee: "Arantxa Montes",
    status: "Quoted",
  },
  {
    client: "GREEN GODDESS HOUSE OF HERBS",
    carrier: "Coterie Insurance",
    coverages: "Business Owner's Policy (BOP)",
    creator: "Arantxa Montes",
    assignee: "Unassigned",
    status: "Quoted",
  },
];

const FILTERS = ["All", "Assigned to me", "Created by me"] as const;

const STATUS_STYLES: Record<Row["status"], string> = {
  Quoted: "border-[#BFD6FF] bg-[#EAF2FF] text-[#1A56DB]",
  "Pending Manager": "border-[#FBD9A8] bg-[#FEF3E2] text-[#C2761A]",
  Accepted: "border-[#B7E7CD] bg-[#E7F8EF] text-[#0E8A54]",
};

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0]"
    >
      {children}
    </button>
  );
}

export function PortalQuotes() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <h1 className="truncate font-serif text-3xl font-black tracking-tight text-[#16305C]">
          Requests Inbox
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === f
                  ? "bg-[#16305C] text-white"
                  : "bg-white text-[#5A6474] hover:bg-[#F1ECE4]",
              )}
            >
              {f}
            </button>
          ))}
          <button className="rounded-full bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            + New Quote
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-left">
            <thead>
              <tr className="bg-[#FAFAFB] text-xs font-medium text-[#8A93A2]">
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
              {ROWS.map((r, i) => {
                const isCotizar = r.status !== "Quoted";
                return (
                  <tr
                    key={i}
                    className={cn(
                      "border-t border-[#EEF0F4] align-middle",
                      r.status === "Pending Manager" && "bg-[#FCFAF7]",
                    )}
                  >
                    <td className="px-6 py-5 text-sm font-bold text-[#16305C]">{r.client}</td>
                    <td className="max-w-[230px] px-4 py-5 text-sm text-[#3F4A5C]">{r.carrier}</td>
                    <td className="max-w-[230px] px-4 py-5 text-sm text-[#3F4A5C]">
                      {r.coverages}
                    </td>
                    <td className="px-4 py-5 text-sm text-[#7A8494]">{r.creator}</td>
                    <td className="px-4 py-5 text-sm text-[#7A8494]">{r.assignee}</td>
                    <td className="px-4 py-5">
                      <span
                        className={cn(
                          "inline-flex min-w-[150px] items-center justify-center rounded-full border px-4 py-1.5 text-xs font-bold",
                          STATUS_STYLES[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <IconBtn>
                          <History className="size-4" />
                        </IconBtn>
                        <IconBtn>
                          <Eye className="size-4" />
                        </IconBtn>
                        {isCotizar && (
                          <>
                            <IconBtn>
                              <UserPlus className="size-4" />
                            </IconBtn>
                            <IconBtn>
                              <Repeat2 className="size-4" />
                            </IconBtn>
                          </>
                        )}
                        <IconBtn>
                          <Pencil className="size-4" />
                        </IconBtn>
                        <IconBtn>
                          <Copy className="size-4" />
                        </IconBtn>
                        {isCotizar ? (
                          <button className="rounded-lg bg-[#16305C] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                            Cotizar
                          </button>
                        ) : (
                          <>
                            <button className="rounded-lg bg-[#00B67A] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                              View Proposals
                            </button>
                            <IconBtn>
                              <Pencil className="size-4" />
                            </IconBtn>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
