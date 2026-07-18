"use client";

import { useCallback, useState } from "react";
import type { CredentialEntry } from "@/data/profile";
import { CredentialPeekCard } from "@/components/CredentialPeekCard";
import { CredentialDocumentModal } from "@/components/CredentialDocumentModal";
import { Reveal } from "@/components/Reveal";

type CredentialsSectionProps = {
  certificates: CredentialEntry[];
};

export function CredentialsSection({ certificates }: CredentialsSectionProps) {
  const [active, setActive] = useState<CredentialEntry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback((c: CredentialEntry) => {
    setActive(c);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    window.setTimeout(() => setActive(null), 300);
  }, []);

  return (
    <>
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
        Hover or focus a card to peek; click to open the certificate in a viewer. PDFs embed
        inline and stay downloadable.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {certificates.map((c, i) => (
          <Reveal key={c.href} delay={i * 60}>
            <CredentialPeekCard credential={c} onOpen={openModal} />
          </Reveal>
        ))}
      </div>

      <CredentialDocumentModal credential={active} open={modalOpen} onClose={closeModal} />
    </>
  );
}
