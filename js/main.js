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

// 1. Menu ke kisi bhi link par click karne se menu band ho jaye
const mobileLinks = document.querySelectorAll(".nav-links a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      if(navLinks) navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll"); 
    }
  });
});

// 2. ⬇️ NAYA CODE: Bahar (page par) click karne se menu band ho jaye ⬇️
document.addEventListener("click", (event) => {
  // Agar menu open hai
  if (hamburger && hamburger.classList.contains("active")) {
    // Check karo ki click hamburger aur menu (navLinks) dono ke bahar hua hai
    if (!hamburger.contains(event.target) && navLinks && !navLinks.contains(event.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll"); // Scroll wapas shuru kar do
    }
  }
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

/* ===============================
   VAULT INBOX & COPY BUTTON LOGIC
================================ */
let currentTab = 'vault';

function getSmartDate(dateString) {
  const msgDate = new Date(dateString);
  if (isNaN(msgDate.getTime())) return dateString;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const timeStr = msgDate.toLocaleTimeString([], timeOptions);

  if (msgDate.toDateString() === today.toDateString()) {
    return `Today, ${timeStr}`;
  } else if (msgDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${timeStr}`;
  } else {
    return `${msgDate.toLocaleDateString()} at ${timeStr}`;
  }
}

function getMonthYear(dateString) {
  let d = new Date(dateString);
  if (isNaN(d.getTime())) return "Archived Files"; 
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function switchTab(tab) {
  currentTab = tab;
  document.getElementById('btnVault').classList.toggle('active', tab === 'vault');
  document.getElementById('btnBin').classList.toggle('active', tab === 'bin');
  loadVault();
}

function loadVault() {
  const container = document.getElementById('vaultContent');
  if (!container) return; // Agar kisi aur page par hain jahan vault nahi hai, toh code aage na chale aur error na aaye.

  const storageKey = currentTab === 'vault' ? 'dubbingMessages' : 'dubbingBin';
  let msgs = JSON.parse(localStorage.getItem(storageKey)) || [];

  if (msgs.length === 0) {
    container.innerHTML = `<div class="empty-state">No messages in ${currentTab === 'vault' ? 'Inbox' : 'Recycle Bin'}.</div>`;
    return;
  }

  msgs.sort((a, b) => new Date(b.date) - new Date(a.date));
  const vaultData = {};
  
  msgs.forEach(msg => {
    let monthYear = getMonthYear(msg.date);
    if (!vaultData[monthYear]) vaultData[monthYear] = {};
    if (!vaultData[monthYear][msg.email]) {
      vaultData[monthYear][msg.email] = { 
        name: msg.name, 
        channel: msg.channel, 
        messages: [],
        hasUnread: false 
      };
    }
    vaultData[monthYear][msg.email].messages.push(msg);
    if(currentTab === 'vault' && !msg.read) {
      vaultData[monthYear][msg.email].hasUnread = true;
    }
  });

  let htmlContent = '';
  for (const [month, clients] of Object.entries(vaultData)) {
    htmlContent += `<div class="month-header">${month}</div>`;
    
    for (const [email, clientData] of Object.entries(clients)) {
      let initial = clientData.name.charAt(0).toUpperCase();
      
      // YOUTUBE AUTO-SEARCH LOGIC
      let channelBtn = '';
      if (clientData.channel) {
          let ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(clientData.channel)}`;
          channelBtn = `<a href="${ytSearchUrl}" target="_blank" class="badge">▶ YouTube: ${clientData.channel}</a>`;
      }

      let msgCount = clientData.messages.length;
      let nameClass = clientData.hasUnread ? 'unread-text' : 'read-text';

      htmlContent += `
      <div class="client-card">
        <div class="client-header" onclick="toggleThread(this, '${email}')">
          <div class="client-info">
            <div class="avatar">${initial}</div>
            <div class="client-meta">
              <h3 class="${nameClass}">${clientData.name} <span style="color: var(--muted); font-size: 0.8rem; font-weight: normal;">(${msgCount})</span></h3>
              <p style="display:flex; align-items:center; gap:8px;">
                ${email} 
                <button class="copy-btn" onclick="copyEmail(event, '${email}', this)">📋 Copy</button>
              </p>
            </div>
          </div>
          <div onclick="event.stopPropagation();">${channelBtn}</div>
        </div>
        <div class="message-thread">
      `;

      clientData.messages.forEach(m => {
        let smartTime = getSmartDate(m.date);
        let actionBtns = currentTab === 'vault' 
          ? `<button class="btn-icon btn-delete" title="Move to Bin" onclick="moveToBin('${m.date}')">🗑️</button>` 
          : `<button class="btn-icon btn-restore" title="Restore" onclick="restoreMsg('${m.date}')">↺</button>
             <button class="btn-icon btn-delete" title="Permanent Delete" onclick="hardDelete('${m.date}')">✕</button>`;

        htmlContent += `
          <div class="message-item">
            <div class="msg-body">
              <div class="msg-time">${smartTime}</div>
              <div>${m.message.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="display:flex; gap:10px;">${actionBtns}</div>
          </div>
        `;
      });
      htmlContent += `</div></div>`;
    }
  }
  container.innerHTML = htmlContent;
}

function toggleThread(element, email) {
  const thread = element.nextElementSibling;
  const isOpening = thread.style.display === "none" || thread.style.display === "";
  
  if (isOpening) {
    thread.style.display = "block";
    if(currentTab === 'vault') markAsRead(email);
  } else {
    thread.style.display = "none";
  }
}

function markAsRead(email) {
  let msgs = JSON.parse(localStorage.getItem('dubbingMessages')) || [];
  let updated = false;
  msgs = msgs.map(m => {
    if(m.email === email && !m.read) { m.read = true; updated = true; }
    return m;
  });
  if(updated) { localStorage.setItem('dubbingMessages', JSON.stringify(msgs)); loadVault(); }
}

function moveToBin(dateId) {
  let msgs = JSON.parse(localStorage.getItem('dubbingMessages')) || [];
  let bin = JSON.parse(localStorage.getItem('dubbingBin')) || [];
  let msgToMove = msgs.find(m => m.date === dateId);
  if(msgToMove) {
    bin.push(msgToMove);
    msgs = msgs.filter(m => m.date !== dateId);
    localStorage.setItem('dubbingMessages', JSON.stringify(msgs));
    localStorage.setItem('dubbingBin', JSON.stringify(bin));
    loadVault();
  }
}

function restoreMsg(dateId) {
  let msgs = JSON.parse(localStorage.getItem('dubbingMessages')) || [];
  let bin = JSON.parse(localStorage.getItem('dubbingBin')) || [];
  let msgToRestore = bin.find(m => m.date === dateId);
  if(msgToRestore) {
    msgs.push(msgToRestore);
    bin = bin.filter(m => m.date !== dateId);
    localStorage.setItem('dubbingMessages', JSON.stringify(msgs));
    localStorage.setItem('dubbingBin', JSON.stringify(bin));
    loadVault();
  }
}

function hardDelete(dateId) {
  if(confirm("Are you sure? This message will be permanently deleted.")) {
    let bin = JSON.parse(localStorage.getItem('dubbingBin')) || [];
    bin = bin.filter(m => m.date !== dateId);
    localStorage.setItem('dubbingBin', JSON.stringify(bin));
    loadVault();
  }
}

function copyEmail(event, email, btnElement) {
  event.stopPropagation(); // Click karne par thread expand/collapse na ho
  
  navigator.clipboard.writeText(email).then(() => {
    let originalText = btnElement.innerHTML;
    btnElement.innerHTML = '✅ Copied!';
    btnElement.style.borderColor = '#10b981';
    btnElement.style.color = '#10b981';
    
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.style.borderColor = 'var(--glass-border)';
      btnElement.style.color = 'var(--text)';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Ensure loadVault runs when the page is fully loaded (if vaultContent exists)
window.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById('vaultContent')) {
    loadVault();
  }
});
