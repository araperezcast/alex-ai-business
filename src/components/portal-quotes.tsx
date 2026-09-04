import { useState } from "react";
import { Eye, Pencil, X, ChevronRight, Upload, Car } from "lucide-react";

import { cn } from "@/lib/utils";

type Row = {
  client: string;
  vehicle: string;
  premium: string;
  date: string;
  status: "Pending" | "Active";
};

const ROWS: Row[] = [
  {
    client: "Juan Carlos Vega",
    vehicle: "2024 Honda Civic",
    premium: "$1,284.00",
    date: "03/9/2026",
    status: "Active",
  },
  {
    client: "María Fernanda Ruiz",
    vehicle: "2023 Toyota RAV4",
    premium: "$1,462.50",
    date: "02/9/2026",
    status: "Pending",
  },
  {
    client: "Roberto Gómez",
    vehicle: "2025 Ford F-150",
    premium: "$1,890.75",
    date: "01/9/2026",
    status: "Active",
  },
  {
    client: "Ana Lucía Torres",
    vehicle: "2022 Nissan Sentra",
    premium: "$1,045.20",
    date: "29/8/2026",
    status: "Active",
  },
  {
    client: "Carlos Mendoza",
    vehicle: "2024 Chevrolet Silverado",
    premium: "$1,730.00",
    date: "28/8/2026",
    status: "Pending",
  },
  {
    client: "Sofía Herrera",
    vehicle: "2023 Mazda CX-5",
    premium: "$1,356.40",
    date: "27/8/2026",
    status: "Active",
  },
  {
    client: "Diego Ramírez",
    vehicle: "2025 Toyota Corolla",
    premium: "$1,198.90",
    date: "26/8/2026",
    status: "Pending",
  },
  {
    client: "Lucía Fernández",
    vehicle: "2024 Hyundai Tucson",
    premium: "$1,412.10",
    date: "25/8/2026",
    status: "Active",
  },
];

const FILTERS = ["All", "Assigned to me", "Created by me"] as const;

const STATUS_STYLES: Record<Row["status"], string> = {
  Pending: "border-[#FBD9A8] bg-[#FEF3E2] text-[#C2761A]",
  Active: "border-[#B7E7CD] bg-[#E7F8EF] text-[#0E8A54]",
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
            <p className="mt-0.5 text-sm text-[#919EB1]">New Auto Request</p>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Client First Name</label>
              <input className={inputClass} type="text" placeholder="Enter first name" />
            </div>
            <div>
              <label className={labelClass}>Client Last Name</label>
              <input className={inputClass} type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Vehicle Year</label>
              <input className={inputClass} type="number" min={1990} placeholder="2024" />
            </div>
            <div>
              <label className={labelClass}>Make</label>
              <input className={inputClass} type="text" placeholder="Honda" />
            </div>
            <div>
              <label className={labelClass}>Model</label>
              <input className={inputClass} type="text" placeholder="Civic" />
            </div>
          </div>

          <div>
            <label className={labelClass}>VIN</label>
            <input className={inputClass} type="text" placeholder="17-character VIN" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Contact Method (Phone or Email)</label>
              <input className={inputClass} type="text" placeholder="Phone or email" />
            </div>
            <div>
              <label className={labelClass}>ZIP Code</label>
              <input className={inputClass} type="text" placeholder="85001" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Driver's License / Documents</label>
            <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-6 text-center transition hover:border-[#1A56DB] hover:bg-[#F1F5F9]">
              <Upload className="size-5 text-[#94A3B8]" />
              <span className="text-xs font-medium text-[#64748B]">
                Click to upload or drag & drop
              </span>
              <span className="text-[11px] text-[#94A3B8]">PDF, JPG, PNG up to 10MB</span>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
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
        <h1 className="truncate text-3xl font-black tracking-tight text-[#16305C]">
          My Quotes & Policies
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
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            <Car className="size-4" /> New Quote
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-[#FAFAFB] text-xs font-medium text-[#8A93A2]">
                <th className="px-6 py-4 font-medium">Client Name</th>
                <th className="px-4 py-4 font-medium">Vehicle</th>
                <th className="px-4 py-4 font-medium">Total Premium</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-t border-[#EEF0F4] align-middle">
                  <td className="px-6 py-5 text-sm font-bold text-[#16305C]">{r.client}</td>
                  <td className="px-4 py-5 text-sm text-[#3F4A5C]">{r.vehicle}</td>
                  <td className="px-4 py-5 text-sm font-semibold tabular-nums text-[#16305C]">
                    {r.premium}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-[#7A8494]">{r.date}</td>
                  <td className="px-4 py-5">
                    <span
                      className={cn(
                        "inline-flex min-w-[110px] items-center justify-center rounded-full border px-4 py-1.5 text-xs font-bold",
                        STATUS_STYLES[r.status],
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn>
                        <Eye className="size-4" />
                      </IconBtn>
                      <IconBtn>
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

      {modalOpen && <RequestQuoteModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
