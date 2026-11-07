#!/usr/bin/env node
// Migration 001 — turns the Uplink 27 home page into the NextGen KTÜ home page.
//
// Runs once on the pristine export (re-running is harmless: already-replaced
// strings just report MISS). Every visible change is listed here so it can be
// reviewed and adjusted. Placeholder copy is marked with ⟨yakında⟩-style
// wording and listed in README.md → "Beklenen içerikler".
//
//   node tools/migrations/001-nextgen-home.mjs
//
// Order: special regex edits → text/link replacements → images → CSS hook.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { replaceEverywhere } from "../replace-text.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(ROOT, "uplink-copy-site");
const SITE_DIR = join(SITE, "assets/framerusercontent.com/sites/6qKRHPJuOulgF9iphfBqgC");
const HTML = ["index.html", "schedule/index.html", "speakers/index.html"].map((f) => join(SITE, f));
const HOME_HTML = join(SITE, "index.html");
const HOME_MODULE = join(SITE_DIR, "Gm22-tiVP5hHiXTTLEHMLZyeu0I41ZX3vdWfWu9yfbA.Cr_bfCIR.mjs");
const SHARED_MODULE = join(SITE_DIR, "toplevel-deps.DMkW1u5u.mjs"); // header, footer, menu
const HOME_META = join(SITE_DIR, "augiA20Il.DYLFBa-R.mjs");

const HOME = ["/index.html", "Gm22-", "searchIndex"]; // scope for home-only content
const SHARED = ["index.html", "toplevel-deps"]; // header/footer on every page
const edit = (file, fn) => writeFileSync(file, fn(readFileSync(file, "utf8")));
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ─────────────────────────────────────────────────────────────────────────────
// 1. Special edits that plain string replacement can’t express
// ─────────────────────────────────────────────────────────────────────────────

// 1a. Hero wordmark: SSR renders one <span> per character for the text effect.
edit(HOME_HTML, (h) => {
  const word = (oldChars, newChars) =>
    new RegExp(oldChars.map((c) => `<span style="([^"]*)">${reEsc(c)}</span>`).join(""), "g");
  const rebuild = (chars) => (m, style) => chars.map((c) => `<span style="${style}">${c}</span>`).join("");
  h = h.replace(word([..."uplink"]), rebuild([..."nextgen"]));
  h = h.replace(word([..."27"]), rebuild([..."ktü"]));
  return h;
});

// 1b. Quote carousel → community principles. SSR wraps the highlight in <mark>.
const PRINCIPLES = [
  {
    quote: ["The best hallway track of any conference I’ve been to. I left with ", "three collaborators", "."],
    next: ["Öğrenmenin en hızlı yolu, öğrendiğini başkasıyla ", "paylaşmak", "."],
    name: ["Grace Whitman", "Bilgi paylaşımı"],
    role: ["Head of DX, Cobalt Labs", "Atölyeler, sunumlar ve yazılar"],
    meta: ["uplink_26 · day_2 · 16:48", "ilke_01 · paylaş"],
  },
  {
    quote: ["Small enough to talk to anyone, serious enough that everyone is ", "worth talking to", "."],
    next: ["Fikirleri konuşmakla kalmıyor, ", "birlikte koda döküyoruz", "."],
    name: ["Marcus Obi", "Proje üretimi"],
    role: ["Principal engineer, Ledgerly", "Ekip projeleri ve açık kaynak"],
    meta: ["uplink_26 · day_1 · 12:30", "ilke_02 · üret"],
  },
  {
    quote: ["I came for the talks and stayed ", "on the roof until 2am", "."],
    next: ["Burada soru sormak da, hata yapmak da ", "öğrenmenin bir parçası", "."],
    name: ["Sofia Reyes", "Birlikte öğrenme"],
    role: ["Mobile lead, Parcelbox", "Her seviyeden merakla"],
    meta: ["uplink_26 · day_1 · 23:10", "ilke_03 · öğren"],
  },
  {
    quote: ["Gave my ", "first ever talk", " here. The crowd was kind and the questions were sharp."],
    next: ["İyi yazılım, ", "birbirini geliştiren", " insanlarla birlikte yazılır."],
    name: ["Luca Romano", "Topluluk"],
    role: ["Graphics engineer, Halftone", "Akran öğrenmesi ve mentorluk"],
    meta: ["uplink_26 · day_2 · 11:05", "ilke_04 · birlikte"],
  },
];
// Must match the carousel’s own slug helper (patched below to keep Turkish letters).
const slug = (s) => s.trim().toLocaleLowerCase("tr").replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "");

