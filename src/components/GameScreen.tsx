import { createEffect, createSignal, on, Show, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Repair, repairs } from "~/data/repairs";
import { useGameProgress } from "~/context/game-progress";
import { useRepairFeedback } from "~/context/repair-feedback";
import ProgressHeader from "~/components/ProgressHeader";
import RepairSheet from "~/components/RepairSheet";
import TrainTour from "~/components/TrainTour";
import { useLanguage } from "~/i18n/language-context";
import { reportRepairStarted } from "~/lib/repair-events";

type GameScreenProps = { initialRepairId?: string };

export default function GameScreen(props: GameScreenProps): JSX.Element {
  const navigate = useNavigate();
  const progress = useGameProgress();
  const feedback = useRepairFeedback();
  const i18n = useLanguage();
  const [selectedRepair, setSelectedRepair] = createSignal<Repair | undefined>(
    repairs.find((repair) => repair.id === props.initialRepairId),
  );
  const completedCount = (): number => progress.completed().length;

  createEffect(
    on(
      () => props.initialRepairId,
      (repairId) => {
        const repair = repairs.find((repair) => repair.id === repairId);
        if (repair && !progress.isComplete(repair.id)) reportRepairStarted(repair.id);
      },
    ),
  );

  const closeSheet = (): void => {
    setSelectedRepair(undefined);
    navigate("/", { replace: true });
  };

  const completeRepair = (repairId: string): void => {
    if (progress.isComplete(repairId)) return;
    progress.complete(repairId);
    feedback.show(completedCount());
    closeSheet();
    try {
      navigator.sendBeacon(`/events/repair-completed/${encodeURIComponent(repairId)}`);
    } catch {
      // Best-effort analytics must not interrupt a completed repair.
    }
  };

  const resetProgress = (): void => {
    if (window.confirm(i18n.ui().resetConfirmation)) progress.reset();
  };

  return (
    <main class="game-shell">
      <ProgressHeader completedCount={completedCount()} isComplete={progress.isComplete} />
      <section class="welcome-card">
        <div class="welcome-icon" aria-hidden="true">
          ✦
        </div>
        <div>
          <h2>{i18n.ui().welcomeTitle}</h2>
          <p>{i18n.ui().welcomeDescription}</p>
        </div>
      </section>
      <TrainTour
        isComplete={progress.isComplete}
        activeRepairId={selectedRepair()?.id}
        onRepairSelect={(repair) => setSelectedRepair(repair)}
      />
      {import.meta.env.DEV && (
        <button class="reset-progress" type="button" onClick={resetProgress}>
          {i18n.ui().resetProgress}
        </button>
      )}
      <Show when={selectedRepair()}>
        {(repair) => (
          <RepairSheet
            repair={repair()}
            completed={progress.isComplete(repair().id)}
            onComplete={() => completeRepair(repair().id)}
            onClose={closeSheet}
          />
        )}
      </Show>
    </main>
  );
}
