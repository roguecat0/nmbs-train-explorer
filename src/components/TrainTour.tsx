import { For, Show, type JSX } from "solid-js";
import { repairs, type Repair } from "~/data/repairs";

type TrainTourProps = {
  isComplete: (repairId: string) => boolean;
  activeRepairId?: string;
  onRepairSelect: (repair: Repair) => void;
};

export default function TrainTour(props: TrainTourProps): JSX.Element {
  return (
    <section class="tour" aria-label="Train repair tour">
      <p class="tour-intro">
        Follow the train from cab to carriage. Scan a station marker to repair its matching part.
      </p>
      <For each={repairs}>
        {(repair) => {
          const complete = () => props.isComplete(repair.id);
          const active = () => props.activeRepairId === repair.id;
          return (
            <article
              class={`train-section ${complete() ? `is-repaired color-${repair.color}` : ""} ${active() ? "is-active" : ""}`}
            >
              <div class="section-copy">
                <p>{repair.section}</p>
                <h2>{repair.title}</h2>
                <span>{complete() ? "Repaired" : "Awaiting repair"}</span>
                <Show when={complete()}>
                  <button
                    class="component-info-button"
                    type="button"
                    onClick={() => props.onRepairSelect(repair)}
                  >
                    View component info
                  </button>
                </Show>
              </div>
              <div class="repair-art-frame">
                <img
                  class="repair-art"
                  src={repair.image}
                  alt="Decorative train component illustration"
                />
              </div>
              <span class={`repair-marker ${complete() ? "done" : ""}`} aria-hidden="true">
                {complete() ? "✓" : "Scan"}
                <span>{complete() ? "Repaired" : "View repair"}</span>
              </span>
            </article>
          );
        }}
      </For>
    </section>
  );
}
