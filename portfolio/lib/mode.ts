export type CareerMode = "product" | "engineering";

export const CAREER_MODES: CareerMode[] = ["product", "engineering"];

export const DEFAULT_CAREER_MODE: CareerMode = "product";

export const CAREER_MODE_STORAGE_KEY = "portfolio-career-mode";

export const CAREER_MODE_LABELS: Record<CareerMode, string> = {
  product: "Product Management",
  engineering: "Software Engineering",
};

export const CAREER_MODE_SHORT_LABELS: Record<CareerMode, string> = {
  product: "Product",
  engineering: "Engineering",
};

export function isCareerMode(value: unknown): value is CareerMode {
  return value === "product" || value === "engineering";
}
