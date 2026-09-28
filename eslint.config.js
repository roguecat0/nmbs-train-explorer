import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import solid from "eslint-plugin-solid";
import tseslint from "typescript-eslint";

const browserGlobals = {
  document: "readonly",
  window: "readonly",
};

const nodeGlobals = {
  console: "readonly",
  process: "readonly",
  URL: "readonly",
};

export default tseslint.config(
  {
    ignores: [
      ".agents/**",
      ".codex/**",
      ".nitro/**",
      ".output/**",
      "dist/**",
      "artifacts/**",
      "node_modules/**",
      "app.config.timestamp_*.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  solid.configs["flat/typescript"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: browserGlobals,
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["eslint.config.js", "scripts/**/*.mjs", "vite.config.ts"],
    languageOptions: {
      globals: { ...nodeGlobals, ...browserGlobals },
    },
  },
  prettier,
);
