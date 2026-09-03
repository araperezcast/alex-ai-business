import { CircleDollarSign, Plus, Target, TrendingUp, Upload, Users } from "lucide-react";

const AGENTS = [
  { initials: "AG", name: "Agent Demo", email: "agent@demo.com", role: "AGENT", quotes: "2 / 3", premium: "$5,700" },
];

export function PortalMyAgency() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 font-serif text-3xl font-bold text-[#16305C]">
            <Users className="h-7 w-7" />
            Agency Module: Demo Agency
          </h2>
          <p className="mt-1.5 text-[15px] text-[#7A8494]">
            Monitor the performance and operations of all agents in your company.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-[#EDE7DE] bg-white px-5 py-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F1F4F9] text-sm font-medium text-[#9AA3B2]">
            Logo
          </span>
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-[#16305C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1F3E73]"
            >
              <Upload className="h-4 w-4" />
              Cambiar Logo
            </button>
            <p className="mt-1.5 text-[12px] text-[#9AA3B2]">Recomendado: Cuadrado, max 2MB</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[#EDE7DE] bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#4A5568]">Written Premium (Global)</p>
            <CircleDollarSign className="h-4 w-4 text-[#9AA3B2]" />
          </div>
          <p className="mt-2 text-3xl font-bold text-[#16305C]">$5,700.00</p>
        </div>
        <div className="rounded-2xl border border-[#EDE7DE] bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#4A5568]">Generated Commissions</p>
            <TrendingUp className="h-4 w-4 text-[#9AA3B2]" />
          </div>
          <p className="mt-2 text-3xl font-bold text-[#059669]">$570.00</p>
        </div>
        <div className="rounded-2xl border border-[#EDE7DE] bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#4A5568]">Processed Quotes</p>
            <Target className="h-4 w-4 text-[#9AA3B2]" />
          </div>
          <p className="mt-2 text-3xl font-bold text-[#16305C]">3</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white">
        <p className="border-b border-[#F1EDE6] px-7 py-5 text-lg font-bold text-[#16305C]">
          Agents Directory
        </p>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1EDE6] text-[13px] font-semibold text-[#7A8494]">
              <th className="px-7 py-4">Full Name</th>
              <th className="px-7 py-4">Email Address</th>
              <th className="px-7 py-4">Role</th>
              <th className="px-7 py-4">Quotes</th>
              <th className="px-7 py-4 text-right">Bound Premium</th>
            </tr>
          </thead>
          <tbody>
            {AGENTS.map((a) => (
              <tr key={a.email} className="border-b border-[#F6F3EE] last:border-0">
                <td className="px-7 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F4F9] text-xs font-bold text-[#4A5568]">
                      {a.initials}
                    </span>
                    <span className="font-bold text-[#16305C]">{a.name}</span>
                  </div>
                </td>
                <td className="px-7 py-4 text-[#4A5568]">{a.email}</td>
                <td className="px-7 py-4">
                  <span className="rounded-full bg-[#E7EFFB] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#1A56DB]">
                    {a.role}
                  </span>
                </td>
                <td className="px-7 py-4 font-semibold text-[#16305C]">{a.quotes}</td>
                <td className="px-7 py-4 text-right font-bold text-[#16305C]">{a.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1EDE6] px-7 py-5">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold text-[#16305C]">
              <Target className="h-5 w-5" />
              Metas y Objetivos
            </p>
            <p className="mt-1 text-[13px] text-[#7A8494]">
              Monitorea y asigna metas para los agentes de la agencia.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1F3E73]"
          >
            <Plus className="h-4 w-4" />
            Asignar Meta
          </button>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1EDE6] text-[13px] font-semibold text-[#7A8494]">
              <th className="px-7 py-4">Agente</th>
              <th className="px-7 py-4">Tipo / Frecuencia</th>
              <th className="px-7 py-4">Progreso</th>
              <th className="px-7 py-4">Fechas</th>
              <th className="px-7 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-7 py-10 text-center text-[14px] text-[#9AA3B2]">
                No hay metas activas registradas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
