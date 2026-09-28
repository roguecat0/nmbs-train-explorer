import { For, onCleanup, onMount, Show, type JSX } from "solid-js";
import type { RepairMessage, RepairMessageCopy } from "~/data/repair-messages";
import { useLanguage } from "~/i18n/language-context";

type RepairFeedbackProps = {
  message: RepairMessage;
  completedCount: number;
  totalCount: number;
  onClose: () => void;
};

export default function RepairFeedback(props: RepairFeedbackProps): JSX.Element {
  const i18n = useLanguage();
  const copy = (): RepairMessageCopy => props.message.copy[i18n.language()];
  let dialog!: HTMLDialogElement;
  const previousFocus = document.activeElement;

  onMount(() => dialog.showModal());
  onCleanup(() => {
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus();
    } else {
      document.querySelector<HTMLButtonElement>(".language-selector button.active")?.focus();
    }
  });

  return (
    <dialog
      ref={dialog}
      class="repair-feedback"
      classList={{ "has-fireworks": props.message.fireworks }}
      aria-labelledby="repair-feedback-title"
      aria-describedby="repair-feedback-body"
      onClose={() => props.onClose()}
    >
      <button
        class="close-button"
        type="button"
        aria-label={i18n.ui().closeRepairMessage}
        onClick={() => dialog.close()}
      >
        ×
      </button>
      <div class="feedback-art" aria-hidden="true">
        <Show when={props.message.fireworks}>
          <For each={[0, 1, 2]}>
            {(burst) => (
              <div class="firework" style={{ "--burst": burst }}>
                <For each={Array.from({ length: 12 }, (_, ray) => ray)}>
                  {(ray) => <i style={{ "--angle": `${ray * 30}deg` }} />}
                </For>
              </div>
            )}
          </For>
        </Show>
        <span class="feedback-medal">{props.message.fireworks ? "★" : "✓"}</span>
      </div>
      <p class="eyebrow">{i18n.ui().progressLabel(props.completedCount, props.totalCount)}</p>
      <h2 id="repair-feedback-title">{copy().title}</h2>
      <p id="repair-feedback-body">{copy().body}</p>
      <button class="primary-action" type="button" autofocus onClick={() => dialog.close()}>
        {copy().action}
      </button>
    </dialog>
  );
}
