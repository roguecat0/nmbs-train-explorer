import { createSignal, Show, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Repair, repairs } from "~/data/repairs";
import { useGameProgress } from "~/context/game-progress";
import ProgressHeader from "~/components/ProgressHeader";
import RepairSheet from "~/components/RepairSheet";
import TrainTour from "~/components/TrainTour";

type GameScreenProps = { initialRepairId?: string };

export default function GameScreen(props: GameScreenProps): JSX.Element {
  const navigate = useNavigate();
  const progress = useGameProgress();
  const [selectedRepair, setSelectedRepair] = createSignal<Repair | undefined>(
    repairs.find((repair) => repair.id === props.initialRepairId),
  );
  const completedCount = (): number => progress.completed().length;

  const closeSheet = (): void => {
    setSelectedRepair(undefined);
    navigate("/", { replace: true });
  };

  return (
    <main class="game-shell">
      <ProgressHeader completedCount={completedCount()} isComplete={progress.isComplete} />
      <section class="welcome-card">
        <div class="welcome-icon" aria-hidden="true">
          ✦
        </div>
        <div>
          <h2>Find the station markers</h2>
          <p>Scan a repair QR code to reveal the next part of the train.</p>
        </div>
      </section>
      <TrainTour
        isComplete={progress.isComplete}
        activeRepairId={selectedRepair()?.id}
        onRepairSelect={(repair) => setSelectedRepair(repair)}
      />
      <button class="reset-progress" type="button" onClick={() => progress.reset()}>
        Reset local progress
      </button>
      <Show when={selectedRepair()}>
        {(repair) => (
          <RepairSheet
            repair={repair()}
            completed={progress.isComplete(repair().id)}
            onComplete={() => progress.complete(repair().id)}
            onClose={closeSheet}
          />
        )}
      </Show>
    </main>
  );
}
