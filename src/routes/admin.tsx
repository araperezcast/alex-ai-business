import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Clock,
  Download,
  FileText,
  Inbox,
  LogOut,
  Menu,
  Send,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";

import alexLogo from "@/assets/alex-logo.png.asset.json";
import { PortalLogin } from "@/components/portal-login";
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
import { clearSession, loadSession, type Session } from "@/lib/portal-auth";
import { downloadProposalPDF } from "@/lib/portal-pdf";
import {
  CARRIER_CATALOG,
  formatDate,
  SLA_HOURS,
  slaHoursElapsed,
  slaState,
  usd,
  useOperations,
  type Operation,
  type QuoteOption,
} from "@/lib/portal-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Underwriting Back-Office | Alex AI Business" },
      {
        name: "description",
        content:
          "Internal Alex AI desk: incoming Joffroy risk requests, SLA tracking, carrier quote capture, and automated proposal & COI document generation.",
      },
      { property: "og:title", content: "Underwriting Back-Office | Alex AI Business" },
      {
        property: "og:description",
        content:
          "Queue, quote capture, and document engine for the Alex AI multi-carrier underwriting desk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

type AdminView = "queue" | "pulse" | "catalogs";

const NAV: { key: AdminView; label: string; icon: typeof Inbox }[] = [
  { key: "queue", label: "Incoming Queue", icon: Inbox },
  { key: "pulse", label: "Alex Pulse · Metrics", icon: Activity },
  { key: "catalogs", label: "Catalogs", icon: BookOpen },
];

const SLA_META = {
  "on-track": { label: "On track", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  "at-risk": { label: "At risk", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  breached: { label: "SLA breached", className: "bg-red-50 text-red-700 ring-red-200" },
};

function AdminPage() {
  const navigate = useNavigate();
  const { rows, sendProposals } = useOperations();
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<AdminView>("queue");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  useEffect(() => {
    const s = loadSession();
    if (s?.role === "joffroy") {
      navigate({ to: "/portal" });
      return;
    }
    setSession(s);
  }, [navigate]);

  const target = useMemo(() => rows.find((r) => r.id === targetId) ?? null, [rows, targetId]);
  const pending = useMemo(() => rows.filter((r) => r.status === "pending"), [rows]);

  if (!session) {
    return (
      <PortalLogin
        variant="alex"
        onSuccess={(s) => (s.role === "joffroy" ? navigate({ to: "/portal" }) : setSession(s))}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0D1527]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#0D1527] transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <img src={alexLogo.url} alt="Alex AI" className="h-4 w-auto" />
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70">
            Back-office
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => {
                setView(n.key);
                setSidebarOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                view === n.key
                  ? "bg-white text-[#0D1527]"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
            >
              <n.icon className="size-4.5 shrink-0" />
              <span className="flex-1 text-left">{n.label}</span>
              {n.key === "queue" && pending.length > 0 && (
                <span className="rounded-full bg-[#06D6A0] px-2 py-0.5 text-xs font-bold text-[#0D1527]">
                  {pending.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => navigate({ to: "/portal" })}
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-xs text-white/50 hover:text-white"
          >
            View Joffroy client portal
          </button>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#0D1527]/40 lg:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:block">
              Alex AI · Internal underwriting desk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:block">{session.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearSession();
                setSession(null);
                toast.success("Session closed");
              }}
              className="text-slate-500 hover:text-[#0D1527]"
            >
              <LogOut className="mr-1.5 size-4" /> Sign out
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {view === "queue" && <QueueView rows={rows} onQuote={(op) => setTargetId(op.id)} />}
          {view === "pulse" && <PulseView rows={rows} />}
          {view === "catalogs" && <CatalogsView rows={rows} />}
        </main>
      </div>

      <QuoteCaptureModal
        operation={target}
        onOpenChange={(o) => !o && setTargetId(null)}
        onSend={(id, quotes) => {
          sendProposals(id, quotes);
          setTargetId(null);
          toast.success("Proposal sent to Grupo Joffroy", {
            description: "Corporate PDF generated and published to the client portal.",
          });
        }}
      />
    </div>
  );
}

function SlaBadge({ op }: { op: Operation }) {
  const state = op.status === "pending" ? slaState(op) : "on-track";
  const meta = SLA_META[state];
  const hours = slaHoursElapsed(op);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        meta.className,
      )}
    >
      <Clock className="size-3.5" />
      {op.status === "pending" ? `${meta.label} · ${hours.toFixed(1)}h` : `Answered in ${hours.toFixed(1)}h`}
    </span>
  );
}

function QueueView({ rows, onQuote }: { rows: Operation[]; onQuote: (op: Operation) => void }) {
  const pending = rows.filter((r) => r.status === "pending");
  const rest = rows.filter((r) => r.status !== "pending");

  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A56DB]">
          Alex AI · Back-office
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Incoming Risk Requests</h1>
        <p className="mt-1 text-sm text-slate-500">
          Requests submitted by Grupo Joffroy in real time. Target first response: {SLA_HOURS}h.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {pending.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center text-sm text-slate-500">
            The queue is clear. All incoming requests have been quoted.
          </div>
        )}
        {pending.map((op) => (
          <div
            key={op.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-base font-bold">{op.id}</h3>
                <SlaBadge op={op} />
                <span className="text-xs text-slate-400">Received {formatDate(op.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{op.vertical}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                {op.origin} <ArrowRight className="size-3.5 text-slate-400" /> {op.destination}
                <span className="ml-2 font-medium tabular-nums text-[#0D1527]">
                  {usd(op.value)} USD
                </span>
              </p>
              {op.files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {op.files.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                    >
                      <FileText className="size-3.5 text-[#1A56DB]" /> {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={() => onQuote(op)}
              className="shrink-0 bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
            >
              Load carrier quotes
            </Button>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-slate-500">
        Processed operations
      </h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              {["Pedimento", "Vertical", "Insured value", "Response", "Status", ""].map((h, i) => (
                <TableHead
                  key={`${h}-${i}`}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rest.map((op) => (
              <TableRow key={op.id} className="border-slate-100">
                <TableCell className="font-semibold">{op.id}</TableCell>
                <TableCell className="text-slate-600">{op.vertical}</TableCell>
                <TableCell className="tabular-nums">{usd(op.value)}</TableCell>
                <TableCell>
                  <SlaBadge op={op} />
                </TableCell>
                <TableCell className="capitalize text-slate-600">{op.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200"
                      onClick={() => downloadProposalPDF(op)}
                    >
                      <Download className="mr-1.5 size-3.5" /> Proposal PDF
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-500"
                      onClick={() => onQuote(op)}
                    >
                      Edit quotes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {rest.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500">
                  No processed operations yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function PulseView({ rows }: { rows: Operation[] }) {
  const premium = rows
    .filter((r) => r.quotes.length)
    .reduce((sum, r) => sum + (r.quotes[0]?.premium ?? 0), 0);
  const answered = rows.filter((r) => r.quotedAt);
  const avg = answered.length
    ? answered.reduce((s, r) => s + slaHoursElapsed(r), 0) / answered.length
    : 0;
  const insured = rows.reduce((s, r) => s + r.value, 0);
  const conversion = rows.length
    ? Math.round((rows.filter((r) => r.status === "paid").length / rows.length) * 100)
    : 0;

  const stats = [
    { label: "Requests received", value: String(rows.length), hint: "All-time volume" },
    { label: "Premium intermediated", value: usd(premium), hint: "Best-option premium" },
    { label: "Avg. response time", value: `${avg.toFixed(1)} h`, hint: `SLA target ${SLA_HOURS}h` },
    { label: "Total insured value", value: usd(insured), hint: "Cargo sums submitted" },
  ];

  const byVertical = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.vertical] = (acc[r.vertical] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A56DB]">
          Alex Pulse · Internal analytics
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Desk Performance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Volume, intermediated premium, and response times. Hidden from Joffroy users.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[#0D1527]">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Volume by risk vertical
          </h2>
          <ul className="mt-4 space-y-3">
            {byVertical.map(([name, count]) => (
              <li key={name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{name}</span>
                  <span className="font-semibold tabular-nums">{count}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#0048FF] to-[#07D6A0]"
                    style={{ width: `${(count / rows.length) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#0D1527] p-6 text-white shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white/60">
            Bind conversion
          </h2>
          <p className="mt-4 text-5xl font-bold tabular-nums text-[#06D6A0]">{conversion}%</p>
          <p className="mt-2 text-sm text-white/60">
            Operations that reached payment and COI issuance out of all submitted requests.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {(["pending", "quoted", "paid"] as const).map((s) => (
              <div key={s} className="rounded-xl bg-white/5 p-3">
                <p className="text-xl font-bold tabular-nums">
                  {rows.filter((r) => r.status === s).length}
                </p>
                <p className="text-xs capitalize text-white/50">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CatalogsView({ rows }: { rows: Operation[] }) {
  const usage = CARRIER_CATALOG.map((c) => ({
    carrier: c,
    quotes: rows.filter((r) => r.quotes.some((q) => q.carrier === c)).length,
    bound: rows.filter((r) => r.boundCarrier === c).length,
  }));

  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A56DB]">
          Alex AI · Internal catalogs
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Accounts &amp; Carrier Profiles</h1>
        <p className="mt-1 text-sm text-slate-500">
          Maintenance of client accounts, carrier profiles, and agent assignments.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Accounts</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold">Grupo Joffroy</p>
              <p className="text-slate-500">joffroy.alexai.cloud · Customs & 3PL</p>
              <p className="mt-1 text-xs text-slate-400">
                {rows.length} operations · agent: Alex AI Desk
              </p>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                {["Carrier profile", "Quotes loaded", "Policies bound"].map((h) => (
                  <TableHead
                    key={h}
                    className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {usage.map((u) => (
                <TableRow key={u.carrier} className="border-slate-100">
                  <TableCell className="font-medium">{u.carrier}</TableCell>
                  <TableCell className="tabular-nums text-slate-600">{u.quotes}</TableCell>
                  <TableCell className="tabular-nums text-slate-600">{u.bound}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

const EMPTY_QUOTE: QuoteOption = {
  carrier: "",
  premium: 0,
  deductible: 0,
  paymentUrl: "",
  notes: "",
};

function QuoteCaptureModal({
  operation,
  onOpenChange,
  onSend,
}: {
  operation: Operation | null;
  onOpenChange: (o: boolean) => void;
  onSend: (id: string, quotes: QuoteOption[]) => void;
}) {
  const [quotes, setQuotes] = useState<QuoteOption[]>([EMPTY_QUOTE, EMPTY_QUOTE]);

  useEffect(() => {
    if (operation) {
      setQuotes([
        operation.quotes[0] ?? EMPTY_QUOTE,
        operation.quotes[1] ?? EMPTY_QUOTE,
      ]);
    }
  }, [operation]);

  function patch(i: number, field: keyof QuoteOption, value: string) {
    setQuotes((prev) =>
      prev.map((q, idx) =>
        idx === i
          ? {
              ...q,
              [field]:
                field === "premium" || field === "deductible"
                  ? Number(value.replace(/[^\d.]/g, "")) || 0
                  : value,
            }
          : q,
      ),
    );
  }

  function send() {
    if (!operation) return;
    const valid = quotes.filter((q) => q.carrier && q.premium > 0 && q.paymentUrl);
    if (valid.length === 0) {
      toast.error("Capture at least one option with carrier, premium, and payment link.");
      return;
    }
    onSend(operation.id, valid);
  }

  return (
    <Dialog open={!!operation} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-slate-200 bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle className="text-lg font-bold text-[#0D1527]">
            Load carrier quotes · {operation?.id}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            {operation?.vertical} · {operation?.origin} ➔ {operation?.destination} ·{" "}
            {operation ? `${usd(operation.value)} USD insured sum` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          {quotes.map((q, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Option {i + 1}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Carrier</Label>
                  <Select value={q.carrier} onValueChange={(v) => patch(i, "carrier", v)}>
                    <SelectTrigger className="w-full border-slate-200">
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      {CARRIER_CATALOG.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Total premium (USD)</Label>
                  <Input
                    value={q.premium || ""}
                    onChange={(e) => patch(i, "premium", e.target.value)}
                    inputMode="numeric"
                    placeholder="480"
                    className="border-slate-200 tabular-nums"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deductible (USD)</Label>
                  <Input
                    value={q.deductible || ""}
                    onChange={(e) => patch(i, "deductible", e.target.value)}
                    inputMode="numeric"
                    placeholder="1000"
                    className="border-slate-200 tabular-nums"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment link URL</Label>
                  <Input
                    value={q.paymentUrl}
                    onChange={(e) => patch(i, "paymentUrl", e.target.value)}
                    placeholder="https://pay.carrier.com/..."
                    className="border-slate-200"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Coverage highlights (separate with ·)</Label>
                  <Input
                    value={q.notes ?? ""}
                    onChange={(e) => patch(i, "notes", e.target.value)}
                    placeholder="Inland Marine door-to-door · Reefer breakdown guarantee"
                    className="border-slate-200"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-slate-500">
                    Original carrier quote (internal use, optional)
                  </Label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-3 text-sm text-slate-500">
                    <UploadCloud className="size-4" />
                    {q.internalFile ?? "Attach the carrier's original quote PDF"}
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) =>
                        patch(i, "internalFile", e.target.files?.[0]?.name ?? "")
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}

          <p className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
            On send, Alex AI packages these values into the standardized corporate Proposal PDF and
            prepares the COI template, released automatically once payment is confirmed
            (&lt; 90 seconds).
          </p>
        </div>

        <DialogFooter className="border-t border-slate-200 px-6 py-4">
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => operation && downloadProposalPDF({ ...operation, quotes })}
          >
            <FileText className="mr-2 size-4" /> Preview Proposal PDF
          </Button>
          <Button
            onClick={send}
            className="bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
          >
            <Send className="mr-2 size-4" /> Send proposal to client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
