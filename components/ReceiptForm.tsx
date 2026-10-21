"use client";

import type { ReactNode } from "react";
import { amountInWords } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/types";
import type { Business, Payer, PaymentMethod, Receipt } from "@/lib/types";
import { inputCls } from "./ui";

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
    <section className="rounded-2xl border border-line bg-surface p-5">
      <header className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
          {title}
        </h2>
        {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
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
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium text-muted">{label}</span>
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Recibí de" className="sm:col-span-2">
            <input
              className={inputCls}
              value={receipt.payer.name}
              onChange={(e) => setPayer("name", e.target.value)}
              placeholder="Nombre de quien paga"
            />
          </Field>
          <Field label="C.C. / NIT (opcional)">
            <input
              className={inputCls}
              value={receipt.payer.taxId}
              onChange={(e) => setPayer("taxId", e.target.value)}
              placeholder="1.000.000.000"
            />
          </Field>
          <Field label="Celular (para WhatsApp)">
            <input
              className={inputCls}
              value={receipt.payer.phone}
              onChange={(e) => setPayer("phone", e.target.value)}
              placeholder="300 000 0000"
              inputMode="tel"
            />
          </Field>

          <Field label="Por concepto de" className="sm:col-span-2">
            <input
              className={inputCls}
              value={receipt.concept}
              onChange={(e) => set("concept", e.target.value)}
              placeholder="Ej. Arreglo de celular, mensualidad, abono a pedido…"
            />
          </Field>

          <Field label="Valor recibido (COP)">
            <input
              className={`${inputCls} font-mono`}
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
              className={`${inputCls} font-mono`}
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
          <p className="mt-3 text-xs text-muted">
            <span className="font-semibold text-accent">Son: </span>
            {amountInWords(receipt.amount)}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Forma de pago">
            <select
              className={inputCls}
              value={receipt.paymentMethod}
              onChange={(e) =>
                set("paymentMethod", e.target.value as PaymentMethod)
              }
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>
          {receipt.paymentMethod !== "efectivo" && (
            <Field label="Referencia (opcional)">
              <input
                className={`${inputCls} font-mono`}
                value={receipt.reference}
                onChange={(e) => set("reference", e.target.value)}
                placeholder="Nº de comprobante"
              />
            </Field>
          )}
        </div>
      </Section>

      <Section title="Recibo">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Número">
            <input
              className={`${inputCls} font-mono`}
              value={receipt.number}
              onChange={(e) => set("number", e.target.value)}
            />
          </Field>
          <Field label="Fecha">
            <input
              className={inputCls}
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Nombre del negocio" className="sm:col-span-2">
            <input
              className={inputCls}
              value={receipt.business.name}
              onChange={(e) => setBusiness("name", e.target.value)}
              placeholder="Nombre de tu negocio"
            />
          </Field>
          <Field label="NIT / C.C.">
            <input
              className={inputCls}
              value={receipt.business.taxId}
              onChange={(e) => setBusiness("taxId", e.target.value)}
            />
          </Field>
          <Field label="Teléfono">
            <input
              className={inputCls}
              value={receipt.business.phone}
              onChange={(e) => setBusiness("phone", e.target.value)}
              inputMode="tel"
            />
          </Field>
          <Field label="Dirección">
            <input
              className={inputCls}
              value={receipt.business.address}
              onChange={(e) => setBusiness("address", e.target.value)}
            />
          </Field>
          <Field label="Ciudad">
            <input
              className={inputCls}
              value={receipt.business.city}
              onChange={(e) => setBusiness("city", e.target.value)}
            />
          </Field>
          <Field label="Correo (opcional)" className="sm:col-span-2">
            <input
              className={inputCls}
              type="email"
              value={receipt.business.email}
              onChange={(e) => setBusiness("email", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Notas">
        <textarea
          className={`${inputCls} min-h-20 resize-y`}
          value={receipt.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Observaciones, garantía, próxima cita…"
        />
      </Section>
    </div>
  );
}
