import { Show, type JSX } from "solid-js";
import type { Repair } from "~/data/repairs";
import { useLanguage } from "~/i18n/language-context";
import type { RepairCopy } from "~/i18n/types";

type RepairSheetProps = {
  repair: Repair;
  completed: boolean;
  onComplete: () => void;
  onClose: () => void;
};

export default function RepairSheet(props: RepairSheetProps): JSX.Element {
  const i18n = useLanguage();
  const copy = (): RepairCopy => i18n.repair(props.repair.id);

  return (
    <aside class="repair-sheet" aria-label={i18n.ui().repairLabel(copy().title)}>
      <div class="repair-sheet-header">
        <p class="eyebrow">
          {props.completed ? i18n.ui().repairComplete : i18n.ui().repairPending}
        </p>
        <button
          class="close-button"
          type="button"
          onClick={() => props.onClose()}
          aria-label={i18n.ui().closeRepairDetails}
        >
          ×
        </button>
      </div>
      <h2>{copy().title}</h2>
      <img
        class="repair-sheet-art"
        src={props.repair.image}
        alt=""
        width={props.repair.imageWidth}
        height={props.repair.imageHeight}
      />
      <p class="repair-summary">{props.completed ? i18n.ui().completedSummary : copy().summary}</p>
      <details>
        <summary>{i18n.ui().learnMore}</summary>
        <p class="repair-details-copy">{copy().fact}</p>
      </details>
      <Show
        when={!props.completed}
        fallback={<p class="already-repaired">{i18n.ui().alreadyRepaired}</p>}
      >
        <button class="primary-action" type="button" onClick={() => props.onComplete()}>
          {i18n.ui().repairAction}
        </button>
      </Show>
    </aside>
  );
}
