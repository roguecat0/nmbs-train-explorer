import {
  createContext,
  createSignal,
  onMount,
  useContext,
  type JSX,
  type ParentProps,
} from "solid-js";

const STORAGE_KEY = "train-repair-progress";

type GameProgress = {
  completed: () => string[];
  complete: (repairId: string) => void;
  isComplete: (repairId: string) => boolean;
  reset: () => void;
};

const GameProgressContext = createContext<GameProgress>();

export function GameProgressProvider(props: ParentProps): JSX.Element {
  const [completed, setCompleted] = createSignal<string[]>([]);

  onMount(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCompleted(JSON.parse(stored));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  });

  const complete = (repairId: string): void => {
    if (completed().includes(repairId)) return;
    const next = [...completed(), repairId];
    setCompleted(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const reset = (): void => {
    setCompleted([]);
    window.localStorage.removeItem(STORAGE_KEY);
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
