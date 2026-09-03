import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { cn } from "@/lib/utils";

type CalEvent = {
  id: string;
  title: string;
  date: Date;
  type: "visit" | "task-pending" | "task-done";
};

type View = "Month" | "Week" | "Day" | "Agenda";

const BASE = new Date(2026, 7, 1); // Aug 2026

const EVENTS: CalEvent[] = [
  { id: "e1", title: "[Visita] AP Bookkeeping", date: new Date(2026, 7, 17), type: "visit" },
  { id: "e2", title: "[Visita] AP Bookkeeping", date: new Date(2026, 7, 18), type: "visit" },
  { id: "e3", title: "[Visita] GREEN GODDESS HOUSE OF HERBS", date: new Date(2026, 7, 20), type: "visit" },
  { id: "e4", title: "[Visita] Fortgreens Mexico", date: new Date(2026, 7, 21), type: "visit" },
  { id: "e5", title: "[Visita] La Esperanza Car", date: new Date(2026, 7, 17), type: "visit" },
  { id: "e6", title: "[Visita] La Esperanza Car", date: new Date(2026, 7, 20), type: "visit" },
  { id: "e7", title: "[Visita] VZ Handyworks", date: new Date(2026, 7, 24), type: "visit" },
  { id: "e8", title: "[Visita] A&A Professional Group", date: new Date(2026, 7, 25), type: "visit" },
  { id: "e9", title: "[Visita] GREEN GODDESS HOUSE OF HERBS", date: new Date(2026, 7, 26), type: "visit" },
  { id: "e10", title: "[Visita] Noeme M. Feliciano Skinmates, LLC.", date: new Date(2026, 7, 27), type: "visit" },
  { id: "e11", title: "[Visita] Younger Brothers Companies", date: new Date(2026, 7, 28), type: "visit" },
  { id: "e12", title: "Renovación WC — SJ Sizemore", date: new Date(2026, 7, 19), type: "task-pending" },
  { id: "e13", title: "Envío COI — Pedimento 007823", date: new Date(2026, 7, 12), type: "task-done" },
];

export function PortalCalendar() {
  const [current, setCurrent] = useState(BASE);
  const [view, setView] = useState<View>("Month");

  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(current), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(current), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start, end });
    const rows: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
    return rows;
  }, [current]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-[#7A8494]">Visualize your tasks and registered visits</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-[#16305C]">
          <Legend color="bg-[#16305C]" label="Tasks (Pending)" />
          <Legend color="bg-[#22C55E]" label="Visits" />
          <Legend color="bg-[#334155]" label="Tasks (Completed)" />
        </div>
      </div>

      <div className="rounded-2xl border border-[#EDE7DE] bg-white/80 p-4 sm:p-5">
        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex overflow-hidden rounded-lg border border-[#E5DED2] bg-white text-sm font-medium text-[#16305C]">
            <button
              onClick={() => setCurrent(BASE)}
              className="border-r border-[#E5DED2] px-4 py-1.5 hover:bg-[#F6F1E8]"
            >
              Today
            </button>
            <button
              onClick={() => setCurrent((d) => subMonths(d, 1))}
              className="border-r border-[#E5DED2] px-4 py-1.5 hover:bg-[#F6F1E8]"
            >
              Back
            </button>
            <button
              onClick={() => setCurrent((d) => addMonths(d, 1))}
              className="px-4 py-1.5 hover:bg-[#F6F1E8]"
            >
              Next
            </button>
          </div>

          <h2 className="font-serif text-lg font-bold text-[#16305C]">
            {format(current, "MMMM yyyy")}
          </h2>

          <div className="inline-flex overflow-hidden rounded-lg border border-[#E5DED2] bg-white text-sm font-medium text-[#16305C]">
            {(["Month", "Week", "Day", "Agenda"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-1.5 border-r border-[#E5DED2] last:border-r-0",
                  view === v ? "bg-[#16305C] text-white" : "hover:bg-[#F6F1E8]",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Weekdays header */}
        <div className="grid grid-cols-7 border-b border-[#EDE7DE] text-center text-xs font-bold uppercase tracking-wide text-[#7A8494]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {weeks.flat().map((day) => {
            const inMonth = isSameMonth(day, current);
            const dayEvents = EVENTS.filter((e) => isSameDay(e.date, day));
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[92px] border-b border-r border-[#EDE7DE] p-1.5 first-in-row:border-l",
                  !inMonth && "bg-[#F4F0E8]",
                )}
              >
                <div className={cn("text-right text-[11px] font-semibold", inMonth ? "text-[#16305C]" : "text-[#B8B0A2]")}>
                  {format(day, "dd")}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map((e) => (
                    <EventPill key={e.id} event={e} />
                  ))}
                  {dayEvents.length > 2 && (
                    <button className="text-[10px] font-semibold text-[#16305C]/70 hover:underline">
                      + Show more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventPill({ event }: { event: CalEvent }) {
  const styles =
    event.type === "visit"
      ? "bg-emerald-500/90 text-white"
      : event.type === "task-pending"
        ? "bg-[#16305C] text-white"
        : "bg-slate-600 text-white";
  return (
    <div className={cn("truncate rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-tight", styles)}>
      {event.title}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-2.5 rounded-full", color)} />
      {label}
    </span>
  );
}
