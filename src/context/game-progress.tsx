import { createContext, createSignal, useContext, type JSX, type ParentProps } from "solid-js";
import {
  clearStoredRepairIds,
  readStoredRepairIds,
  writeStoredRepairIds,
} from "~/lib/repair-storage";
import { clearReportedRepairStarts } from "~/lib/repair-events";

const STORAGE_KEY = "train-repair-progress";

type GameProgress = {
  completed: () => string[];
  complete: (repairId: string) => void;
  isComplete: (repairId: string) => boolean;
  reset: () => void;
};

const GameProgressContext = createContext<GameProgress>();

export function GameProgressProvider(props: ParentProps): JSX.Element {
  const [completed, setCompleted] = createSignal<string[]>(readStoredRepairIds(STORAGE_KEY));

  const complete = (repairId: string): void => {
    if (completed().includes(repairId)) return;
    const next = [...completed(), repairId];
    setCompleted(next);
    writeStoredRepairIds(STORAGE_KEY, next);
  };

  const reset = (): void => {
    setCompleted([]);
    clearStoredRepairIds(STORAGE_KEY);
    clearReportedRepairStarts();
  };

  const progress: GameProgress = {
    completed,
    complete,
    isComplete: (repairId) => completed().includes(repairId),
    reset,
  };

  return (
    <GameProgressContext.Provider value={progress}>{props.children}</GameProgressContext.Provider>
  );
}

export function useGameProgress(): GameProgress {
  const progress = useContext(GameProgressContext);
  if (!progress) throw new Error("useGameProgress must be used inside GameProgressProvider");
  return progress;
}
