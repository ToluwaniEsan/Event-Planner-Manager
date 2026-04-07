import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import type { Vendor } from "@/lib/vendors";
import { formatVendorMoney } from "@/lib/vendors";
import { VendorProfileActions } from "./VendorProfileActions";

export function VendorProfile({ vendor }: { vendor: Vendor }) {
  const [hero, ...restGallery] = vendor.galleryUrls;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <p className="mb-6">
        <Link
          href="/vendors"
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to marketplace
        </Link>
      </p>

      <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">
        <div className="relative aspect-[21/9] w-full min-h-[200px] bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={hero}
            alt={vendor.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
        </div>
        {restGallery.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-3">
            {restGallery.map((url, i) => (
              <div
                key={url}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <header className="mb-8 border-b border-zinc-200 pb-8 dark:border-zinc-700">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {vendor.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-amber-600 dark:text-amber-400">
            <Star className="size-4 fill-current" aria-hidden />
            <span className="font-semibold tabular-nums">{vendor.rating.toFixed(1)}</span>
            <span className="font-normal text-zinc-500 dark:text-zinc-400">rating</span>
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{vendor.name}</h1>
        <p className="mt-4 max-w-3xl text-pretty text-zinc-600 dark:text-zinc-400">
          {vendor.description}
        </p>
        <div className="mt-6">
          <VendorProfileActions vendor={vendor} />
        </div>
      </header>

      <section className="mb-12" aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="mb-4 text-xl font-semibold tracking-tight">
          Pricing packages
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendor.packages.map((pkg) => (
            <li
              key={pkg.name}
              className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-700 dark:bg-zinc-800/40"
            >
              <h3 className="font-semibold text-foreground">{pkg.name}</h3>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {pkg.description}
              </p>
              <p className="mt-4 text-lg font-semibold text-violet-600 dark:text-violet-400">
                {formatVendorMoney(pkg.price)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="mb-4 text-xl font-semibold tracking-tight">
          Reviews
        </h2>
        <ul className="flex flex-col gap-4">
          {vendor.reviews.map((r, idx) => (
            <li
              key={`${r.author}-${r.date}-${idx}`}
              className="rounded-xl border border-zinc-200 bg-background p-5 dark:border-zinc-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-foreground">{r.author}</span>
                <time
                  dateTime={r.date}
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {r.date}
                </time>
              </div>
              <div className="mt-1 flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < Math.round(r.rating) ? "fill-current" : "text-zinc-300 dark:text-zinc-600"}`}
                    aria-hidden
                  />
                ))}
                <span className="ml-1 text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                  {r.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
