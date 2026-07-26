import { Show, type JSX } from "solid-js";
import { Repair } from "~/data/repairs";

type RepairSheetProps = {
  repair: Repair;
  completed: boolean;
  onComplete: () => void;
  onClose: () => void;
};

export default function RepairSheet(props: RepairSheetProps): JSX.Element {
  return (
    <aside class="repair-sheet" aria-label={`${props.repair.title} repair`}>
      <button
        class="close-button"
        type="button"
        onClick={() => props.onClose()}
        aria-label="Close repair details"
      >
        ×
      </button>
      <p class="eyebrow">{props.completed ? "REPAIR COMPLETE" : "YOUR LATEST SCAN"}</p>
      <h2>{props.repair.title}</h2>
      <p class="repair-summary">
        {props.completed
          ? "This part is working again. Keep exploring to restore the rest of the train."
          : props.repair.summary}
      </p>
      <details>
        <summary>Learn more</summary>
        <p>{props.repair.fact}</p>
      </details>
      <Show
        when={!props.completed}
        fallback={<p class="already-repaired">✓ This part has already been repaired.</p>}
      >
        <button class="primary-action" type="button" onClick={() => props.onComplete()}>
          Repair this part
        </button>
      </Show>
    </aside>
  );
}