edit(HOME_MODULE, (m) => {
  for (const p of PRINCIPLES) {
    m = m.split(`quote:\`${p.quote.join("")}\``).join(`quote:\`${p.next.join("")}\``);
    m = m.split(`highlight:\`${p.quote[1]}\``).join(`highlight:\`${p.next[1]}\``);
    m = m.split(`name:\`${p.name[0]}\``).join(`name:\`${p.name[1]}\``);
  }
  m = m
    .split("N=e=>(e||``).trim().toLowerCase().replace(/[^a-z0-9]+/g,`_`)")
    .join("N=e=>(e||``).trim().toLocaleLowerCase(`tr`).replace(/[^\\p{L}\\p{N}]+/gu,`_`)");
  m = m.split("children:[`next: `,").join("children:[`sonraki: `,");
  m = m.split("`Next quote, from ${").join("`Sonraki ilke: ${");
  m = m.split("`Show quote from ${").join("`İlkeyi göster: ${");
  m = m.split('"aria-label":`What people said`').join('"aria-label":`Topluluk ilkeleri`');
  return m;
});
edit(HOME_HTML, (h) => {
  for (const p of PRINCIPLES) {
    const [a, hl, z] = p.quote;
    const [na, nhl, nz] = p.next;
    h = h.replace(
      new RegExp(`${reEsc(a)}(<mark[^>]*>)${reEsc(hl)}(</mark>(?:<!-- -->)?)${reEsc(z)}`, "g"),
      `${na}$1${nhl}$2${nz}`
    );
    h = h.replace(new RegExp(`>${reEsc(p.name[0])}(</p><p [^>]*>)${reEsc(p.role[0])}<`, "g"), `>${p.name[1]}$1${p.role[1]}<`);
    h = h.split(`Show quote from ${p.name[0]}`).join(`İlkeyi göster: ${p.name[1]}`);
    h = h.split(`Next quote, from ${p.name[0]}`).join(`Sonraki ilke: ${p.name[1]}`);
    h = h.split(`<!-- -->${slug(p.name[0])}`).join(`<!-- -->${slug(p.name[1])}`);
  }
  h = h.split("next: <!-- -->").join("sonraki: <!-- -->");
  h = h.split('aria-label="What people said"').join('aria-label="Topluluk ilkeleri"');
  return h;
});

// 1c. Footer gets an anchor so "iletişim" links have somewhere to go.
edit(HOME_MODULE, (m) =>
  m.includes("id:`iletisim`") ? m : m.replace("className:`framer-qir085-container`", "className:`framer-qir085-container`,id:`iletisim`")
);
edit(HOME_HTML, (h) =>
  h.includes('id="iletisim"') ? h : h.replace('class="framer-qir085-container"', 'class="framer-qir085-container" id="iletisim"')
);

// 1d. <html lang>, favicon (template logo) and social image (template artwork).
for (const f of HTML)
  edit(f, (h) =>
    h
      .replace('<html dir="ltr">', '<html lang="tr" dir="ltr">')
      .replace(/<link href="[^"]*btPNyXOE58vjiGgznYb05Z1S4c\.png" rel="icon"[^>]*>/g, "")
      .replace(/<link rel="apple-touch-icon" href="[^"]*">/g, "")
      .replace(/<meta (property|name)="(og|twitter):image" content="[^"]*">/g, "")
  );

// ─────────────────────────────────────────────────────────────────────────────
// 2. Text and link replacements (longest/most specific first)
// ─────────────────────────────────────────────────────────────────────────────
const raw = (from, to, only) => ({ from, to, raw: true, only });
const homeRaw = (from, to) => raw(from, to, HOME);
const cmsField = (from, to) => [raw(`"${from}"`, `"${to}"`, ["/index.html"]), raw(`>${from}<`, `>${to}<`, ["/index.html"])];

