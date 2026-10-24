import {
  PAYMENT_METHODS,
  RECEIPT_PREFIX,
  type PaymentMethod,
} from "./types";

export const PAYMENT_METHOD_META: Record<PaymentMethod, { emoji: string }> = {
  efectivo: { emoji: "💵" },
  transferencia: { emoji: "📲" },
  tarjeta: { emoji: "💳" },
  billetera: { emoji: "📱" },
};

/** Opciones de métodos de pago para formularios */
export const PAYMENT_METHOD_OPTIONS = PAYMENT_METHODS;

/** Prefijo para la numeración de recibos */
export { RECEIPT_PREFIX };

/** Mismos valores que ya usa la app, para no perder los datos guardados */
export const STORAGE_KEYS = {
  receipts: "satcore-generador-recibos:recibos",
  business: "satcore-generador-recibos:negocio",
} as const;

/** Clave para guardar la preferencia del tema */
export const THEME_KEY = "satcore-generador-recibos-theme";

/** Clases reutilizables: viven en lib/ui.ts */
export { ui } from "./ui";