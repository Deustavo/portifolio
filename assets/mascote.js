/* A Chinela entra no canto e mia, alguns segundos depois da página abrir.
   Caminhos e atraso vêm do data-* da própria tag <script>, para o caminho
   relativo ficar na página em vez de chumbado aqui. */
(function () {
  var tag = document.currentScript;
  if (!tag) return;
  var IMG = tag.dataset.img;
  var SND = tag.dataset.audio;
  var DELAY = parseInt(tag.dataset.delay, 10) || 3000;
  if (!IMG) return;

  var STORE = 'ga-mascote-dispensada';

  function dismissed() {
    try { return sessionStorage.getItem(STORE) === '1'; } catch (e) { return false; }
  }
  function remember() {
    try { sessionStorage.setItem(STORE, '1'); } catch (e) { /* ok */ }
  }

  function t(key, fallback) {
    var api = window.GAI18N;
    var v = api && api.t ? api.t(key) : '';
    return v || fallback;
  }

  function build() {
    var box = document.createElement('div');
    box.className = 'mascote';

    var cat = document.createElement('button');
    cat.type = 'button';
    cat.className = 'mascote__cat';

    var img = document.createElement('img');
    img.src = IMG;
    img.alt = '';
    img.width = 1216;
    img.height = 1216;
    cat.appendChild(img);

    var x = document.createElement('button');
    x.type = 'button';
    x.className = 'mascote__x';
    x.textContent = '✕';

    box.appendChild(cat);
    box.appendChild(x);
    document.body.appendChild(box);

    function labels() {
      cat.setAttribute('aria-label', t('cat.meow', 'Ouvir a Chinela miar'));
      x.setAttribute('aria-label', t('cat.dismiss', 'Dispensar a Chinela'));
    }
    labels();
    if (window.GAI18N && window.GAI18N.on) window.GAI18N.on(labels);

    return { box: box, cat: cat, x: x };
  }

  /* O navegador só libera som depois de alguma interação na página. Então:
     tenta tocar; se for barrado, deixa armado para o primeiro toque, clique
     ou tecla — e a Chinela continua clicável para miar quando quiserem. */
  function makeSound() {
    if (!SND) return function () {};
    var a = new Audio(SND);
    a.preload = 'auto';
    a.volume = .55;
    var armed = false;

    function unlock() {
      armed = false;
      ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
        document.removeEventListener(ev, unlock);
      });
      play();
    }

    function play() {
      try { a.currentTime = 0; } catch (e) { /* ainda sem duração */ }
      var p = a.play();
      if (!p || !p.catch) return;
      p.catch(function () {
        if (armed) return;
        armed = true;
        ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
          document.addEventListener(ev, unlock, { once: true });
        });
      });
    }
    return play;
  }

  function ready() {
    if (dismissed()) return;
    var el = build();
    var meow = makeSound();

    setTimeout(function () {
      el.box.classList.add('is-in');
      meow();
    }, DELAY);

    el.cat.addEventListener('click', function () {
      meow();
      el.box.classList.remove('is-meowing');
      void el.box.offsetWidth;
      el.box.classList.add('is-meowing');
    });
    el.box.addEventListener('animationend', function () {
      el.box.classList.remove('is-meowing');
    });

    el.x.addEventListener('click', function () {
      el.box.classList.remove('is-in');
      remember();
      setTimeout(function () { el.box.remove(); }, 800);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
