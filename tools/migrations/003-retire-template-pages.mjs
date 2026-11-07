#!/usr/bin/env node
// Migration 003 — retire the Uplink 27 sub-pages.
//
//   node tools/migrations/003-retire-template-pages.mjs
//
// - /speakers and /schedule: replaced by tiny static redirect pages
//   (→ /#tickets “faaliyetler”, → /#lineup “etkinlikler”), noindex.
// - Framer client router: routes for speakers, schedule, contact, legal and
//   docs removed (only “/” and the 404 page remain), so nothing can
//   navigate to or preload the old conference pages.
// - Framer’s client-side 404 page: Turkish copy, links only to home.
// - /404.html: static not-found page for the host to serve for unknown URLs.
// - Hero bars no longer build “/speakers?speaker=…” links.
// - Modules no longer reachable from the site are deleted.

import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { replaceEverywhere } from "../replace-text.mjs";
import { removeAllCalls } from "../lib/framer-edit.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const REL = "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC";
const DIR = join(SITE, REL);
const MAIN = join(DIR, "script_main.C7nk36ca.mjs");
const NOT_FOUND = join(DIR, "lY7tPPzGt0sCAIL_Sl2jLOnYgNlDdguI_6d8zkt72As.isXdBcOk.mjs");
const edit = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const must = (s, a, b) => {
  if (!s.includes(a)) {
    if (s.includes(b)) return s; // already applied
    throw new Error(`expected snippet not found: ${a.slice(0, 80)}`);
  }
  return s.split(a).join(b);
};

// 1. Router: keep only home + 404
edit(MAIN, (s) => {
  for (const route of [
    "QpehGXTBr:{elements:{},page:D(()=>import(`./fA9NtF54edqZDJpPYJBLaPq8WoKxrBJ-dJ4ovLjklUg.BkuN0gIz.mjs`)),path:`/speakers`},",
    "SaXUtSxbU:{elements:{},page:D(()=>import(`./-FrovgLAbV43H5JVKSfI8W2HClx6mMUcO1D0-G73TLY.D-GGlmT8.mjs`)),path:`/schedule`},",
    "eUp2jMXoI:{elements:{},page:D(()=>import(`./HVWCUDKGkBMrtRE0fqUipM1LNgByVHYLwjgQ07E-gb0.D5FAYfRk.mjs`)),path:`/contact`},",
    "jiUcCvxca:{collectionId:`Dqa3bHtR0`,elements:{},page:D(()=>import(`./iT8wT6gw8y3u5EAdShBC0N7kBiDG6kW96YEsy00KpsE.QD7j1neR.mjs`)),path:`/legal/:KAt4XxAVR`},",
    ",Hzt6h4iWr:{collectionId:`MyuALfv6j`,elements:{},page:D(()=>import(`./QHa5kXqI7NgWeMGmjhpK_XoPU-kRIhuQe50mLgMeySY.BP2UebrZ.mjs`)),path:`/docs/:SoTjL1acd`}",
  ])
    s = s.includes(route) ? s.split(route).join("") : s;
  s = must(
    s,
    "q={Dqa3bHtR0:async()=>(await import(`./2yLMbSV57adVmCxEdowAcElIrRoWrdQop1Eze0Sqr4Q.DSKw1RK5.mjs`))?.utils,MyuALfv6j:async()=>(await import(`./_TQuJdwfaN0za0yyjhIoPjx1Hay0ax2Ad5FJ_BFiQ8c.DvdWvqaW.mjs`))?.utils}",
    "q={}"
  );
  return s;
});

