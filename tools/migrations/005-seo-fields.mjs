#!/usr/bin/env node
// Migration 005 — SEO / social metadata.
//
//   node tools/migrations/005-seo-fields.mjs
//
// The production domain is not decided yet, so no absolute URL is written:
// og:url is removed and canonical stays root-relative. When the domain is
// known, add og:url, an absolute canonical, og:image and a sitemap
// (see README → "Beklenen bilgiler").

import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const DIR = join(SITE, "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC");
const HOME = join(SITE, "index.html");
const edit = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const SOCIAL = "socialImage:`https://framerusercontent.com/assets/6OEBJhrZTpBjxjBNBwyht365Hpk.png`,";

edit(HOME, (h) => {
  h = h.replace(/<meta name="generator" content="[^"]*">/, "");
  h = h.replace('<meta name="viewport" content="width=device-width">', '<meta name="viewport" content="width=device-width, initial-scale=1">');
  h = h.replace(/<meta property="og:url" content="[^"]*">/, "");
  h = h.replace('<link rel="canonical" href="./" data-framer-generated-canonical>', '<link rel="canonical" href="/">');
  h = h.replace('<meta name="twitter:card" content="summary_large_image">', '<meta name="twitter:card" content="summary">');
  if (!h.includes('property="og:site_name"'))
    h = h.replace(
      '<meta property="og:type" content="website">',
      '<meta property="og:type" content="website"><meta property="og:site_name" content="NextGen KTÜ"><meta property="og:locale" content="tr_TR"><meta name="theme-color" content="#FFFFFF">'
    );
  return h;
});

// Client-side metadata (Framer updates <head> from these on navigation)
for (const f of ["augiA20Il.DYLFBa-R.mjs", "epBF_d5fc.CilxCuZb.mjs"])
  edit(join(DIR, f), (s) => s.split(SOCIAL).join("").split("viewport:`width=device-width`").join("viewport:`width=device-width, initial-scale=1`"));

// Uplink share image and favicons are no longer referenced
for (const p of [
  "assets/framerusercontent.com/assets/6OEBJhrZTpBjxjBNBwyht365Hpk.png",
  "assets/framerusercontent.com/images/btPNyXOE58vjiGgznYb05Z1S4c.png",
  "assets/framerusercontent.com/images/lqGhwTAApcG7jBtMNrDeK4U89Y.png",
])
  if (existsSync(join(SITE, p))) rmSync(join(SITE, p));
edit(HOME, (h) =>
  h.replace(/var M=(\{.*?\});var P=""/s, (_, map) => {
    const m = JSON.parse(map);
    return `var M=${JSON.stringify(Object.fromEntries(Object.entries(m).filter(([, l]) => existsSync(join(SITE, l)))))};var P=""`;
  })
);

writeFileSync(
  join(SITE, "robots.txt"),
  "User-agent: *\nAllow: /\n\n# Sitemap: alan adı kesinleşince eklenecek (mutlak URL gerekir).\n"
);
console.log("migration 005 done");
