import { navigate } from '../../router.js';
import { renderButtons } from '../../components/button.js';

export default function initSyncedAccountsView() {
  // Attach handlers before renderButtons(), which rewrites className and would
  // otherwise strip the js-* marker classes off these buttons.
  document.querySelectorAll('.js-start').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('/upload');
    });
  });

  document.querySelectorAll('.js-back-home').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      navigate('/');
    });
  });

  renderButtons();
}
