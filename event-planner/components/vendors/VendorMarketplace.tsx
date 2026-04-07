"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import {
  CATEGORY_ORDER,
  formatVendorMoney,
  VENDORS,
  type VendorCategory,
} from "@/lib/vendors";

type PriceFilter = "any" | "lt1500" | "1500to3000" | "gte3000";
type RatingFilter = "any" | "4" | "4.5";

function matchesPrice(price: number, filter: PriceFilter) {
  if (filter === "any") return true;
  if (filter === "lt1500") return price < 1500;
  if (filter === "1500to3000") return price >= 1500 && price < 3000;
  return price >= 3000;
}

function matchesRating(rating: number, filter: RatingFilter) {
  if (filter === "any") return true;
  if (filter === "4") return rating >= 4.0;
  return rating >= 4.5;
}

export function VendorMarketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<VendorCategory | "all">("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("any");

  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VENDORS.filter((v) => {
      if (category !== "all" && v.category !== category) return false;
      if (!matchesPrice(v.price, priceFilter)) return false;
      if (!matchesRating(v.rating, ratingFilter)) return false;
      if (q.length > 0) {
        const hay = `${v.name} ${v.blurb}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, priceFilter, ratingFilter]);

  const selectClass =
    "rounded-lg border border-zinc-200 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:focus:border-violet-400";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Vendor marketplace
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Browse venues, catering, music, and activities. Filter by category, budget, and
          ratings.
        </p>
      </header>

      <div className="mb-6 space-y-4">
        <label className="relative block">
          <span className="sr-only">Search vendors</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description…"
            className="w-full rounded-xl border border-zinc-200 bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:focus:border-violet-400"
          />
        </label>

        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Category
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === "all"
                    ? "bg-violet-600 text-white dark:bg-violet-500"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              {CATEGORY_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    category === c
                      ? "bg-violet-600 text-white dark:bg-violet-500"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[10rem]">
            <label htmlFor="filter-price" className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Price
            </label>
            <select
              id="filter-price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
              className={selectClass}
            >
              <option value="any">Any price</option>
              <option value="lt1500">Under $1,500</option>
              <option value="1500to3000">$1,500 – $3,000</option>
              <option value="gte3000">$3,000+</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[10rem]">
            <label htmlFor="filter-rating" className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Rating
            </label>
            <select
              id="filter-rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value as RatingFilter)}
              className={selectClass}
            >
              <option value="any">Any rating</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
          </div>
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 py-12 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
          No vendors match your filters. Try broadening your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVendors.map((v) => (
            <li key={v.id}>
              <VendorCard vendor={v} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VendorCard({ vendor: v }: { vendor: (typeof VENDORS)[number] }) {
  return (
    <Link
      href={`/vendors/${v.id}`}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:border-zinc-700 dark:bg-zinc-800/30"
    >
      <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={v.imageUrl}
          alt={v.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
            {v.category}
          </span>
        </div>
        <h2 className="font-semibold leading-snug text-foreground">{v.name}</h2>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400">
          <Star className="size-4 shrink-0 fill-current" aria-hidden />
          <span className="font-medium tabular-nums">{v.rating.toFixed(1)}</span>
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
          {v.blurb}
        </p>
        <p className="mt-3 text-sm font-semibold text-violet-600 dark:text-violet-400">
          From {formatVendorMoney(v.price)}
        </p>
      </div>
    </Link>
  );
}
