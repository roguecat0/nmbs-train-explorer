import { For, Show, type JSX } from "solid-js";
import { repairs, type Repair } from "~/data/repairs";
import { useLanguage } from "~/i18n/language-context";

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
        {(repair) => {
          const complete = () => props.isComplete(repair.id);
          const active = () => props.activeRepairId === repair.id;
          const copy = () => i18n.repair(repair.id);
          return (
            <article
              class={`train-section ${complete() ? `is-repaired color-${repair.color}` : ""} ${active() ? "is-active" : ""}`}
            >
              <div class="section-copy">
                <p>{copy().section}</p>
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
                <img class="repair-art" src={repair.image} alt={i18n.ui().componentImageAlt} />
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