// 2. Framer client-side 404 page
edit(NOT_FOUND, (s) => {
  for (const id of ["QpehGXTBr", "SaXUtSxbU"]) s = removeAllCalls(s, `href:{webPageId:\`${id}\`}`).src;
  return s;
});
replaceEverywhere(
  [
    { from: "This page dropped off the network. It may have moved, or the link is wrong.", to: "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.", only: ["lY7t"] },
    { raw: true, from: "children:`signal lost`", to: "children:`sayfa bulunamadı`", only: ["lY7t"] },
    { raw: true, from: "children:`signal-lost/`", to: "children:`bulunamadı/`", only: ["lY7t"] },
    { raw: true, from: "children:`uplink_27 / 404`", to: "children:`nextgen_ktü / 404`", only: ["lY7t"] },
    { raw: true, from: "iCMI2kC5S:`Back to home`", to: "iCMI2kC5S:`Ana sayfaya dön`", only: ["lY7t"] },
    { raw: true, from: '"aria-label":`Page not found`', to: '"aria-label":`Sayfa bulunamadı`', only: ["lY7t"] },
    { raw: true, from: "title:`Page not found · Uplink 27 Tech Conference Template`", to: "title:`Sayfa bulunamadı · NextGen KTÜ`", only: ["epBF_d5fc"] },
    {
      raw: true,
      from: "description:`This page doesn’t exist. Head back to the Uplink 27 tech conference template home page.`",
      to: "description:`Aradığın sayfa bulunamadı. NextGen KTÜ ana sayfasına dönebilirsin.`",
      only: ["epBF_d5fc"],
    },
    // hero bars: link to the activities section instead of /speakers?speaker=…
    {
      raw: true,
      from: "g=i||`/speakers`,_=`${g}${g.includes(`?`)?`&`:`?`}speaker=${encodeURIComponent(n)}`",
      to: "g=`/#tickets`,_=g",
      only: ["Gm22-"],
    },
    { raw: true, from: 'href="./#tickets" aria-label=', to: 'href="/#tickets" aria-label=', only: ["/index.html"] },
  ],
  { quiet: true }
);

// 3. Static pages
const page = ({ title, heading, body, href, label, redirect }) => `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
${redirect ? `<meta http-equiv="refresh" content="0; url=${href}">\n<script>location.replace(${JSON.stringify(href)})</script>\n` : ""}<style>
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff;color:#1b2230;
font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:24px}
main{max-width:520px}
p.k{font:13px/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:#5b6575;margin:0 0 16px}
h1{font-size:clamp(28px,6vw,40px);line-height:1.1;letter-spacing:-.02em;margin:0 0 12px}
p{color:#5b6575;margin:0 0 24px}
a{display:inline-block;background:#1455e8;color:#fff;text-decoration:none;padding:12px 18px;border-radius:6px}
a:focus-visible{outline:2px solid #58d7d9;outline-offset:3px}
</style>
</head>
<body>
<main>
<p class="k">nextgen_ktü</p>
<h1>${heading}</h1>
<p>${body}</p>
<a href="${href}">${label}</a>
</main>
</body>
</html>
`;
writeFileSync(
  join(SITE, "speakers/index.html"),
  page({ title: "Faaliyetler · NextGen KTÜ", heading: "Bu sayfa taşındı", body: "Faaliyet alanlarımız artık ana sayfada.", href: "/#tickets", label: "Faaliyetlere git", redirect: true })
);
writeFileSync(
  join(SITE, "schedule/index.html"),
  page({ title: "Etkinlikler · NextGen KTÜ", heading: "Bu sayfa taşındı", body: "Etkinlikler artık ana sayfada duyuruluyor.", href: "/#lineup", label: "Etkinliklere git", redirect: true })
);
writeFileSync(
  join(SITE, "404.html"),
  page({ title: "Sayfa bulunamadı · NextGen KTÜ", heading: "Sayfa bulunamadı", body: "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.", href: "/", label: "Ana sayfaya dön", redirect: false })
);

// 4. Delete modules no longer reachable from the site
const reachable = new Set();
const visit = (file) => {
  if (reachable.has(file) || !existsSync(join(DIR, file))) return;
  reachable.add(file);
  const src = readFileSync(join(DIR, file), "utf8");
  for (const m of src.matchAll(/(?:from|import)\s*\(?\s*["`]\.\/([^"`]+\.mjs)["`]/g)) visit(m[1]);
};
const html = readFileSync(join(SITE, "index.html"), "utf8");
// Entry points: <script src> and <link rel="modulepreload"> (not the URL map,
// which lists every exported file).
for (const m of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+\.mjs)"[^>]*>/g))
  if (m[1].includes(REL)) visit(basename(m[1]));
const removed = [];
for (const f of readdirSync(DIR)) {
  if (f.endsWith(".mjs") && !reachable.has(f)) {
    rmSync(join(DIR, f));
    removed.push(f);
  }
}
console.log(`  reachable modules: ${reachable.size}; removed ${removed.length}:`, removed.join(", ") || "—");
console.log("migration 003 done");
