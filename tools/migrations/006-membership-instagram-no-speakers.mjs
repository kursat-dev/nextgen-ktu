#!/usr/bin/env node
// Migration 006 — real club links, no speaker/CFP features.
//
//   node tools/migrations/006-membership-instagram-no-speakers.mjs
//
// - Every membership call to action → the Google Form, new tab
// - “Follow” actions → Instagram, new tab
// - Speaker / talk / workshop-proposal buttons, tabs and nav links removed or
//   turned into membership/Instagram actions; the katıl section shows a
//   single membership card (tab row hidden in nextgen.css)
// - Footer e-mail has no real address yet → plain text, no link
// - Events links → /etkinlikler/ (page added in migration 008)

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { editCalls } from "../lib/framer-edit.mjs";
import { replaceEverywhere } from "../replace-text.mjs";
import { FORM_URL, INSTAGRAM_URL } from "../site-config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const DIR = join(SITE, "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC");
const HOME = join(DIR, "Gm22-tiVP5hHiXTTLEHMLZyeu0I41ZX3vdWfWu9yfbA.Cr_bfCIR.mjs");
const SHARED = join(DIR, "toplevel-deps.DMkW1u5u.mjs");
const HTML = join(SITE, "index.html");
const edit = (f, fn) => writeFileSync(f, fn(readFileSync(f, "utf8")));
const sub = (a, b) => (s) => {
  if (!s.includes(a)) throw new Error(`missing in call: ${a}`);
  return s.split(a).join(b);
};
const pipe = (...fns) => (s) => fns.reduce((v, f) => f(v), s);
const NEW = "newTab:!0";
const TARGET = ' target="_blank" rel="noopener"';

// ── home module: pixel buttons
edit(HOME, (s) => {
  if (s.includes(FORM_URL)) return s; // already applied
  s = editCalls(s, "label:`Topluluğa katıl`", pipe(sub("link:`/#cfp`", `link:\`${FORM_URL}\``), sub("newTab:!1", NEW)));
  s = editCalls(s, "name:`Button (standard)`", sub("newTab:!1", NEW)); // faaliyet cards (CMS link)
  s = editCalls(s, "name:`Button (featured)`", sub("newTab:!1", NEW));
  for (const [label, name] of [["Konu öner", "Submit Talk"], ["Üyelik bilgisi yakında", "Submit Lightning"]])
    s = editCalls(s, `name:\`${name}\``, (c) =>
      c.includes(`label:\`${label}\``)
        ? pipe(sub(`label:\`${label}\``, "label:`Üyelik formunu doldur`"), sub("link:e[0]", `link:\`${FORM_URL}\``), sub("query:`topic=speaking`", "query:``"), sub("newTab:!1", NEW))(c)
        : c
    );
  s = editCalls(s, "label:`Atölye öner`", pipe(sub("label:`Atölye öner`", "label:`Instagram’da takip et`"), sub("link:e[0]", `link:\`${INSTAGRAM_URL}\``), sub("query:`topic=speaking`", "query:``"), sub("newTab:!1", NEW)));
  s = editCalls(s, "label:`Konuşmacı ol`", pipe(sub("label:`Konuşmacı ol`", "label:`Instagram’da takip et`"), sub("newTab:!1", `link:\`${INSTAGRAM_URL}\`,${NEW}`)));
  s = editCalls(s, "label:`Projeni ekle`", pipe(sub("label:`Projeni ekle`", "label:`Topluluğa katıl`"), sub("link:e[0]", `link:\`${FORM_URL}\``), sub("query:`topic=sponsoring`", "query:``"), sub("newTab:!1", NEW)));
  s = editCalls(s, "label:`Haberdar ol`", pipe(sub("label:`Haberdar ol`", "label:`Tüm etkinlikler`"), sub("link:e[0]", "link:`/etkinlikler/`")));
  return s;
});

// ── shared module: header CTA, menu, footer
edit(SHARED, (s) => {
  if (s.includes(FORM_URL)) return s;
  s = editCalls(s, "link:`/#cfp`", pipe(sub("link:`/#cfp`", `link:\`${FORM_URL}\``), sub("newTab:!1", NEW)));
  const link = (node, href, text) =>
    editCalls(s, `nodeId:\`${node}\``, (c) => {
      c = c.replace(/href:(\{[^}]*\}|`[^`]*`)/, href === null ? "href:void 0" : `href:\`${href}\``);
      if (href && href.startsWith("http")) c = c.replace("openInNewTab:!1", "openInNewTab:!0");
      return text ? c.replace(/children:`[^`]*`/, `children:\`${text}\``) : c;
    });
  s = link("FIDn5aOQO", FORM_URL); // footer “Üye ol”
  s = link("A57LP_r06", INSTAGRAM_URL, "Instagram"); // footer “Konuşmacı ol”
  s = link("uZDztgvMh", INSTAGRAM_URL, "Instagram"); // footer “Sosyal medya”
  s = link("FpkdM1Hsz", null, "E-posta · yakında"); // footer “E-posta”: no address yet
  return s;
});

