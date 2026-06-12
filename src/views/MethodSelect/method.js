import { navigate, goBack } from '../../router.js';
import state from '../../state.js';
import { createStepHeader } from '../../utils/navigationBar.js';

export default function initMethodSelectView() {
  // Redirect to upload if no accounts are available
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  // Full-width step header (shared component).
  document.querySelector('.container-responsive').insertAdjacentHTML('afterbegin', createStepHeader({
    title: "How do you want to import?",
    subtitle: "There are two ways to move your accounts into Monarch. Pick whichever suits how you like to work.",
    backText: "Back to Review"
  }));

  const manualBtn = document.getElementById('manualImportBtn');
  const autoBtn = document.getElementById('autoImportBtn');
  const backBtn = document.getElementById('backBtn');

  // How many accounts the user chose to bring over — surfaced in the manual card.
  const selectedCount = Object.values(state.accounts).filter(acc => acc.included).length;
  document.getElementById('manualFileCount').textContent = selectedCount;

  manualBtn.addEventListener('click', () => navigate('/customize'));
  autoBtn.addEventListener('click', () => navigate('/login'));
  backBtn.addEventListener('click', () => goBack());
}
