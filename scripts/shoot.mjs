// Visual verification helper. Screenshots a page across the breakpoints that
// matter for the desk experience, optionally driving hover/click first.
//
//   node scripts/shoot.mjs <label> [--path=/our-services] [--state=idle|hover|modal]
//
// Shots land in scripts/.shots/<label>/ (gitignored).

import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.SHOOT_BASE ?? "http://localhost:3000";

const VIEWPORTS = [
  { name: "360-mobile", width: 360, height: 800, dsf: 3, mobile: true },
  { name: "768-tablet", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "1440-laptop", width: 1440, height: 900, dsf: 1, mobile: false },
  { name: "2560-desktop", width: 2560, height: 1440, dsf: 1, mobile: false },
];

const args = process.argv.slice(2);
const label = args.find((a) => !a.startsWith("--")) ?? "shot";
const flag = (name, fallback) =>
  args
    .find((a) => a.startsWith(`--${name}=`))
    ?.split("=")
    .slice(1)
    .join("=") ?? fallback;

// Git Bash on Windows rewrites a leading-slash argument into a real Windows
// path ("/our-services" -> "C:/Program Files/Git/our-services"), so undo that
// and accept the route with or without its leading slash.
const normalizeRoute = (raw) => {
  const tail = raw.replace(/^[A-Za-z]:[\\/].*?(?=\/[^/]*$)/, "");
  return tail.startsWith("/") ? tail : `/${tail}`;
};

const path = normalizeRoute(flag("path", "/our-services"));
const state = flag("state", "idle");
/** Which service's hotspot to hover or click, by Service.id. */
const target = flag("target", "website-development");
const outDir = join(HERE, ".shots", label);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Resolves once the 3D scene has actually painted, or immediately in classic mode. */
async function settle(page) {
  const hasCanvas = await page
    .waitForSelector("canvas", { timeout: 4000 })
    .then(() => true)
    .catch(() => false);

  if (hasCanvas) {
    // Give R3F a beat to finish its first frames and the intro easing to land.
    await sleep(2500);
  } else {
    await sleep(600);
  }
  // Let fonts and any lazy images resolve so text metrics are stable.
  await page.evaluate(() => document.fonts?.ready);
  await sleep(300);
}

/** Drives the page into the requested interaction state before shooting. */
async function drive(page) {
  if (state === "idle") return;

  const selector = `[data-service-hotspot="${target}"]`;
  const handle = await page.$(selector);
  if (!handle) {
    console.warn(`  ! no hotspot "${target}" found, shooting idle instead`);
    return;
  }

  if (state === "hover") {
    await handle.hover();
    await sleep(900);
    return;
  }

  if (state === "modal") {
    await handle.click();
    await page
      .waitForSelector('[role="dialog"]', { timeout: 4000 })
      .catch(() => {
        console.warn("  ! modal never opened");
      });
    await sleep(1200);
  }
}

const browser = await puppeteer.launch({
  headless: "new",
  args: [
    // Software WebGL so this works headless on any machine, incl. CI.
    "--enable-unsafe-swiftshader",
    "--use-gl=angle",
    "--no-sandbox",
  ],
});

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const problems = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  const consoleIssues = [];

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      consoleIssues.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) =>
    consoleIssues.push(`[pageerror] ${err.message}`),
  );

  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });

  const url = `${BASE}${path}`;
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await settle(page);
  await drive(page);

  await page.screenshot({ path: join(outDir, `${vp.name}.png`) });

  // Full-page shot too — catches layout breaking below the fold.
  await page.screenshot({
    path: join(outDir, `${vp.name}-full.png`),
    fullPage: true,
  });

  if (consoleIssues.length) {
    problems.push({ viewport: vp.name, issues: [...new Set(consoleIssues)] });
  }
  console.log(`  ✓ ${vp.name}`);
  await page.close();
}

await browser.close();

console.log(`\nShots → ${outDir}`);

if (problems.length) {
  console.log("\nConsole output:");
  for (const p of problems) {
    console.log(`\n  ${p.viewport}`);
    for (const i of p.issues) console.log(`    ${i}`);
  }
  process.exitCode = 1;
} else {
  console.log("Console clean across all viewports.");
}
