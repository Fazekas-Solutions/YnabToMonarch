import { navigate } from '../../router.js';
import { renderButtons } from '../../components/button.js';

export default function initHomeView() {
  // Attach handlers before renderButtons(), which rewrites className and would
  // otherwise strip the js-start marker class off the CTA buttons.

  // Every "Start migrating" CTA on the page.
  document.querySelectorAll('.js-start').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('/upload');
    });
  });

  // Synced-accounts guide link in the FAQ — keep navigation in the SPA.
  document.querySelectorAll('.js-synced-guide').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('/synced-accounts');
    });
  });

  renderButtons();

  // FAQ accordion (single item open at a time).
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    const chevron = item.querySelector('.faq-chevron');

    question.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Collapse all items first.
      faqItems.forEach((other) => {
        other.querySelector('.faq-a').classList.add('hidden');
        other.querySelector('.faq-chevron')?.classList.remove('rotate-180');
      });

      // Open this one unless it was already open (toggle behavior).
      if (!isOpen) {
        answer.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });
  });
}
