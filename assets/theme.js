// Alterna claro/escuro e guarda a escolha. Sem escolha salva, segue o sistema.
(function () {
  var STORE = "ga-theme";

  function saved() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }

  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function current() {
    var s = saved();
    if (s === "dark" || s === "light") return s;
    return systemDark() ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var label = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  apply(current());

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    e.preventDefault();
    var next = current() === "dark" ? "light" : "dark";
    try { localStorage.setItem(STORE, next); } catch (e2) { /* ok */ }
    apply(next);
  });

  // sem escolha salva, acompanha o sistema em tempo real
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () { if (!saved()) apply(systemDark() ? "dark" : "light"); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
