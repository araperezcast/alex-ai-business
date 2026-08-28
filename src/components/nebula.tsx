import { useEffect, useRef } from "react";
import blueGlow from "@/assets/glow-blue.png.asset.json";
import tealGlow from "@/assets/glow-teal.png.asset.json";
import indigoGlow from "@/assets/glow-indigo.png.asset.json";
import violetGlow from "@/assets/glow-violet.png.asset.json";

type NebulaProps = {
  /** Overall intensity of the glow stack */
  intensity?: number;
  /** Enable cursor-following parallax on the vibrant layers */
  interactive?: boolean;
  className?: string;
};

const layers = [
  { src: blueGlow.url, cls: "l-a", size: "w-[85%] max-w-[1200px]", opacity: 0.85, pull: 46 },
  { src: tealGlow.url, cls: "l-b", size: "w-[70%] max-w-[1000px]", opacity: 0.8, pull: 62 },
  { src: indigoGlow.url, cls: "l-c", size: "w-[95%] max-w-[1300px]", opacity: 0.5, pull: 14 },
  { src: violetGlow.url, cls: "l-d", size: "w-[60%] max-w-[900px]", opacity: 0.28, pull: 8 },
];

export function Nebula({ intensity = 1, interactive = false, className = "" }: NebulaProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const root = rootRef.current;
    const host = root?.parentElement;
    if (!root || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // target (-1..1) and current, eased toward target for heavy, floaty physics
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * 0.035;
      cy += (ty - cy) * 0.035;
      root.style.setProperty("--nx", cx.toFixed(4));
      root.style.setProperty("--ny", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [interactive]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`nebula-root pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {layers.map((layer) => (
        <div
          key={layer.cls}
          className={`nebula-shift ${layer.cls}-shift`}
          style={{ ["--pull" as string]: `${interactive ? layer.pull : 0}px` }}
        >
          <img
            src={layer.src}
            alt=""
            draggable={false}
            className={`nebula-layer ${layer.cls} ${layer.size}`}
            style={{ ["--peak" as string]: layer.opacity * intensity }}
          />
        </div>
      ))}
    </div>
  );
}
