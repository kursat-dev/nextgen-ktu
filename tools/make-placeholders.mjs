#!/usr/bin/env node
// Generates neutral SVG placeholders that stand in for the template's stock
// photos (speaker portraits, venue photos) and fictional sponsor logos until
// NextGen KTÜ's real photos and project visuals are ready.
//   node tools/make-placeholders.mjs
// Output: uplink-copy-site/assets/nextgen/placeholders/*.svg

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "uplink-copy-site/assets/nextgen/placeholders");
mkdirSync(OUT, { recursive: true });

const BLUE = "#1455E8", TURQ = "#58D7D9", INK = "#1B2230", BG = "#EEF2F7", DIM = "#9AA4B2";
const MONO = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>\n`;

// Square motifs (640×640) — used for activity/event tiles and small avatars.
const motifs = {
  braces: `<rect width="640" height="640" fill="${BG}"/><text x="320" y="390" font-family="${MONO}" font-size="260" font-weight="700" text-anchor="middle" fill="${BLUE}">{ }</text>`,
  tag: `<rect width="640" height="640" fill="${BG}"/><text x="320" y="380" font-family="${MONO}" font-size="200" font-weight="700" text-anchor="middle" fill="${INK}">&lt;/&gt;</text><rect x="200" y="440" width="240" height="14" rx="7" fill="${TURQ}"/>`,
  dots: `<rect width="640" height="640" fill="${BG}"/>${Array.from({ length: 64 }, (_, i) => {
    const x = 60 + (i % 8) * 74, y = 60 + Math.floor(i / 8) * 74;
    const on = (i * 7) % 5 === 0;
    return `<circle cx="${x}" cy="${y}" r="${on ? 14 : 8}" fill="${on ? BLUE : DIM}"/>`;
  }).join("")}`,
  stripes: `<rect width="640" height="640" fill="${BG}"/>${Array.from({ length: 12 }, (_, i) =>
    `<rect x="${-200 + i * 90}" y="-100" width="28" height="900" fill="${i % 3 ? INK : BLUE}" opacity="${i % 3 ? 0.18 : 1}" transform="rotate(30 320 320)"/>`
  ).join("")}`,
  rings: `<rect width="640" height="640" fill="${BG}"/>${[260, 200, 140, 80].map((r, i) =>
    `<circle cx="320" cy="320" r="${r}" fill="none" stroke="${i === 1 ? BLUE : i === 3 ? TURQ : INK}" stroke-opacity="${i % 2 ? 1 : 0.2}" stroke-width="18"/>`
  ).join("")}`,
  binary: `<rect width="640" height="640" fill="${BG}"/>${["0110 1001", "1010 0111", "0011 1100", "1101 0010", "0101 1110"].map((t, i) =>
    `<text x="320" y="${170 + i * 85}" font-family="${MONO}" font-size="64" text-anchor="middle" fill="${i === 2 ? BLUE : INK}" fill-opacity="${i === 2 ? 1 : 0.35}">${t}</text>`
  ).join("")}`,
};
for (const [name, body] of Object.entries(motifs)) writeFileSync(join(OUT, `tile-${name}.svg`), svg(640, 640, body));

// Gallery / venue photo placeholder (1200×800).
const photo = (label) =>
  svg(1200, 800, `<rect width="1200" height="800" fill="${BG}"/><rect x="40" y="40" width="1120" height="720" fill="none" stroke="${DIM}" stroke-width="3" stroke-dasharray="14 12"/><rect x="540" y="300" width="120" height="90" rx="12" fill="none" stroke="${BLUE}" stroke-width="8"/><circle cx="600" cy="345" r="24" fill="none" stroke="${BLUE}" stroke-width="8"/><rect x="560" y="286" width="40" height="16" rx="4" fill="${BLUE}"/><text x="600" y="460" font-family="${MONO}" font-size="34" text-anchor="middle" fill="${INK}" fill-opacity="0.6">${label}</text>`);
writeFileSync(join(OUT, "photo-gallery-1.svg"), photo("fotoğraf yakında"));
writeFileSync(join(OUT, "photo-gallery-2.svg"), photo("fotoğraf yakında"));

// Project "logo" placeholders (600×136) — plain labels, not logos.
for (let i = 1; i <= 12; i++) {
  const n = String(i).padStart(2, "0");
  writeFileSync(
    join(OUT, `project-${n}.svg`),
    svg(600, 136, `<text x="300" y="86" font-family="${MONO}" font-size="56" text-anchor="middle" fill="${INK}" fill-opacity="0.55">proje_${n}</text>`)
  );
}
console.log("placeholders written to", OUT);
