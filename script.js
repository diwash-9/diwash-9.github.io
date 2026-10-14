/* Archive filter, copy buttons, footer year. */
(function () {
  "use strict";

  var yearEl = document.getElementById("footYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Local time in Kathmandu */
  var timeEl = document.getElementById("localTime");
  function tickClock() {
    if (!timeEl) return;
    try {
      var now = new Date();
      timeEl.textContent = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kathmandu"
      }).format(now) + " NPT";
      timeEl.setAttribute("datetime", now.toISOString());
    } catch (e) { /* leave placeholder */ }
  }
  tickClock();
  setInterval(tickClock, 30000);

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

  /* Press / to jump to archive search */
  document.addEventListener("keydown", function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";
    if (e.key === "/" && !typing) {
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
})();
