import gpxLogo from "@/assets/gpx-logo.png.asset.json";

export function SiteFooter() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs opacity-70">
      <span>© 2026 Alex AI Business — Desarrollado por</span>
      <a
        href="https://globalprimex.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center transition-opacity hover:opacity-90"
        aria-label="Global Primex"
      >
        <img
          src={gpxLogo.url}
          alt="Global Primex"
          className="h-4 w-auto opacity-70 grayscale"
        />
      </a>
    </div>
  );
}
