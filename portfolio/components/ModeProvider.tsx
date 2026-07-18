"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  CAREER_MODE_STORAGE_KEY,
  DEFAULT_CAREER_MODE,
  isCareerMode,
  type CareerMode,
} from "@/lib/mode";

type ModeContextValue = {
  mode: CareerMode;
  setMode: (mode: CareerMode) => void;
  mounted: boolean;
};

const ModeContext = createContext<ModeContextValue | null>(null);

const emptySubscribe = () => () => {};
const getServerMounted = () => false;
const getClientMounted = () => true;

let currentMode: CareerMode = DEFAULT_CAREER_MODE;
let hasLoadedStoredMode = false;
const listeners = new Set<() => void>();
let transitionTimer: ReturnType<typeof setTimeout> | undefined;

function readStoredMode(): CareerMode {
  try {
    const stored = window.localStorage.getItem(CAREER_MODE_STORAGE_KEY);
    if (isCareerMode(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_CAREER_MODE;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribeMode(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getModeSnapshot(): CareerMode {
  if (!hasLoadedStoredMode && typeof window !== "undefined") {
    currentMode = readStoredMode();
    hasLoadedStoredMode = true;
  }
  return currentMode;
}

function getServerModeSnapshot(): CareerMode {
  return DEFAULT_CAREER_MODE;
}

function writeMode(next: CareerMode) {
  currentMode = next;
  hasLoadedStoredMode = true;
  try {
    window.localStorage.setItem(CAREER_MODE_STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  emit();
}

function transitionToMode(next: CareerMode) {
  if (next === currentMode) return;

  const root = document.documentElement;
  root.dataset.modeTransition = next;
  writeMode(next);

  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    delete root.dataset.modeTransition;
  }, 720);
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, getClientMounted, getServerMounted);
  const mode = useSyncExternalStore(subscribeMode, getModeSnapshot, getServerModeSnapshot);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const setMode = useCallback((next: CareerMode) => {
    transitionToMode(next);
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, mounted }),
    [mode, setMode, mounted],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useCareerMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useCareerMode must be used within ModeProvider");
  }
  return ctx;
}
