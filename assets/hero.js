/* Hero: revelação do nome por letra, cargo que gira, números que sobem
   e a malha de pontos reagindo ao cursor. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.22,.61,.36,1)';

  /* ---------- 1. nome letra a letra ---------- */
  function split(line) {
    var out = [];
    Array.prototype.slice.call(line.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split('').forEach(function (c) {
          var s = document.createElement('span');
          s.className = 'ch';
          s.textContent = c === ' ' ? ' ' : c;
          out.push(s);
        });
      } else {
        var w = document.createElement('span');
        w.className = 'ch';
        w.appendChild(node.cloneNode(true));
        out.push(w);
      }
    });
    line.textContent = '';
    out.forEach(function (s) { line.appendChild(s); });
    return out;
  }

  function revealName() {
    var lines = document.querySelectorAll('.hero-name [data-split]');
    if (!lines.length) return;
    var chars = [];
    Array.prototype.forEach.call(lines, function (l) { chars = chars.concat(split(l)); });
    if (reduce) return;

    chars.forEach(function (c) {
      c.style.transform = 'translateY(108%)';
      c.style.opacity = '0';
    });
    setTimeout(function () {
      chars.forEach(function (c, i) {
        var d = (i * 40) + 'ms';
        c.style.transition = 'transform .78s ' + EASE + ' ' + d + ', opacity .5s ease ' + d;
        c.style.transform = '';
        c.style.opacity = '';
      });
      setTimeout(function () {
        chars.forEach(function (c) { c.style.transition = ''; c.style.willChange = ''; });
      }, chars.length * 40 + 900);
    }, 420);
  }

  /* ---------- 2. cargo que se troca sozinho ---------- */
  function roles() {
    var src = document.querySelector('[data-roles]');
    var word = document.querySelector('.hero-role__word');
    var slot = document.querySelector('.hero-role__slot');
    if (!src || !word || !slot) return;

    var list = [], widths = [], i = 0, timer = null;

    /* mede cada palavra fora da tela para poder animar a largura do slot */
    function measure() {
      var ghost = word.cloneNode(false);
      ghost.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;width:auto';
      slot.appendChild(ghost);
      widths = list.map(function (w) { ghost.textContent = w; return ghost.offsetWidth; });
      slot.removeChild(ghost);
      slot.style.width = (widths[i] || 0) + 'px';
    }

    function read() {
      var next = src.textContent.split('|').map(function (t) { return t.trim(); }).filter(Boolean);
      if (!next.length) return;
      list = next;
      i = 0;
      word.textContent = list[0];
      measure();
    }

    read();
    new MutationObserver(read).observe(src, { childList: true, characterData: true, subtree: true });
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if (reduce || list.length < 2) return;

    function tick() {
      i = (i + 1) % list.length;
      var next = list[i];
      /* a largura acompanha a troca, então o badge desliza em vez de saltar */
      slot.style.width = (widths[i] || slot.offsetWidth) + 'px';
      word.style.transition = 'transform .38s ease-in, opacity .38s ease-in';
      word.style.transform = 'translateY(-110%)';
      word.style.opacity = '0';
      setTimeout(function () {
        word.textContent = next;
        word.style.transition = 'none';
        word.style.transform = 'translateY(110%)';
        requestAnimationFrame(function () {
          word.style.transition = 'transform .55s ' + EASE + ', opacity .45s ease';
          word.style.transform = '';
          word.style.opacity = '';
        });
      }, 380);
    }

    function start() { clearInterval(timer); timer = setInterval(tick, 2800); }
    start();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else start();
    });
  }

  /* ---------- 3. números que sobem ---------- */
  function counters() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!els.length || reduce) return;

    /* zera antes de qualquer coisa aparecer, para não mostrar o valor final e voltar */
    var jobs = [];
    els.forEach(function (el) {
      var raw = el.textContent;
      var m = raw.match(/\d+/);
      if (!m) return;
      var target = parseInt(m[0], 10);
      var from = target > 1000 ? target - 12 : 0;
      el.textContent = raw.replace(m[0], from);
      jobs.push({ el: el, raw: raw, token: m[0], target: target, from: from });
    });
    if (!jobs.length) return;

    function run(job) {
      var t0 = null, dur = 1100;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        var v = Math.round(job.from + (job.target - job.from) * e);
        job.el.textContent = p < 1 ? job.raw.replace(job.token, v) : job.raw;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var job = jobs.filter(function (j) { return j.el === en.target; })[0];
        if (job) setTimeout(function () { run(job); }, 650);
      });
    }, { threshold: .4 });
    jobs.forEach(function (j) { io.observe(j.el); });
  }

  /* ---------- 4. malha de pontos com parallax ---------- */
  function dots() {
    var hero = document.querySelector('[data-hero]');
    var mesh = hero && hero.querySelector('.hero-dots');
    if (!mesh || reduce) return;
    if (window.matchMedia('(hover: none)').matches) return;

    var raf = null, mx = 50, my = 115, px = 0, py = 0;
    function paint() {
      raf = null;
      mesh.style.setProperty('--mx', mx + '%');
      mesh.style.setProperty('--my', my + '%');
      mesh.style.setProperty('--px', px.toFixed(1) + 'px');
      mesh.style.setProperty('--py', py.toFixed(1) + 'px');
    }
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 100;
      my = ((e.clientY - r.top) / r.height) * 100;
      px = (mx - 50) * .22;
      py = (my - 50) * .22;
      if (!raf) raf = requestAnimationFrame(paint);
    });
    hero.addEventListener('mouseleave', function () {
      mx = 50; my = 115; px = 0; py = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    });
  }

  function ready() { revealName(); roles(); counters(); dots(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
