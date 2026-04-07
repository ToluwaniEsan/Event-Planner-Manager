"use client";

import type { Vendor } from "@/lib/vendors";

export function VendorProfileActions({ vendor }: { vendor: Vendor }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() =>
          console.log("Book Now", { vendorId: vendor.id, name: vendor.name })
        }
        className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
      >
        Book Now
      </button>
      <button
        type="button"
        onClick={() =>
          console.log("Message", { vendorId: vendor.id, name: vendor.name })
        }
        className="rounded-lg border border-zinc-300 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800/80"
      >
        Message
      </button>
    </div>
  );
}
