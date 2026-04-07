"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_ORDER,
  formatVendorMoney,
  VENDORS,
  type Vendor,
  type VendorCategory,
} from "@/lib/vendors";
import {
  Building2,
  Check,
  Music,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const categoryIcon = {
  Venue: Building2,
  Catering: UtensilsCrossed,
  Music: Music,
  Activities: Sparkles,
} as const;

export function CreateEventWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const vendorsByCategory = useMemo(() => {
    const map = new Map<VendorCategory, Vendor[]>();
    for (const c of CATEGORY_ORDER) map.set(c, []);
    for (const v of VENDORS) {
      map.get(v.category)!.push(v);
    }
    return map;
  }, []);

  const step1Valid =
    eventName.trim().length > 0 &&
    eventDate.length > 0 &&
    location.trim().length > 0 &&
    Number(guestCount) >= 1;

  const selectedVendors = useMemo(
    () => VENDORS.filter((v) => selectedIds.includes(v.id)),
    [selectedIds]
  );

  const totalEstimate = useMemo(
    () => selectedVendors.reduce((s, v) => s + v.price, 0),
    [selectedVendors]
  );

  const guestsNum = Math.max(1, Number(guestCount) || 1);
  const perGuest = totalEstimate / guestsNum;

  function toggleVendor(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleFinish() {
    console.log("Create event", {
      eventName,
      eventDate,
      location,
      guestCount: guestsNum,
      vendorIds: selectedIds,
      totalEstimate,
    });
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:focus:border-violet-400 dark:focus:ring-violet-400/20";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Step {step} of 3
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Create event
        </h1>
        <div
          className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Form progress"
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-300 ease-out dark:bg-violet-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 ? (
        <section className="space-y-6" aria-labelledby="step1-heading">
          <h2 id="step1-heading" className="sr-only">
            Event details
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="event-name" className="text-sm font-medium">
                Event name
              </label>
              <input
                id="event-name"
                className={inputClass}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Summer gala 2026"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="event-date" className="text-sm font-medium">
                Date
              </label>
              <input
                id="event-date"
                type="date"
                className={inputClass}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="guest-count" className="text-sm font-medium">
                Guest count
              </label>
              <input
                id="guest-count"
                type="number"
                min={1}
                className={inputClass}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="120"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                className={inputClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or venue address"
                autoComplete="address-level2"
              />
            </div>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-8" aria-labelledby="step2-heading">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="step2-heading" className="text-lg font-semibold">
              Choose vendors
            </h2>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {selectedIds.length} selected
            </span>
          </div>
          {CATEGORY_ORDER.map((cat) => {
            const Icon = categoryIcon[cat];
            const list = vendorsByCategory.get(cat) ?? [];
            return (
              <div key={cat}>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {cat}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {list.map((v) => {
                    const selected = selectedIds.includes(v.id);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => toggleVendor(v.id)}
                        className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
                          selected
                            ? "border-violet-500 bg-violet-50/80 ring-2 ring-violet-500/30 dark:border-violet-500 dark:bg-violet-950/40 dark:ring-violet-400/25"
                            : "border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:border-zinc-600"
                        }`}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-medium text-foreground">
                            {v.name}
                          </span>
                          {selected ? (
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white dark:bg-violet-500">
                              <Check className="size-3.5" aria-hidden />
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {v.blurb}
                        </span>
                        <span className="mt-2 text-sm font-medium text-violet-600 dark:text-violet-400">
                          From {formatVendorMoney(v.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      ) : null}

      {step === 3 ? (
        <section className="space-y-6" aria-labelledby="step3-heading">
          <h2 id="step3-heading" className="text-lg font-semibold">
            Budget summary
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Event</dt>
                <dd className="font-medium">{eventName}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Date</dt>
                <dd className="font-medium">{eventDate}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Location</dt>
                <dd className="font-medium">{location}</dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Guests</dt>
                <dd className="font-medium tabular-nums">{guestsNum}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Selected vendors
            </h3>
            {selectedVendors.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No vendors selected. Use Back to add some.
              </p>
            ) : (
              <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
                {selectedVendors.map((v) => (
                  <li
                    key={v.id}
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                  >
                    <span>
                      <span className="font-medium">{v.name}</span>
                      <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                        ({v.category})
                      </span>
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatVendorMoney(v.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-xl border border-zinc-200 bg-background p-4 dark:border-zinc-700">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold">Estimated total</span>
              <span className="text-xl font-semibold tabular-nums text-violet-600 dark:text-violet-400">
                {formatVendorMoney(totalEstimate)}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              About {formatVendorMoney(perGuest)} per guest
            </p>
          </div>
        </section>
      ) : null}

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
            className="rounded-lg border border-zinc-300 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800/80"
          >
            Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {step < 3 ? (
          <button
            type="button"
            disabled={step === 1 && !step1Valid}
            onClick={() => {
              if (step === 1 && step1Valid) setStep(2);
              if (step === 2) setStep(3);
            }}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 sm:ml-auto"
          >
            Create event
          </button>
        )}
      </div>
    </div>
  );
}