// ── SSR: React keeps server-rendered attributes, so they must match the client
edit(HTML, (h) => {
  const before = h;
  h = h.split('href="/#cfp"').join(`href="${FORM_URL}"${TARGET}`);
  // katıl card button (only the active tab is server-rendered)
  h = h.replace(/(<a href=")\.\/#iletisim(" style="[^"]*">(?:(?!<\/a>).)*?)>Konu öner</s, `$1${FORM_URL}"${TARGET}$2>Üyelik formunu doldur<`);
  h = h.replace(/(<a href=")\.\/#iletisim(" style="[^"]*">(?:(?!<\/a>).)*?)>Projeni ekle</s, `$1${FORM_URL}"${TARGET}$2>Topluluğa katıl<`);
  h = h.replace(/(<a href=")\.\/#lineup(" style="[^"]*">(?:(?!<\/a>).)*?)>Haberdar ol</s, "$1/etkinlikler/$2>Tüm etkinlikler<");
  h = h.replace(/<a (style="[^"]*">(?:(?!<\/a>).)*?)>Konuşmacı ol</s, `<a href="${INSTAGRAM_URL}"${TARGET} $1>Instagram’da takip et<`);
  // footer text links (three breakpoint copies each)
  h = h.replace(/<a class="framer-text" href="\.\/">Üye ol<\/a>/g, `<a class="framer-text" href="${FORM_URL}"${TARGET}>Üye ol</a>`);
  h = h.replace(/<a class="framer-text" href="\.\/">Başvuru<\/a>/g, `<a class="framer-text" href="${INSTAGRAM_URL}"${TARGET}>Instagram</a>`);
  h = h.replace(/<a class="framer-text" href="\.\/">Sosyal medya<\/a>/g, `<a class="framer-text" href="${INSTAGRAM_URL}"${TARGET}>Instagram</a>`);
  h = h.replace(/<a class="framer-text" href="\.\/#iletisim">E-posta<\/a>/g, '<a class="framer-text">E-posta · yakında</a>');
  if (h === before) console.log("  SSR already updated");
  return h;
});
// ── texts (modules + SSR + hydration data)
replaceEverywhere(
  [
    { from: "NextGen KTÜ’ye katılmanın birden fazla yolu var. Sana uygun olanı seç.", to: "Üyelik başvuruları çevrim içi form üzerinden alınıyor; duyurular Instagram’da." },
    { from: "Öğrendiğin bir konuyu toplulukla kısa bir sunumla paylaş.", to: "Formu doldur, topluluğa katıl." },
    { from: "En iyi bildiğin konuyu uygulamalı bir atölyeye dönüştür.", to: "Duyuruları ve etkinlikleri Instagram’dan takip et." },
    { raw: true, from: "W1dNqRVk3:`Konuşmacı ol`", to: "W1dNqRVk3:`Başvuru`", only: ["Gm22-"] },
    { raw: true, from: "W1dNqRVk3:r??o.W1dNqRVk3??`Konuşmacı ol`", to: "W1dNqRVk3:r??o.W1dNqRVk3??`Başvuru`", only: ["Gm22-"] },
    { raw: true, from: "W1dNqRVk3:`Atölye öner`", to: "W1dNqRVk3:`Instagram`", only: ["Gm22-"] },
    { raw: true, from: ">Konuşmacı ol<", to: ">Başvuru<", only: ["/index.html"] },
    { raw: true, from: ">Atölye öner<", to: ">Instagram<", only: ["/index.html"] },
    { raw: true, from: "children:`Kimler`", to: "children:`Başvuru`", only: ["Gm22-"] },
    { raw: true, from: ">Kimler<", to: ">Başvuru<", only: ["/index.html"] },
    { raw: true, from: "children:`Nasıl`", to: "children:`Duyurular`", only: ["Gm22-"] },
    { raw: true, from: ">Nasıl<", to: ">Duyurular<", only: ["/index.html"] },
    ...["İlgi duyan öğrenciler", "Anlatacak konusu olanlar", "Uygulamalı deneyimi olanlar"].map((from) => ({ from, to: "Google Form" })),
    ...["Başvuru bilgisi yakında", "Konu önerini ilet", "Atölye önerini ilet"].map((from) => ({ from, to: "@ktu_nextgendevs" })),
    ...["Sunum deneyimi", "Eğitmenlik deneyimi"].map((from) => ({ from, to: "Atölye, proje ve ekip" })),
    { from: "üye ol, konuşmacı ol", to: "üyelik başvurusu" },
    { from: "Teknik sohbetler, sunumlar ve yazılarla öğrendiklerimizi toplulukla paylaşıyoruz.", to: "Teknik sohbetler ve yazılarla öğrendiklerimizi toplulukla paylaşıyoruz." },
    { from: "Konuşmacı ol", to: "Instagram butonu" }, // leftover layer name
    { raw: true, from: '"link","/#cfp"', to: `"link","${FORM_URL}"`, only: ["/index.html"] },
  ],
  { quiet: true }
);


// ── header “Topluluğa katıl” (small button component)
// (Framer’s router rewrites unknown internal paths to "./", so nav links keep
//  pointing at the home events section; its button links to /etkinlikler/.)
edit(SHARED, (s) => {
  const a = "g(R,{href:_,motionChild:!0,nodeId:`NUCxO2RFS`";
  if (s.includes(a)) s = s.replace(a, "g(R,{href:_,motionChild:!0,openInNewTab:typeof _==`string`&&_.startsWith(`http`),nodeId:`NUCxO2RFS`");
  s = s.split("rTnvJvoG_:`/#cfp`").join(`rTnvJvoG_:\`${FORM_URL}\``);
  return s;
});
edit(HTML, (h) => {
  // header button: <a …href="./"…>…Topluluğa katıl… inside the “closes menu” layer
  h = h.replace(/(data-framer-name="Topluluğa katıl \(closes menu\)"(?:(?!<\/a>).)*?<a [^>]*?)href="\.\/"/gs, `$1href="${FORM_URL}"${TARGET}`);
  return h.split(' target="_blank" rel="noopener" target="_blank"').join(' target="_blank" rel="noopener"');
});
console.log("migration 006 done");
