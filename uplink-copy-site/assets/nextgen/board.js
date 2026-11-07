// NextGen KTÜ — "Yönetim Kurulu" section on the home page.
//
// Data: /data/board.json → { "members": [{ "name", "role", "photo"? }] }
// An empty list shows a "coming soon" message; no placeholder people.
//
// The Framer page is a hydrated React tree, so this section is added *after*
// hydration as an extra child of <main> (positioned with CSS `order` in
// nextgen.css) and re-added if React ever re-renders <main>.
(function () {
  "use strict";
  var ID = "yonetim-kurulu";
  var section = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeImage(url) {
    return typeof url === "string" && /^(https:\/\/|\/(?!\/))/.test(url) ? url : "";
  }

  function render(members) {
    var el = document.createElement("section");
    el.id = ID;
    el.className = "ng-section ng-board";
    el.setAttribute("aria-labelledby", ID + "-title");
    var body;
    if (members.length) {
      body =
        '<ul class="ng-board__grid">' +
        members
          .map(function (m) {
            var photo = safeImage(m.photo);
            return (
              '<li class="ng-board__card">' +
              '<div class="ng-board__photo">' +
              (photo ? '<img src="' + esc(photo) + '" alt="' + esc(m.name) + '" loading="lazy">' : "") +
              "</div>" +
              '<p class="ng-board__name">' + esc(m.name) + "</p>" +
              '<p class="ng-board__role">' + esc(m.role) + "</p>" +
              "</li>"
            );
          })
          .join("") +
        "</ul>";
    } else {
      body =
        '<div class="ng-board__empty">' +
        '<p class="ng-mono">yakında</p>' +
        "<p>Yönetim kurulu bilgileri yakında paylaşılacak.</p>" +
        "</div>";
    }
    el.innerHTML =
      '<div class="ng-section__grid">' +
      '<div class="ng-section__head">' +
      '<h2 class="ng-section__title" id="' + ID + '-title">yönetim-kurulu/</h2>' +
      '<p class="ng-section__intro">Topluluğu yürüten ekip.</p>' +
      "</div>" +
      body +
      "</div>";
    return el;
  }

  function mount() {
    var main = document.querySelector("main.framer-bahvun");
    if (main && section && !main.contains(section)) main.appendChild(section);
  }

  function start(members) {
    section = render(members);
    mount();
    var root = document.getElementById("main");
    if (root && "MutationObserver" in window) {
      var queued = false;
      new MutationObserver(function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          mount();
        });
      }).observe(root, { childList: true, subtree: true });
    }
  }

  function load() {
    fetch("/data/board.json", { cache: "no-cache" })
      .then(function (r) {
        return r.ok ? r.json() : { members: [] };
      })
      .catch(function () {
        return { members: [] };
      })
      .then(function (d) {
        var list = Array.isArray(d && d.members) ? d.members.filter(function (m) { return m && m.name; }) : [];
        start(list);
      });
  }

  // Wait until Framer has hydrated the page before touching <main>.
  function afterHydration() {
    setTimeout(load, 600);
  }
  if (document.readyState === "complete") afterHydration();
  else window.addEventListener("load", afterHydration);
})();
