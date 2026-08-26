/* Interações extra do portfólio:
   1. lightbox nas telas dos cases
   2. tilt e brilho seguindo o cursor nos cards
   3. barra de progresso de leitura nos cases
   4. filtro dos projetos na home
   Tudo é progressivo: sem JS, a página segue funcionando como antes. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(hover: none)').matches;
  var EASE = 'cubic-bezier(.22,.61,.36,1)';

  /* traduções: usa o dicionário do i18n.js quando ele existe */
  function t(key, fallback) {
    var api = window.GAI18N;
    var v = api && api.t ? api.t(key) : '';
    return v || fallback;
  }
  function onLang(fn) {
    if (window.GAI18N && window.GAI18N.on) window.GAI18N.on(fn);
  }

  /* =====================================================================
     1. LIGHTBOX
     ===================================================================== */
  function lightbox() {
    var thumbs = Array.prototype.slice.call(
      document.querySelectorAll('img.cover, .shot img')
    );
    if (thumbs.length < 1) return;

    var i = 0, open = false, lastFocus = null, veil = null, el = {};

    function build() {
      veil = document.createElement('div');
      veil.className = 'lb';
      veil.hidden = true;
      veil.setAttribute('role', 'dialog');
      veil.setAttribute('aria-modal', 'true');
      veil.innerHTML =
        '<div class="lb__top">' +
          '<span class="lb__count"></span>' +
          '<button class="lb__btn" data-lb="close" type="button">✕</button>' +
        '</div>' +
        '<div class="lb__stage">' +
          '<button class="lb__btn" data-lb="prev" type="button">←</button>' +
          '<figure class="lb__fig">' +
            '<img class="lb__img" alt="">' +
            '<figcaption class="lb__cap"></figcaption>' +
          '</figure>' +
          '<button class="lb__btn" data-lb="next" type="button">→</button>' +
        '</div>' +
        '<div class="lb__foot"></div>';
      document.body.appendChild(veil);

      el.count = veil.querySelector('.lb__count');
      el.fig = veil.querySelector('.lb__fig');
      el.img = veil.querySelector('.lb__img');
      el.cap = veil.querySelector('.lb__cap');
      el.foot = veil.querySelector('.lb__foot');
      el.close = veil.querySelector('[data-lb="close"]');
      el.prev = veil.querySelector('[data-lb="prev"]');
      el.next = veil.querySelector('[data-lb="next"]');

      labels();
      onLang(labels);

      el.close.addEventListener('click', hide);
      el.prev.addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
      el.next.addEventListener('click', function (e) { e.stopPropagation(); go(1); });
      /* clicar na imagem avança; clicar no vazio fecha */
      el.img.addEventListener('click', function (e) { e.stopPropagation(); go(1); });
      veil.addEventListener('click', function (e) { if (e.target === veil || e.target.classList.contains('lb__stage')) hide(); });
      swipe();
      window.addEventListener('resize', function () { if (open) fit(); });
    }

    function labels() {
      if (!veil) return;
      veil.setAttribute('aria-label', t('lb.title', 'Galeria de telas'));
      el.close.setAttribute('aria-label', t('lb.close', 'Fechar'));
      el.prev.setAttribute('aria-label', t('lb.prev', 'Tela anterior'));
      el.next.setAttribute('aria-label', t('lb.next', 'Próxima tela'));
      /* no toque as setas do teclado não ajudam: a dica vira o gesto */
      el.foot.innerHTML = coarse
        ? t('lb.hintTouch', 'Deslize para navegar · toque fora para fechar')
        : t('lb.hint', '<kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>Esc</kbd> para fechar');
    }

    function caption(img) {
      var fig = img.closest('figure');
      var cap = fig && fig.querySelector('figcaption');
      if (cap) return cap.textContent.trim();
      return img.getAttribute('alt') || '';
    }

    /* prints pequenos (mockups de celular de 184px) precisam crescer para o
       lightbox valer a pena; acima de 2.5x a ampliação já borra, então para aí */
    var MAX_UP = 2.5;
    function fit() {
      var nw = el.img.naturalWidth, nh = el.img.naturalHeight;
      if (!nw || !nh) return;
      var availW = el.fig.clientWidth;
      var availH = el.fig.clientHeight - el.cap.offsetHeight - 14;
      if (availW < 40 || availH < 40) return;
      var k = Math.min(availW / nw, availH / nh, MAX_UP);
      el.img.style.width = Math.round(nw * k) + 'px';
      el.img.style.height = Math.round(nh * k) + 'px';
    }

    /* a imagem cresce da miniatura até o palco (FLIP) */
    function flip(from) {
      if (reduce || !from) return;
      var to = el.img.getBoundingClientRect();
      if (!to.width || !to.height) return;
      var sx = from.width / to.width, sy = from.height / to.height;
      var dx = (from.left + from.width / 2) - (to.left + to.width / 2);
      var dy = (from.top + from.height / 2) - (to.top + to.height / 2);
      el.img.style.transition = 'none';
      el.img.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
      el.img.style.opacity = '.6';
      requestAnimationFrame(function () {
        el.img.style.transition = 'transform .44s ' + EASE + ', opacity .3s ease';
        el.img.style.transform = '';
        el.img.style.opacity = '';
      });
    }

    function paint(from) {
      var img = thumbs[i];
      el.img.src = img.currentSrc || img.src;
      el.img.alt = img.getAttribute('alt') || '';
      el.cap.textContent = caption(img);
      el.count.textContent = (i + 1) + ' / ' + thumbs.length;
      var only = thumbs.length < 2;
      el.prev.disabled = only;
      el.next.disabled = only;
      if (el.img.complete && el.img.naturalWidth) { fit(); flip(from); }
      else el.img.addEventListener('load', function once() {
        el.img.removeEventListener('load', once);
        fit();
        flip(from);
      });
    }

    function show(index, thumb) {
      if (!veil) build();
      i = index;
      lastFocus = document.activeElement;
      open = true;
      veil.hidden = false;
      document.documentElement.classList.add('lb-lock');
      paint(thumb ? thumb.getBoundingClientRect() : null);
      requestAnimationFrame(function () { veil.classList.add('is-open'); });
      el.close.focus({ preventScroll: true });
    }

    function hide() {
      if (!open) return;
      open = false;
      veil.classList.remove('is-open');
      document.documentElement.classList.remove('lb-lock');
      setTimeout(function () { if (!open) veil.hidden = true; }, reduce ? 0 : 300);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    function go(step) {
      if (thumbs.length < 2) return;
      i = (i + step + thumbs.length) % thumbs.length;
      /* troca com um respiro, sem o FLIP da abertura */
      el.img.style.transition = 'none';
      el.img.style.opacity = '0';
      el.img.style.transform = 'translateX(' + (step * 22) + 'px)';
      paint(null);
      requestAnimationFrame(function () {
        el.img.style.transition = 'opacity .28s ease, transform .34s ' + EASE;
        el.img.style.opacity = '';
        el.img.style.transform = '';
      });
    }

    function swipe() {
      var x0 = null, y0 = null;
      veil.addEventListener('touchstart', function (e) {
        x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
      }, { passive: true });
      veil.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        var dy = e.changedTouches[0].clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) hide();
      }, { passive: true });
    }

    thumbs.forEach(function (img, n) {
      /* a miniatura vira um botão de verdade: abre no clique, no Enter e no espaço,
         e recebe o foco de volta quando o lightbox fecha */
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      function ariaLabel() {
        var name = caption(img) || img.getAttribute('alt') || '';
        img.setAttribute('aria-label', (t('lb.open', 'Ampliar') + ': ' + name).trim());
      }
      ariaLabel();
      onLang(ariaLabel);
      img.addEventListener('click', function () { show(n, img); });
      img.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
        e.preventDefault();
        show(n, img);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); hide(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Home') { e.preventDefault(); i = -1; go(1); }
      else if (e.key === 'End') { e.preventDefault(); i = 0; go(-1); }
      else if (e.key === 'Tab') {
        /* o foco fica preso nos três botões enquanto o lightbox está aberto */
        var stops = [el.close, el.prev, el.next].filter(function (b) { return !b.disabled; });
        var at = stops.indexOf(document.activeElement);
        e.preventDefault();
        var nx = e.shiftKey ? at - 1 : at + 1;
        stops[(nx + stops.length) % stops.length].focus();
      }
    });
  }

  /* =====================================================================
     2. TILT E BRILHO
     ===================================================================== */
  function tilt() {
    if (reduce || coarse) return;
    var MAX = 5;   /* graus */
    var sel = '.p-card, .b-stat, .kpi, .fact, .next';
    var cards = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.classList.add('tilt');
      var raf = null, rx = 0, ry = 0, gx = 50, gy = 50;

      function paint() {
        raf = null;
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--gx', gx.toFixed(1) + '%');
        card.style.setProperty('--gy', gy.toFixed(1) + '%');
      }

      card.addEventListener('pointerenter', function () { card.classList.add('is-tracking'); });

      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        gx = px * 100; gy = py * 100;
        /* o card inclina na direção do cursor, como se ele empurrasse a superfície */
        ry = (px - .5) * 2 * MAX;
        rx = (.5 - py) * 2 * MAX;
        if (!raf) raf = requestAnimationFrame(paint);
      });

      card.addEventListener('pointerleave', function () {
        card.classList.remove('is-tracking');
        rx = 0; ry = 0;
        if (!raf) raf = requestAnimationFrame(paint);
      });
    });
  }

  /* =====================================================================
     3. PROGRESSO DE LEITURA (só nas páginas de case)
     ===================================================================== */
  function progress() {
    var wrap = document.querySelector('.wrap');
    if (!wrap) return;

    var bar = document.createElement('div');
    bar.className = 'readbar';
    bar.setAttribute('aria-hidden', 'true');
    /* a barra assume a cor do próprio case */
    var accented = document.querySelector('.next[style*="--fill"], .kpis[style*="--fill"]');
    var fill = accented && accented.style.getPropertyValue('--fill').trim();
    if (fill) bar.style.setProperty('--accent', fill);
    document.body.appendChild(bar);

    var raf = null;
    function paint() {
      raf = null;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      bar.style.setProperty('--p', p.toFixed(4));
      bar.classList.toggle('is-on', window.scrollY > 40 && p < .995);
    }
    function tick() { if (!raf) raf = requestAnimationFrame(paint); }

    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    paint();
  }

  /* =====================================================================
     4. FILTRO DOS PROJETOS (só na home)
     ===================================================================== */
  function filters() {
    var box = document.querySelector('[data-filters]');
    if (!box) return;
    var chips = Array.prototype.slice.call(box.querySelectorAll('[data-filter]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-group]'));
    if (!chips.length || !groups.length) return;

    var total = document.querySelector('[data-work-count]');
    var totalKey = total && total.dataset.i18n;
    var active = 'all';

    function cases(name) {
      /* conta os cards do grupo para a etiqueta ao lado do título */
      return groups.filter(function (g) {
        return g.dataset.group === name && g.classList.contains('bento');
      }).reduce(function (n, g) { return n + g.children.length; }, 0);
    }

    function label(n) {
      var one = t('work.caseOne', 'case'), many = t('work.caseMany', 'cases');
      return (n < 10 ? '0' + n : n) + ' ' + (n === 1 ? one : many);
    }

    function paintCount() {
      if (!total) return;
      if (active === 'all') total.textContent = t(totalKey, total.textContent);
      else total.textContent = label(cases(active));
    }

    function run(name) {
      active = name;
      chips.forEach(function (c) {
        var on = c.dataset.filter === name;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      groups.forEach(function (g) {
        var show = name === 'all' || g.dataset.group === name;
        g.hidden = !show;
        if (!show || !g.classList.contains('bento')) return;
        /* recomeça a cascata: os cards entram um atrás do outro */
        g.classList.remove('is-filtering');
        Array.prototype.forEach.call(g.children, function (card, n) {
          card.style.setProperty('--i', n);
        });
        void g.offsetWidth;
        g.classList.add('is-filtering');
      });
      paintCount();
    }

    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', c.dataset.filter === 'all' ? 'true' : 'false');
      c.addEventListener('click', function () {
        if (c.dataset.filter === active) return;
        run(c.dataset.filter);
      });
    });
    onLang(paintCount);
  }

  function ready() { lightbox(); tilt(); progress(); filters(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
