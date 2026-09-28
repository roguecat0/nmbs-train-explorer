import { repairs } from "~/data/repairs";

export function readStoredRepairIds(key: string): string[] {
  let stored: string | null;
  try {
    stored = window.localStorage.getItem(key);
  } catch {
    return [];
  }
  if (!stored) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  return [
    ...new Set(
      parsed.filter(
        (id): id is string => typeof id === "string" && repairs.some((repair) => repair.id === id),
      ),
    ),
  ];
}

export function writeStoredRepairIds(key: string, ids: string[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Keep the current page usable when browser storage is unavailable.
  }
}

export function clearStoredRepairIds(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // In-memory progress can still be reset when storage is unavailable.
  }
}
