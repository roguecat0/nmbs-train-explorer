import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import { useLanguage } from "~/i18n/language-context";

export default function NotFound(): JSX.Element {
  const i18n = useLanguage();

  return (
    <main class="not-found">
      <p class="eyebrow">{i18n.ui().notFoundEyebrow}</p>
      <h1>{i18n.ui().notFoundTitle}</h1>
      <A href="/">{i18n.ui().notFoundAction}</A>
    </main>
  );
}
