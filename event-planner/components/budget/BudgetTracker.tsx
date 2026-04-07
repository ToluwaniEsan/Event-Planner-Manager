"use client";

import { useCallback, useEffect, useState } from "react";

type BudgetPayload = {
  eventId: string;
  title: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  usedRatio: number;
  bookingCount: number;
};

function formatMoney(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function BudgetTracker() {
  const [eventId, setEventId] = useState("");
  const [data, setData] = useState<BudgetPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const id = eventId.trim();
    if (!id) {
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/budget?eventId=${encodeURIComponent(id)}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Failed to load");
      }
      setData(json as BudgetPayload);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    void load();
  }, [load]);

  const pct = data ? Math.round(data.usedRatio * 100) : 0;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <label htmlFor="budget-event" className="text-sm font-medium">
          Event ID
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="budget-event"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm dark:border-zinc-700"
            placeholder="Event cuid from API / database"
          />
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading || !eventId.trim()}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      {data ? (
        <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-800/40">
          <div>
            <h2 className="text-lg font-semibold">{data.title}</h2>
            <p className="text-xs text-zinc-500">
              {data.bookingCount} active booking(s) (excludes cancelled)
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-zinc-500">Total budget</dt>
              <dd className="text-lg font-semibold tabular-nums">{formatMoney(data.totalBudget)}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Spent</dt>
              <dd className="text-lg font-semibold tabular-nums text-violet-600 dark:text-violet-400">
                {formatMoney(data.spent)}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Remaining</dt>
              <dd className="text-lg font-semibold tabular-nums">{formatMoney(data.remaining)}</dd>
            </div>
          </dl>

          <div>
            <div className="mb-1 flex justify-between text-xs text-zinc-500">
              <span>Budget used</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-violet-600 transition-all dark:bg-violet-500"
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>
        </div>
      ) : null}

      {!data && !error && !loading && eventId.trim() ? (
        <p className="text-sm text-zinc-500">Loading…</p>
      ) : null}

      <p className="text-xs text-zinc-500">
        Set an event’s <strong>budget</strong> when creating it (POST{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">/api/events</code> with{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">budget</code>) or update in Prisma
        Studio. Spent = sum of{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">totalPrice</code> on non-cancelled
        bookings.
      </p>
    </div>
  );
}
