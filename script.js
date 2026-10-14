/* Site interactions: clock, archive filter, copy buttons, toy table, previews, palette. */
(function () {
  "use strict";

  /* Kathmandu clock (real, via Intl) */
  var timeEl = document.getElementById("localTime");
  var dateEl = document.getElementById("localDate");
  function tickClock() {
    if (!timeEl) return;
    try {
      var now = new Date();
      timeEl.textContent = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kathmandu"
      }).format(now) + " NPT";
      timeEl.setAttribute("datetime", now.toISOString());
      if (dateEl) {
        dateEl.textContent = new Intl.DateTimeFormat("en-GB", {
          weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kathmandu"
        }).format(now);
      }
    } catch (e) { /* leave placeholder */ }
  }
  tickClock();
  setInterval(tickClock, 30000);

  var yearEl = document.getElementById("footYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Archive: search + filter + count + empty state */
  var search = document.getElementById("archiveSearch");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var rows = Array.prototype.slice.call(document.querySelectorAll("#ledger .ledger-row"));
  var count = document.getElementById("archiveCount");
  var empty = document.getElementById("ledgerEmpty");
  var activeFilter = "all";

  function applyArchive() {
    var q = search ? search.value.trim().toLowerCase() : "";
    var shown = 0;
    rows.forEach(function (row) {
      var kindOk = activeFilter === "all" || row.getAttribute("data-kind") === activeFilter;
      var hay = (row.getAttribute("data-search") || "").toLowerCase();
      var qOk = !q || hay.indexOf(q) !== -1;
      var visible = kindOk && qOk;
      row.classList.toggle("hidden", !visible);
      if (visible) shown += 1;
    });
    if (count) {
      count.textContent = (q || activeFilter !== "all")
        ? shown + " of " + rows.length + " entries"
        : rows.length + " entries";
    }
    if (empty) empty.hidden = shown !== 0;
  }
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
      chip.classList.add("active");
      chip.setAttribute("aria-pressed", "true");
      activeFilter = chip.getAttribute("data-filter");
      applyArchive();
    });
  });
  if (search) search.addEventListener("input", applyArchive);
  var resetBtn = document.getElementById("ledgerReset");
  if (resetBtn) resetBtn.addEventListener("click", function () {
    if (search) search.value = "";
    chips.forEach(function (c) {
      var on = c.getAttribute("data-filter") === "all";
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    activeFilter = "all";
    applyArchive();
    if (search) search.focus();
  });
  applyArchive();

  /* Global keys: / focuses archive search */
  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";
    if (e.key === "/" && !typing && !paletteOpen) {
      e.preventDefault();
      if (search) {
        search.scrollIntoView({ block: "center" });
        search.focus();
      }
    }
  });
  if (search) search.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { search.value = ""; applyArchive(); search.blur(); }
  });

  /* Copy buttons for install commands */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (btn) {
    btn.addEventListener("click", function () {
      var code = document.getElementById(btn.getAttribute("data-copy"));
      if (!code) return;
      var text = code.textContent;
      function done() {
        var old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  });

  /* Toy league table: demonstrates derived standings */
  var TEAMS = ["Boudha FC", "Patan XI", "Thamel Utd", "Chitwan SC"];
  var DEFAULTS = [
    { h: 0, a: 1, hs: 2, as: 1 }, { h: 0, a: 2, hs: 1, as: 1 },
    { h: 0, a: 3, hs: 0, as: 2 }, { h: 1, a: 2, hs: 3, as: 0 },
    { h: 1, a: 3, hs: 2, as: 2 }, { h: 2, a: 3, hs: 1, as: 0 }
  ];
  var fixtures = DEFAULTS.map(function (f) { return { h: f.h, a: f.a, hs: f.hs, as: f.as }; });
  var fxWrap = document.getElementById("toyFixtures");
  var tableBody = document.getElementById("toyTable");

  function computeTable() {
    var t = TEAMS.map(function (name) {
      return { name: name, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
    });
    fixtures.forEach(function (f) {
      var H = t[f.h], A = t[f.a];
      H.p += 1; A.p += 1;
      H.gf += f.hs; H.ga += f.as;
      A.gf += f.as; A.ga += f.hs;
      if (f.hs > f.as) { H.w += 1; A.l += 1; H.pts += 3; }
      else if (f.hs < f.as) { A.w += 1; H.l += 1; A.pts += 3; }
      else { H.d += 1; A.d += 1; H.pts += 1; A.pts += 1; }
    });
    t.forEach(function (r) { r.gd = r.gf - r.ga; });
    t.sort(function (x, y) {
      return (y.pts - x.pts) || (y.gd - x.gd) || (y.gf - x.gf) || (x.name < y.name ? -1 : 1);
    });
    return t;
  }
  function renderToy() {
    if (!fxWrap || !tableBody) return;
    fxWrap.innerHTML = "";
    fixtures.forEach(function (f, i) {
      var div = document.createElement("div");
      div.className = "fixture";
      div.innerHTML =
        '<span class="teams"></span>' +
        '<span class="stepper" data-i="' + i + '" data-side="hs">' +
        '<button type="button" data-d="-1" aria-label="Decrease home goals">-</button>' +
        '<output aria-live="polite">' + f.hs + "</output>" +
        '<button type="button" data-d="1" aria-label="Increase home goals">+</button></span>' +
        '<span aria-hidden="true">:</span>' +
        '<span class="stepper" data-i="' + i + '" data-side="as">' +
        '<button type="button" data-d="-1" aria-label="Decrease away goals">-</button>' +
        '<output aria-live="polite">' + f.as + "</output>" +
        '<button type="button" data-d="1" aria-label="Increase away goals">+</button></span>';
      div.querySelector(".teams").textContent = TEAMS[f.h] + " v " + TEAMS[f.a];
      fxWrap.appendChild(div);
    });
    var rowsHtml = computeTable().map(function (r, idx) {
      return "<tr" + (idx === 0 ? ' class="leader"' : "") + "><td>" + r.name +
        "</td><td>" + r.p + "</td><td>" + r.w + "</td><td>" + r.d + "</td><td>" +
        r.l + "</td><td>" + (r.gd > 0 ? "+" + r.gd : r.gd) + "</td><td><strong>" + r.pts + "</strong></td></tr>";
    }).join("");
    tableBody.innerHTML = rowsHtml;
  }
  if (fxWrap && tableBody) {
    renderToy();
    fxWrap.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-d]");
      if (!btn) return;
      var step = btn.closest(".stepper");
      var i = parseInt(step.getAttribute("data-i"), 10);
      var side = step.getAttribute("data-side");
      var d = parseInt(btn.getAttribute("data-d"), 10);
      fixtures[i][side] = Math.min(9, Math.max(0, fixtures[i][side] + d));
      renderToy();
    });
    var reset = document.getElementById("toyReset");
    if (reset) reset.addEventListener("click", function () {
      fixtures = DEFAULTS.map(function (f) { return { h: f.h, a: f.a, hs: f.hs, as: f.as }; });
      renderToy();
    });
  }

  /* Playlist previews: load the embed only on request */
  Array.prototype.forEach.call(document.querySelectorAll(".playlist"), function (pl) {
    var btn = pl.querySelector("[data-preview]");
    var slot = pl.querySelector(".embed-slot");
    if (!btn || !slot) return;
    var listId = slot.getAttribute("data-playlist");
    var loaded = false;
    btn.addEventListener("click", function () {
      if (!loaded) {
        var frame = document.createElement("div");
        frame.className = "embed-frame";
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/videoseries?list=" + listId + "&rel=0";
        iframe.title = "YouTube playlist preview";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        frame.appendChild(iframe);
        slot.appendChild(frame);
        loaded = true;
        btn.textContent = "Hide preview";
      } else if (slot.style.display === "none") {
        slot.style.display = "";
        btn.textContent = "Hide preview";
      } else {
        slot.style.display = "none";
        btn.textContent = "Preview playlist";
      }
    });
  });

  /* Command palette */
  var palette = document.getElementById("palette");
  var backdrop = document.getElementById("paletteBackdrop");
  var input = document.getElementById("paletteInput");
  var list = document.getElementById("paletteList");
  var openBtn = document.getElementById("paletteOpen");
  var paletteOpen = false;
  var items = [];
  var activeIdx = 0;

  function collectItems() {
    items = [
      { label: "Projects: the main bench", kind: "section", target: "#projects" },
      { label: "Tools for a Linux desktop", kind: "section", target: "#tools" },
      { label: "Archive index", kind: "section", target: "#archive" },
      { label: "Teaching and playlists", kind: "section", target: "#teaching" },
      { label: "About and contact", kind: "section", target: "#about" }
    ];
    Array.prototype.forEach.call(document.querySelectorAll("#ledger .ledger-row"), function (row) {
      var a = row.querySelector("a");
      var name = row.querySelector("strong");
      if (a && name) items.push({ label: name.textContent, kind: "project", href: a.href });
    });
    items.push({ label: "GitHub profile", kind: "link", href: "https://github.com/diwash-9" });
  }
  function renderPalette() {
    var q = input.value.trim().toLowerCase();
    var matches = items.filter(function (it) { return !q || it.label.toLowerCase().indexOf(q) !== -1; });
    list.innerHTML = "";
    activeIdx = 0;
    if (!matches.length) {
      var li = document.createElement("li");
      li.innerHTML = '<button type="button" disabled><span>No matches</span></button>';
      list.appendChild(li);
      return;
    }
    matches.slice(0, 12).forEach(function (it, i) {
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      var b = document.createElement("button");
      b.type = "button";
      if (i === 0) b.classList.add("active");
      var s = document.createElement("span");
      s.textContent = it.label;
      var k = document.createElement("span");
      k.className = "k";
      k.textContent = it.kind;
      b.appendChild(s);
      b.appendChild(k);
      b.addEventListener("click", function () { goTo(it); });
      b.addEventListener("mousemove", function () {
        list.querySelectorAll("button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        activeIdx = i;
      });
      li.appendChild(b);
      li._item = it;
      list.appendChild(li);
    });
  }
  function goTo(it) {
    closePalette();
    if (it.target) {
      var el = document.querySelector(it.target);
      if (el) el.scrollIntoView({ block: "start" });
      if (history.replaceState) history.replaceState(null, "", it.target);
    } else if (it.href) {
      window.open(it.href, "_blank", "noopener");
    }
  }
  function openPalette() {
    collectItems();
    palette.hidden = false;
    backdrop.hidden = false;
    paletteOpen = true;
    input.value = "";
    renderPalette();
    input.focus();
  }
  function closePalette() {
    palette.hidden = true;
    backdrop.hidden = true;
    paletteOpen = false;
    if (openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener("click", openPalette);
  if (backdrop) backdrop.addEventListener("click", closePalette);
  if (input) input.addEventListener("input", renderPalette);
  document.addEventListener("keydown", function (e) {
    var mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (paletteOpen) closePalette(); else openPalette();
      return;
    }
    if (!paletteOpen) return;
    var buttons = list.querySelectorAll("button:not([disabled])");
    if (e.key === "Escape") { e.preventDefault(); closePalette(); }
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIdx = Math.min(buttons.length - 1, activeIdx + 1);
      buttons.forEach(function (b, i) { b.classList.toggle("active", i === activeIdx); });
      if (buttons[activeIdx]) buttons[activeIdx].scrollIntoView({ block: "nearest" });
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIdx = Math.max(0, activeIdx - 1);
      buttons.forEach(function (b, i) { b.classList.toggle("active", i === activeIdx); });
      if (buttons[activeIdx]) buttons[activeIdx].scrollIntoView({ block: "nearest" });
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      var lis = list.querySelectorAll("li");
      var visible = [];
      lis.forEach(function (li) { if (li._item) visible.push(li._item); });
      if (visible[activeIdx]) goTo(visible[activeIdx]);
    }
  });
})();
