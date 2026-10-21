const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const formatCOP = (n: number): string => cop.format(Math.round(n));

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ---------- Número a letras (español) ---------- */

const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho",
  "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis",
  "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós",
  "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
  "veintiocho", "veintinueve",
];
const TENS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const HUNDREDS = [
  "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
  "seiscientos", "setecientos", "ochocientos", "novecientos",
];

function below1000(n: number): string {
  if (n === 0) return "";
  if (n === 100) return "cien";
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(HUNDREDS[h]);
  if (rest) {
    if (rest < 30) {
      parts.push(UNITS[rest]);
    } else {
      const t = Math.floor(rest / 10);
      const u = rest % 10;
      parts.push(u ? `${TENS[t]} y ${UNITS[u]}` : TENS[t]);
    }
  }
  return parts.join(" ");
}

function apocope(words: string): string {
  if (words.endsWith("veintiuno")) return `${words.slice(0, -9)}veintiún`;
  if (words.endsWith("uno")) return `${words.slice(0, -3)}un`;
  return words;
}

export function numberToWords(value: number): string {
  const n = Math.floor(Math.abs(value));
  if (n === 0) return "cero";
  if (n >= 1_000_000_000_000) return String(n);

  const millions = Math.floor(n / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];

  if (millions) {
    parts.push(
      millions === 1 ? "un millón" : `${apocope(numberToWords(millions))} millones`,
    );
  }
  if (thousands) {
    parts.push(thousands === 1 ? "mil" : `${apocope(below1000(thousands))} mil`);
  }
  if (rest) parts.push(below1000(rest));

  return parts.join(" ");
}

export function amountInWords(total: number): string {
  const n = Math.round(total);
  let words = numberToWords(n);
  if (n > 0 && n % 1_000_000 === 0) words += " de";
  else words = apocope(words);
  const sentence = `${words} ${n === 1 ? "peso" : "pesos"} m/cte`;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
