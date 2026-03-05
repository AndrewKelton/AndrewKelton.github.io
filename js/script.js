// script.js

function toggleDetails(id, headerElement) {
  const details = document.getElementById(id);
  const icon = headerElement.querySelector('.toggle-icon');
  const isVisible = details.style.display === "block";

  details.style.display = isVisible ? "none" : "block";
  icon.classList.toggle("rotate", !isVisible);

  if (!isVisible) {
    setTimeout(() => {
      const rect = details.getBoundingClientRect();
      const scrollThreshold = 50;
      const windowHeight = window.innerHeight;

      if (rect.bottom > windowHeight - scrollThreshold) {
        window.scrollBy({
          top: rect.bottom - (windowHeight - scrollThreshold) + 20,
          behavior: 'smooth'
        });
      } else if (rect.top < scrollThreshold * 2.2) {
        window.scrollBy({
          top: -(rect.top + scrollThreshold),
          behavior: 'smooth'
        });
      }
    }, 300);
  }
}

function toggleDropdown(dropdownId) {
  const allDropdowns = document.querySelectorAll('.dropdown-content');

  // Close all other dropdowns
  allDropdowns.forEach(dropdown => {
    if (dropdown.id !== dropdownId) {
      dropdown.classList.remove("show");
    }
  });

  // Toggle the clicked dropdown
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("show");

  // Scroll logic only if it's now shown
  if (dropdown.classList.contains("show")) {
    setTimeout(() => {
      const dropdownRect = dropdown.getBoundingClientRect();
      const dropdownBot = dropdownRect.bottom;
      const dropdownTop = dropdownRect.top;
      const windowHeight = window.innerHeight;
      const scrollThreshold = 50;

      if (dropdownBot > windowHeight - scrollThreshold) {
        window.scrollBy({
          top: dropdownBot - (windowHeight - scrollThreshold) + 20,
          behavior: 'smooth'
        });
      } else if (dropdownTop < scrollThreshold * 2.2) {
        window.scrollBy({
          top: -(dropdownTop + scrollThreshold),
          behavior: 'smooth'
        });
      }
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in-section");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(section => {
    appearOnScroll.observe(section);
  });

  // ── Courses table sort ──────────────────────────────────────────────
  const sortBtns = document.querySelectorAll('.sort-btn');
  const coursesTable = document.getElementById('courses-table');

  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const col = parseInt(btn.dataset.col);
      const isActive = btn.classList.contains('active');
      // Flip direction if already active, otherwise default to asc
      const newDir = (isActive && btn.dataset.dir === 'asc') ? 'desc' : 'asc';

      // Reset all buttons
      sortBtns.forEach(b => {
        b.classList.remove('active');
        b.dataset.dir = 'asc';
        b.querySelector('.sort-arrow').textContent = '↑';
      });

      // Mark this button active
      btn.classList.add('active');
      btn.dataset.dir = newDir;
      btn.querySelector('.sort-arrow').textContent = newDir === 'asc' ? '↑' : '↓';

      // Sort the tbody rows
      const tbody = coursesTable.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const aText = a.cells[col].textContent.trim().toLowerCase();
        const bText = b.cells[col].textContent.trim().toLowerCase();
        return newDir === 'asc'
          ? aText.localeCompare(bText)
          : bText.localeCompare(aText);
      });
      rows.forEach(row => tbody.appendChild(row));
    });
  });

  // Hide nav on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });
});
