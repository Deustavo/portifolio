// Alterna claro/escuro e guarda a escolha. Sem escolha salva, abre no escuro.
(function () {
  var STORE = "ga-theme";

  function saved() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }

  function current() {
    var s = saved();
    if (s === "dark" || s === "light") return s;
    return "dark";
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
})();
