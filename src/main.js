import { navigate } from './router.js';
import './components/button.js';

// Initial app load handled by router's DOMContentLoaded listener
// No need to manually navigate here as router handles initial route detection

// Header logo links back to the landing page. It lives in the static index.html
// (outside #app), so wire it once here and route through the SPA navigator.
document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.getElementById('header-home-link');
  if (!homeLink) return;

  homeLink.addEventListener('click', (event) => {
    // Let modified clicks (new tab/window) behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate('/');
  });
});
