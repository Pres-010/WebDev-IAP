// BluWave — app.js

// ── Form submit ──
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector("button[type=submit]");
  btn.textContent = "Sending…";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "✓ Request sent! We'll be in touch soon.";
    btn.style.background = "#0F6E56";
    this.reset();
    // Reset after 4s
    setTimeout(() => {
      btn.textContent = "Request early access";
      btn.style.background = "";
      btn.disabled = false;
    }, 4000);
  }, 1000);
});

// ── Role pill sync ──
document.querySelectorAll(".role-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    const role = pill.dataset.role;
    const sel = document.getElementById("roleSelect");
    if (sel && role) {
      for (let opt of sel.options) {
        if (opt.value === role) { sel.value = role; break; }
      }
    }
  });
});

// ── Scroll-reveal for cards ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + "ms";
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".card, .tcard, .how-step, #roles .grid div").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// inject .revealed style once
const style = document.createElement("style");
style.textContent = ".revealed { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(style);

// ── Active nav link on scroll ──
const sections = document.querySelectorAll("section[id], .dark[id]");
const navLinks = document.querySelectorAll(".nav nav a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active-link"));
      const link = document.querySelector(`.nav nav a[href="#${entry.target.id}"]`);
      if (link) link.classList.add("active-link");
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// inject active-link style
const navStyle = document.createElement("style");
navStyle.textContent = ".nav nav a.active-link { color: var(--primary); background: var(--primary-light); }";
document.head.appendChild(navStyle);