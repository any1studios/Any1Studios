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
   3. APPLE-STYLE SCROLL REVEAL
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

// Fallback for short pages
setTimeout(() => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight) {
      el.classList.add("active");
    }
  });
}, 800);

/* ===============================
   PORTFOLIO EXPAND & IMAGE LOGIC
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
      // Data aur Image nikalna
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const link = item.getAttribute('data-link');
      const imgSrc = item.querySelector('img').src; 
      
      // Popup ke andar details bharna
      modalTitle.innerHTML = title;
      modalDesc.innerHTML = desc;
      modalImage.src = imgSrc; 
      
      // Button ki link handle karna
      if(link && link !== "") {
        modalLink.href = link;
        modalLink.style.display = "inline-block";
      } else {
        modalLink.style.display = "none"; // Agar link nahi di, toh button hide ho jayega
      }
      
      // Expand karna
      modal.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  // Background blur par click karne se bhi band hoga
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}

/* ===============================
   SCROLL REVEAL ANIMATION FIX
================================ */
function revealOnScroll() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 50; // Thoda sa scroll karte hi dikh jayega
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

// Scroll karne par animation chalega
window.addEventListener('scroll', revealOnScroll);

// Page load hote hi jo samne hai usko turant dikhane ke liye
setTimeout(revealOnScroll, 100);