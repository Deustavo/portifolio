/* Contagem de cases a partir do próprio grid: nada de número escrito à mão.
   Roda no parse, antes do hero.js, para o contador animado já subir até o
   valor certo. Repinta quando o idioma muda. */
(function () {
  var CARD = '.p-card';

  function grids(name) {
    return Array.prototype.filter.call(
      document.querySelectorAll('.bento[data-group]'),
      function (g) { return !name || g.dataset.group === name; }
    );
  }

  function count(name) {
    return grids(name).reduce(function (n, g) {
      return n + g.querySelectorAll(CARD).length;
    }, 0);
  }

  function t(key) {
    var api = window.GAI18N;
    return (api && api.t ? api.t(key) : '') || '';
  }

  function label(n) {
    var noun = n === 1 ? (t('work.caseOne') || 'case') : (t('work.caseMany') || 'cases');
    return (n < 10 ? '0' + n : n) + ' ' + noun;
  }

  function paint() {
    /* etiquetas ao lado dos títulos: data-case-count="all" ou o nome do grupo */
    Array.prototype.forEach.call(document.querySelectorAll('[data-case-count]'), function (el) {
      var g = el.dataset.caseCount;
      el.textContent = label(count(g === 'all' ? '' : g));
    });

    /* o número grande do bloco de estatística */
    Array.prototype.forEach.call(document.querySelectorAll('[data-case-total]'), function (el) {
      el.textContent = String(count(''));
    });

    /* textos traduzidos que carregam o total no meio da frase, via {n} */
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      if (el.innerHTML.indexOf('{n}') > -1) {
        el.innerHTML = el.innerHTML.replace(/\{n\}/g, count(''));
      }
    });
  }

  window.GACounts = { total: function () { return count(''); }, group: count, label: label, paint: paint };

  paint();
  if (window.GAI18N && window.GAI18N.on) window.GAI18N.on(paint);
})();
