#!/usr/bin/env node
// Replace a piece of text everywhere it lives in the exported Framer site.
//
// Why: a Framer export keeps every visible string in up to three places —
//   1. the server-rendered HTML (index.html, schedule/, speakers/)
//   2. the hydration data (CMS rows, JSON inside index.html)
//   3. the compiled page/component modules (assets/…/sites/<id>/*.mjs)
// React re-renders from (3)/(2) after load, so changing only the HTML makes
// the old text flash back. This tool updates all copies in one go.
//
// Usage
//   node tools/replace-text.mjs "old text" "new text"
//   node tools/replace-text.mjs --file tools/content/home.json
//       JSON: [["old", "new"], …]  or  [{"from": "old", "to": "new"}, …]
//       optional per entry: "raw": true  → exact code/markup snippet, no escaping
//                           "only": "index.html" → limit to paths containing this
//       Pairs run in order, so list longer strings before their substrings.
//   add --dry to only report matches.
//
// Rules for new text: no backticks (`) and no "${" (they live inside JS
// template literals), and prefer ’ over ' to keep HTML escaping simple.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "uplink-copy-site");
const SITE_MODULES = join(SITE, "assets/framerusercontent.com/sites");

function walk(dir, test, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, test, out);
    else if (test(name)) out.push(p);
  }
  return out;
}

// Resolved on every call: migrations may add/remove files between calls.
const targets = () => [
  ...["index.html", "schedule/index.html", "speakers/index.html"].map((f) => join(SITE, f)).filter(existsSync),
  ...walk(SITE_MODULES, (n) => n.endsWith(".mjs") || n.endsWith(".json")),
];

const escHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const escJs = (s) =>
  [...s]
    .map((c) => {
      const n = c.codePointAt(0);
      if (n < 0x80) return c;
      if (n < 0x100) return "\\x" + n.toString(16).padStart(2, "0");
      return "\\u" + n.toString(16).padStart(4, "0");
    })
    .join("");
const escJson = (s) => JSON.stringify(s).slice(1, -1);

function variants(from, to, file) {
  const v = [[from, to]];
  if (file.endsWith(".html")) {
    v.push([escHtml(from), escHtml(to)]);
    v.push([escJson(from), escJson(to)]);
  } else {
    v.push([escJs(from), to]);
  }
  // de-duplicate identical pairs
  return v.filter(([a], i) => v.findIndex(([b]) => b === a) === i && a.length);
}

function validate(to) {
  if (to.includes("`") || to.includes("${")) throw new Error(`New text must not contain backticks or \${: ${to}`);
}

export function replaceEverywhere(pairs, { dry = false, quiet = false } = {}) {
  const cache = new Map(targets().map((f) => [f, readFileSync(f, "utf8")]));
  const report = [];
  for (const { from, to, min = 1, raw = false, only } of pairs) {
    // raw: exact code/markup snippet (e.g. "children:`27`"), no escaping variants
    // only: substring that the file path must contain
    if (!raw) validate(to);
    let hits = 0;
    const where = [];
    for (const [file, text] of cache) {
      if (only && ![].concat(only).some((o) => file.includes(o))) continue;
      let s = text;
      let n = 0;
      for (const [a, b] of raw ? [[from, to]] : variants(from, to, file)) {
        const parts = s.split(a);
        if (parts.length > 1) {
          n += parts.length - 1;
          s = parts.join(b);
        }
      }
      if (n) {
        hits += n;
        where.push(`${relative(SITE, file).replace(/^assets\/framerusercontent\.com\/sites\/[^/]+\//, "")}×${n}`);
        cache.set(file, s);
      }
    }
    report.push({ from, hits, where });
    if (!quiet || hits < min)
      console.log(`${hits < min ? "MISS" : "ok  "} ${JSON.stringify(from).slice(0, 70)} → ${hits} [${where.join(", ")}]`);
  }
  if (!dry) for (const [file, text] of cache) if (text !== readFileSync(file, "utf8")) writeFileSync(file, text);
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const rest = args.filter((a) => a !== "--dry");
  let pairs;
  if (rest[0] === "--file") {
    const data = JSON.parse(readFileSync(rest[1], "utf8"));
    pairs = data.map((d) => (Array.isArray(d) ? { from: d[0], to: d[1] } : d));
  } else if (rest.length === 2) {
    pairs = [{ from: rest[0], to: rest[1] }];
  } else {
    console.error('usage: node tools/replace-text.mjs "old" "new" | --file pairs.json [--dry]');
    process.exit(1);
  }
  const report = replaceEverywhere(pairs, { dry });
  const misses = report.filter((r) => r.hits === 0).length;
  console.log(`${report.length - misses}/${report.length} replaced${dry ? " (dry run)" : ""}`);
}
