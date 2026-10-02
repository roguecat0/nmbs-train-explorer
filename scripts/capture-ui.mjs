import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, join } from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

const repairIds = [
  "painting",
  "drivers-cab",
  "headlights",
  "brake-system",
  "wheels",
  "passenger-doors",
  "roof-ventilation",
  "electronics",
];

const { values } = parseArgs({
  options: {
    url: { type: "string" },
    width: { type: "string" },
    height: { type: "string", default: "844" },
    language: { type: "string" },
    repair: { type: "string" },
    feedback: { type: "boolean", default: false },
    browser: { type: "string" },
  },
});

if (!values.url) {
  throw new Error("Provide the running app URL: pnpm ui:capture --url http://localhost:5173/");
}

const baseUrl = new URL(values.url);
if (!["http:", "https:"].includes(baseUrl.protocol) || baseUrl.search || baseUrl.hash) {
  throw new Error("Use an HTTP(S) app base URL without a query or fragment.");
}
if (!baseUrl.pathname.endsWith("/")) baseUrl.pathname += "/";

const widths = values.width ? [Number(values.width)] : [320, 390, 768];
const height = Number(values.height);
if (![...widths, height].every((size) => Number.isInteger(size) && size > 0)) {
  throw new Error("Viewport width and height must be positive integers.");
}
const languages = values.language ? [values.language] : ["nl", "fr"];
if (!languages.every((language) => language === "nl" || language === "fr")) {
  throw new Error("Language must be nl or fr.");
}
if (values.repair && !repairIds.includes(values.repair)) {
  throw new Error(`Repair must be one of: ${repairIds.join(", ")}`);
}

const selectedRepairs = values.repair ? [values.repair] : repairIds;
const mixedProgress = ["drivers-cab", "brake-system", "roof-ventilation"];
const repairScenarios = [
  { name: "home-empty", route: "", completed: [] },
  { name: "home-partial", route: "", completed: mixedProgress },
  { name: "home-complete", route: "", completed: repairIds },
  { name: "not-found", route: "unknown-page", completed: [] },
  { name: "unknown-repair", route: "repair/unknown-repair", completed: [] },
  ...selectedRepairs.flatMap((repairId) => [
    { name: `${repairId}-pending`, route: `repair/${repairId}`, completed: [] },
    { name: `${repairId}-complete`, route: `repair/${repairId}`, completed: [repairId] },
    { name: `${repairId}-expanded`, route: `repair/${repairId}`, completed: [], expanded: true },
  ]),
];
const scenarios = values.feedback
  ? repairIds.map((repairId, index) => ({
      name: `feedback-after-${index + 1}`,
      route: `repair/${repairId}`,
      completed: repairIds.slice(0, index),
      feedback: true,
    }))
  : repairScenarios;

const outputDirectory = join("artifacts", "ui", new Date().toISOString().replaceAll(":", "-"));
const browserExecutable = findBrowserExecutable();
await mkdir(outputDirectory, { recursive: true });
const captures = [];
const problems = [];
console.log(`Using existing browser: ${browserExecutable}`);
const browser = await chromium.launch({ executablePath: browserExecutable });

