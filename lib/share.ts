import { amountInWords, formatCOP, formatDate } from "./format";
import { PAYMENT_METHODS } from "./types";
import type { Receipt } from "./types";

export function receiptText(r: Receipt): string {
  const method =
    PAYMENT_METHODS.find((m) => m.value === r.paymentMethod)?.label ?? "";

  const lines = [
    `*${r.business.name || "Recibo de pago"}*`,
    `Recibo de pago ${r.number}`,
    `Fecha: ${formatDate(r.date)}`,
    `Recibí de: ${r.payer.name}`,
    `Concepto: ${r.concept}`,
    `Valor: ${formatCOP(r.amount)} (${amountInWords(r.amount)})`,
    `Forma de pago: ${method}${r.reference.trim() ? ` · Ref. ${r.reference.trim()}` : ""}`,
  ];
  if (r.balance > 0) lines.push(`Saldo pendiente: ${formatCOP(r.balance)}`);
  lines.push("¡Gracias por tu pago!");
  return lines.join("\n");
}

/** Enlace de WhatsApp. Si el cliente tiene celular, abre su chat directamente. */
export function whatsappUrl(r: Receipt): string {
  const digits = r.payer.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `57${digits}` : digits.length >= 11 ? digits : "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(receiptText(r))}`;
}
