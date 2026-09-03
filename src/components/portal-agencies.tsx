import { useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Agency = { name: string; users: number; internalId: string };

export function PortalAgencies() {
  const [name, setName] = useState("");
  const [agencies, setAgencies] = useState<Agency[]>([]);

  function register() {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Enter an agency name to register it.");
      return;
    }
    setAgencies((prev) => [
      ...prev,
      {
        name: trimmed,
        users: 0,
        internalId: `AG-${String(prev.length + 1).padStart(3, "0")}`,
      },
    ]);
    setName("");
    toast.success("Agency registered", { description: trimmed });
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* ===== Header ===== */}
      <div>
        <h1 className="flex items-center gap-2.5 font-serif text-2xl font-bold tracking-tight text-[#16305C]">
          <Building2 className="size-6" />
          Directorio de Agencias
        </h1>
        <p className="mt-1 text-sm text-[#7A8494]">
          Gestiona las compañías registradas en la plataforma.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        {/* ===== New agency card ===== */}
        <div className="h-fit rounded-2xl border border-[#EDE7DE] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#16305C]">Nueva Agencia</h2>
          <div className="mt-4 space-y-2">
            <Label className="text-xs font-semibold text-[#3D4C63]">
              Nombre de la Agencia
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && register()}
              placeholder="Ej. Acme Insurance Group"
              className="border-[#E2E8F0] bg-[#F9FAFB] placeholder:text-[#9AA4B2]"
            />
          </div>
          <Button
            onClick={register}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#0048FF] to-[#07D6A0] text-white hover:opacity-90"
          >
            <Plus className="mr-1.5 size-4" /> Registrar Agencia
          </Button>
        </div>

        {/* ===== Directory table ===== */}
        <div className="h-fit overflow-x-auto rounded-2xl border border-[#EDE7DE] bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-[#EDE7DE] bg-[#F9FAFB] hover:bg-[#F9FAFB]">
                {["Nombre de Agencia", "Usuarios Asignados", "ID Interno", "Acciones"].map(
                  (h, i) => (
                    <TableHead
                      key={h}
                      className={`text-xs font-semibold text-[#7A8494] ${i === 3 ? "text-right" : ""}`}
                    >
                      {h}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {agencies.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="py-10 text-center text-sm text-[#7A8494]">
                    No hay agencias registradas.
                  </TableCell>
                </TableRow>
              ) : (
                agencies.map((a) => (
                  <TableRow key={a.internalId} className="border-[#F1ECE4]">
                    <TableCell className="font-semibold text-[#16305C]">{a.name}</TableCell>
                    <TableCell className="tabular-nums text-[#3D4C63]">{a.users}</TableCell>
                    <TableCell className="tabular-nums text-[#7A8494]">{a.internalId}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() =>
                          setAgencies((prev) =>
                            prev.filter((x) => x.internalId !== a.internalId),
                          )
                        }
                        className="rounded-lg p-2 text-[#9AA4B2] hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${a.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
