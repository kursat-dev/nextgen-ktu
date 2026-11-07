#!/usr/bin/env node
// Migration 002 — remove Uplink 27 copy that was only *hidden* on the home page
// but still present in the HTML source, the hydration data or the rendered DOM
// (what search engines read).
//
//   node tools/migrations/002-cleanup-template-text.mjs
//
// - FAQ section (ticket/visa/hotel Q&A): removed from module, SSR and hydration data
// - legal links (privacy/terms/cookies/code of conduct → pages not exported): removed
// - hidden ticket tabs, day chips, countdown: labels translated (structure kept,
//   still hidden by nextgen.css) so nothing English/conference-specific remains
// - English section/menu aria-labels: translated
// - Framer site-search index (all Uplink pages' text, unused here): removed

import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { replaceEverywhere } from "../replace-text.mjs";
import { removeCall, removeAllCalls, removeHtmlElement, pruneHandover } from "../lib/framer-edit.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const DIR = join(SITE, "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC");
const HOME_HTML = join(SITE, "index.html");
const HOME = join(DIR, "Gm22-tiVP5hHiXTTLEHMLZyeu0I41ZX3vdWfWu9yfbA.Cr_bfCIR.mjs");
const SHARED = join(DIR, "toplevel-deps.DMkW1u5u.mjs");
const SEARCH_INDEX = "searchIndex-bbk2t8xtTjRT.json";
const PAGES = ["index.html", "schedule/index.html", "speakers/index.html"].map((p) => join(SITE, p));
const edit = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const log = (...a) => console.log("  ", ...a);

// 1. FAQ section
edit(HOME, (s) => (s.includes("`Frequently asked questions`") ? removeCall(s, '"aria-label":`Frequently asked questions`') : s));
edit(HOME_HTML, (h) => {
  const r = removeHtmlElement(h, 'aria-label="Frequently asked questions"');
  log("FAQ section removed from SSR:", r.count);
  const p = pruneHandover(r.html, (_key, strs) => strs.includes("Can I get a refund?"));
  log("hydration: dropped queries", p.dropped, "· blanked unreachable strings", p.blanked);
  return p.html;
});

// 2. Legal links (routes are removed in migration 003; pages were never exported)
edit(SHARED, (s) => {
  const r = removeAllCalls(s, "href:{pathVariables:{KAt4XxAVR:");
  log("legal links removed from header/footer module:", r.count);
  return r.src;
});
edit(HOME_HTML, (h) => {
  const r = removeHtmlElement(h, 'href="legal/');
  log("legal links removed from SSR:", r.count);
  return r.html;
});

// 3. Site-search index: unused (no search UI), contains every Uplink page’s text
for (const f of PAGES)
  edit(f, (h) =>
    h
      .replace(/<meta name="framer-search-index" content="[^"]*">/g, "")
      .replace(new RegExp(`"/sites/6qKRHPJuOulgF9iphfBqgC/${SEARCH_INDEX}":"[^"]*",?`, "g"), "")
  );
if (existsSync(join(DIR, SEARCH_INDEX))) rmSync(join(DIR, SEARCH_INDEX));

// 4. Hidden-but-present labels and English accessibility text
const raw = (from, to, only) => ({ from, to, raw: true, only });
replaceEverywhere(
  [
    // hidden ticket tabs (also the CMS filter value — replaced consistently)
    { from: "Student & community", to: "Topluluk", only: ["/index.html", "Gm22-"] },
    { from: "Team · 5+", to: "Ekip", only: ["/index.html", "Gm22-"] },
    { from: "Individual", to: "Bireysel", only: ["/index.html", "Gm22-"] },
    // hidden day chips
    raw("`day_1`", "`gün_1`", ["Gm22-", "ixER2O3GK"]),
    raw("`day_2`", "`gün_2`", ["Gm22-", "ixER2O3GK"]),
    raw(">day_1<", ">gün_1<", ["/index.html"]),
    raw(">day_2<", ">gün_2<", ["/index.html"]),
    // hidden countdown
    raw("{v:_.d,l:`days`},{v:_.h,l:`hours`},{v:_.m,l:`mins`},...n?[{v:_.s,l:`secs`}]", "{v:_.d,l:`gün`},{v:_.h,l:`saat`},{v:_.m,l:`dk`},...n?[{v:_.s,l:`sn`}]", ["Gm22-"]),
    raw("`${_.d} days, ${_.h} hours, ${_.m} minutes left`", "`${_.d} gün, ${_.h} saat, ${_.m} dakika kaldı`", ["Gm22-"]),
    ...["days:gün", "hours:saat", "mins:dk", "secs:sn"].map((p) => raw(`>${p.split(":")[0]}<`, `>${p.split(":")[1]}<`, ["/index.html"])),
    // section landmarks
    ...[
      ["Speakers", "Etkinlikler"],
      ["Tickets", "Faaliyetler"],
      ["Venue", "Kampüs ve galeri"],
      ["Last year", "Yaklaşım"],
      ["Sponsors", "Projeler"],
      ["Call for papers", "Katıl"],
    ].flatMap(([a, b]) => [raw(`"aria-label":\`${a}\``, `"aria-label":\`${b}\``, ["Gm22-"]), raw(`aria-label="${a}"`, `aria-label="${b}"`, ["/index.html"])]),
    // menu
    { from: "Open menu", to: "Menüyü aç" },
    { from: "Close menu", to: "Menüyü kapat" },
    raw('"aria-label":`Main`', '"aria-label":`Ana menü`', ["toplevel-deps"]),
    raw('aria-label="Main"', 'aria-label="Ana menü"', ["index.html"]),
    // internal layer name of the hero wordmark
    raw('"data-framer-name":`Uplink`', '"data-framer-name":`Wordmark text`', ["Gm22-"]),
    raw('data-framer-name="Uplink"', 'data-framer-name="Wordmark text"', ["/index.html"]),
  ],
  { quiet: true }
);
edit(HOME_HTML, (h) => h.replace(/aria-label="\d+ days, \d+ hours, \d+ minutes left"/g, 'aria-label="takvim yakında"'));

console.log("migration 002 done");
