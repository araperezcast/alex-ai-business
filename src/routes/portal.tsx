import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Search,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";

import alexLogo from "@/assets/alex-logo.png.asset.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Customs Insurance Portal | Grupo Joffroy × Alex AI" },
      {
        name: "description",
        content:
          "Register pedimentos, compare multi-carrier underwriting proposals, and issue Certificates of Insurance in under 90 seconds.",
      },
      {
        property: "og:title",
        content: "Customs Insurance Portal | Grupo Joffroy × Alex AI",
      },
      {
        property: "og:description",
        content:
          "Operations dashboard for cross-border freight underwriting and instant COI issuance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortalPage,
});

type Status = "pending" | "quoted" | "paid";

type Operation = {
  id: string;
  vertical: string;
  origin: string;
  destination: string;
  value: number;
  status: Status;
};

const VERTICALS = [
  "Maquiladora & Manufacturing",
  "Mining & Extraction",
  "Automotive Import",
  "Agribusiness & Perishables (Reefer Breakdown)",
  "Chemicals & Hazmat",
  "Logistics, 3PL & Transfers",
];

const INITIAL: Operation[] = [
  {
    id: "#PED-2026-8841",
    vertical: "Agribusiness & Perishables",
    origin: "Nogales, SON",
    destination: "Phoenix, AZ",
    value: 185000,
    status: "quoted",
  },
  {
    id: "#PED-2026-8837",
    vertical: "Maquiladora & Manufacturing",
    origin: "Tijuana, BC",
    destination: "San Diego, CA",
    value: 412500,
    status: "paid",
  },
  {
    id: "#PED-2026-8829",
    vertical: "Chemicals & Hazmat",
    origin: "Ciudad Juárez, CHIH",
    destination: "El Paso, TX",
    value: 96400,
    status: "pending",
  },
  {
    id: "#PED-2026-8812",
    vertical: "Mining & Extraction",
    origin: "Hermosillo, SON",
    destination: "Tucson, AZ",
    value: 748000,
    status: "quoted",
  },
  {
    id: "#PED-2026-8804",
    vertical: "Automotive Import",
    origin: "Monterrey, NL",
    destination: "Laredo, TX",
    value: 265900,
    status: "paid",
  },
  {
    id: "#PED-2026-8798",
    vertical: "Logistics, 3PL & Transfers",
    origin: "Mexicali, BC",
    destination: "Calexico, CA",
    value: 54300,
    status: "pending",
  },
];

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const STATUS_META: Record<Status, { label: string; className: string }> = {
  pending: {
    label: "Pending Quote",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  quoted: { label: "Quoted", className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200" },
  paid: {
    label: "Active / COI Issued",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
};

function StatusBadge({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        m.className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
}

const TABS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending Quote" },
  { key: "quoted", label: "Quoted" },
  { key: "paid", label: "Active / COI Issued" },
];

function PortalPage() {
  const [rows, setRows] = useState<Operation[]>(INITIAL);
  const [tab, setTab] = useState<Status | "all">("all");
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [selected, setSelected] = useState<Operation | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (tab === "all" || r.status === tab) &&
          (query.trim() === "" ||
            `${r.id} ${r.vertical} ${r.origin} ${r.destination}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [rows, tab, query],
  );

  const counts = useMemo(
    () => ({
      all: rows.length,
      pending: rows.filter((r) => r.status === "pending").length,
      quoted: rows.filter((r) => r.status === "quoted").length,
      paid: rows.filter((r) => r.status === "paid").length,
    }),
    [rows],
  );

  function addOperation(op: Operation) {
    setRows((prev) => [op, ...prev]);
    setNewOpen(false);
    toast.success("Operation submitted for underwriting", {
      description: `${op.id} is now in the carrier appetite queue.`,
    });
  }

  function markPaid(id: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "paid" } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, status: "paid" } : s));
    toast.success("Payment confirmed — COI issued in under 90 seconds");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D1527]">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-base font-bold tracking-tight">GRUPO JOFFROY</span>
            <span className="h-6 w-px bg-slate-200" />
            <img
              src={alexLogo.url}
              alt="Alex AI Insurtech"
              className="h-5 w-auto opacity-90 invert"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Client Portal · joffroy.alexai.cloud
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#514690] text-xs font-bold text-white">
              GJ
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#1A56DB] uppercase">
              Grupo Joffroy · Client Portal
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Operations &amp; Customs Clearance
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage Grupo Joffroy freight operations: register pedimentos, review multi-carrier
              proposals, and issue COIs instantly.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by Pedimento, Manifest ID, or Tracking"
                className="w-full border-slate-200 bg-white pl-9 sm:w-80"
              />
            </div>
            <Button
              onClick={() => setNewOpen(true)}
              className="bg-[#1A56DB] text-white hover:bg-[#1A56DB]/90"
            >
              + New Customs Request
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-px">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                tab === t.key
                  ? "border-[#1A56DB] text-[#1A56DB]"
                  : "border-transparent text-slate-500 hover:text-[#0D1527]",
              )}
            >
              {t.label}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Operation / Pedimento ID
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Risk Vertical
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Route
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Insured Sum
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-slate-100">
                  <TableCell className="font-semibold">{r.id}</TableCell>
                  <TableCell className="text-slate-600">{r.vertical}</TableCell>
                  <TableCell className="text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      {r.origin}
                      <ArrowRight className="size-3.5 text-slate-400" />
                      {r.destination}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium tabular-nums">{usd(r.value)} USD</TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(r)}
                      className="text-[#1A56DB] hover:bg-blue-50 hover:text-[#1A56DB]"
                    >
                      {r.status === "quoted"
                        ? "Review Quotes"
                        : r.status === "paid"
                          ? "Download COI"
                          : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-sm text-slate-500">
                    No operations match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      <NewRequestModal open={newOpen} onOpenChange={setNewOpen} onSubmit={addOperation} />
      <QuotesModal
        operation={selected}
        onOpenChange={(o) => !o && setSelected(null)}
        onPaid={markPaid}
      />
    </div>
  );
}

function NewRequestModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (op: Operation) => void;
}) {
  const [id, setId] = useState("");
  const [vertical, setVertical] = useState("");
  const [value, setValue] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setId("");
    setVertical("");
    setValue("");
    setOrigin("");
    setDestination("");
    setFiles([]);
  }

  function handleValue(v: string) {
    const digits = v.replace(/[^\d]/g, "");
    setValue(digits ? Number(digits).toLocaleString("en-US") : "");
  }

  function submit() {
    if (!id || !vertical || !value || !origin || !destination) {
      toast.error("Complete all required fields to submit for underwriting.");
      return;
    }
    onSubmit({
      id: id.startsWith("#") ? id : `#${id}`,
      vertical,
      origin,
      destination,
      value: Number(value.replace(/,/g, "")),
      status: "pending",
    });
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-slate-200 bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle className="text-lg font-bold text-[#0D1527]">
            Register Freight Operation for Insurance Underwriting
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Submit the operation details; our carrier network returns proposals in minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 px-6 py-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Operation ID</Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Pedimento / Manifiesto Number"
              className="border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label>Risk Vertical</Label>
            <Select value={vertical} onValueChange={setVertical}>
              <SelectTrigger className="w-full border-slate-200">
                <SelectValue placeholder="Select a vertical" />
              </SelectTrigger>
              <SelectContent>
                {VERTICALS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Cargo Value (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>
              <Input
                value={value}
                onChange={(e) => handleValue(e.target.value)}
                placeholder="185,000"
                inputMode="numeric"
                className="border-slate-200 pl-7 tabular-nums"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Origin</Label>
              <Input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Nogales, SON"
                className="border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Phoenix, AZ"
                className="border-slate-200"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <Label>Document Attachment</Label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                setFiles((f) => [...f, ...Array.from(e.dataTransfer.files).map((x) => x.name)]);
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "mt-2 cursor-pointer rounded-xl border border-dashed p-8 text-center transition-colors",
                dragging ? "border-[#1A56DB] bg-blue-50/60" : "border-slate-300 bg-slate-50/60",
              )}
            >
              <UploadCloud className="mx-auto size-6 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-[#0D1527]">
                Drag &amp; drop Commercial Invoice and Packing List
              </p>
              <p className="text-xs text-slate-500">PDF or PNG, up to 10 MB per file</p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept=".pdf,.png"
                className="hidden"
                onChange={(e) =>
                  setFiles((f) => [...f, ...Array.from(e.target.files ?? []).map((x) => x.name)])
                }
              />
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f}-${i}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2 text-slate-600">
                      <FileText className="size-4 text-[#1A56DB]" />
                      {f}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="text-slate-400 hover:text-slate-600"
                      aria-label={`Remove ${f}`}
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 px-6 py-4">
          <Button variant="outline" className="border-slate-200" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} className="bg-[#1A56DB] text-white hover:bg-[#1A56DB]/90">
            Submit for Underwriting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const QUOTES = [
  {
    carrier: "Cover Whale / Hanover",
    premium: "$480.00 USD",
    deductible: "$1,000 USD",
    tags: ["Inland Marine Door-to-Door", "Reefer Breakdown guarantee", "Cross-border endorsement"],
  },
  {
    carrier: "THREE by Berkshire Hathaway",
    premium: "$520.00 USD",
    deductible: "$500 USD",
    tags: ["Comprehensive Cargo", "Delay Protection", "Cyber transit"],
  },
];

function QuotesModal({
  operation,
  onOpenChange,
  onPaid,
}: {
  operation: Operation | null;
  onOpenChange: (o: boolean) => void;
  onPaid: (id: string) => void;
}) {
  const paid = operation?.status === "paid";
  return (
    <Dialog open={!!operation} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-slate-200 bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle className="text-lg font-bold text-[#0D1527]">
            Underwriting Proposals for Pedimento {operation?.id}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            {operation?.vertical} · {operation?.origin} ➔ {operation?.destination} ·{" "}
            {operation ? `${usd(operation.value)} USD insured sum` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          {operation?.status === "pending" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-8 text-center">
              <p className="text-sm font-semibold text-amber-800">
                Awaiting carrier appetite matching
              </p>
              <p className="mt-1 text-sm text-amber-700">
                Proposals for this operation will appear here shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {QUOTES.map((q, i) => (
                <div
                  key={q.carrier}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Option {i + 1}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-[#0D1527]">{q.carrier}</h3>
                    </div>
                    <Badge className="bg-[#0D1527] text-white hover:bg-[#0D1527]">
                      <ShieldCheck className="mr-1 size-3.5" /> Tier-1 A-Rated
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Premium</p>
                      <p className="text-lg font-bold tabular-nums text-[#1A56DB]">{q.premium}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Deductible</p>
                      <p className="text-lg font-bold tabular-nums text-[#0D1527]">
                        {q.deductible}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2">
                    {q.tags.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="size-4 text-[#06D6A0]" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Button
                    disabled={paid}
                    onClick={() => operation && onPaid(operation.id)}
                    className="mt-5 w-full bg-[#1A56DB] text-white hover:bg-[#1A56DB]/90"
                  >
                    {paid ? "Policy Bound" : "Select & Pay via Carrier Link"}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {paid && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#06D6A0] px-3 py-1 text-xs font-bold text-[#0D1527]">
                ● COI Issued in &lt; 90 Seconds
              </span>
              <p className="mt-3 text-sm text-emerald-900">
                Payment confirmed. Your official proposal and digital certificate are ready to
                download.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-emerald-300 bg-white"
                  onClick={() => toast.success("Official proposal (PDF) downloaded")}
                >
                  <Download className="mr-2 size-4" /> Download Official Proposal (PDF)
                </Button>
                <Button
                  className="bg-[#0D1527] text-white hover:bg-[#0D1527]/90"
                  onClick={() => toast.success("Digital certificate (COI) downloaded")}
                >
                  <Download className="mr-2 size-4" /> Download Digital Certificate (COI)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
