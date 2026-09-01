import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Underwriting Back-Office | Alex AI Business" },
      {
        name: "description",
        content:
          "Internal Alex AI desk: incoming Joffroy risk requests, SLA tracking, carrier quote capture, and automated proposal & COI document generation.",
      },
      { property: "og:title", content: "Underwriting Back-Office | Alex AI Business" },
      {
        property: "og:description",
        content:
          "Queue, quote capture, and document engine for the Alex AI multi-carrier underwriting desk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminRedirect,
});

/** The back-office now lives inside the portal shell under the Admin section. */
function AdminRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/portal", replace: true });
  }, [navigate]);
  return null;
}