const TITLE = "NextGen KTÜ · Yazılım Öğrenci Topluluğu";
const DESC =
  "NextGen KTÜ, Karadeniz Teknik Üniversitesi bünyesinde yazılım alanında gelişmeyi, teknik bilgi paylaşımını ve proje üretimini destekleyen bir öğrenci topluluğudur.";

const pairs = [
  // ── meta
  { from: "Uplink 27 · Tech Conference Framer Template", to: TITLE, only: ["/index.html", "augiA20Il"] },
  {
    from: "Launch your tech or developer conference with Uplink 27: speakers, a two-day agenda, tickets, venue map, sponsors and a searchable FAQ, all in the CMS.",
    to: DESC,
    only: ["/index.html", "augiA20Il"],
  },

  // ── links (Framer link objects in modules, then SSR hrefs)
  raw("href:{hash:`:AaMBWUyAx`,webPageId:`augiA20Il`}", "href:{hash:`:UFV6Ay0rB`,webPageId:`augiA20Il`}", ["toplevel-deps"]), // footer “Tickets” → katıl
  raw("href:{webPageId:`QpehGXTBr`}", "href:{hash:`:AaMBWUyAx`,webPageId:`augiA20Il`}", ["toplevel-deps", "Gm22-"]), // /speakers → #tickets (faaliyetler)
  raw("href:{webPageId:`SaXUtSxbU`}", "href:{hash:`:UPRsC1RTT`,webPageId:`augiA20Il`}", ["toplevel-deps", "Gm22-"]), // /schedule → #lineup (etkinlikler)
  raw("href:{webPageId:`eUp2jMXoI`}", "href:`/#iletisim`", ["toplevel-deps", "Gm22-"]), // /contact → footer
  raw("href:{hash:`:Put9dMGWG`,webPageId:`augiA20Il`}", "href:`/#iletisim`", ["toplevel-deps"]), // menu/footer FAQ → footer
  { from: "https://framer.link/MW9jfeL", to: "/#cfp" }, // “Get tickets” etc. → katıl
  raw('href="speakers/"', 'href="./#tickets"', ["/index.html"]),
  raw('href="schedule/"', 'href="./#lineup"', ["/index.html"]),
  raw('href="contact/"', 'href="./#iletisim"', ["/index.html"]),
  {
    from: "https://www.google.com/maps/dir/?api=1&destination=38.7369,-9.1018",
    to: "https://www.google.com/maps/search/?api=1&query=Karadeniz+Teknik+%C3%9Cniversitesi+Trabzon",
  },

  // ── header & menu (shared)
  raw("children:`Uplink`", "children:`NextGen Developers`", ["toplevel-deps"]),
  raw(">Uplink</h4>", ">NextGen Developers</h4>"),
  raw("children:`27`", "children:`KTÜ`", ["toplevel-deps"]),
  raw(">27</p>", ">KTÜ</p>"),
  { from: "Uplink home", to: "NextGen Developers ana sayfa" },
  { from: "88 seats left", to: "öğrenci topluluğu" },
  raw("children:`menu`", "children:`menü`", ["toplevel-deps"]),
  raw(">menu</p>", ">menü</p>"),
  raw("children:`close`", "children:`kapat`", ["toplevel-deps"]),
  raw(">close</p>", ">kapat</p>"),
  { from: "Get tickets", to: "Topluluğa katıl" },
  { from: "38 speakers · 3 tracks", to: "öğren · üret · paylaş", only: SHARED },
  { from: "2 days · 2 rooms", to: "atölyeler ve buluşmalar", only: SHARED },
  { from: "submissions close mar 14", to: "üye ol, konuşmacı ol", only: SHARED },
  { from: "we reply within a day", to: "sosyal medya ve e-posta", only: SHARED },
  { from: "jun 18–19 · lisbon", to: "ktü · trabzon", only: SHARED },
  raw("children:`speakers/`", "children:`faaliyetler/`", ["toplevel-deps"]),
  raw(">speakers/<", ">faaliyetler/<"),
  raw("children:`schedule/`", "children:`etkinlikler/`", ["toplevel-deps"]),
  raw(">schedule/<", ">etkinlikler/<"),
  raw("children:`contact/`", "children:`iletişim/`", ["toplevel-deps"]),
  raw(">contact/<", ">iletişim/<"),
  raw("MKJDOgrbq:`speakers/`", "MKJDOgrbq:`faaliyetler/`", ["toplevel-deps"]), // menu item label prop
  raw("MKJDOgrbq:`schedule/`", "MKJDOgrbq:`etkinlikler/`", ["toplevel-deps"]),
  raw("MKJDOgrbq:`contact/`", "MKJDOgrbq:`iletişim/`", ["toplevel-deps"]),
  raw("children:`venue`", "children:`kampüs`", ["toplevel-deps"]),
  raw("children:`faq`", "children:`iletişim`", ["toplevel-deps"]),

  // ── footer (shared)
  { from: "© 2027 Uplink · made in Lisbon", to: "© 2026 NextGen Developers · KTÜ, Trabzon" },
  { from: "lisbon · jun 18–19, 2027", to: "trabzon · karadeniz teknik üniversitesi" },
  raw("children:`event/`", "children:`keşfet/`", ["toplevel-deps"]),
  raw(">event/<", ">keşfet/<"),
  raw("children:`take part/`", "children:`katıl/`", ["toplevel-deps"]),
  raw(">take part/<", ">katıl/<"),
  raw("children:`about/`", "children:`iletişim/`", ["toplevel-deps"]),
  raw(">about/<", ">iletişim/<"),
  raw("children:`Speakers`", "children:`Faaliyetler`", ["toplevel-deps"]),
  raw(">Speakers<", ">Faaliyetler<"),
  raw("children:`Schedule`", "children:`Etkinlikler`", ["toplevel-deps"]),
  raw(">Schedule<", ">Etkinlikler<"),
  raw("children:`Venue`", "children:`Kampüs`", ["toplevel-deps"]),
  raw(">Venue<", ">Kampüs<"),
  raw("children:`Tickets`", "children:`Üye ol`", ["toplevel-deps"]),
  raw(">Tickets<", ">Üye ol<"),
  raw("children:`Call for papers`", "children:`Konuşmacı ol`", ["toplevel-deps"]),
  raw(">Call for papers<", ">Konuşmacı ol<"),
  raw("children:`Sponsor`", "children:`Projeler`", ["toplevel-deps"]),
  raw(">Sponsor<", ">Projeler<"),
  raw("children:`FAQ`", "children:`Sosyal medya`", ["toplevel-deps"]),
  raw(">FAQ<", ">Sosyal medya<"),
  raw("children:`Contact`", "children:`E-posta`", ["toplevel-deps"]),
  raw(">Contact<", ">E-posta<"),
  raw("text:`uplink`", "text:`nextgen`", ["toplevel-deps"]), // striped footer wordmark
  raw(">uplink</span>", ">nextgen</span>"),
  { from: "Uplink 27", to: "NextGen KTÜ", only: SHARED.concat("Gm22-") }, // aria labels

  // ── hero
  homeRaw("children:`uplink`", "children:`nextgen`"),
  homeRaw("children:`27`", "children:`ktü`"),
  homeRaw("`08–09 october / lisbon, pt`", "`karadeniz teknik üniversitesi`"),
  raw("08–09 october / lisbon, pt", "karadeniz teknik üniversitesi", ["/index.html"]),
  { from: "in-person & streamed", to: "trabzon · yazılım topluluğu", only: HOME },
  { from: "tickets-on-sale/", to: "topluluğa-katıl/", only: HOME },
  {
    from: "A two-day developer conference in Lisbon, with forty talks from the people who build the tools you use.",
    to: "Karadeniz Teknik Üniversitesi’nde yazılım alanında gelişmeyi, bilgi paylaşımını ve proje üretimini destekleyen öğrenci topluluğu.",
    only: HOME,
  },
  { from: "on_stage/", to: "odak_alanları/", only: HOME },
  { from: "40 speakers · 2 days", to: "öğren · üret · paylaş", only: HOME },

  // ── CMS rows shared by the hero bars and the lineup (12 items)
  ...[
    ["Theo Grant", "Atölyeler", "Edge runtimes, honestly", "Uygulamalı eğitim oturumları"],
    ["Sofia Reyes", "Teknik sohbetler", "Fast apps on slow phones", "Kısa sunum, bol soru"],
    ["Marcus Obi", "Proje günleri", "Consensus, explained slowly", "Fikirden koda, ekiple"],
    ["Grace Whitman", "Hackathonlar", "Docs are the product", "Sıfırdan çalışan bir ürün"],
    ["Luca Romano", "Kod incelemeleri", "WebGPU from scratch", "Birbirimizin kodundan"],
    ["Viktor Hale", "Buluşmalar", "Running out of nines", "Tanışma ve sohbet"],
    ["Ella Moreau", "Web geliştirme", "Design systems that ship", "Frontend, backend ve full-stack"],
    ["Adrian Cruz", "Mobil", "A compiler you can read", "iOS, Android ve çapraz platform"],
    ["Hannah Cole", "Yapay zekâ", "Types as documentation", "Makine öğrenmesi ve veri"],
    ["Finn Becker", "Siber güvenlik", "Local-first, for real", "Güvenli kod ve ağ temelleri"],
    ["Leyla Kaya", "Oyun geliştirme", "Breaking things for a living", "Oyun motorları ve grafik"],
    ["Owen Pierce", "Açık kaynak", "Tools that disappear", "Ortak projelere katkı"],
  ].flatMap(([n, nn, t, nt]) => [
    { from: `${n}, ${t}`, to: `${nn}, ${nt}`, only: HOME }, // aria-labels
    { from: t, to: nt, only: HOME },
    { from: n, to: nn, only: HOME },
  ]),
  ...["09:30", "10:15", "11:00", "11:45", "13:30", "14:15"].flatMap((t) => cmsField(t, "yakında")),
  homeRaw("children:`10:15`", "children:`yakında`"),

  // ── lineup → etkinlikler
  { from: "lineup/", to: "etkinlikler/", only: HOME },
  {
    from: "Read it like a running order. One line per talk, and every line is a sentence.",
    to: "Atölyeler, teknik sohbetler ve proje günleri. Tarihler netleştikçe burada duyurulacak.",
    only: HOME,
  },
  { from: "sorted by time", to: "tarihler yakında", only: HOME },
  { from: "Full schedule", to: "Haberdar ol", only: HOME },

  // ── tickets → faaliyetler (CMS rows live in the hydration JSON)
  { from: "save-your-seat/", to: "faaliyetler/", only: HOME },
  {
    from: "Two ways to be there. Early bird ends 31 March, or when the first 400 seats are gone.",
    to: "Topluluk üç şey etrafında şekilleniyor: öğrenmek, üretmek ve paylaşmak.",
    only: HOME,
  },
  ...cmsField("in-person/", "öğren/"),
  ...cmsField("selling fast", "atölyeler"),
  {
    from: "Two days in Lisbon with the talks, the workshops and the people behind them.",
    to: "Uygulamalı eğitimler ve atölyelerle temelden ileri seviyeye birlikte öğreniyoruz.",
    only: HOME,
  },
  ...cmsField("€349", "01"),
  ...cmsField("early bird · then €449", "eğitim · atölye · mentorluk"),
  { from: "Get your pass", to: "Topluluğa katıl", only: HOME },
  { from: "All 40 talks across three rooms", to: "Web geliştirme: frontend, backend, full-stack", only: HOME },
  { from: "12 hands-on workshops, 30 seats each", to: "Mobil uygulama geliştirme", only: HOME },
  { from: "15-minute office hours with any speaker", to: "Yapay zekâ ve veri bilimi", only: HOME },
  { from: "Both rooftop nights over the Tejo", to: "Siber güvenlik", only: HOME },
  { from: "Lunch, coffee and the good snacks", to: "Oyun geliştirme", only: HOME },
  { from: "A badge you can program", to: "Bulut ve DevOps", only: HOME },
  { from: "Recordings of every talk", to: "Kod incelemesi ve mentorluk", only: HOME },
  ...cmsField("online/", "üret/"),
  {
    from: "Watch the main hall live, ask questions in the chat and get every recording.",
    to: "Fikirleri ekip hâlinde gerçek projelere dönüştürüyor, kodu birlikte yazıp yayınlıyoruz.",
    only: HOME,
  },
  ...cmsField("free", "02"),
  ...cmsField("register to get the stream link", "proje · açık kaynak · ekip"),
  { from: "Save your online seat", to: "Projelere katıl", only: HOME },
  { from: "Live stream of the main hall", to: "Ekip projeleri ve hackathonlar", only: HOME },
  { from: "Chat with speakers after each talk", to: "Açık kaynak katkıları", only: HOME },
  { from: "What’s included", to: "Odak alanları", only: HOME },
  { from: "convince_your_boss", to: "paylaş", only: HOME },
  { from: "get-approval/", to: "paylaş/", only: HOME },
  {
    from: "A ready-to-send email with the agenda, the cost and what your team gets back. Edit two lines and hit send.",
    to: "Teknik sohbetler, sunumlar ve yazılarla öğrendiklerimizi toplulukla paylaşıyoruz.",
    only: HOME,
  },
  { from: "Download the template", to: "Konuşmacı ol", only: HOME },

  // ── venue → kampüs & galeri
  { from: "venue/", to: "kampüs/", only: HOME },
  {
    from: "Hub Criativo do Beato, a converted warehouse on the river in east Lisbon. The rooftop party is upstairs.",
    to: "Karadeniz Teknik Üniversitesi, Kanuni Kampüsü — Trabzon. Etkinlik fotoğrafları bu alanda paylaşılacak.",
    only: HOME,
  },
  { from: "talks + workshops · 08:30", to: "galeri · yakında", only: HOME },
  { from: "rooftop · 19:30", to: "galeri · yakında", only: HOME },
  { from: "Hub Criativo do Beato", to: "Etkinlik fotoğrafları", only: HOME },
  { from: "rua da manutenção 71", to: "İlk etkinlikten sonra eklenecek", only: HOME },
  { from: "The Roof at Beato", to: "Topluluk kareleri", only: HOME },
  { from: "same building, top floor", to: "Atölye ve buluşmalardan", only: HOME },
  { from: "from the airport", to: "şehir", only: HOME },
  { from: "20 min by metro", to: "Trabzon", only: HOME },
  { from: "from the city centre", to: "kampüs", only: HOME },
  { from: "12 min by tram 15", to: "Kanuni Kampüsü", only: HOME },
  homeRaw("children:`doors`", "children:`buluşmalar`"),
  raw(">doors<", ">buluşmalar<", ["/index.html"]),
  { from: "08:30 both days", to: "Takvim yakında", only: HOME },
  homeRaw("children:`capacity`", "children:`iletişim`"),
  raw(">capacity<", ">iletişim<", ["/index.html"]),
  { from: "1,200 · step-free", to: "Sosyal medya hesapları yakında", only: HOME },
  { from: "Map of the venue", to: "KTÜ Kanuni Kampüsü haritası", only: HOME },
  homeRaw("lat:38.7369,layoutId:`c0oHVby5c`,lon:-9.1018,mapStyle:`night`", "lat:40.9936,layoutId:`c0oHVby5c`,lon:39.774,mapStyle:`positron`"),

  // ── last year → yaklaşım (quotes handled in step 1b)
  { from: "why-come/", to: "yaklaşım/", only: HOME },
  { from: "People who came last year, in their own words.", to: "Topluluğu bir arada tutan ilkeler.", only: HOME },
  ...PRINCIPLES.flatMap((p) => [
    { from: p.role[0], to: p.role[1], only: HOME },
    { from: p.meta[0], to: p.meta[1], only: HOME },
  ]),
  ...[
    ["1,100", "öğren", "people came", "atölye ve eğitimlerle"],
    ["38", "üret", "talks, all recorded", "ekip projeleriyle"],
    ["94%", "paylaş", "would come back", "sohbet ve sunumlarla"],
    ["31", "büyü", "countries", "birlikte, her dönem"],
  ].flatMap(([a, b, c, d]) => [homeRaw(`children:\`${a}\``, `children:\`${b}\``), raw(`>${a}<`, `>${b}<`, ["/index.html"]), { from: c, to: d, only: HOME }]),

  // ── sponsors → projeler
  { from: "backed-by/", to: "projeler/", only: HOME },
  { from: "The companies that make NextGen KTÜ possible.", to: "Üyelerimizin geliştirdiği projeler. İlk projeler eklendikçe burada yer alacak.", only: HOME },
  { from: "Become a sponsor", to: "Projeni ekle", only: HOME },
  ...[
    ["Northbeam", "Main stage, both days"],
    ["Cobalt", "Live captions for every talk"],
    ["Ledgerly", "Coffee bar, day 1"],
    ["Halftone", "Workshop: shaders 101"],
    ["Parcelbox", "Lanyards and the after party"],
    ["Tessellate", "Scholarship tickets ×20"],
    ["Quarry", "Hack night pizza"],
    ["Kitebase", "Quiet room"],
    ["Ordinal", "Venue Wi-Fi"],
    ["Fieldnote", "Notebooks for everyone"],
    ["Lumen", "Stage lighting"],
    ["Driftwood", "Late bus home"],
  ].flatMap(([name, note], i) => [
    { from: note, to: "Proje açıklaması yakında", only: HOME },
    ...cmsField(name, `proje_${String(i + 1).padStart(2, "0")}`),
    raw(`alt="${name}"`, `alt="proje_${String(i + 1).padStart(2, "0")}"`, ["/index.html"]),
  ]),
  ...cmsField("headline", "öne çıkan"),
  ...cmsField("partner", "ekip projesi"),
  ...cmsField("partners", "ekip projeleri"),
  ...cmsField("community", "bireysel"),
  homeRaw("children:`headline`", "children:`öne çıkan`"),
  homeRaw("children:`partner`", "children:`ekip projesi`"),
  homeRaw("children:`partners`", "children:`ekip projeleri`"),
  homeRaw("children:`community`", "children:`bireysel`"),

  // ── call for papers → katıl
  { from: "call-for-papers/", to: "katıl/" },
  {
    from: "We’re looking for 38 talks. First-time speakers are very welcome.",
    to: "NextGen KTÜ’ye katılmanın birden fazla yolu var. Sana uygun olanı seç.",
    only: HOME,
  },
  homeRaw("W1dNqRVk3:`Lightning`", "W1dNqRVk3:`Üye ol`"),
  homeRaw("XutbGnj3f:`5 min`", "XutbGnj3f:`01`"),
  homeRaw("W1dNqRVk3:`Talk`", "W1dNqRVk3:`Konuşmacı ol`"),
  homeRaw("XutbGnj3f:`25 min`", "XutbGnj3f:`02`"),
  homeRaw("W1dNqRVk3:`Workshop`", "W1dNqRVk3:`Atölye öner`"),
  homeRaw("XutbGnj3f:`2 h`", "XutbGnj3f:`03`"),
  homeRaw("W1dNqRVk3:r??o.W1dNqRVk3??`Talk`", "W1dNqRVk3:r??o.W1dNqRVk3??`Konuşmacı ol`"),
  homeRaw("XutbGnj3f:i??o.XutbGnj3f??`25 min`", "XutbGnj3f:i??o.XutbGnj3f??`02`"),
  ...[
    ["Lightning", "Üye ol"],
    ["Talk", "Konuşmacı ol"],
    ["Workshop", "Atölye öner"],
    ["5 min", "01"],
    ["25 min", "02"],
    ["2 h", "03"],
  ].map(([a, b]) => raw(`>${a}<`, `>${b}<`, ["/index.html"])),
  { from: "One idea, one demo, five minutes. A great first talk.", to: "Etkinliklerden haberdar ol, atölyelere katıl, projelerde yer al.", only: HOME },
  { from: "The main stage. Show what you learned the hard way.", to: "Öğrendiğin bir konuyu toplulukla kısa bir sunumla paylaş.", only: HOME },
  { from: "Hands-on, 30 seats, laptops open. Teach the thing you know best.", to: "En iyi bildiğin konuyu uygulamalı bir atölyeye dönüştür.", only: HOME },
  homeRaw("children:`Length`", "children:`Kimler`"),
  raw(">Length<", ">Kimler<", ["/index.html"]),
  homeRaw("children:`Slots`", "children:`Nasıl`"),
  raw(">Slots<", ">Nasıl<", ["/index.html"]),
  homeRaw("children:`You get`", "children:`Kazanım`"),
  raw(">You get<", ">Kazanım<", ["/index.html"]),
  { from: "5 minutes, no questions", to: "İlgi duyan öğrenciler", only: HOME },
  { from: "8 on day one", to: "Başvuru bilgisi yakında", only: HOME },
  { from: "Ticket, coaching, recording", to: "Atölye, proje ve ekip", only: HOME },
  { from: "25 minutes + 5 for questions", to: "Anlatacak konusu olanlar", only: HOME },
  { from: "24 across two days", to: "Konu önerini ilet", only: HOME },
  { from: "Travel, hotel, ticket, coaching", to: "Sunum deneyimi", only: HOME },
  { from: "2 hours, hands-on", to: "Uygulamalı deneyimi olanlar", only: HOME },
  { from: "6 rooms on day two", to: "Atölye önerini ilet", only: HOME },
  { from: "Travel, hotel, ticket, workshop fee", to: "Eğitmenlik deneyimi", only: HOME },
  { from: "Submit a lightning talk", to: "Üyelik bilgisi yakında", only: HOME },
  { from: "Submit a 25-min talk", to: "Konu öner", only: HOME },
  { from: "Propose a workshop", to: "Atölye öner", only: HOME },
  { from: "submissions close mar 14, 23:59 cet", to: "başvuru takvimi yakında", only: HOME },
];
replaceEverywhere(pairs, { quiet: true });

