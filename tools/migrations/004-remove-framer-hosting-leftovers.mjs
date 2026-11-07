#!/usr/bin/env node
// Migration 004 — remove Framer hosting/editor leftovers that do nothing on
// a self-hosted copy.
//
//   node tools/migrations/004-remove-framer-hosting-leftovers.mjs
//
// - On-page editor bar: router no longer imports assets/framer.com/edit/init.mjs;
//   the inline localStorage preload snippet is removed.
// - Export’s service worker (f2c-sw.js): registration removed, file deleted.
//   The inline URL-rewrite script in <head> already maps every framerusercontent
//   URL to the local copy for fetch/img/Worker, so the SW was redundant.
// - “Made in Framer” badge: router no longer mounts it, SSR markup removed,
//   badge module deleted.
// - Folders only used by the editor bar / Framer analytics / Framer API
//   (app.framerstatic.com, framer.com, events.framer.com, api.framer.com,
//   *.framercanvas.com): deleted.
// - URL map in each page’s inline rewrite script: entries pointing to files
//   that no longer exist are dropped.

import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { removeHtmlElement } from "../lib/framer-edit.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const DIR = join(SITE, "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC");
const MAIN = join(DIR, "script_main.C7nk36ca.mjs");
const HOME = join(SITE, "index.html");
const edit = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const swap = (s, a, b) => (s.includes(a) ? s.split(a).join(b) : s.includes(b) ? s : (() => { throw new Error(`not found: ${a.slice(0, 70)}`); })());

// 1. Router: no editor bar, no badge
edit(MAIN, (s) => {
  s = swap(s, "EditorBar:s===void 0?void 0:(", "EditorBar:!0?void 0:(");
  s = swap(
    s,
    "(function(){X&&i(()=>{_(document.getElementById(`__framer-badge-container`),f(m,{},f(p(()=>import(`./PX9hIOIVM.C5yimjwD.mjs`)))))})})()",
    "(function(){})()"
  );
  return s;
});
for (const f of ["PX9hIOIVM.C5yimjwD.mjs"]) if (existsSync(join(DIR, f))) rmSync(join(DIR, f));

// 2. Home page HTML: SW registration, editor-bar preload, badge markup
edit(HOME, (h) => {
  h = h.replace(/<script>if\("serviceWorker" in navigator\)\{navigator\.serviceWorker\.register\([^<]*<\/script>/, "");
  h = h.replace(/<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\)\)[^<]*<\/script>/, "");
  h = removeHtmlElement(h, 'id="__framer-badge-container"').html;
  h = h.replace(/@supports \(z-index:calc\(infinity\)\)\{#__framer-badge-container\{--infinity:infinity\}\}#__framer-badge-container\{[^}]*\}/, "");
  return h;
});
if (existsSync(join(SITE, "f2c-sw.js"))) rmSync(join(SITE, "f2c-sw.js"));

// 3. Folders nothing on the site loads any more
const assets = join(SITE, "assets");
for (const d of readdirSync(assets))
  if (/^(app\.framerstatic\.com|framer\.com|events\.framer\.com|api\.framer\.com|.*\.framercanvas\.com)$/.test(d)) {
    rmSync(join(assets, d), { recursive: true, force: true });
    console.log("  removed assets/" + d);
  }

// 4. Prune the inline URL map (var M={…}) to files that exist
edit(HOME, (h) =>
  h.replace(/var M=(\{.*?\});var P="";var H=(\[[^\]]*\])/s, (_, map, hosts) => {
    const m = JSON.parse(map);
    const kept = Object.fromEntries(Object.entries(m).filter(([, local]) => existsSync(join(SITE, local))));
    console.log(`  URL map: ${Object.keys(m).length} → ${Object.keys(kept).length} entries`);
    const h2 = JSON.parse(hosts).filter((x) => x !== "app.framerstatic.com");
    return `var M=${JSON.stringify(kept)};var P="";var H=${JSON.stringify(h2)}`;
  })
);

console.log("migration 004 done");
