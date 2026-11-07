// NextGen KTÜ — /etkinlikler/ renderer.
// Data: /data/events.json (see README → "Etkinlik ekleme").
(function () {
  "use strict";
  var root = document.getElementById("events");
  var INSTAGRAM = "https://www.instagram.com/ktu_nextgendevs/";
  var LABEL = { "basvuru-acik": "Başvurular açık", yaklasan: "Yaklaşan", tamamlandi: "Tamamlandı" };
  var BADGE = { "basvuru-acik": "badge--open", yaklasan: "badge--soon", tamamlandi: "badge--done" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function isUrl(u) {
    return typeof u === "string" && /^https?:\/\/[^\s]+$/.test(u.trim());
  }
  function parse(e) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e.date || "");
    if (!m) return null;
    var t = /^(\d{1,2}):(\d{2})$/.exec(e.time || "");
    var d = new Date(+m[1], +m[2] - 1, +m[3], t ? +t[1] : 23, t ? +t[2] : 59);
    return isNaN(d) ? null : d;
  }
  var fmtDate = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  var fmtDay = new Intl.DateTimeFormat("tr-TR", { weekday: "long" });

  function card(e) {
    var when = e._date
      ? '<span class="event__date">' + esc(fmtDate.format(e._date)) + "</span>" +
        '<span class="mono">' + esc(fmtDay.format(e._date)) + (e.time ? " · " + esc(e.time) : "") + "</span>"
      : '<span class="event__date">Tarih yakında</span>';
    var where = e.online ? "Çevrim içi" + (e.location ? " · " + esc(e.location) : "") : esc(e.location || "Konum yakında");
    var cta =
      e._status !== "tamamlandi" && isUrl(e.applyUrl)
        ? '<a class="btn event__cta" href="' + esc(e.applyUrl.trim()) + '" target="_blank" rel="noopener">Başvur <span aria-hidden="true">↗</span></a>'
        : "";
    return (
      '<article class="event' + (e._status === "tamamlandi" ? " event--done" : "") + '">' +
      '<div class="event__when">' + when + "</div>" +
      "<div>" +
      '<span class="badge ' + BADGE[e._status] + '">' + LABEL[e._status] + "</span>" +
      '<h3 class="event__title">' + esc(e.title) + "</h3>" +
      (e.description ? '<p class="event__desc">' + esc(e.description) + "</p>" : "") +
      '<p class="event__where mono">' + where + "</p>" +
      "</div>" +
      cta +
      "</article>"
    );
  }

  function render(list) {
    var now = new Date();
    var items = list
      .filter(function (e) { return e && e.title; })
      .map(function (e) {
        var d = parse(e);
        var s = LABEL[e.status] ? e.status : "yaklasan";
        if (d && d < now) s = "tamamlandi"; // past events move to "Tamamlandı"
        return Object.assign({}, e, { _date: d, _status: s });
      });
    var upcoming = items
      .filter(function (e) { return e._status !== "tamamlandi"; })
      .sort(function (a, b) { return (a._date || Infinity) - (b._date || Infinity); });
    var past = items
      .filter(function (e) { return e._status === "tamamlandi"; })
      .sort(function (a, b) { return (b._date || 0) - (a._date || 0); });

    var html = '<h2>yaklaşan etkinlikler</h2>';
    html += upcoming.length
      ? upcoming.map(card).join("")
      : '<div class="empty"><p class="mono">şu an duyurulmuş etkinlik yok</p>' +
        '<p class="big">Yeni etkinlikler duyurulduğunda burada listelenecek.</p>' +
        '<a class="btn" href="' + INSTAGRAM + '" target="_blank" rel="noopener">Duyurular için Instagram <span aria-hidden="true">↗</span></a></div>';
    if (past.length) html += "<h2>tamamlanan etkinlikler</h2>" + past.map(card).join("");
    root.innerHTML = html;
    root.setAttribute("aria-busy", "false");
  }

  fetch("/data/events.json", { cache: "no-cache" })
    .then(function (r) { return r.ok ? r.json() : { events: [] }; })
    .catch(function () { return { events: [] }; })
    .then(function (d) { render(Array.isArray(d && d.events) ? d.events : []); });
})();
