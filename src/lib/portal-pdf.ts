import { jsPDF } from "jspdf";

import type { Operation, QuoteOption } from "./portal-store";
import { usd } from "./portal-store";

const NAVY: [number, number, number] = [13, 21, 39];
const BLUE: [number, number, number] = [26, 86, 219];
const EMERALD: [number, number, number] = [6, 214, 160];
const SLATE: [number, number, number] = [100, 116, 139];

function header(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 210, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Alex AI Insurtech", 16, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(160, 180, 210);
  doc.text("x  Grupo Joffroy  |  joffroy.alexai.cloud", 16, 23);

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 16, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...SLATE);
  doc.text(subtitle, 16, 57);
}

function operationBlock(doc: jsPDF, op: Operation, y: number) {
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(16, y, 178, 32, 3, 3, "FD");
  const rows: [string, string][] = [
    ["Operation ID", op.id],
    ["Risk Vertical", op.vertical],
    ["Route", `${op.origin}  ->  ${op.destination}`],
    ["Insured Sum", `${usd(op.value)} USD`],
  ];
  doc.setFontSize(9);
  rows.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 22 + col * 88;
    const yy = y + 11 + row * 12;
    doc.setTextColor(...SLATE);
    doc.text(label.toUpperCase(), x, yy);
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.text(String(value), x, yy + 5);
    doc.setFont("helvetica", "normal");
  });
  return y + 42;
}

function footer(doc: jsPDF, note: string) {
  doc.setDrawColor(226, 232, 240);
  doc.line(16, 272, 194, 272);
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  doc.text(note, 16, 279);
  doc.text(
    `Generated ${new Date().toLocaleString("en-US")} | (c) ${new Date().getFullYear()} Alex AI Business`,
    16,
    284,
  );
}

/** Official proposal PDF built from the quotes captured by the Alex AI desk. */
export function downloadProposalPDF(op: Operation) {
  const doc = new jsPDF();
  header(doc, "Commercial Insurance Proposal", `Prepared for Grupo Joffroy | ${op.id}`);
  let y = operationBlock(doc, op, 64);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("Selected carrier options", 16, y);
  y += 6;

  (op.quotes.length ? op.quotes : []).forEach((q: QuoteOption, i) => {
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(16, y, 178, 34, 3, 3, "S");
    doc.setFillColor(...(i === 0 ? EMERALD : BLUE));
    doc.roundedRect(16, y, 3, 34, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(`Option ${i + 1} - ${q.carrier}`, 24, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...SLATE);
    doc.text(`Total premium: ${usd(q.premium)} USD`, 24, y + 18);
    doc.text(`Deductible: ${usd(q.deductible)} USD`, 100, y + 18);
    if (q.notes) doc.text(doc.splitTextToSize(q.notes, 160), 24, y + 25);
    doc.setTextColor(...BLUE);
    doc.text(`Payment link: ${q.paymentUrl}`, 24, y + 31);
    y += 40;
  });

  doc.setFontSize(9);
  doc.setTextColor(...SLATE);
  doc.text(
    doc.splitTextToSize(
      "This proposal is a summary of the terms quoted by the carriers above and is subject to final underwriting acceptance. Certificates of Insurance are issued within 90 seconds of confirmed payment.",
      178,
    ),
    16,
    y + 4,
  );

  footer(doc, "Alex AI multi-carrier underwriting desk | hello@alexai.cloud | +1 480-630-9630");
  doc.save(`Proposal-${op.id.replace(/[#\s]/g, "")}.pdf`);
}

/** Certificate of Insurance template, available after payment confirmation. */
export function downloadCOIPDF(op: Operation) {
  const doc = new jsPDF();
  const bound = op.quotes.find((q) => q.carrier === op.boundCarrier) ?? op.quotes[0];
  header(doc, "Certificate of Insurance (COI)", `Certificate holder: Grupo Joffroy | ${op.id}`);

  doc.setFillColor(...EMERALD);
  doc.roundedRect(150, 44, 44, 9, 4, 4, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("ACTIVE POLICY", 158, 50);
  doc.setFont("helvetica", "normal");

  let y = operationBlock(doc, op, 64);

  const details: [string, string][] = [
    ["Carrier", bound?.carrier ?? "Pending"],
    ["Premium paid", bound ? `${usd(bound.premium)} USD` : "—"],
    ["Deductible", bound ? `${usd(bound.deductible)} USD` : "—"],
    ["Coverage", "Inland Marine / Cargo - door to door transit"],
    ["Limit of liability", `${usd(op.value)} USD`],
    ["Effective date", new Date(op.paidAt ?? Date.now()).toLocaleDateString("en-US")],
  ];

  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(16, y, 178, 62, 3, 3, "S");
  doc.setFontSize(9);
  details.forEach(([label, value], i) => {
    const yy = y + 12 + i * 9;
    doc.setTextColor(...SLATE);
    doc.text(label.toUpperCase(), 22, yy);
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.text(String(value), 90, yy);
    doc.setFont("helvetica", "normal");
  });

  y += 72;
  doc.setFontSize(9);
  doc.setTextColor(...SLATE);
  doc.text(
    doc.splitTextToSize(
      "This certificate is issued as a matter of information only and confers no rights upon the certificate holder beyond the coverage afforded by the policy referenced above.",
      178,
    ),
    16,
    y,
  );

  footer(doc, "Issued automatically by Alex AI in under 90 seconds after payment confirmation.");
  doc.save(`COI-${op.id.replace(/[#\s]/g, "")}.pdf`);
}
