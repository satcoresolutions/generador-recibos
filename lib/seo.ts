/**
 * Configuración central de SEO.
 * Define NEXT_PUBLIC_SITE_URL en producción.
 */
export const SITE = {
  name: "Generador de facturas",
  brand: "SatCore Solutions",

  description:
    "Crea y administra facturas de venta, cuentas de cobro, recibos de pago y notas de venta. Registra clientes, productos y servicios, calcula descuentos e impuestos y guarda tus documentos para consultarlos cuando los necesites.",

  shortDescription:
    "Genera facturas, cuentas de cobro, recibos y notas de venta para tu negocio.",

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  ),

  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132a8e",

  keywords: [
    "generador de facturas",
    "crear facturas de venta",
    "cuentas de cobro",
    "generador de recibos de pago",
    "notas de venta",
    "documentos de venta",
    "gestión de clientes",
    "cálculo de IVA",
    "facturas en pesos colombianos",
    "SatCore Solutions",
    "PWA",
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;