import { ArrowRight, Globe, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import alexLogo from "@/assets/logo-alexai.png.asset.json";
import chapmanLogo from "@/assets/chapman-logo.png.asset.json";
import joffroyLogo from "@/assets/joffroy-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, saveSession, type PortalRole, type Session } from "@/lib/portal-auth";

type Tenant = {
  id: "chapman" | "joffroy";
  name: string;
  workspace: string;
  badge: string;
  buttonClass: string;
  chipClass: string;
  logo: "wordmark" | "joffroy";
  wordmark?: string;
  wordmarkClass?: string;
};

const TENANTS: Record<string, Tenant> = {
  "chapman.com": {
    id: "chapman",
    name: "Chapman",
    workspace: "Chapman",
    badge: "Bienvenido al espacio de trabajo de Partners de Chapman",
    buttonClass: "bg-[#0B6E4F] text-white hover:bg-[#095c42]",
    chipClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    logo: "wordmark",
    wordmark: "CHAPMAN",
    wordmarkClass: "text-[#0B6E4F]",
  },
  "joffroy.com": {
    id: "joffroy",
    name: "Grupo Joffroy",
    workspace: "Joffroy",
    badge: "Bienvenido al espacio de trabajo de Partners de Grupo Joffroy",
    buttonClass: "bg-[#1A56DB] text-white hover:bg-[#1648b8]",
    chipClass: "bg-blue-50 text-blue-700 border-blue-200",
    logo: "joffroy",
  },
  "joffroy.com.mx": {
    id: "joffroy",
    name: "Grupo Joffroy",
    workspace: "Joffroy",
    badge: "Bienvenido al espacio de trabajo de Partners de Grupo Joffroy",
    buttonClass: "bg-[#1A56DB] text-white hover:bg-[#1648b8]",
    chipClass: "bg-blue-50 text-blue-700 border-blue-200",
    logo: "joffroy",
  },
};

export function PortalLogin({
  variant: _variant,
  onSuccess,
}: {
  variant?: PortalRole;
  onSuccess: (session: Session) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tenant, setTenant] = useState<Tenant | null>(null);

  function detectTenant(value: string) {
    const domain = value.trim().toLowerCase().split("@")[1] ?? "";
    setTenant(TENANTS[domain] ?? null);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const session = authenticate(email, password);
    if (!session) {
      setError("Invalid credentials or unauthorized email domain.");
      return;
    }
    setError("");
    saveSession(session);
    toast.success(`Welcome back, ${session.name}`);
    onSuccess(session);
  }

  function simulate(domain: string) {
    const sample = domain === "chapman.com" ? "producer@chapman.com" : "operaciones@joffroy.com";
    setEmail(sample);
    setTenant(TENANTS[domain] ?? null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-16">
      <div className="w-full max-w-md">
        {/* Brand header — generic → co-branded */}
        <div className="mb-8 flex min-h-12 items-center justify-center">
          {tenant ? (
            <div key={tenant.id} className="flex animate-fade-in items-center gap-4">
              {tenant.logo === "joffroy" ? (
                <img src={joffroyLogo.url} alt={tenant.name} className="h-8 w-auto" />
              ) : (
                <span
                  className={`text-xl font-extrabold tracking-[0.18em] ${tenant.wordmarkClass ?? ""}`}
                >
                  {tenant.wordmark}
                </span>
              )}
              <span className="h-8 w-px bg-slate-300" aria-hidden="true" />
              <img src={alexLogo.url} alt="Alex AI Insurtech" className="h-7 w-auto" />
            </div>
          ) : (
            <img src={alexLogo.url} alt="Alex AI Insurtech" className="h-9 w-auto" />
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#1A56DB]">
            <Lock className="size-5" />
          </div>
          <h1 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
            {tenant ? `Sign in to ${tenant.workspace} Partners` : "Sign in to the Partner Portal"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {tenant
              ? "Your workspace has been recognized. Continue with your credentials."
              : "Access is restricted to authorized partner operations staff."}
          </p>

          {/* Welcome badge */}
          {tenant && (
            <div
              key={`badge-${tenant.id}`}
              className={`mt-4 flex animate-scale-in items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${tenant.chipClass}`}
            >
              <Sparkles className="size-3.5 shrink-0" />
              {tenant.badge}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portal-email" className="text-slate-700">
                Work email
              </Label>
              <Input
                id="portal-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => detectTenant(e.target.value)}
                placeholder="you@yourcompany.com"
                className="rounded-md border-slate-200 focus-visible:ring-[#1A56DB]"
                required
              />
              <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Globe className="size-3" />
                We automatically recognize your partner workspace by domain.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="portal-password" className="text-slate-700">
                Password
              </Label>
              <Input
                id="portal-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border-slate-200 focus-visible:ring-[#1A56DB]"
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <Button
              type="submit"
              className={
                tenant
                  ? `w-full transition-colors duration-300 ${tenant.buttonClass}`
                  : "w-full bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
              }
            >
              {tenant ? (
                <>
                  Continue as {tenant.name} <ArrowRight className="ml-1 size-4" />
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
            Demo access — Joffroy client:{" "}
            <span className="font-semibold">operaciones@joffroy.com / joffroy2026</span>
            <br />
            Alex AI desk: <span className="font-semibold">desk@alexai.cloud / alexai2026</span>
          </p>
        </div>

        {/* Domain simulation toggles (preview aid) */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => simulate("chapman.com")}
            className="text-xs font-medium text-[#1A56DB] underline-offset-4 transition hover:underline"
          >
            Simular entrada de dominio @chapman.com
          </button>
          <button
            type="button"
            onClick={() => simulate("joffroy.com")}
            className="text-xs font-medium text-slate-500 underline-offset-4 transition hover:text-[#1A56DB] hover:underline"
          >
            Simular entrada de dominio @joffroy.com
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          partners.alexai.cloud · Protected operations environment
        </p>
      </div>
    </div>
  );
}
