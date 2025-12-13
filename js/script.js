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
  console.log('Dropdown toggled: ', dropdown);

  // Scroll logic only if it's now shown
  if (dropdown.classList.contains("show")) {
    const dropdownRect = dropdown.getBoundingClientRect();
    const dropdownBot = dropdownRect.bottom;
    const dropdownTop = dropdownRect.top;
    const windowHeight = window.innerHeight;
    const scrollThreshold = 50;

    setTimeout(() => {
      if (dropdownBot > windowHeight - scrollThreshold) {
        window.scrollBy({
          top: dropdownBot - (windowHeight - scrollThreshold) + 20,
          behavior: 'smooth'
        });
        console.log('scrolled down');
      } else if (dropdownTop < scrollThreshold * 2.2) {
        window.scrollBy({
          top: -(dropdownTop + scrollThreshold),
          behavior: 'smooth'
        });
        console.log('scrolled up');
      }
    }, 300);
  }
}
// // Function to toggle dropdown visibility
// function toggleDropdown(dropdownId) {
//   var dropdown = document.getElementById(dropdownId);
//   dropdown.classList.toggle("show");
//   console.log('Dropdown toggled: ', dropdown);
// 
//   if (dropdown.classList.contains("show")) {
//     var dropdownRect = dropdown.getBoundingClientRect();
//     var dropdownBot = dropdownRect.bottom;  // Dropdown's distance from the bottom of the viewport
//     var dropdownTop = dropdownRect.top; // Dropdown's distance from the top of the viewport
//     var windowHeight = window.innerHeight;  // Viewport height
//     var scrollThreshold = 50;
// 
//     // Scroll dynamically based on the dropdown's bottom position
//     setTimeout(function () {
//       if (dropdownBot > windowHeight - scrollThreshold) {
//         // Scroll down if the dropdown is too low on the screen
//         window.scrollBy({
//           top: dropdownBot - (windowHeight - scrollThreshold) + 20,
//           behavior: 'smooth'
//         });
//         console.log('scrolled down');
//       } else if (dropdownTop < scrollThreshold * 2.2) {
//         // Scroll up if the dropdown is too high on the screen
//         window.scrollBy({
//           top: -(dropdownTop + scrollThreshold),
//           behavior: 'smooth'
//         });
//         console.log('scrolled up');
//       }
//     }, 300);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  console.log("Observer initialized"); 
  const faders = document.querySelectorAll(".fade-in-section");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -10% 0px"
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
});

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

// Function to toggle dropdown visibility
function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("show");
  console.log('Dropdown toggled: ', dropdown);

  if (dropdown.classList.contains("show")) {
    var dropdownRect = dropdown.getBoundingClientRect();
    var dropdownBot = dropdownRect.bottom;  // Dropdown's distance from the bottom of the viewport
    var dropdownTop = dropdownRect.top; // Dropdown's distance from the top of the viewport
    var windowHeight = window.innerHeight;  // Viewport height
    var scrollThreshold = 50;

    // Scroll dynamically based on the dropdown's bottom position
    setTimeout(function () {
      if (dropdownBot > windowHeight - scrollThreshold) {
        // Scroll down if the dropdown is too low on the screen
        window.scrollBy({
          top: dropdownBot - (windowHeight - scrollThreshold) + 20,
          behavior: 'smooth'
        });
        console.log('scrolled down');
      } else if (dropdownTop < scrollThreshold * 2.2) {
        // Scroll up if the dropdown is too high on the screen
        window.scrollBy({
          top: -(dropdownTop + scrollThreshold),
          behavior: 'smooth'
        });
        console.log('scrolled up');
      }
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Observer initialized"); 
  const faders = document.querySelectorAll(".fade-in-section");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -10% 0px"
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
});
