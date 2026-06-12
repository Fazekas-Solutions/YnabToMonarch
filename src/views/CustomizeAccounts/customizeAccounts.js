import state from '../../state.js';
import { navigate, goBack, persistState } from '../../router.js';
import { renderButtons } from '../../components/button.js';
import { createNavigationBar, createStepHeader } from '../../utils/navigationBar.js';
import { renderAccountSettingsEditor } from '../../components/accountSettingsEditor.js';

// Manual-flow step: rename the included accounts before downloading the CSV
// bundle. Type/subtype aren't collected here — they don't affect the CSV; the
// user picks the account type inside Monarch when creating each manual account.
export default function initCustomizeAccountsView() {
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  // Full-width step header (shared component).
  document.querySelector('.container-responsive').insertAdjacentHTML('afterbegin', createStepHeader({
    title: "Name your accounts",
    subtitle: "These names become your CSV file names. Rename any account before you download, one by one or all at once with a pattern.",
    backText: "Back to Method"
  }));

  const included = Object.values(state.accounts).filter(acc => acc.included);
  const $content = document.getElementById('customizeContent');
  const $nav = document.getElementById('customizeNav');

  if (included.length === 0) {
    $content.innerHTML = `
      <div class="text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg py-12 px-4">
        No accounts are selected to migrate. Go back and include at least one.
      </div>
    `;
  } else {
    renderAccountSettingsEditor($content, {
      accounts: included,
      allowTypeSubtype: false,
      onChange: persistState,
    });
  }

  $nav.innerHTML = createNavigationBar({
    showBack: false,
    showNext: true,
    nextText: 'Continue to download',
  });
  renderButtons();
  document.getElementById('continueBtn').addEventListener('click', () => navigate('/manual'));
  document.getElementById('backBtn').addEventListener('click', () => goBack());
}
