import type { RepairId } from "~/data/repairs";
import {
  clearStoredRepairIds,
  readStoredRepairIds,
  writeStoredRepairIds,
} from "~/lib/repair-storage";

const STARTED_STORAGE_KEY = "train-repair-started";
const startedHere = new Set<RepairId>();

export function clearReportedRepairStarts(): void {
  startedHere.clear();
  clearStoredRepairIds(STARTED_STORAGE_KEY);
}

export function reportRepairStarted(repairId: RepairId): void {
  if (startedHere.has(repairId)) return;
  const started = readStoredRepairIds(STARTED_STORAGE_KEY);
  if (started.includes(repairId)) return;

  let queued: boolean;
  try {
    queued = navigator.sendBeacon(`/events/repair-started/${encodeURIComponent(repairId)}`);
  } catch {
    return;
  }
  if (!queued) return;

  startedHere.add(repairId);
  writeStoredRepairIds(STARTED_STORAGE_KEY, [...started, repairId]);
}
