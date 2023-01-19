/*
  Adapted from Bootstrap Docs https://getbootstrap.com/docs/5.3/customize/color-modes/#how-it-works
*/

(() => {
  document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const theme = toggle.getAttribute('data-bs-theme-value');
      document.documentElement.setAttribute('data-bs-theme', theme);
    });
  });
})();