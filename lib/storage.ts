import { emptyBusiness } from "./defaults";
import type { Business, Receipt } from "./types";

const RECEIPTS_KEY = "satcore.recibos.v1";
const BUSINESS_KEY = "satcore.recibos.negocio.v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function loadReceipts(): Receipt[] {
  const data = read<unknown>(RECEIPTS_KEY, []);
  return Array.isArray(data) ? (data as Receipt[]) : [];
}

export function saveReceipt(receipt: Receipt): Receipt[] {
  const list = loadReceipts();
  const idx = list.findIndex((r) => r.id === receipt.id);
  if (idx >= 0) list[idx] = receipt;
  else list.unshift(receipt);
  write(RECEIPTS_KEY, list);
  return list;
}

export function deleteReceipt(id: string): Receipt[] {
  const list = loadReceipts().filter((r) => r.id !== id);
  write(RECEIPTS_KEY, list);
  return list;
}

export function loadBusiness(): Business {
  const stored = read<Partial<Business> | null>(BUSINESS_KEY, null);
  return stored ? { ...emptyBusiness(), ...stored } : emptyBusiness();
}

export function saveBusiness(business: Business): void {
  write(BUSINESS_KEY, business);
}
