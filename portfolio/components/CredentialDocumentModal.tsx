"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, FileImage, FileText } from "lucide-react";
import type { CredentialEntry } from "@/data/profile";
import { Modal } from "@/components/Modal";

type CredentialDocumentModalProps = {
  credential: CredentialEntry | null;
  open: boolean;
  onClose: () => void;
};

function isPdfPath(href: string) {
  return /\.pdf$/i.test(href);
}

function isRasterPath(src: string) {
  return /\.(jpe?g|png|webp|gif)$/i.test(src);
}

type PdfCredentialBodyProps = {
  doc: CredentialEntry;
  preview?: string;
};

/** Isolated state resets when `key={doc.href}` changes (new document or reopen). */
function PdfCredentialBody({ doc, preview }: PdfCredentialBodyProps) {
  const [pdfView, setPdfView] = useState<"iframe" | "preview">("iframe");
  const { title, href } = doc;

  return (
    <>
      {preview && pdfView === "preview" ? (
        <div className="relative min-h-[50vh] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-accent-soft/30 dark:bg-accent-soft/15">
          <Image
            src={preview}
            alt=""
            width={1200}
            height={1600}
            className="h-auto w-full object-contain"
            unoptimized={preview.endsWith(".gif")}
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-background shadow-inner dark:border-[color:var(--border-secondary)]">
          <iframe
            title={title}
            src={href}
            className="min-h-[min(65vh,640px)] w-full bg-[#faf7f2] dark:bg-[#1a1518]"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {preview ? (
          <button
            type="button"
            onClick={() => setPdfView((v) => (v === "iframe" ? "preview" : "iframe"))}
            className="theme-btn inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-accent-soft/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/45 dark:border-[color:var(--border-secondary)] dark:hover:border-white/40"
          >
            {pdfView === "iframe" ? (
              <>
                <FileImage className="h-4 w-4" aria-hidden />
                Show static preview
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" aria-hidden />
                Show embedded PDF
              </>
            )}
          </button>
        ) : (
          <p className="max-w-xl text-xs text-muted">
            If nothing appears in the frame, your browser may block embedding — use{" "}
            <span className="font-medium text-foreground">Download full PDF</span> or add a{" "}
            <code className="rounded bg-accent-soft px-1 text-[0.7rem]">modalPreviewSrc</code> image in
            your profile.
          </p>
        )}
        <a
          href={href}
          download
          className="theme-btn inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md transition hover:brightness-105"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download full PDF
        </a>
      </div>
    </>
  );
}

/**
 * PDFs: iframe first; optional static preview + download. Awards (e.g. HEIC): download + optional image preview.
 * Keeps the last document while the modal closes so Framer exit animations can finish.
 */
export function CredentialDocumentModal({
  credential,
  open,
  onClose,
}: CredentialDocumentModalProps) {
  const [lastCredential, setLastCredential] = useState<CredentialEntry | null>(null);

  if (credential !== null && credential.href !== lastCredential?.href) {
    setLastCredential(credential);
  }

  const doc = credential ?? lastCredential;

  if (!doc) return null;

  const { title, subtitle, href, kind, modalPreviewSrc, peekImageSrc } = doc;
  const preview =
    modalPreviewSrc ?? (peekImageSrc && isRasterPath(peekImageSrc) ? peekImageSrc : undefined);
  const isPdf = kind === "pdf" || isPdfPath(href);

  return (
    <Modal open={open} onClose={onClose} title={title} size="xl">
      <div className="space-y-4">
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}

        {isPdf ? (
          <PdfCredentialBody key={doc.href} doc={doc} preview={preview} />
        ) : (
          <div className="space-y-4 rounded-xl border border-[var(--border)] bg-accent-soft/40 p-6 dark:bg-accent-soft/20">
            <p className="text-sm text-muted">
              This file isn&apos;t shown inline here (e.g. HEIC photos). Download it for full quality,
              or open it with Photos on your device.
            </p>
            {peekImageSrc && isRasterPath(peekImageSrc) ? (
              <div className="relative mx-auto max-h-[55vh] max-w-full">
                <Image
                  src={peekImageSrc}
                  alt=""
                  width={900}
                  height={1200}
                  className="h-auto max-h-[55vh] w-full rounded-lg object-contain"
                />
              </div>
            ) : null}
            <a
              href={href}
              download
              className="theme-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-md transition hover:brightness-105 sm:w-auto"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download file
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
