import { A } from "@solidjs/router";
import type { JSX } from "solid-js";

export default function NotFound(): JSX.Element {
  return (
    <main class="not-found">
      <p class="eyebrow">WRONG PLATFORM</p>
      <h1>This stop is not on the tour.</h1>
      <A href="/">Return to the train rescue</A>
    </main>
  );
}
