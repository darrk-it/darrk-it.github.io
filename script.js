// Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const backToTop = document.getElementById('backToTop');
const fadeSections = document.querySelectorAll('.fade-section');
const scrollProgress = document.getElementById('scrollProgress');
const toastContainer = document.getElementById('toastContainer');
const copyables = document.querySelectorAll('.copyable');
const inviteButton = document.querySelector('.invite-button');

// --- TOAST QUEUE SYSTEM ---
const toastQueue = [];
let toastTimeout;

function showToast(message, type = 'info') {
  toastQueue.push({ message, type });
  if (toastTimeout) return;
  displayNextToast();
}

function displayNextToast() {
  if (toastQueue.length === 0) {
    toastTimeout = null;
    return;
  }

  const { message, type } = toastQueue.shift();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  // Add icon
  const icon = document.createElement('span');
  icon.className = 'icon';
  icon.innerHTML = type === 'success' ? '✔️' : type === 'error' ? '❌' : 'ℹ️';
  toast.appendChild(icon);

  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));

  // Remove after 2s
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toastContainer.removeChild(toast);
      toastTimeout = null;
      displayNextToast();
    }, 300);
  }, 2000);
}

// --- DARK MODE ---
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
  localStorage.setItem('theme', 'dark');
  showToast('Dark mode enabled', 'info');
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  darkModeToggle.textContent = '🌙';
  localStorage.setItem('theme', 'light');
  showToast('Light mode enabled', 'info');
}

// Load theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') enableDarkMode();
else if (savedTheme === 'light') disableDarkMode();
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) enableDarkMode();

darkModeToggle.addEventListener('click', () => {
  document.body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode();
});

// --- BACK TO TOP ---
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';

  // Scroll progress bar
  const scrollTotal = document.body.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(window.scrollY / scrollTotal) * 100}%`;
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('Scrolled to top', 'info');
});

// --- FADE-IN SECTIONS ---
function handleFadeIn() {
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', handleFadeIn);

// --- COPY TO CLIPBOARD ---
copyables.forEach(item => {
  item.addEventListener('click', () => {
    navigator.clipboard.writeText(item.textContent.trim());
    showToast(`Copied "${item.textContent.trim()}"`, 'success');
  });
});

// --- INVITE BUTTON CLICK FEEDBACK ---
inviteButton.addEventListener('click', () => {
  showToast('Redirecting to Discord invite...', 'info');
});

// --- SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      showToast(`Navigated to ${target.id}`, 'info');
    }
  });
});
