/* ---- theme (persisted) ---- */
const root = document.documentElement;
const saved = localStorage.getItem("ga-theme");
if (saved) root.dataset.theme = saved;

document.querySelector(".themer")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("ga-theme", next);
});

/* ---- nav border on scroll ---- */
const nav = document.querySelector(".nav");
const onScroll = () => nav?.classList.toggle("is-stuck", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---- reveal on scroll ---- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }),
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".rise").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  io.observe(el);
});

/* ---- cursor-following project preview ---- */
const peek = document.querySelector(".peek");
if (peek && matchMedia("(hover: hover)").matches) {
  const art = peek.querySelector(".peek__art");
  let x = 0, y = 0, cx = 0, cy = 0, raf = null;

  const loop = () => {
    cx += (x - cx) * 0.14;
    cy += (y - cy) * 0.14;
    peek.style.translate = `${cx}px ${cy}px`;
    raf = requestAnimationFrame(loop);
  };

  document.querySelectorAll("[data-peek]").forEach((row) => {
    row.addEventListener("mouseenter", () => {
      art.style.background = row.dataset.peek;
      peek.classList.add("is-on");
      if (!raf) loop();
    });
    row.addEventListener("mouseleave", () => {
      peek.classList.remove("is-on");
    });
  });

  window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
}

/* ---- local time chip ---- */
const clock = document.querySelector("[data-clock]");
if (clock) {
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo"
    }) + " BRT";
  };
  tick();
  setInterval(tick, 15000);
}

/* ---- rotating role words ---- */
const rotor = document.querySelector("[data-rotor]");
if (rotor) {
  const words = JSON.parse(rotor.dataset.rotor);
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    rotor.style.opacity = 0;
    setTimeout(() => { rotor.textContent = words[i]; rotor.style.opacity = 1; }, 260);
  }, 2600);
  rotor.style.transition = "opacity .26s ease";
}
