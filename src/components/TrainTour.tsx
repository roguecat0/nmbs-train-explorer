import { For, Show, type JSX } from "solid-js";
import { repairs, type Repair } from "~/data/repairs";
import { useLanguage } from "~/i18n/language-context";
import type { RepairCopy } from "~/i18n/types";

type TrainTourProps = {
  isComplete: (repairId: string) => boolean;
  activeRepairId?: string;
  onRepairSelect: (repair: Repair) => void;
};

export default function TrainTour(props: TrainTourProps): JSX.Element {
  const i18n = useLanguage();

  return (
    <section class="tour" aria-label={i18n.ui().tourLabel}>
      <p class="tour-intro">{i18n.ui().tourIntro}</p>
      <For each={repairs}>
        {(repair, index) => {
          const complete = (): boolean => props.isComplete(repair.id);
          const active = (): boolean => props.activeRepairId === repair.id;
          const copy = (): RepairCopy => i18n.repair(repair.id);
          return (
            <article
              class={`train-section ${complete() ? `is-repaired color-${repair.color}` : ""} ${active() ? "is-active" : ""}`}
            >
              <div class="section-copy">
                <h2>{copy().title}</h2>
                <span>{complete() ? i18n.ui().repaired : i18n.ui().awaitingRepair}</span>
                <Show when={complete()}>
                  <button
                    class="component-info-button"
                    type="button"
                    onClick={() => props.onRepairSelect(repair)}
                  >
                    {i18n.ui().viewComponentInfo}
                  </button>
                </Show>
              </div>
              <div class="repair-art-frame">
                <img
                  class="repair-art"
                  src={repair.image}
                  alt=""
                  width="512"
                  height="341"
                  loading={index() === 0 ? "eager" : "lazy"}
                />
              </div>
              <span class={`repair-marker ${complete() ? "done" : ""}`} aria-hidden="true">
                {complete() ? "✓" : i18n.ui().scan}
                <span>{complete() ? i18n.ui().repaired : i18n.ui().qrCode}</span>
              </span>
            </article>
          );
        }}
      </For>
    </section>
  );
}
