"use client";

import Image from "next/image";
import { Award, FileText } from "lucide-react";
import type { CredentialEntry } from "@/data/profile";

export type CredentialPeekKind = "pdf" | "award";

type CredentialPeekCardProps = {
  credential: CredentialEntry;
  onOpen: (c: CredentialEntry) => void;
};

/**
 * Opens the credential in a modal (parent handles PDF / file viewer).
 */
export function CredentialPeekCard({ credential, onOpen }: CredentialPeekCardProps) {
  const { title, subtitle, kind, peekImageSrc, peekHint } = credential;

  const showRaster =
    peekImageSrc &&
    /\.(jpe?g|png|webp|gif)$/i.test(peekImageSrc);

  return (
    <button
      type="button"
      onClick={() => onOpen(credential)}
      className="theme-card group block h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/90 text-left shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl dark:hover:border-highlight/45"
    >
      <div className="p-5 pb-4">
        <h3 className="text-[1.05rem] font-semibold leading-snug text-foreground">{title}</h3>
        {subtitle ? <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p> : null}
      </div>

      <div className="relative h-[7.25rem] overflow-hidden border-t border-[var(--border)] bg-gradient-to-b from-[var(--accent-soft)]/70 to-[var(--surface)]">
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-3 pb-0.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] translate-y-[58%] group-hover:translate-y-[4%]">
          <div className="flex w-full max-w-[15rem] flex-col items-center rounded-t-xl border border-[var(--border)] bg-primary px-3 pt-2 pb-2.5 text-on-primary shadow-2xl ring-1 ring-black/10 dark:border-[color:var(--border-secondary)] dark:ring-white/15">
            {showRaster ? (
              <div className="relative mb-1 h-[4.5rem] w-full max-w-[12rem]">
                <Image
                  src={peekImageSrc!}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="200px"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5 py-1.5">
                {kind === "pdf" ? (
                  <FileText className="h-9 w-9 shrink-0 opacity-95" strokeWidth={1.5} aria-hidden />
                ) : (
                  <Award className="h-9 w-9 shrink-0 opacity-95" strokeWidth={1.5} aria-hidden />
                )}
                <span className="max-w-[11rem] text-center text-[10px] font-bold uppercase tracking-[0.14em] opacity-85">
                  {peekHint ?? (kind === "pdf" ? "View certificate" : "View / download")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
