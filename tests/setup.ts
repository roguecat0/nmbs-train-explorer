import "@testing-library/jest-dom/vitest";
import { cleanup } from "@solidjs/testing-library";
import { afterEach, vi } from "vitest";

afterEach((): void => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
});
