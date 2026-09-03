import { Search } from "lucide-react";

export function PortalClients() {
  return (
    <div className="space-y-6">
      {/* Header: título + buscador */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-bold text-[#16305C]">
          Clients Directory
        </h1>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#A6AEBB]" />
          <input
            placeholder="Search client..."
            className="h-11 w-full rounded-xl border border-transparent bg-white pl-10 pr-4 text-sm text-[#16305C] shadow-sm placeholder:text-[#A6AEBB] focus:border-[#E5DED2] focus:outline-none"
          />
        </div>
      </div>

      {/* Dos paneles */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Panel izquierdo: lista de clientes */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-[#F0EBE3] bg-[#F7F4EE]/60 px-6 py-4">
            <p className="text-sm font-semibold text-[#16305C]">
              0 Clients found
            </p>
          </div>
          <div className="min-h-[560px]" />
        </div>

        {/* Panel derecho: detalle 360° (estado vacío) */}
        <div className="flex min-h-[620px] flex-col items-center justify-center rounded-2xl bg-white text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#F3F4F6] text-[#C3CAD4]">
            <Search className="size-7" />
          </div>
          <p className="mt-5 text-sm text-[#8A93A2]">
            Select a client to view their 360° information
          </p>
        </div>
      </div>
    </div>
  );
}
