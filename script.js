// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

// Initialize dark mode
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'true') {
  setDarkMode(true);
} else if (!savedMode) {
  setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

darkModeToggle.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark-mode'));
  showToast(`Dark mode ${document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'}`, 'info');
});

// BACK TO TOP BUTTON
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Scrolled to top!', 'info');
});

// FADE-IN SECTIONS & FEATURE CARDS
const fadeSections = document.querySelectorAll('.fade-section');

const observerOptions = { threshold: 0.1 };

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Staggered fade-in for feature cards
      const cards = entry.target.querySelectorAll('.feature-card');
      if (cards.length > 0) {
        cards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.2}s`;
          card.classList.add('visible');
        });
      }

      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeSections.forEach(section => fadeInObserver.observe(section));

// SCROLL PROGRESS BAR
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scroll / height) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// COPYABLE ELEMENTS
const copyables = document.querySelectorAll('.copyable');
copyables.forEach(item => {
  item.addEventListener('click', () => {
    navigator.clipboard.writeText(item.textContent.trim());
    showToast(`Copied "${item.textContent.trim()}"!`, 'success');
  });
});

// TOAST NOTIFICATIONS
const toastContainer = document.getElementById('toastContainer');

function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 10);
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
