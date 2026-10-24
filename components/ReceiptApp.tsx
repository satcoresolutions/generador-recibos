"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HistoryPanel from "@/components/HistoryPanel";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptPreview from "@/components/ReceiptPreview";
import { ui } from "@/lib/ui";
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

export default function ReceiptApp() {
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [history, setHistory] = useState<Receipt[]>([]);
    const [tab, setTab] = useState<Tab>("editor");
    const [toast, setToast] = useState<Toast>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Carga inicial solo en el navegador.
    useEffect(() => {
        const list = loadReceipts();

        setHistory(list);
        setReceipt(createReceipt(nextNumber(list), loadBusiness()));
    }, []);

    // Limpia el temporizador cuando se desmonta el componente.
    useEffect(() => {
        return () => {
            if (toastTimer.current) clearTimeout(toastTimer.current);
        };
    }, []);

    const notify = useCallback((kind: "ok" | "error", text: string) => {
        if (toastTimer.current) clearTimeout(toastTimer.current);

        setToast({ kind, text });

        toastTimer.current = setTimeout(() => {
            setToast(null);
            toastTimer.current = null;
        }, 3200);
    }, []);

    const checkValid = (): boolean => {
        if (!receipt) return false;

        const missing = validateReceipt(receipt);

        if (missing.length > 0) {
            notify("error", `Falta ${missing.join(", ")}.`);
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (!receipt || !checkValid()) return;

        const saved: Receipt = {
            ...receipt,
            updatedAt: new Date().toISOString(),
        };

        setHistory(saveReceipt(saved));
        saveBusiness(saved.business);
        setReceipt(saved);

        notify("ok", `${saved.number} guardado.`);
    };

    const handleNew = () => {
        if (!receipt) return;

        setReceipt(createReceipt(nextNumber(history), receipt.business));
        setTab("editor");

        notify("ok", "Recibo nuevo listo.");
    };

    const handleWhatsapp = () => {
        if (!receipt || !checkValid()) return;

        window.open(whatsappUrl(receipt), "_blank", "noopener,noreferrer");
    };

    const handleOpen = (item: Receipt) => {
        setReceipt(structuredClone(item));
        setTab("editor");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDuplicate = (item: Receipt) => {
        const now = new Date().toISOString();

        setReceipt({
            ...structuredClone(item),
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

    const handleDelete = (item: Receipt) => {
        if (
            !window.confirm(
                `¿Eliminar ${item.number}? Esta acción no se puede deshacer.`,
            )
        ) {
            return;
        }

        setHistory(deleteReceipt(item.id));
        notify("ok", `${item.number} eliminado.`);
    };

    if (!receipt) {
        return (
            <div className="w-full animate-pulse space-y-6">
                <div className="h-10 w-64 rounded-lg bg-surface" />
                <div className="h-96 rounded-2xl bg-surface" />
            </div>
        );
    }

    return (
        <div className="w-full print:max-w-none print:p-0">
            {/* Navegación del generador */}
            <nav
                className="mb-6 flex w-fit rounded-xl border border-border bg-surface-secondary p-1 print:hidden"
                aria-label="Secciones del generador"
            >
                {(["editor", "historial"] as const).map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setTab(item)}
                        aria-current={tab === item ? "page" : undefined}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === item
                                ? "bg-primary text-white"
                                : "text-text-muted hover:bg-surface hover:text-foreground"
                            }`}
                    >
                        {item === "historial"
                            ? `Historial (${history.length})`
                            : "Editor"}
                    </button>
                ))}
            </nav>

            {/* Historial */}
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
                /* Editor y vista previa */
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] print:block">
                    <ReceiptForm receipt={receipt} onChange={setReceipt} />

                    <div className="min-w-0 lg:sticky lg:top-24 lg:self-start print:static">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
                            <p className="text-xs text-text-muted">Vista previa del recibo</p>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className={ui.btn}
                                    onClick={handleNew}
                                >
                                    Nuevo
                                </button>

                                <button
                                    type="button"
                                    className={ui.btn}
                                    onClick={handleWhatsapp}
                                >
                                    WhatsApp
                                </button>

                                <button
                                    type="button"
                                    className={ui.btnPrimary}
                                    onClick={() => window.print()}
                                >
                                    Imprimir / PDF
                                </button>

                                <button
                                    type="button"
                                    className={ui.btnPrimary}
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>

                        <ReceiptPreview receipt={receipt} />
                    </div>
                </div>
            )}

            {/* Notificaciones */}
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-xl print:hidden ${toast.kind === "ok"
                            ? "border-success/30 bg-surface-secondary text-success"
                            : "border-danger/30 bg-surface-secondary text-danger"
                        }`}
                >
                    {toast.text}
                </div>
            )}
        </div>
    );
}