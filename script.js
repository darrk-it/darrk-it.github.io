const darkModeToggle = document.getElementById('darkModeToggle');
const backToTop = document.getElementById('backToTop');

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
  localStorage.setItem('theme', 'dark');
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  darkModeToggle.textContent = '🌙';
  localStorage.setItem('theme', 'light');
}

// Auto-detect system preference if no saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  enableDarkMode();
} else if (savedTheme === 'light') {
  disableDarkMode();
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  enableDarkMode();
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Show/hide back-to-top button
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
