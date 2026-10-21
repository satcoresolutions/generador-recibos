import { RECEIPT_PREFIX } from "./types";
import type { Business, Payer, Receipt } from "./types";

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function todayISO(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export const emptyBusiness = (): Business => ({
  name: "",
  taxId: "",
  phone: "",
  email: "",
  address: "",
  city: "",
});

export const emptyPayer = (): Payer => ({ name: "", taxId: "", phone: "" });

export function nextNumber(receipts: Receipt[]): string {
  const re = new RegExp(`^${RECEIPT_PREFIX}-(\\d+)$`);
  let max = 0;
  for (const r of receipts) {
    const m = re.exec(r.number);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `${RECEIPT_PREFIX}-${String(max + 1).padStart(4, "0")}`;
}

export function createReceipt(number: string, business: Business): Receipt {
  const now = new Date().toISOString();
  return {
    id: uid(),
    number,
    date: todayISO(),
    business: { ...business },
    payer: emptyPayer(),
    concept: "",
    amount: 0,
    balance: 0,
    paymentMethod: "efectivo",
    reference: "",
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
}

/** Devuelve la lista de datos que faltan para poder guardar o enviar. */
export function validateReceipt(r: Receipt): string[] {
  const missing: string[] = [];
  if (!r.number.trim()) missing.push("el número del recibo");
  if (!r.payer.name.trim()) missing.push("quién paga");
  if (!r.concept.trim()) missing.push("el concepto");
  if (!(r.amount > 0)) missing.push("el valor recibido");
  return missing;
}
