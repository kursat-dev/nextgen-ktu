#!/usr/bin/env node
// NextGen KTÜ — light theme palette for the exported Uplink 27 Framer site.
//
// Framer stores every color as a CSS custom property ("token") defined once
// per HTML page in `body{--token-…:#…}`. Components reference them as
// `var(--token-…, <fallback>)`, both in the SSR HTML and in the JS modules.
// This script rewrites the definitions AND the fallbacks so the whole site
// (including canvas/map code components that may read the fallback) follows
// the palette below. It is idempotent: run it again after editing the table.
//
//   node tools/apply-palette.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = join(dirname(fileURLToPath(import.meta.url)), "..", "uplink-copy-site");

// Brand
const BLUE = "#1455E8"; // Elektrik mavisi — primary actions, important links
const TURQ = "#58D7D9"; // Turkuaz — secondary accents, small details
const WHITE = "#FFFFFF";
const LIGHT = "#F3F6FA"; // Açık gri — surfaces
const INK = "#1B2230"; // Koyu antrasit — body text
const INK_MUTED = "#5B6575";
const INK_DIM = "#9AA4B2";

// token id → [what it is in the template, new value]
const PALETTE = {
  "95e5aa35-9627-4ee1-9888-c9c719e9b17f": ["page background / text on accent", WHITE],
  "c00ad5ec-139a-484a-8e72-6513dc5b60ac": ["card / surface background", LIGHT],
  "c2245e3b-5638-4671-8549-5a465e4f3a6c": ["secondary surface", "#E6EBF2"],
  "1846ab91-9623-42c1-8955-c81388c159ff": ["primary text", INK],
  "0517b82b-243e-4c91-ada9-58dc89402c2a": ["muted text", INK_MUTED],
  "159e4272-7e9c-4a88-8ecd-985248c9faab": ["dimmed text", INK_DIM],
  "9408e5af-f6ac-4527-afdc-ddcfeda4a797": ["hairline border", INK + "1A"],
  "719ea334-b13c-45c6-abc9-2caf315e691c": ["strong border", INK + "2E"],
  "dcacd241-89a4-429e-8d68-9c72c59f2092": ["faint overlay", INK + "0A"],
  "f8b3f101-fe88-465e-9421-e2cbecf81c67": ["accent", BLUE],
  "541676c4-7ea5-4888-b8a8-ede0ee3c51a4": ["accent soft", BLUE + "24"],
  "c47b9ba0-18a4-4735-aecb-312ada2ed00f": ["accent glow", BLUE + "2E"],
  "2f973b4f-24f0-4861-88cc-f6f2d8dfc1e9": ["accent faint", BLUE + "12"],
  "225a1687-2658-449b-8fa4-cd8420d386a6": ["status green", TURQ],
  "2b5c0255-50cc-4d2f-b86c-582b1be1d181": ["deep navy", "#0B1F4D"],
  "d02336f4-fbe5-4f98-aab2-20aa8bf1cdcc": ["header backdrop e0", WHITE + "E0"],
  "185c4964-c5df-4339-8215-98ec76792a8e": ["header backdrop e6", WHITE + "E6"],
  "38da6988-9956-49c3-b3da-38acb18fba75": ["header backdrop f0", WHITE + "F0"],
  "b0d6601f-81cc-4655-a01c-770993072e00": ["transparent background", WHITE + "00"],
  // map component
  "3d1b5950-fee3-4a64-bdaa-a4e0351b71af": ["map land", "#EEF2F7"],
  "fe162d6c-35ed-4240-bb1e-147b08ea89e4": ["map water", "#D6E4F5"],
  "c817fbe2-7205-4882-a3af-d79683221c1d": ["map building", "#E2E8F0"],
  "5b6469a3-a370-449b-9cf9-a2bbc1cfb1f4": ["map building edge", "#CDD6E2"],
  "a6f7f870-835f-4ace-89c2-5fc9bdbeda27": ["map road", WHITE],
  "776a2e04-3dc4-4bdd-9673-45835bee5168": ["map credit text", "#7A8494"],
  "9508a94a-c6ff-412a-a340-ae38771ec2c7": ["map credit bg", WHITE + "CC"],
  // unused in the template, kept white
  "56329f89-d671-4b2b-9366-4d622b3bc1ac": ["white", WHITE],
  "cc4b526d-b9e4-4f81-a933-f7e80cb16607": ["white 72%", WHITE + "B8"],
  "cf8fe688-1615-4ca6-98fe-8858c949790d": ["white 56%", WHITE + "8F"],
};

// Hard-coded (non-token) colors in the template that must follow the theme.
const LITERALS = [
  ["background:#0B0B0B", "background:#EEF2F7"], // map container
];

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  const [r, g, b] = [n(0), n(2), n(4)];
  if (h.length === 8) return `rgba(${r}, ${g}, ${b}, ${+(n(6) / 255).toFixed(3)})`;
  return `rgb(${r}, ${g}, ${b})`;
}

function files(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files(p, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const targets = [
  ...["index.html", "schedule/index.html", "speakers/index.html"].map((f) => join(SITE, f)),
  ...files(join(SITE, "assets/framerusercontent.com/sites"), [".mjs"]),
  ...files(join(SITE, "assets/framerusercontent.com/modules"), [".js"]),
];

let total = 0;
for (const file of targets) {
  const before = readFileSync(file, "utf8");
  let s = before;
  for (const [id, [, value]] of Object.entries(PALETTE)) {
    const esc = id.replace(/-/g, "\\-");
    // definition: --token-id:#xxxxxx
    s = s.replace(new RegExp(`(--token-${esc}:)\\s*(#[0-9a-fA-F]{3,8}|rgba?\\([^)]*\\))`, "g"), `$1${value}`);
    // fallback: var(--token-id, <color>)
    s = s.replace(
      new RegExp(`(var\\(--token-${esc},\\s*)(#[0-9a-fA-F]{3,8}|rgba?\\([^)]*\\))`, "g"),
      (_, pre, old) => pre + (old.startsWith("#") ? value : hexToRgb(value))
    );
  }
  for (const [a, b] of LITERALS) s = s.split(a).join(b);
  if (s !== before) {
    writeFileSync(file, s);
    total++;
    console.log("updated", file.replace(SITE + "/", ""));
  }
}
console.log(`palette applied to ${total} file(s)`);