// ─────────────────────────────────────────────────────────────────────────────
// 3. Images: template stock photos / fictional logos → neutral placeholders
// ─────────────────────────────────────────────────────────────────────────────
const P = "/assets/nextgen/placeholders/";
const IMAGES = {
  // CMS speaker portraits → activity/event tiles
  v34hGNZCOzm5ogaaOcq73k49Jhw: "tile-braces", "62C3tPkg0Akp8vOVEFGW9ryIYs": "tile-tag",
  TdGBTYFsm7v7IxM99FUC194BifA: "tile-dots", FprOQVirBCxwd9srnzBF9wgnEs: "tile-stripes",
  NYt9kobyNBPN69YOxrturUGZAbc: "tile-rings", QVUcLbchER4o2jCyNWIZvHH6Lo: "tile-binary",
  sMzYYbaNDfYk3tYI4EDVr1t2A: "tile-tag", W2QtAO9Mx8zzwFrMNwVBlgzJU: "tile-braces",
  Q6Npz4EXqtEO6uRdAHqiKIbs: "tile-dots", aSluGDwaoELLZvQFLgtrr9yQdjQ: "tile-stripes",
  KihaD5QIoy3pUQUPCrPOWUZj9JI: "tile-binary", Z3jA3VhM3nGO62dLeA0vkXG9Wlc: "tile-rings",
  // venue photos → gallery placeholders
  ntOSEy2PaQAhGyaDxX14cltsbqQ: "photo-gallery-1", tHFbEmokcVFPYO2gBLfqxJSTPqU: "photo-gallery-2",
  // fictional sponsor logos → project labels
  "4MSC81hTRNvgIZnq2FRh7qSb4k": "project-01", kW8wpQGSf2UoucIl9HQa3SDKQ: "project-02",
  JUW3bctjrH1pFaStTcCMIjPJKo: "project-03", "86uf3UpgD4o1j7j8M1Pnbi9ZRAE": "project-04",
  iRsYonTL0uHlfzv9i86C56wAl2U: "project-05", W8nmI36vFSYJRHaTFKaJdrAubY: "project-06",
  mZExpkU9P0NNwO8uLpOBL45w: "project-07", CzZ9SHXvw0esp7i766pPym8IbMg: "project-08",
  zAuAYTuBKAxliFrwcITZsZCzvc: "project-09", BLLByekf2L2XFx1JZBMUO7ozGHM: "project-10",
  RUFcVT2Ia5zCQt9gaPC15fXVW5M: "project-11", tJ33hXTtXywWKd3Hzeq053fQTw: "project-12",
};
for (const f of [HOME_HTML, HOME_MODULE])
  edit(f, (s) => {
    for (const [id, name] of Object.entries(IMAGES))
      s = s.replace(
        new RegExp(`(?:https://framerusercontent\\.com/|(?:\\.\\./)?assets/framerusercontent\\.com/)images/${id}[^"'\\s,\`]*`, "g"),
        `${P}${name}.svg`
      );
    return s;
  });

// ─────────────────────────────────────────────────────────────────────────────
// 4. NextGen stylesheet hook (section order, hidden template-only parts)
// ─────────────────────────────────────────────────────────────────────────────
const LINK = '<link rel="stylesheet" href="/assets/nextgen/nextgen.css">';
for (const f of HTML) edit(f, (h) => (h.includes(LINK) ? h : h.replace("</head>", `${LINK}</head>`)));

console.log("migration 001 done");
