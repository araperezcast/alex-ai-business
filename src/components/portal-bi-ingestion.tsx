import { useState } from "react";
import { Database, FileJson, Info } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const PLACEHOLDER = `[\n  {\n    "carrier_name": "Chubb",\n    "product_line": "Cyber",\n    ...\n  }\n]`;

export function PortalBIIngestion() {
  const [payload, setPayload] = useState("");

  function process() {
    if (!payload.trim()) {
      toast.error("Paste a structured JSON payload before processing.");
      return;
    }
    try {
      JSON.parse(payload);
      toast.success("Payload processed", {
        description: "Business intelligence matrix updated.",
      });
      setPayload("");
    } catch {
      toast.error("Invalid JSON", {
        description: "Check brackets and commas before retrying.",
      });
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* ===== Header ===== */}
      <div>
        <h1 className="flex items-center gap-2.5 font-serif text-2xl font-bold tracking-tight text-[#16305C]">
          <Database className="size-6" />
          Ingesta Manual (BI Matrix)
        </h1>
        <p className="mt-1 text-sm text-[#7A8494]">
          Pega aquí el JSON estructurado que generaste con Gemini. El sistema lo convertirá en
          inteligencia de negocios.
        </p>
      </div>

      {/* ===== Tip banner ===== */}
      <div className="mt-6 flex gap-3 rounded-2xl border border-[#D6E4F0] bg-[#EDF3FA] px-5 py-4">
        <Info className="mt-0.5 size-4.5 shrink-0 text-[#1A56DB]" />
        <div>
          <p className="text-sm font-bold text-[#16305C]">Tip de Extracción con Gemini:</p>
          <p className="mt-0.5 text-sm leading-relaxed text-[#1A56DB]">
            Pide siempre que adapte la terminología de seguros al español de la industria, evitando
            traducciones literales (Ej. "Steel Erection" debe ser "Montaje Estructural", no
            "Erección").
          </p>
        </div>
      </div>

      {/* ===== Payload card ===== */}
      <div className="mt-5 rounded-2xl border border-[#EDE7DE] bg-white shadow-sm">
        <div className="flex items-center gap-2 px-6 pt-5">
          <FileJson className="size-4.5 text-[#16305C]" />
          <h2 className="text-sm font-bold text-[#16305C]">Payload JSON</h2>
        </div>
        <div className="px-6 pb-6 pt-4">
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            className="h-64 w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F9FAFB] p-4 font-mono text-sm text-[#3D4C63] placeholder:text-[#9AA4B2] focus:border-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/15"
          />
          <div className="mt-4 flex justify-end">
            <Button
              onClick={process}
              className="rounded-full bg-gradient-to-r from-[#0048FF] to-[#07D6A0] px-5 text-white hover:opacity-90"
            >
              Procesar e Inyectar a DB
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
