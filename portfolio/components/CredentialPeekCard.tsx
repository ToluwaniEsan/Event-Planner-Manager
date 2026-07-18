"use client";

import Image from "next/image";
import { Award, FileText } from "lucide-react";
import type { CredentialEntry } from "@/data/profile";

export type CredentialPeekKind = "pdf" | "award";

type CredentialPeekCardProps = {
  credential: CredentialEntry;
  onOpen: (c: CredentialEntry) => void;
};

/** e.g. "/certificates/psm-i.pdf" -> "PSM-I.PDF" */
function fileLabel(href: string) {
  const base = href.split("/").pop() ?? href;
  return base.toUpperCase();
}

/**
 * Peek card: on hover/focus an accent panel (icon + micro-label) springs up
 * out of the bottom strip while the card lifts. Click opens the credential
 * in a modal (parent handles PDF / file viewer).
 */
export function CredentialPeekCard({ credential, onOpen }: CredentialPeekCardProps) {
  const { title, subtitle, href, kind, peekImageSrc, peekHint } = credential;

  const showRaster = peekImageSrc && /\.(jpe?g|png|webp|gif)$/i.test(peekImageSrc);

  return (
    <button
      type="button"
      onClick={() => onOpen(credential)}
      className="theme-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-background text-left transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_28px_48px_-22px_rgba(var(--shadow),0.3),0_0_0_1px_rgba(var(--accent-glow),0.25)] focus-visible:-translate-y-1.5 focus-visible:border-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex-1 p-6 pb-5">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary">
          Certificate
        </p>
        <h3 className="mt-3 text-[15.5px] font-bold leading-relaxed tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{subtitle}</p>
        ) : null}
      </div>

      <div
        className="relative h-12 shrink-0 overflow-hidden border-t border-dashed border-[var(--border)] bg-surface"
        aria-hidden
      >
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10.5px] tracking-[0.08em] text-faint transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-hover:-translate-y-[60%] group-hover:opacity-0 group-focus-visible:-translate-y-[60%] group-focus-visible:opacity-0 motion-reduce:transition-none">
          {fileLabel(href)}
        </span>
        <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-2.5 bg-primary text-on-accent transition-transform duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
          {showRaster ? (
            <span className="relative h-8 w-8">
              <Image src={peekImageSrc!} alt="" fill className="object-contain" sizes="32px" />
            </span>
          ) : kind === "pdf" ? (
            <FileText className="h-[15px] w-[15px] shrink-0" strokeWidth={2} aria-hidden />
          ) : (
            <Award className="h-[15px] w-[15px] shrink-0" strokeWidth={2} aria-hidden />
          )}
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]">
            {peekHint ?? (kind === "pdf" ? "View certificate" : "View / download")}
          </span>
        </span>
      </div>
    </button>
  );
}
