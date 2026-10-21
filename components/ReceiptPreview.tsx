"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { amountInWords, formatCOP, formatDate } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/types";
import type { Receipt } from "@/lib/types";

function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "RC";
  const first = words[0][0] ?? "";
  const second = words[1]?.[0] ?? words[0][1] ?? "";
  return (first + second).toUpperCase();
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-paper-line py-2.5 text-sm">
      <dt className="pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
        {label}
      </dt>
      <dd className="text-paper-fg">{children}</dd>
    </div>
  );
}

export default function ReceiptPreview({ receipt }: { receipt: Receipt }) {
  const { business, payer } = receipt;
  const method =
    PAYMENT_METHODS.find((m) => m.value === receipt.paymentMethod)?.label ?? "";

  const businessLines = [
    business.taxId && `NIT / C.C. ${business.taxId}`,
    [business.address, business.city].filter(Boolean).join(", "),
    [business.phone, business.email].filter(Boolean).join(" · "),
  ].filter(Boolean) as string[];

  const dash = <span className="text-paper-muted">—</span>;

  return (
    <article
      id="receipt-preview"
      className="receipt-paper rounded-2xl border border-line bg-paper p-6 text-paper-fg shadow-2xl shadow-black/40 sm:p-8"
    >
      {/* Encabezado */}
      <header className="flex items-start justify-between gap-4 border-b border-paper-line pb-5">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={160}
            height={60}
            priority
            className="h-auto w-24 shrink-0 object-contain sm:w-32"
          />

          <div>
            <p className="text-base font-bold leading-tight">
              {business.name || "Tu negocio"}
            </p>

            <div className="mt-0.5 space-y-0.5 text-xs text-paper-muted">
              {businessLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
        </div>
      <div className="shrink-0 text-right">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
          Recibo de pago
        </p>
        <p className="font-mono text-lg font-semibold">{receipt.number || "—"}</p>
        <p className="text-xs text-paper-muted">{formatDate(receipt.date)}</p>
      </div>
    </header>

      {/* Valor */ }
  <div className="mt-5 rounded-xl border border-paper-line px-4 py-4 text-center">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-muted">
      Valor recibido
    </p>
    <p className="mt-1 font-mono text-3xl font-bold text-paper-accent">
      {formatCOP(receipt.amount)}
    </p>
    {receipt.amount > 0 && (
      <p className="mt-1 text-xs text-paper-muted">
        {amountInWords(receipt.amount)}
      </p>
    )}
  </div>

  {/* Detalle */ }
  <dl className="mt-3">
    <Row label="Recibí de">
      {payer.name ? (
        <>
          <span className="font-semibold">{payer.name}</span>
          {payer.taxId && (
            <span className="text-paper-muted"> · C.C./NIT {payer.taxId}</span>
          )}
        </>
      ) : (
        dash
      )}
    </Row>
    <Row label="Concepto">{receipt.concept || dash}</Row>
    <Row label="Forma de pago">
      {method}
      {receipt.reference.trim() && (
        <span className="font-mono text-paper-muted">
          {" "}
          · Ref. {receipt.reference.trim()}
        </span>
      )}
    </Row>
    {receipt.balance > 0 && (
      <Row label="Saldo pendiente">
        <span className="font-mono font-semibold">
          {formatCOP(receipt.balance)}
        </span>
      </Row>
    )}
  </dl>

  {
    receipt.notes.trim() && (
      <div className="mt-4 text-xs">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
          Notas
        </p>
        <p className="mt-1 whitespace-pre-line text-paper-muted">{receipt.notes}</p>
      </div>
    )
  }

  {/* Firmas */ }
  <div className="mt-12 grid grid-cols-2 gap-8 text-center text-xs">
    <div>
      <div className="border-t border-paper-muted pt-1.5">
        <p className="font-medium">{business.name || "Quien recibe"}</p>
        <p className="text-paper-muted">Recibe</p>
      </div>
    </div>
    <div>
      <div className="border-t border-paper-muted pt-1.5">
        <p className="font-medium">{payer.name || "Quien paga"}</p>
        <p className="text-paper-muted">Paga</p>
      </div>
    </div>
  </div>

  {/* Pie */ }
  <footer className="mt-8 border-t border-paper-line pt-3 text-center text-[10px] leading-relaxed text-paper-muted">
    <p>Recibo de pago informativo generado con SatCore Solutions.</p>
    <p className="mt-0.5">
      Soluciones digitales seguras, accesibles y funcionales para todos.
    </p>
  </footer>
    </article >
  );
}
