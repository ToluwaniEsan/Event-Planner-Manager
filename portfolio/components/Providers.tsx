"use client";

import { ThemeProvider } from "next-themes";
import { ModeProvider } from "@/components/ModeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ModeProvider>{children}</ModeProvider>
    </ThemeProvider>
  );
}
