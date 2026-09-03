import { useState } from "react";
import { Copy, Eye, History, Pencil, Repeat2, UserPlus, X, ChevronRight, Upload } from "lucide-react";

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

const LEGAL_STRUCTURES = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "S-Corporation",
  "C-Corporation",
  "Non-Profit",
  "Trust",
];

const inputClass =
  "w-full rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#1E293B] outline-none transition focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/30 placeholder:text-[#94A3B8]";
const labelClass = "mb-1.5 block text-xs font-semibold text-[#16305C]";

function RequestQuoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EEF0F4] px-7 pt-6 pb-5">
          <div>
            <h2 className="text-xl font-bold text-[#16305C]">Request Quote</h2>
            <p className="mt-0.5 text-sm text-[#919EB1]">New Request</p>
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

        {/* Body */}
        <form
          className="space-y-5 px-7 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {/* New Client selector */}
          <div>
            <label className={labelClass}>Client</label>
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5">
              <select
                className="w-full bg-transparent text-sm text-[#1E293B] outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  -- New Client --
                </option>
                <option value="existing">Existing Client</option>
                <option value="new">New Client</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Applicant First Name</label>
              <input className={inputClass} type="text" placeholder="Enter first name" />
            </div>
            <div>
              <label className={labelClass}>Applicant Last Name</label>
              <input className={inputClass} type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Legal Business Name and DBA</label>
              <input className={inputClass} type="text" placeholder="Business name / DBA" />
            </div>
            <div>
              <label className={labelClass}>Legal Structure</label>
              <div className={inputClass + " flex items-center px-0 py-0"}>
                <select className="w-full bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#1E293B] outline-none">
                  <option value="">Select...</option>
                  {LEGAL_STRUCTURES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>FEIN</label>
              <input className={inputClass} type="text" placeholder="00-0000000" />
            </div>
            <div>
              <label className={labelClass}>Contact Method (Phone or Email)</label>
              <input className={inputClass} type="text" placeholder="Phone or email" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Physical Address (Street, ZIP, City, State)</label>
            <input className={inputClass} type="text" placeholder="Street, ZIP, City, State" />
          </div>

          <div>
            <label className={labelClass}>Detailed Operations Description</label>
            <textarea
              className={inputClass + " min-h-[96px] resize-y"}
              placeholder="Describe the business operations..."
            />
          </div>

          <div>
            <label className={labelClass}>Years of Industry Experience</label>
            <input className={inputClass} type="number" min={0} placeholder="0" />
          </div>

          <div>
            <label className={labelClass}>Loss Runs</label>
            <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-center transition hover:border-[#1A56DB] hover:bg-[#F1F5F9]">
              <Upload className="size-5 text-[#94A3B8]" />
              <span className="text-xs font-medium text-[#64748B]">
                Click to upload or drag & drop
              </span>
              <span className="text-[11px] text-[#94A3B8]">PDF, DOCX up to 10MB</span>
              <input type="file" className="hidden" accept=".pdf,.docx" />
            </label>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#EEF0F4] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-[#71717A] transition-colors hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#16305C] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PortalQuotes() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [modalOpen, setModalOpen] = useState(false);

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
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
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

      {modalOpen && <RequestQuoteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
