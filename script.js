// theme, menu, filters, reveal, year
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var sun = document.getElementById('iconSun');
  var moon = document.getElementById('iconMoon');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('dk-theme', theme); } catch (e) {}
    var dark = theme === 'dark';
    if (sun && moon) { sun.style.display = dark ? 'none' : ''; moon.style.display = dark ? '' : 'none'; }
  }
  var saved = null;
  try { saved = localStorage.getItem('dk-theme'); } catch (e) {}
  if (!saved) {
    saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  apply(saved);
  if (toggle) toggle.addEventListener('click', function () {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // mobile menu
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); });
  });

  // filters
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#projectGrid .mini');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        card.classList.toggle('hidden', f !== 'all' && tags.indexOf(f) === -1);
      });
    });
  });

  // reveal on scroll
  var revealEls = document.querySelectorAll('.card, .mini, .skill-group, .hero-card, .strip-item');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
