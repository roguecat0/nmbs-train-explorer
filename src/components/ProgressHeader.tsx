import { For } from "solid-js";
import { repairs } from "~/data/repairs";
import type { JSX } from "solid-js";

type ProgressHeaderProps = {
  completedCount: number;
  isComplete: (repairId: string) => boolean;
};

export default function ProgressHeader(props: ProgressHeaderProps): JSX.Element {
  const percentage = (): string => `${(props.completedCount / repairs.length) * 100}%`;

  return (
    <header class="progress-header">
      <div class="title-row">
        <div>
          <p class="eyebrow">NMBS train rescue</p>
          <h1>Bring the train back to life</h1>
        </div>
        <strong class="count-pill">
          {props.completedCount} / {repairs.length}
        </strong>
      </div>
      <div
        class="progress-track"
        aria-label={`${props.completedCount} of ${repairs.length} repairs complete`}
      >
        <span style={{ width: percentage() }} />
      </div>
      <div class="mini-train" aria-hidden="true">
        <For each={repairs}>
          {(repair) => <i class={props.isComplete(repair.id) ? "is-repaired" : ""} />}
        </For>
      </div>
    </header>
  );
}
