"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Wider layout for document viewers */
  size?: "md" | "xl";
};

/**
 * Reusable modal: backdrop click + Escape close, body scroll lock, Framer Motion enter/exit.
 */
export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const mounted = useIsClient();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const maxW = size === "xl" ? "max-w-5xl" : "max-w-lg";

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-[#1a0a0f]/55 backdrop-blur-[3px] dark:bg-black/70"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className={`theme-surface relative z-10 flex max-h-[min(90vh,920px)] w-full ${maxW} flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface shadow-2xl dark:border-[color:var(--border-secondary)]`}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--border)] bg-accent-soft/50 px-5 py-4 dark:bg-accent-soft/25">
              {title ? (
                <h2 id={titleId} className="pr-6 text-lg font-semibold leading-snug text-foreground">
                  {title}
                </h2>
              ) : (
                <span className="sr-only">Dialog</span>
              )}
              <button
                type="button"
                onClick={onClose}
                className="theme-btn -mr-1 shrink-0 rounded-xl border border-[var(--border)] bg-background/80 p-2 text-muted transition-colors hover:border-primary/45 hover:text-foreground dark:border-[color:var(--border-secondary)] dark:hover:border-white/45 dark:hover:text-highlight"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
