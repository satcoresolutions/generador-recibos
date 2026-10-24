"use client";

import type { ReactNode } from "react";
import { amountInWords } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/types";
import type { Business, Payer, PaymentMethod, Receipt } from "@/lib/types";
import { ui } from "@/lib/ui";

interface Props {
  receipt: Receipt;
  onChange: (receipt: Receipt) => void;
}

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
};

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className={ui.panel}>
      <header className={ui.panelHead}>
        <div>
          <h2 className={ui.title}>{title}</h2>
          {hint && <p className={ui.hint}>{hint}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`${ui.label} ${className}`}>
      <span className="font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export default function ReceiptForm({ receipt, onChange }: Props) {
  const set = <K extends keyof Receipt>(key: K, value: Receipt[K]) =>
    onChange({ ...receipt, [key]: value });

  const setBusiness = (key: keyof Business, value: string) =>
    onChange({ ...receipt, business: { ...receipt.business, [key]: value } });

  const setPayer = (key: keyof Payer, value: string) =>
    onChange({ ...receipt, payer: { ...receipt.payer, [key]: value } });

  return (
    <div className="flex flex-col gap-5 print:hidden">
      <Section title="Pago">
        <div className={ui.grid2}>
          <Field label="Recibí de" className="sm:col-span-2">
            <input
              className={ui.input}
              value={receipt.payer.name}
              onChange={(e) => setPayer("name", e.target.value)}
              placeholder="Nombre de quien paga"
            />
          </Field>

          <Field label="C.C. / NIT (opcional)">
            <input
              className={ui.input}
              value={receipt.payer.taxId}
              onChange={(e) => setPayer("taxId", e.target.value)}
              placeholder="1.000.000.000"
            />
          </Field>

          <Field label="Celular (para WhatsApp)">
            <input
              className={ui.input}
              value={receipt.payer.phone}
              onChange={(e) => setPayer("phone", e.target.value)}
              placeholder="300 000 0000"
              inputMode="tel"
            />
          </Field>

          <Field label="Por concepto de" className="sm:col-span-2">
            <input
              className={ui.input}
              value={receipt.concept}
              onChange={(e) => set("concept", e.target.value)}
              placeholder="Ej. Arreglo de celular, mensualidad, abono a pedido..."
            />
          </Field>

          <Field label="Valor recibido (COP)">
            <input
              className={`${ui.input} font-mono`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={receipt.amount || ""}
              placeholder="0"
              onChange={(e) => set("amount", num(e.target.value))}
            />
          </Field>

          <Field label="Saldo pendiente (opcional)">
            <input
              className={`${ui.input} font-mono`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={receipt.balance || ""}
              placeholder="0"
              onChange={(e) => set("balance", num(e.target.value))}
            />
          </Field>
        </div>

        {receipt.amount > 0 && (
          <p className={`${ui.hint} mt-3`}>
            <span className="font-semibold text-text-primary">Son: </span>
            {amountInWords(receipt.amount)}
          </p>
        )}

        <div className={`${ui.grid2} mt-4`}>
          <Field label="Forma de pago">
            <select
              className={ui.input}
              value={receipt.paymentMethod}
              onChange={(e) =>
                set("paymentMethod", e.target.value as PaymentMethod)
              }
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </Field>

          {receipt.paymentMethod !== "efectivo" && (
            <Field label="Referencia (opcional)">
              <input
                className={`${ui.input} font-mono`}
                value={receipt.reference}
                onChange={(e) => set("reference", e.target.value)}
                placeholder="N.º de comprobante"
              />
            </Field>
          )}
        </div>
      </Section>

      <Section title="Recibo">
        <div className={ui.grid2}>
          <Field label="Número">
            <input
              className={`${ui.input} font-mono`}
              value={receipt.number}
              onChange={(e) => set("number", e.target.value)}
            />
          </Field>

          <Field label="Fecha">
            <input
              className={ui.input}
              type="date"
              value={receipt.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Tu negocio"
        hint="Se recuerda en este navegador para el próximo recibo."
      >
        <div className={ui.grid2}>
          <Field label="Nombre del negocio" className="sm:col-span-2">
            <input
              className={ui.input}
              value={receipt.business.name}
              onChange={(e) => setBusiness("name", e.target.value)}
              placeholder="Nombre de tu negocio"
            />
          </Field>

          <Field label="NIT / C.C.">
            <input
              className={ui.input}
              value={receipt.business.taxId}
              onChange={(e) => setBusiness("taxId", e.target.value)}
            />
          </Field>

          <Field label="Teléfono">
            <input
              className={ui.input}
              value={receipt.business.phone}
              onChange={(e) => setBusiness("phone", e.target.value)}
              inputMode="tel"
            />
          </Field>

          <Field label="Dirección">
            <input
              className={ui.input}
              value={receipt.business.address}
              onChange={(e) => setBusiness("address", e.target.value)}
            />
          </Field>

          <Field label="Ciudad">
            <input
              className={ui.input}
              value={receipt.business.city}
              onChange={(e) => setBusiness("city", e.target.value)}
            />
          </Field>

          <Field label="Correo (opcional)" className="sm:col-span-2">
            <input
              className={ui.input}
              type="email"
              value={receipt.business.email}
              onChange={(e) => setBusiness("email", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Notas">
        <textarea
          className={`${ui.input} min-h-20 resize-y`}
          value={receipt.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Observaciones, garantía, próxima cita..."
        />
      </Section>
    </div>
  );
}