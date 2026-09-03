import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Database,
  Download,
  ExternalLink,
  FileText,
  History,
  LayoutDashboard,
  Languages,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  UploadCloud,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

import alexaiLogo from "@/assets/logo-alexai.png.asset.json";
import joffroyLogo from "@/assets/joffroy-logo.png.asset.json";
import {
  CatalogsView,
  PulseView,
  QueueView,
  QuoteCaptureModal,
} from "@/components/admin-modules";
import { PortalDashboard } from "@/components/portal-dashboard";
import { PortalAppetite } from "@/components/portal-appetite";
import { PortalQuotes } from "@/components/portal-quotes";
import { PortalProposals } from "@/components/portal-proposals";
import { PortalClients } from "@/components/portal-clients";
import { PortalCRM } from "@/components/portal-crm";
import { PortalCalendar } from "@/components/portal-calendar";
import { PortalBIIngestion } from "@/components/portal-bi-ingestion";
import { PortalAgencies } from "@/components/portal-agencies";
import { PortalLogin } from "@/components/portal-login";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { clearSession, loadSession, type Session } from "@/lib/portal-auth";
import { downloadCOIPDF, downloadProposalPDF } from "@/lib/portal-pdf";
import {
  formatDate,
  usd,
  useOperations,
  VERTICALS,
  type Operation,
  type Status,
} from "@/lib/portal-store";

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

const STATUS_META: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  quoted: { label: "Quoted", className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200" },
  paid: {
    label: "Paid / Issued",
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
  { key: "pending", label: "Pending Underwriting" },
  { key: "quoted", label: "Quoted / Ready Proposals" },
  { key: "paid", label: "COIs Issued / Active" },
];

type ModuleKey =
  | "dashboard"
  | "appetite"
  | "operations"
  | "proposals"
  | "clients"
  | "crm"
  | "calendar"
  | "admin-queue"
  | "admin-agencies"
  | "admin-users"
  | "admin-pulse"
  | "admin-catalogs";

type NavItem = { key: ModuleKey; label: string; icon: typeof LayoutDashboard };

const MODULES: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "appetite", label: "Appetite Finder", icon: Search },
  { key: "operations", label: "Quotes", icon: ClipboardList },
  { key: "proposals", label: "Proposals", icon: FileText },
  { key: "clients", label: "Clients", icon: Users },
  { key: "crm", label: "CRM / Visits", icon: History },
  { key: "calendar", label: "Calendar", icon: CalendarDays },
];

const ADMIN_MODULES: NavItem[] = [
  { key: "admin-queue", label: "BI Ingestion", icon: Database },
  { key: "admin-agencies", label: "Agencies", icon: Building2 },
  { key: "admin-users", label: "User Management", icon: ShieldCheck },
  { key: "admin-catalogs", label: "Carriers", icon: BookOpen },
  { key: "admin-pulse", label: "My Agency", icon: Activity },
];

