import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

const pagesBasePath = process.env.VITE_BASE_PATH;
const base = pagesBasePath ? `${pagesBasePath.replace(/\/+$/, "")}/` : "/";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base,
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
