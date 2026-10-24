"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { amountInWords, formatCOP, formatDate } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/types";
import type { Receipt } from "@/lib/types";

function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-paper-line py-2.5 text-sm">
      <dt className="pt-0.5 text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-paper-fg">{children}</dd>
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
      className="receipt-paper rounded-2xl border border-paper-line bg-paper p-6 text-paper-fg shadow-2xl shadow-black/40 sm:p-8"
    >
      {/* Encabezado */}
      <header className="flex flex-col gap-4 border-b border-paper-line pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo de SatCore Solutions"
            width={160}
            height={60}
            priority
            className="h-auto w-24 shrink-0 object-contain sm:w-32"
          />

          <div className="min-w-0">
            <p className="break-words text-base font-bold leading-tight">
              {business.name || "Tu negocio"}
            </p>

            <div className="mt-1 space-y-0.5 text-xs text-paper-muted">
              {businessLines.map((line) => (
                <p key={line} className="break-words">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 text-left sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
            Recibo de pago
          </p>
          <p className="font-mono text-lg font-semibold">
            {receipt.number || "—"}
          </p>
          <p className="text-xs text-paper-muted">
            {formatDate(receipt.date)}
          </p>
        </div>
      </header>

      {/* Valor recibido */}
      <div className="mt-5 rounded-xl border border-paper-line px-4 py-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-muted">
          Valor recibido
        </p>

        <p className="mt-1 break-words font-mono text-2xl font-bold text-paper-accent sm:text-3xl">
          {formatCOP(receipt.amount)}
        </p>

        {receipt.amount > 0 && (
          <p className="mt-1 text-xs text-paper-muted">
            {amountInWords(receipt.amount)}
          </p>
        )}
      </div>

      {/* Detalle del pago */}
      <dl className="mt-3">
        <Row label="Recibí de">
          {payer.name ? (
            <>
              <span className="font-semibold">{payer.name}</span>
              {payer.taxId && (
                <span className="text-paper-muted">
                  {" "}
                  · C.C./NIT {payer.taxId}
                </span>
              )}
            </>
          ) : (
            dash
          )}
        </Row>

        <Row label="Concepto">{receipt.concept || dash}</Row>

        <Row label="Forma de pago">
          {method || dash}
          {receipt.reference.trim() && (
            <span className="break-words font-mono text-paper-muted">
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

      {/* Notas */}
      {receipt.notes.trim() && (
        <div className="mt-4 text-xs">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-paper-accent">
            Notas
          </p>
          <p className="mt-1 whitespace-pre-line break-words text-paper-muted">
            {receipt.notes}
          </p>
        </div>
      )}

      {/* Firmas */}
      <div className="mt-12 grid grid-cols-2 gap-6 text-center text-xs sm:gap-8">
        <div>
          <div className="border-t border-paper-muted pt-1.5">
            <p className="break-words font-medium">
              {business.name || "Quien recibe"}
            </p>
            <p className="text-paper-muted">Recibe</p>
          </div>
        </div>

        <div>
          <div className="border-t border-paper-muted pt-1.5">
            <p className="break-words font-medium">
              {payer.name || "Quien paga"}
            </p>
            <p className="text-paper-muted">Paga</p>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="mt-8 border-t border-paper-line pt-3 text-center text-[10px] leading-relaxed text-paper-muted">
        <p>Recibo de pago informativo generado con SatCore Solutions.</p>
        <p className="mt-0.5">
          Soluciones digitales seguras, accesibles y funcionales para todos.
        </p>
      </footer>
    </article>
  );
}