function PortalPage() {
  const { rows, addOperation, markPaid, sendProposals } = useOperations();
  const [tab, setTab] = useState<Status | "all">("all");
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<ModuleKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quoteTargetId, setQuoteTargetId] = useState<string | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  const selected = useMemo(
    () => rows.find((r) => r.id === selectedId) ?? null,
    [rows, selectedId],
  );

  function signOut() {
    clearSession();
    setSession(null);
    toast.success("Session closed");
  }

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        if (tab !== "all" && r.status !== tab) return false;
        if (
          query.trim() &&
          !`${r.id} ${r.vertical} ${r.origin} ${r.destination}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
          return false;
        const created = new Date(r.createdAt).getTime();
        if (from && created < new Date(from).getTime()) return false;
        if (to && created > new Date(to).getTime() + 86_400_000) return false;
        return true;
      }),
    [rows, tab, query, from, to],
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

  function handleAdd(op: Operation) {
    addOperation(op);
    setNewOpen(false);
    toast.success("Operation submitted for underwriting", {
      description: `${op.id} is now in the Alex AI carrier appetite queue.`,
    });
  }

  if (!session) {
    return <PortalLogin onSuccess={(s) => setSession(s)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F6F2EC] text-[#16305C]">
      {/* ===== Sidebar ===== */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#E2E8F0] bg-white transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2.5 px-5">
          <img src={alexaiLogo.url} alt="Alex AI" className="h-6 w-auto" />
          <span className="text-[#06D6A0]">×</span>
          <img src={joffroyLogo.url} alt="Grupo Joffroy" className="h-5 w-auto" />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {MODULES.map((m) => (
            <NavButton
              key={m.key}
              item={m}
              active={view === m.key}
              count={null}
              onClick={() => {
                setView(m.key);
                setSidebarOpen(false);
              }}
            />
          ))}

          <p className="px-3 pt-7 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7C8BA1]">
            Administration
          </p>
          {ADMIN_MODULES.map((m) => (
            <NavButton
              key={m.key}
              item={m}
              active={view === m.key}
              count={null}
              onClick={() => {
                setView(m.key);
                setSidebarOpen(false);
              }}
            />
          ))}
        </nav>

        <div className="space-y-1 border-t border-[#E2E8F0] px-3 pt-3 pb-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#3D4C63] hover:bg-[#EFF6FF] hover:text-[#1A56DB]">
            <Moon className="size-4.5" /> Modo Oscuro
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#3D4C63] hover:bg-[#EFF6FF] hover:text-[#1A56DB]">
            <Languages className="size-4.5" /> Español
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#3D4C63] hover:bg-[#EFF6FF] hover:text-[#1A56DB]">
            <Settings className="size-4.5" /> Settings
          </button>
        </div>

        <div className="px-4 pb-5 text-center">
          <SiteFooter />
        </div>
      </aside>
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#0D1527]/40 lg:hidden"
        />
      )}

      {/* ===== Main column ===== */}
      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-[#FBF3E9] via-[#F7F4EF] to-[#F2F3F5]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#EDE7DE] bg-[#FBF9F6]/85 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-[#5A6474] hover:bg-[#F1ECE4] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#7A8494] sm:block">{session.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-[#7A8494] hover:text-[#16305C]"
            >
              <LogOut className="mr-1.5 size-4" /> Sign out
            </Button>
            <button
              className="rounded-full p-2 text-[#5A6474] hover:bg-[#F1ECE4]"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
            </button>
            <div className="flex size-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs font-bold text-[#16305C]">
              D
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {view === "dashboard" && <PortalDashboard />}

          {view === "appetite" && <PortalAppetite />}

          {view === "clients" && <PortalClients />}
          {view === "crm" && <PortalCRM />}
          {view === "calendar" && <PortalCalendar />}

          {["admin-users"].includes(view) && (
            <div className="rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] p-10 text-center">
              <h2 className="font-serif text-xl font-bold text-[#16305C]">
                {[...MODULES, ...ADMIN_MODULES].find((m) => m.key === view)?.label}
              </h2>
              <p className="mt-2 text-sm text-[#7A8494]">Module layout coming next.</p>
            </div>
          )}

          {view === "admin-agencies" && <PortalAgencies />}

          {view === "operations" && <PortalQuotes />}

          {view === "proposals" && <PortalProposals />}

          {view === "admin-queue" && (
            <QueueView rows={rows} onQuote={(op) => setQuoteTargetId(op.id)} />
          )}
          {view === "admin-pulse" && <PulseView rows={rows} />}
          {view === "admin-catalogs" && <CatalogsView rows={rows} />}
        </main>
      </div>

      <QuoteCaptureModal
        operation={rows.find((r) => r.id === quoteTargetId) ?? null}
        onOpenChange={(o) => !o && setQuoteTargetId(null)}
        onSend={(id, quotes) => {
          sendProposals(id, quotes);
          setQuoteTargetId(null);
          toast.success("Proposal sent to Grupo Joffroy", {
            description: "Corporate PDF generated and published to the client portal.",
          });
        }}
      />
      <NewRequestModal open={newOpen} onOpenChange={setNewOpen} onSubmit={handleAdd} />
      <QuotesModal
        operation={selected}
        onOpenChange={(o) => !o && setSelectedId(null)}
        onPaid={(id, carrier) => {
          markPaid(id, carrier);
          toast.success("Payment confirmed — COI issued in under 90 seconds");
        }}
      />
    </div>
  );
}

function NavButton({
  item,
  active,
  count,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  count: number | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-gradient-to-r from-[#EFF6FF] to-[#ECFDF5] text-[#1A56DB] shadow-[inset_2px_0_0_0_#06D6A0]"
          : "text-[#3D4C63] hover:bg-[#EFF6FF] hover:text-[#1A56DB]",
      )}
    >
      <item.icon className="size-4.5 shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {count !== null && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs tabular-nums",
            active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function OperationsTable({
  rows,
  onSelect,
}: {
  rows: Operation[];
  onSelect: (op: Operation) => void;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            {[
              "Pedimento / Manifest ID",
              "Risk Vertical",
              "Route",
              "Insured Cargo Value",
              "Date",
              "Status",
            ].map((h) => (
              <TableHead
                key={h}
                className="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </TableHead>
            ))}
            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} className="border-slate-100">
              <TableCell className="font-semibold">{r.id}</TableCell>
              <TableCell className="text-slate-600">{r.vertical}</TableCell>
              <TableCell className="text-slate-600">
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  {r.origin}
                  <ArrowRight className="size-3.5 text-slate-400" />
                  {r.destination}
                </span>
              </TableCell>
              <TableCell className="font-medium tabular-nums">{usd(r.value)} USD</TableCell>
              <TableCell className="whitespace-nowrap text-slate-500">
                {formatDate(r.createdAt)}
              </TableCell>
              <TableCell>
                <StatusBadge status={r.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {r.status === "pending" && (
                    <span className="text-xs font-medium text-slate-400">In underwriting</span>
                  )}
                  {r.status === "quoted" && (
                    <Button
                      size="sm"
                      onClick={() => onSelect(r)}
                      className="bg-[#0D1527] text-white hover:bg-[#0D1527]/90"
                    >
                      Review Proposals
                    </Button>
                  )}
                  {r.status === "paid" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadProposalPDF(r)}
                        className="border-slate-200"
                      >
                        <Download className="mr-1.5 size-3.5" /> Proposal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadCOIPDF(r)}
                        className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
                      >
                        <Download className="mr-1.5 size-3.5" /> COI
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-16 text-center text-sm text-slate-500">
                No operations match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function ProposalsView({
  rows,
  onSelect,
}: {
  rows: Operation[];
  onSelect: (op: Operation) => void;
}) {
  return (
    <>
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-[#1A56DB] uppercase">
          Grupo Joffroy · Client Portal
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Ready Proposals</h1>
        <p className="mt-1 text-sm text-slate-500">
          Operations with confirmed multi-carrier underwriting. Review the Top 2 carrier quotes,
          bind coverage, and issue your Certificate of Insurance.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-sm text-slate-500">
          No ready proposals yet. Once carrier appetite matching completes, proposals will appear
          here.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                {["Client / Pedimento", "Business", "Coverages", "Total Premium", "Status"].map(
                  (h) => (
                    <TableHead key={h} className="text-sm font-medium text-slate-500">
                      {h}
                    </TableHead>
                  ),
                )}
                <TableHead className="text-right text-sm font-medium text-slate-500">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const best = r.quotes[0];
                return (
                  <TableRow key={r.id} className="border-slate-100">
                    <TableCell className="py-5">
                      <p className="font-bold text-[#0D1527]">{r.id}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                        {r.origin} <ArrowRight className="size-3 text-slate-400" /> {r.destination}
                      </p>
                    </TableCell>
                    <TableCell className="text-slate-500">Grupo Joffroy</TableCell>
                    <TableCell className="max-w-sm text-slate-600">
                      {r.vertical}
                      {best?.notes ? `, ${best.notes.replace(/ · /g, ", ")}` : ""}
                    </TableCell>
                    <TableCell className="font-semibold tabular-nums text-emerald-600">
                      {best ? usd(best.premium) : "—"}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1A56DB] ring-1 ring-blue-200">
                        Pending Presentation
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => onSelect(r)}
                        className="bg-[#0D1527] text-white hover:bg-[#0D1527]/90"
                      >
                        <FileText className="mr-1.5 size-3.5" /> View Presentation
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

    </>
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
      createdAt: new Date().toISOString(),
      files,
      quotes: [],
    });
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-slate-200 bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle className="text-lg font-bold text-[#0D1527]">
            Register Freight Operation for Insurance Underwriting
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Submit the operation details; the Alex AI desk returns proposals in minutes.
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
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            className="bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
          >
            Submit for Underwriting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuotesModal({
  operation,
  onOpenChange,
  onPaid,
}: {
  operation: Operation | null;
  onOpenChange: (o: boolean) => void;
  onPaid: (id: string, carrier: string) => void;
}) {
  const [confirm, setConfirm] = useState(false);
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
          {operation && operation.quotes.length === 0 ? (
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
              {operation?.quotes.map((q, i) => {
                const bound = paid && operation.boundCarrier === q.carrier;
                return (
                  <div
                    key={q.carrier}
                    className={cn(
                      "flex flex-col rounded-2xl border bg-white p-5 shadow-sm",
                      bound ? "border-[#06D6A0] ring-1 ring-[#06D6A0]/40" : "border-slate-200",
                    )}
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
                        <p className="text-lg font-bold tabular-nums text-[#1A56DB]">
                          {usd(q.premium)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">Deductible</p>
                        <p className="text-lg font-bold tabular-nums text-[#0D1527]">
                          {usd(q.deductible)}
                        </p>
                      </div>
                    </div>

                    {q.notes && (
                      <ul className="mt-5 flex-1 space-y-2">
                        {q.notes.split("·").map((t) => (
                          <li
                            key={t}
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2 className="size-4 shrink-0 text-[#06D6A0]" />
                            {t.trim()}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5 space-y-2">
                      <a
                        href={q.paymentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#1A56DB] hover:underline"
                      >
                        <ExternalLink className="size-3.5" /> Carrier payment link
                      </a>
                      <Button
                        disabled={paid}
                        onClick={() => {
                          window.open(q.paymentUrl, "_blank", "noreferrer");
                          operation && onPaid(operation.id, q.carrier);
                        }}
                        className="w-full bg-[#1A56DB] text-white hover:bg-[#1A56DB]/90"
                      >
                        {bound ? "Policy Bound" : paid ? "Not selected" : "Pay & Bind via Carrier"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {operation && operation.quotes.length > 0 && !paid && (
            <label className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <Checkbox
                checked={confirm}
                onCheckedChange={(v) => setConfirm(Boolean(v))}
                className="mt-0.5"
              />
              I confirm the cargo details are accurate and authorize Alex AI to bind the selected
              carrier option.
            </label>
          )}

          {paid && operation && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#06D6A0] px-3 py-1 text-xs font-bold text-[#0D1527]">
                ● COI Ready (&lt; 90s Issuance)
              </span>
              <p className="mt-3 text-sm text-emerald-900">
                Payment confirmed with {operation.boundCarrier}. Your official proposal and digital
                certificate are ready to download.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-emerald-300 bg-white"
                  onClick={() => downloadProposalPDF(operation)}
                >
                  <Download className="mr-2 size-4" /> Download Proposal (PDF)
                </Button>
                <Button
                  className="bg-[#0D1527] text-white hover:bg-[#0D1527]/90"
                  onClick={() => downloadCOIPDF(operation)}
                >
                  <Download className="mr-2 size-4" /> Download Certificate of Insurance (COI)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
