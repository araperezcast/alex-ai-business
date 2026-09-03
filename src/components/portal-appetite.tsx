import { useState } from "react";
import { BarChart3, Building2, Filter, Grid2x2, Package, Search, Blocks } from "lucide-react";

import { cn } from "@/lib/utils";

const CLASSES: { name: string; industries: number }[] = [
  { name: "Appliance", industries: 2 },
  { name: "Cable", industries: 1 },
  { name: "Carpentry", industries: 3 },
  { name: "Carpet", industries: 1 },
  { name: "Ceiling", industries: 1 },
  { name: "Cleaning", industries: 1 },
  { name: "Commercial", industries: 1 },
  { name: "Communication", industries: 1 },
  { name: "Contractors", industries: 4 },
  { name: "Debris", industries: 1 },
  { name: "Driveway", industries: 1 },
  { name: "Drywall", industries: 1 },
  { name: "Electrical", industries: 2 },
  { name: "Fence", industries: 1 },
  { name: "Floor", industries: 1 },
  { name: "Furniture", industries: 1 },
  { name: "Garbage", industries: 1 },
  { name: "General", industries: 1 },
  { name: "Grading", industries: 1 },
  { name: "Handyperson", industries: 1 },
  { name: "Heating", industries: 2 },
  { name: "High", industries: 1 },
  { name: "House", industries: 1 },
  { name: "Inspection", industries: 1 },
  { name: "Insulation", industries: 2 },
  { name: "Interior", industries: 1 },
  { name: "Janitorial", industries: 1 },
  { name: "Landscape", industries: 1 },
  { name: "Lawn", industries: 1 },
  { name: "Light", industries: 1 },
  { name: "Office", industries: 1 },
  { name: "Otros", industries: 3 },
  { name: "Painting", industries: 2 },
  { name: "Paperhanging", industries: 1 },
  { name: "Remodeling", industries: 2 },
  { name: "Residential", industries: 1 },
  { name: "Roofers", industries: 1 },
  { name: "Screened", industries: 1 },
  { name: "Septic", industries: 1 },
  { name: "Sheet", industries: 1 },
  { name: "Siding", industries: 1 },
  { name: "Sign", industries: 3 },
  { name: "Swimming", industries: 1 },
  { name: "Tents", industries: 1 },
  { name: "Tile", industries: 1 },
  { name: "Upholstery", industries: 1 },
  { name: "Window", industries: 1 },
];

const TABS = [
  { key: "class", label: "Class Finder", icon: Search },
  { key: "carrier", label: "Carrier Analysis", icon: Building2 },
  { key: "matrix", label: "Market Matrix", icon: Grid2x2 },
] as const;

function FilterInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
}: {
  icon: typeof Search;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#9AA3B2]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#E6E1D8] bg-white pr-3 pl-9 text-sm text-[#16305C] outline-none placeholder:text-[#9AA3B2] focus:border-[#16305C]"
      />
    </div>
  );
}

export function PortalAppetite() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("class");
  const [industry, setIndustry] = useState("");
  const [product, setProduct] = useState("");
  const [carrier, setCarrier] = useState("");

  const filtered = CLASSES.filter((c) =>
    c.name.toLowerCase().includes(industry.trim().toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3 font-serif text-3xl font-bold text-[#16305C]">
          <BarChart3 className="size-7 text-[#16305C]" />
          Market Intelligence (BI)
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[#5A6474]">
          Analyze market risk appetite. Cross-reference industries, products, and carriers to find
          placement options.
        </p>
      </div>

      {/* Cross filters */}
      <div className="rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#8A93A2] uppercase">
          <Filter className="size-3.5" /> Cross Filters
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <FilterInput
            icon={Search}
            placeholder="Search Industry..."
            value={industry}
            onChange={setIndustry}
          />
          <FilterInput
            icon={Package}
            placeholder="Filter Product..."
            value={product}
            onChange={setProduct}
          />
          <FilterInput
            icon={Building2}
            placeholder="Filter Carrier..."
            value={carrier}
            onChange={setCarrier}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] px-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                tab === t.key
                  ? "border-[#16305C] text-[#16305C]"
                  : "border-transparent text-[#7A8494] hover:text-[#16305C]",
              )}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "class" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((c) => (
            <button
              key={c.name}
              className="rounded-xl border border-[#EDE7DE] bg-[#FCFAF7] px-4 py-6 text-center transition-shadow hover:shadow-[0_4px_16px_rgba(16,24,40,0.08)]"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#ECEDF1]">
                <Blocks className="size-5 text-[#16305C]" />
              </span>
              <p className="mt-3 text-sm font-bold text-[#16305C]">{c.name}</p>
              <p className="mt-1 text-xs text-[#8A93A2]">{c.industries} industries</p>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-[#8A93A2]">
              No classes match your filters.
            </p>
          )}
        </div>
      )}

      {tab !== "class" && (
        <div className="rounded-2xl border border-[#EDE7DE] bg-[#FCFAF7] p-12 text-center">
          <p className="font-serif text-lg font-bold text-[#16305C]">
            {TABS.find((t) => t.key === tab)?.label}
          </p>
          <p className="mt-2 text-sm text-[#7A8494]">Module layout coming next.</p>
        </div>
      )}
    </div>
  );
}
