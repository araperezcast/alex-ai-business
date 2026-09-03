import { useState } from "react";
import { Building2, History, Pencil, Plus, Search, ShieldCheck, Trash2, Upload } from "lucide-react";

interface Carrier {
  id: number;
  name: string;
  addedOn: string;
  logo?: string | undefined;
}

const INITIAL_CARRIERS: Carrier[] = [
  { id: 1, name: "Alchemy Insurance Solutions", addedOn: "8/20/2026" },
  { id: 2, name: "AmTrust Financial", addedOn: "8/20/2026" },
  { id: 3, name: "AmTrust Insurance", addedOn: "8/20/2026" },
  { id: 4, name: "AssuranceAmerica", addedOn: "8/29/2026" },
  { id: 5, name: "Attune / Blackboard Insurance Company / Accredited Insurance Company", addedOn: "8/20/2026" },
  { id: 6, name: "Attune / EMPLOYERS", addedOn: "8/20/2026" },
  { id: 7, name: "Attune / New Hampshire Insurance Company", addedOn: "8/20/2026" },
  { id: 8, name: "Attune Insurance", addedOn: "8/26/2026" },
];

export function PortalCarriers() {
  const [carriers, setCarriers] = useState(INITIAL_CARRIERS);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [logoName, setLogoName] = useState<string | null>(null);

  const filtered = carriers.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const addCarrier = () => {
    if (!name.trim()) return;
    const today = new Date();
    setCarriers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        addedOn: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
        logo: logoName ?? undefined,
      },
    ]);
    setName("");
    setLogoName(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 font-serif text-3xl font-bold text-[#16305C]">
            <ShieldCheck className="h-7 w-7" />
            Carriers Directory
          </h2>
          <p className="mt-1.5 text-[15px] text-[#7A8494]">
            Manage the official names and logos of insurance carriers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#16305C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1F3E73]"
        >
          <Plus className="h-4 w-4" />
          New Carrier
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#EDE7DE] bg-white p-6">
          <p className="text-sm font-bold text-[#16305C]">New Carrier</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Official carrier name..."
              className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#16305C] outline-none placeholder:text-[#9AA3B2] focus:border-[#1A56DB]"
            />
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#4A5568] transition hover:border-[#1A56DB]">
              <Upload className="h-4 w-4" />
              {logoName ?? "Upload logo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setLogoName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#4A5568] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addCarrier}
              className="rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#06D6A0] px-4 py-2 text-sm font-semibold text-white"
            >
              Save Carrier
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#EDE7DE] bg-white">
        <div className="p-5 pb-0">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3B2]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search carrier..."
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] py-2.5 pl-11 pr-4 text-sm text-[#16305C] outline-none placeholder:text-[#9AA3B2] focus:border-[#1A56DB]"
            />
          </div>
        </div>
        <table className="mt-4 w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1EDE6] text-[13px] font-semibold text-[#7A8494]">
              <th className="px-7 py-3.5">Logo</th>
              <th className="px-7 py-3.5">Carrier Name</th>
              <th className="px-7 py-3.5">Added On</th>
              <th className="px-7 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[#F6F3EE] last:border-0">
                <td className="px-7 py-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F4F9] text-[#7A8494]">
                    <Building2 className="h-5 w-5" />
                  </span>
                </td>
                <td className="px-7 py-3.5 font-bold text-[#16305C]">{c.name}</td>
                <td className="px-7 py-3.5 text-[#4A5568]">{c.addedOn}</td>
                <td className="px-7 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      title="History"
                      className="rounded-lg bg-[#F1F4F9] p-2 text-[#7A8494] transition hover:bg-[#E6ECF5]"
                    >
                      <History className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => setCarriers((prev) => prev.filter((x) => x.id !== c.id))}
                      className="rounded-lg bg-[#FDEEEE] p-2 text-[#E11D48] transition hover:bg-[#FBDCDC]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#F1F4F9] px-3 py-2 text-[13px] font-semibold text-[#4A5568] transition hover:bg-[#E6ECF5]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-7 py-10 text-center text-[14px] text-[#9AA3B2]">
                  No carriers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