try {
  for (const width of widths) {
    for (const language of languages) {
      for (const scenario of scenarios) {
        const name = `${width}-${language}-${scenario.name}`;
        const context = await browser.newContext({
          viewport: { width, height },
          deviceScaleFactor: 1,
          reducedMotion: "reduce",
          colorScheme: "light",
          locale: language === "nl" ? "nl-BE" : "fr-BE",
        });
        try {
          await context.addInitScript(
            ({ language, completed }) => {
              window.localStorage.setItem("train-explorer-language", language);
              window.localStorage.setItem("train-repair-progress", JSON.stringify(completed));
            },
            { language, completed: scenario.completed },
          );
          const page = await context.newPage();
          page.on("pageerror", (error) =>
            problems.push({ name, type: "pageerror", message: error.message }),
          );
          page.on("console", (message) => {
            if (message.type() === "error") {
              problems.push({ name, type: "console", message: message.text() });
            }
          });
          page.on("requestfailed", (request) =>
            problems.push({
              name,
              type: "requestfailed",
              message: `${request.url()}: ${request.failure()?.errorText}`,
            }),
          );
          const url = new URL(scenario.route, baseUrl).href;
          await page.goto(url, { waitUntil: "networkidle" });
          await page.locator("main").waitFor({ state: "visible" });
          await page.evaluate(waitForFonts);
          await page.evaluate(waitForImages);
          if (scenario.route.startsWith("repair/") && scenario.name !== "unknown-repair") {
            await page.locator(".repair-sheet").waitFor({ state: "visible" });
          }
          if (scenario.expanded) await page.locator(".repair-sheet summary").click();
          if (scenario.feedback) {
            await page.locator(".repair-sheet .primary-action").click();
            await page.locator(".repair-sheet").waitFor({ state: "detached" });
            await page.waitForURL(baseUrl.href);
          }
          const file = `${name}.png`;
          await page.screenshot({
            path: join(outputDirectory, file),
            fullPage: true,
            animations: "disabled",
          });
          const sheetFile =
            scenario.route.startsWith("repair/") && scenario.name !== "unknown-repair"
              ? `${name}-sheet.png`
              : undefined;
          if (sheetFile) {
            await page.screenshot({
              path: join(outputDirectory, sheetFile),
              animations: "disabled",
            });
          }
          captures.push({
            name,
            width,
            height,
            language,
            scenario: scenario.name,
            url,
            completed: scenario.completed,
            ...(scenario.feedback
              ? {
                  feedback: {
                    popupVisible: await page.locator(".repair-feedback[open]").isVisible(),
                    progress: await page.locator(".count-pill").innerText(),
                  },
                }
              : {}),
            file,
            sheetFile,
          });
          console.log(`Captured ${name}`);
        } finally {
          await context.close();
        }
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(
    join(outputDirectory, "manifest.json"),
    JSON.stringify(
      {
        baseUrl: baseUrl.href,
        browserExecutable,
        browserVersion: browser.version(),
        captures,
        problems,
      },
      null,
      2,
    ),
  );
  await writeFile(join(outputDirectory, "index.html"), galleryHtml(captures, problems));
}

console.log(
  `Review ${join(outputDirectory, "index.html")} (${captures.length} states, ${problems.length} browser errors).`,
);
if (problems.length > 0) process.exitCode = 1;

/** @returns {string} */
function findBrowserExecutable() {
  const explicitPath = values.browser ?? process.env.UI_BROWSER_PATH;
  if (explicitPath) {
    if (!existsSync(explicitPath))
      throw new Error(`Browser executable does not exist: ${explicitPath}`);
    return explicitPath;
  }
  const candidates = (process.env.PATH ?? "")
    .split(delimiter)
    .flatMap((directory) =>
      ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].map((name) =>
        join(directory, name),
      ),
    );
  candidates.push("/opt/google/chrome/chrome", chromium.executablePath());
  const cacheDirectory =
    process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(homedir(), ".cache", "ms-playwright");
  if (existsSync(cacheDirectory)) {
    const cachedBrowsers = readdirSync(cacheDirectory)
      .filter((directory) => /^chromium-\d+$/.test(directory))
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    for (const directory of cachedBrowsers) {
      candidates.push(join(cacheDirectory, directory, "chrome-linux64", "chrome"));
      candidates.push(join(cacheDirectory, directory, "chrome-linux", "chrome"));
    }
  }
  const executable = candidates.find((candidate) => existsSync(candidate));
  if (!executable) {
    throw new Error(
      "No installed Chrome/Chromium found. Pass --browser /path/to/chrome or set UI_BROWSER_PATH. No browser is downloaded automatically.",
    );
  }
  return executable;
}

/** @returns {Promise<void>} */
async function waitForFonts() {
  await document.fonts.ready;
}

/** @returns {Promise<void>} */
async function waitForImages() {
  for (const image of document.images) {
    image.scrollIntoView({ block: "center", behavior: "instant" });
    await image.decode();
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

/** @returns {string} */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** @returns {string} */
function galleryHtml(items, errors) {
  const figures = items
    .map((item) => {
      const file = item.sheetFile ?? item.file;
      return `<figure><figcaption>${escapeHtml(item.name)}</figcaption><a href="${file}"><img src="${file}" alt="${escapeHtml(item.name)}" loading="lazy"></a><p><a href="${item.file}">Full page</a></p></figure>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Train Explorer UI review</title>
<style>body{margin:24px;font:16px system-ui;background:#f1f4f4;color:#29363d}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}figure{margin:0;padding:16px;background:white;border:1px solid #cbd5d8}figcaption{margin-bottom:12px;font-weight:bold}img{display:block;max-width:100%;height:auto}pre{white-space:pre-wrap}</style></head>
<body><h1>UI review captures</h1><p>Seeded screenshots for visual inspection. No approved baseline or interaction assertions. Open images at actual size to inspect alignment and clipping.</p><details><summary>Browser errors (${errors.length})</summary><pre>${escapeHtml(JSON.stringify(errors, null, 2))}</pre></details><main>${figures}</main></body></html>`;
}
