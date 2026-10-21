"use client";

import { useMemo, useState } from "react";
import { todayISO } from "@/lib/defaults";
import { formatCOP, formatDate } from "@/lib/format";
import type { Receipt } from "@/lib/types";
import { btnGhost, inputCls } from "./ui";

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
      <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
        <p className="text-sm font-semibold text-white">Aún no hay recibos guardados</p>
        <p className="mt-1 text-sm text-muted">
          Crea un recibo en el editor y pulsa «Guardar» para verlo aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Recibos</p>
          <p className="mt-1 font-mono text-2xl font-bold text-white">
            {receipts.length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Recibido hoy</p>
          <p className="mt-1 font-mono text-2xl font-bold text-white">
            {formatCOP(totalToday)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-xs text-muted">Total recibido</p>
          <p className="mt-1 font-mono text-2xl font-bold text-accent">
            {formatCOP(totalAll)}
          </p>
        </div>
      </div>

      <input
        className={inputCls}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por número, cliente o concepto…"
        aria-label="Buscar recibos"
      />

      <ul className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-line bg-surface p-6 text-center text-sm text-muted">
            Sin resultados para «{query}».
          </li>
        )}
        {filtered.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted">
                <span className="font-mono text-white">{r.number}</span> ·{" "}
                {formatDate(r.date)}
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-white">
                {r.payer.name || "Sin nombre"}
              </p>
              <p className="truncate text-xs text-muted">{r.concept}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <span className="mr-2 font-mono text-base font-bold text-accent">
                {formatCOP(r.amount)}
              </span>
              <button type="button" className={btnGhost} onClick={() => onOpen(r)}>
                Abrir
              </button>
              <button type="button" className={btnGhost} onClick={() => onDuplicate(r)}>
                Duplicar
              </button>
              <button
                type="button"
                className={`${btnGhost} text-danger-ui`}
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
