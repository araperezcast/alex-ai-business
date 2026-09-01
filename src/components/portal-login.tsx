import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import alexLogo from "@/assets/alex-logo.png.asset.json";
import joffroyLogo from "@/assets/joffroy-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, saveSession, type PortalRole, type Session } from "@/lib/portal-auth";

export function PortalLogin({
  variant = "joffroy",
  onSuccess,
}: {
  variant?: PortalRole;
  onSuccess: (session: Session) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const isAlex = variant === "alex";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D1527] px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(26,86,219,0.35),transparent_65%)] blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3">
          {!isAlex && (
            <>
              <img
                src={joffroyLogo.url}
                alt="Grupo Joffroy"
                className="h-6 w-auto brightness-0 invert"
              />
              <span className="text-white/30">×</span>
            </>
          )}
          <img src={alexLogo.url} alt="Alex AI Insurtech" className="h-5 w-auto opacity-90" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#1A56DB]">
            <Lock className="size-5" />
          </div>
          <h1 className="mt-5 text-xl font-bold tracking-tight text-[#0D1527]">
            {isAlex ? "Alex AI Back-Office" : "Sign in to the B2B Portal"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isAlex
              ? "Internal underwriting desk. Alex AI staff accounts only."
              : "Access is restricted to authorized Grupo Joffroy operations staff."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="portal-email">Work email</Label>
              <Input
                id="portal-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAlex ? "desk@alexai.cloud" : "operaciones@joffroy.com"}
                className="border-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portal-password">Password</Label>
              <Input
                id="portal-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-slate-200"
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
            Demo access — Joffroy client:{" "}
            <span className="font-semibold">operaciones@joffroy.com / joffroy2026</span>
            <br />
            Alex AI desk: <span className="font-semibold">desk@alexai.cloud / alexai2026</span>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          joffroy.alexai.cloud · Protected operations environment
        </p>
      </div>
    </div>
  );
}
