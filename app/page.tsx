"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import HistoryPanel from "@/components/HistoryPanel";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";
import { btnBrand, btnGhost, btnPrimary } from "@/components/ui";
import {
  createReceipt,
  nextNumber,
  todayISO,
  uid,
  validateReceipt,
} from "@/lib/defaults";
import { whatsappUrl } from "@/lib/share";
import {
  deleteReceipt,
  loadBusiness,
  loadReceipts,
  saveBusiness,
  saveReceipt,
} from "@/lib/storage";
import type { Receipt } from "@/lib/types";

type Tab = "editor" | "historial";
type Toast = { kind: "ok" | "error"; text: string } | null;

export default function Home() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [history, setHistory] = useState<Receipt[]>([]);
  const [tab, setTab] = useState<Tab>("editor");
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carga inicial solo en el navegador (evita desajustes de hidratación)
  useEffect(() => {
    const list = loadReceipts();
    setHistory(list);
    setReceipt(createReceipt(nextNumber(list), loadBusiness()));
  }, []);

  const notify = useCallback((kind: "ok" | "error", text: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ kind, text });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  if (!receipt) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-surface" />
        <div className="mt-6 h-96 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  const checkValid = (): boolean => {
    const missing = validateReceipt(receipt);
    if (missing.length > 0) {
      notify("error", `Falta ${missing.join(", ")}.`);
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!checkValid()) return;
    const saved: Receipt = { ...receipt, updatedAt: new Date().toISOString() };
    setHistory(saveReceipt(saved));
    saveBusiness(saved.business);
    setReceipt(saved);
    notify("ok", `${saved.number} guardado.`);
  };

  const handleNew = () => {
    setReceipt(createReceipt(nextNumber(history), receipt.business));
    setTab("editor");
    notify("ok", "Recibo nuevo listo.");
  };

  const handleWhatsapp = () => {
    if (!checkValid()) return;
    window.open(whatsappUrl(receipt), "_blank", "noopener,noreferrer");
  };

  const handleOpen = (r: Receipt) => {
    setReceipt(structuredClone(r));
    setTab("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuplicate = (r: Receipt) => {
    const now = new Date().toISOString();
    setReceipt({
      ...structuredClone(r),
      id: uid(),
      number: nextNumber(history),
      date: todayISO(),
      createdAt: now,
      updatedAt: now,
    });
    setTab("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
    notify("ok", "Copia lista. Revísala y pulsa Guardar.");
  };

  const handleDelete = (r: Receipt) => {
    if (!window.confirm(`¿Eliminar ${r.number}? Esta acción no se puede deshacer.`)) {
      return;
    }
    setHistory(deleteReceipt(r.id));
    notify("ok", `${r.number} eliminado.`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10 print:max-w-none print:p-0">
      {/* Encabezado */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="SatCore Solutions"
            width={200}
            height={65}
            priority
            className="h-auto w-35 sm:w-45 object-contain"
          />

          <div className="border-l border-line-strong pl-4">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Generador de recibos
            </h1>

            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Soluciones digitales seguras, accesibles y funcionales para todos.
            </p>
          </div>
        </div>

        <nav
          className="flex rounded-xl border border-line bg-surface p-1"
          aria-label="Secciones"
        >
          {(["editor", "historial"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-current={tab === t ? "page" : undefined}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition ${tab === t ? "bg-brand text-white" : "text-muted hover:text-white"
                }`}
            >
              {t === "historial" ? `Historial (${history.length})` : "Editor"}
            </button>
          ))}
        </nav>
      </header>

      {tab === "historial" ? (
        <div className="print:hidden">
          <HistoryPanel
            receipts={history}
            onOpen={handleOpen}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] print:block">
          <ReceiptForm receipt={receipt} onChange={setReceipt} />

          <div className="lg:sticky lg:top-6 lg:self-start print:static">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
              <p className="text-xs text-muted">Vista previa</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={btnGhost} onClick={handleNew}>
                  Nuevo
                </button>
                <button type="button" className={btnGhost} onClick={handleWhatsapp}>
                  WhatsApp
                </button>
                <button type="button" className={btnBrand} onClick={() => window.print()}>
                  Imprimir / PDF
                </button>
                <button type="button" className={btnPrimary} onClick={handleSave}>
                  Guardar
                </button>
              </div>
            </div>

            <ReceiptPreview receipt={receipt} />
          </div>
        </div>
      )}

      {/* Aviso */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-xl print:hidden ${toast.kind === "ok"
              ? "border-accent/40 bg-surface-2 text-accent"
              : "border-danger-ui/50 bg-surface-2 text-danger-ui"
            }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
