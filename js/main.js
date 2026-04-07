/* ===============================
   1. PAGE LOADER
================================ */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    }, 500);
  }
});

/* ===============================
   2. MOBILE HAMBURGER MENU CLICK LOGIC
================================ */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    if(navLinks) navLinks.classList.toggle("active");
    
    // Page scrolling ko lock/unlock karna
    document.body.classList.toggle("no-scroll");
  });
}

// Menu ke kisi bhi link par click karne se menu automatically band ho jaye
const mobileLinks = document.querySelectorAll(".nav-links a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      if(navLinks) navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll"); // Scroll wapas shuru karna
    }
  });
});

/* ===============================
   3. APPLE-STYLE SCROLL REVEAL (FIXED)
================================ */
const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target); 
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// STRONG FALLBACK: Taaki page kabhi blank na atke
function forceReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight + 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("load", forceReveal);
setTimeout(forceReveal, 300);
setTimeout(forceReveal, 800);

/* ===============================
   4. PORTFOLIO EXPAND & IMAGE LOGIC (BUG FIXED)
================================ */
const projectItems = document.querySelectorAll('.project-item');
const modal = document.querySelector('.project-modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');
const modalLink = document.getElementById('modalLink');
const closeModal = document.querySelector('.close-modal');

if (projectItems.length > 0 && modal) {
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      // Data nikalna
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const link = item.getAttribute('data-link');
      
      // IMAGE BUG FIX: Pehle check karega ki image hai ya nahi (Home page vs Portfolio page)
      const imgTag = item.querySelector('img');
      if (imgTag && modalImage) {
        modalImage.src = imgTag.src;
        modalImage.parentElement.style.display = "block"; // Image container show karein
      } else if (modalImage) {
        modalImage.parentElement.style.display = "none"; // Agar image nahi hai toh container hide karein
      }
      
      // Popup ke andar details bharna
      if (modalTitle) modalTitle.innerHTML = title;
      if (modalDesc) modalDesc.innerHTML = desc;
      
      // Button ki link handle karna
      if(modalLink) {
        if(link && link !== "") {
          modalLink.href = link;
          modalLink.style.display = "inline-block";
        } else {
          modalLink.style.display = "none";
        }
      }
      
      // Expand karna
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}




/* ===============================
   DARK/LIGHT THEME SWITCHER LOGIC
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const themeCheckbox = document.getElementById("theme-switch-checkbox");
  
  // Check if user previously selected Dark Mode
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeCheckbox) themeCheckbox.checked = true; // Switch ko moon pe set karein
  }

  // Jab user button par click kare
  if (themeCheckbox) {
    themeCheckbox.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark"); // Browser me Dark save karein
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light"); // Browser me Light save karein
      }
    });
  }
});
