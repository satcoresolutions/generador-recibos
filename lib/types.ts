export type PaymentMethod = "efectivo" | "transferencia" | "tarjeta" | "billetera";

export interface Business {
  name: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface Payer {
  name: string;
  taxId: string;
  phone: string;
}

export interface Receipt {
  id: string;
  number: string;
  date: string; // yyyy-mm-dd
  business: Business;
  payer: Payer;
  concept: string;
  /** Valor recibido en pesos */
  amount: number;
  /** Saldo pendiente después de este pago (0 = pago total) */
  balance: number;
  paymentMethod: PaymentMethod;
  /** Referencia de la transferencia, tarjeta o billetera (opcional) */
  reference: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "efectivo", label: "Efectivo" },
  { value: "transferencia", label: "Transferencia bancaria" },
  { value: "tarjeta", label: "Tarjeta débito / crédito" },
  { value: "billetera", label: "Billetera digital (Nequi, Daviplata)" },
];

export const RECEIPT_PREFIX = "RC";
