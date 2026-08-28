import blueGlow from "@/assets/glow-blue.png.asset.json";
import tealGlow from "@/assets/glow-teal.png.asset.json";
import indigoGlow from "@/assets/glow-indigo.png.asset.json";
import violetGlow from "@/assets/glow-violet.png.asset.json";

type NebulaProps = {
  /** Overall intensity of the glow stack */
  intensity?: number;
  className?: string;
};

const layers = [
  { src: blueGlow.url, cls: "l-a", size: "w-[85%] max-w-[1200px]", opacity: 0.85 },
  { src: tealGlow.url, cls: "l-b", size: "w-[70%] max-w-[1000px]", opacity: 0.8 },
  { src: indigoGlow.url, cls: "l-c", size: "w-[95%] max-w-[1300px]", opacity: 0.5 },
  { src: violetGlow.url, cls: "l-d", size: "w-[60%] max-w-[900px]", opacity: 0.28 },
];

export function Nebula({ intensity = 1, className = "" }: NebulaProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {layers.map((layer) => (
        <img
          key={layer.cls}
          src={layer.src}
          alt=""
          draggable={false}
          className={`nebula-layer ${layer.cls} ${layer.size}`}
          style={{ opacity: layer.opacity * intensity }}
        />
      ))}
    </div>
  );
}
