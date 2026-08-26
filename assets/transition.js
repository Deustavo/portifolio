/* Animação de entrada e de saída entre as telas do portfólio. */
(function () {
  var root = document.documentElement;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SEL = '.bar, .bento > *, .head, .filters, .wrap > *, .foot';

  var IN_STEP = 55;              // atraso entre um bloco e o seguinte, na entrada
  var IN_FROM = 'translateY(28px) scale(.985)';
  var IN_EASE = 'cubic-bezier(.22,.61,.36,1)';

  var OUT_STEP = 34;             // atraso entre os blocos, na saída
  var OUT_TAIL = 430;            // duração da queda de um bloco
  var OUT_TO = 'translateY(90px) scale(.97)';
  var OUT_EASE = 'cubic-bezier(.55,0,.85,.35)';

  function items() {
    return Array.prototype.slice.call(document.querySelectorAll(SEL));
  }

  function clear(el) {
    el.style.transition = '';
    el.style.opacity = '';
    el.style.transform = '';
    el.style.willChange = '';
  }

  function enter() {
    var els = items();
    els.forEach(function (el) {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = IN_FROM;
      el.style.willChange = 'opacity, transform';
    });
    void document.body.offsetHeight; // força o estado inicial a ser calculado

    requestAnimationFrame(function () {
      els.forEach(function (el, i) {
        var d = (i * IN_STEP) + 'ms';
        el.style.transition = 'opacity .55s ' + IN_EASE + ' ' + d +
                              ', transform .65s ' + IN_EASE + ' ' + d;
        el.style.opacity = '';
        el.style.transform = '';
      });
    });

    // terminada a entrada, devolve os elementos ao CSS normal (hover e afins)
    setTimeout(function () { els.forEach(clear); }, els.length * IN_STEP + 900);
  }

  function leave(href) {
    var els = items();
    root.classList.add('is-leaving');
    // de baixo para cima: o rodapé cai primeiro, a barra do topo por último
    els.slice().reverse().forEach(function (el, i) {
      var d = (i * OUT_STEP) + 'ms';
      el.style.willChange = 'opacity, transform';
      el.style.transition = 'opacity .42s ease-in ' + d +
                            ', transform .52s ' + OUT_EASE + ' ' + d;
      el.style.opacity = '0';
      el.style.transform = el.classList.contains('bar') ? 'translateY(-24px)' : OUT_TO;
    });
    setTimeout(function () {
      window.location.href = href;
    }, OUT_TAIL + els.length * OUT_STEP);
  }

  function internal(a) {
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    var url;
    try { url = new URL(a.getAttribute('href'), window.location.href); } catch (err) { return false; }
    if (url.origin !== window.location.origin) return false;
    if (!/\.html?$|\/$/.test(url.pathname)) return false;
    if (url.pathname === window.location.pathname && url.hash) return false; // âncora interna
    return true;
  }

  function bind() {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (!internal(a)) return;
      e.preventDefault();
      leave(new URL(href, window.location.href).href);
    });
  }

  function ready() {
    var veil = document.createElement('div');
    veil.className = 'fade-veil';
    document.body.appendChild(veil);
    enter();
    bind();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  // volta pelo histórico: refaz a entrada em vez de mostrar a tela desmontada
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    root.classList.remove('is-leaving');
    items().forEach(clear);
    enter();
  });
})();
