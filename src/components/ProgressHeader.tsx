import { For } from "solid-js";
import { repairs } from "~/data/repairs";
import type { JSX } from "solid-js";
import { useLanguage } from "~/i18n/language-context";

type ProgressHeaderProps = {
  completedCount: number;
  isComplete: (repairId: string) => boolean;
};

export default function ProgressHeader(props: ProgressHeaderProps): JSX.Element {
  const i18n = useLanguage();
  const percentage = (): string => `${(props.completedCount / repairs.length) * 100}%`;

  return (
    <header class="progress-header">
      <div class="title-row">
        <div>
          <p class="eyebrow">{i18n.ui().headerEyebrow}</p>
          <h1>{i18n.ui().headerTitle}</h1>
        </div>
        <div class="header-controls">
          <div class="language-selector" role="group" aria-label={i18n.ui().languageSelector}>
            <button
              type="button"
              classList={{ active: i18n.language() === "nl" }}
              aria-pressed={i18n.language() === "nl"}
              aria-label={i18n.ui().dutch}
              onClick={() => i18n.setLanguage("nl")}
            >
              NL
            </button>
            <button
              type="button"
              classList={{ active: i18n.language() === "fr" }}
              aria-pressed={i18n.language() === "fr"}
              aria-label={i18n.ui().french}
              onClick={() => i18n.setLanguage("fr")}
            >
              FR
            </button>
          </div>
          <strong class="count-pill">
            {props.completedCount} / {repairs.length}
          </strong>
        </div>
      </div>
      <div
        class="progress-track"
        aria-label={i18n.ui().progressLabel(props.completedCount, repairs.length)}
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
