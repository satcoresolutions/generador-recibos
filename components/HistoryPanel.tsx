"use client";

import { useMemo, useState } from "react";
import { todayISO } from "@/lib/defaults";
import { formatCOP, formatDate } from "@/lib/format";
import type { Receipt } from "@/lib/types";
import { ui } from "@/lib/ui";

interface Props {
  receipts: Receipt[];
  onOpen: (receipt: Receipt) => void;
  onDuplicate: (receipt: Receipt) => void;
  onDelete: (receipt: Receipt) => void;
}

export default function HistoryPanel({
  receipts,
  onOpen,
  onDuplicate,
  onDelete,
}: Props) {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () => [...receipts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [receipts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return sorted;

    return sorted.filter(
      (r) =>
        r.number.toLowerCase().includes(q) ||
        r.payer.name.toLowerCase().includes(q) ||
        r.concept.toLowerCase().includes(q),
    );
  }, [sorted, query]);

  const today = todayISO();
  const totalAll = receipts.reduce((acc, r) => acc + r.amount, 0);
  const totalToday = receipts
    .filter((r) => r.date === today)
    .reduce((acc, r) => acc + r.amount, 0);

  if (receipts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface-secondary p-10 text-center">
        <p className={ui.title}>Aún no hay recibos guardados</p>
        <p className="mt-1 text-sm text-text-muted">
          Crea un recibo en el editor y pulsa «Guardar» para verlo aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Resumen */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className={ui.panel}>
          <p className={ui.mutedSmall}>Recibos</p>
          <p className="mt-1 font-mono text-2xl font-bold text-foreground">
            {receipts.length}
          </p>
        </div>

        <div className={ui.panel}>
          <p className={ui.mutedSmall}>Recibido hoy</p>
          <p className="mt-1 font-mono text-2xl font-bold text-foreground">
            {formatCOP(totalToday)}
          </p>
        </div>

        <div className={ui.panel}>
          <p className={ui.mutedSmall}>Total recibido</p>
          <p className="mt-1 font-mono text-2xl font-bold text-text-primary">
            {formatCOP(totalAll)}
          </p>
        </div>
      </div>

      {/* Búsqueda */}
      <label className={ui.label}>
        Buscar recibos
        <input
          className={ui.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Número, cliente o concepto..."
          aria-label="Buscar recibos por número, cliente o concepto"
        />
      </label>

      {/* Lista de recibos */}
      <ul className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <li className={`${ui.panel} text-center`}>
            <p className={ui.muted}>
              Sin resultados para «{query}».
            </p>
          </li>
        )}

        {filtered.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface-secondary p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className={ui.mutedSmall}>
                <span className="font-mono font-semibold text-foreground">
                  {r.number}
                </span>{" "}
                · {formatDate(r.date)}
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-foreground">
                {r.payer.name || "Sin nombre"}
              </p>

              <p className="truncate text-sm text-text-muted">
                {r.concept || "Sin concepto"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <span className="mr-2 font-mono text-base font-bold text-text-primary">
                {formatCOP(r.amount)}
              </span>

              <button
                type="button"
                className={ui.btn}
                onClick={() => onOpen(r)}
              >
                Abrir
              </button>

              <button
                type="button"
                className={ui.btnGhost}
                onClick={() => onDuplicate(r)}
              >
                Duplicar
              </button>

              <button
                type="button"
                className={`${ui.btnGhost} text-danger hover:underline`}
                onClick={() => onDelete(r)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}