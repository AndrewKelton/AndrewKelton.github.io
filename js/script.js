// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ── Fade-in on scroll ────────────────────────────────────────────────
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  });
  document.querySelectorAll(".fade-in-section").forEach(s => appearOnScroll.observe(s));

  // ── Project folder browser ───────────────────────────────────────────
  const folders = Array.from(document.querySelectorAll(".folder"));
  const counter = document.getElementById("pager-count");
  let current = 0;

  function openFolder(index, focus = false) {
    current = (index + folders.length) % folders.length;
    folders.forEach((tab, i) => {
      const active = i === current;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active);
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
    });
    counter.textContent = `Project ${current + 1} / ${folders.length}`;
    if (focus) folders[current].focus();
  }

  folders.forEach((tab, i) => tab.addEventListener("click", () => openFolder(i)));
  document.getElementById("prev-project").addEventListener("click", () => openFolder(current - 1));
  document.getElementById("next-project").addEventListener("click", () => openFolder(current + 1));

  document.querySelector(".folders").addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); openFolder(current + 1, true); }
    if (e.key === "ArrowLeft") { e.preventDefault(); openFolder(current - 1, true); }
  });

  // ── Courses table sort ───────────────────────────────────────────────
  const sortBtns = document.querySelectorAll(".sort-btn");
  const tbody = document.querySelector("#courses-table tbody");

  sortBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const col = parseInt(btn.dataset.col);
      const newDir = (btn.classList.contains("active") && btn.dataset.dir === "asc") ? "desc" : "asc";

      sortBtns.forEach(b => {
        b.classList.remove("active");
        b.dataset.dir = "asc";
        b.querySelector(".sort-arrow").textContent = "↑";
      });
      btn.classList.add("active");
      btn.dataset.dir = newDir;
      btn.querySelector(".sort-arrow").textContent = newDir === "asc" ? "↑" : "↓";

      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const aText = a.cells[col].textContent.trim().toLowerCase();
        const bText = b.cells[col].textContent.trim().toLowerCase();
        return newDir === "asc" ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });
      rows.forEach(row => tbody.appendChild(row));
    });
  });

  // ── Hide header on scroll down, show on scroll up ────────────────────
  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    header.classList.toggle("hidden", window.scrollY > lastScrollY && window.scrollY > 80);
    lastScrollY = window.scrollY;
  });
});
