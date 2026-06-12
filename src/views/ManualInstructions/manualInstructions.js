import JSZip from 'jszip';
import generateCSV from '../../../shared/generateCsv.js';
import state from '../../state.js';
import { navigate, goBack } from '../../router.js';
import { renderButtons } from '../../components/button.js';
import { createStepHeader } from '../../utils/navigationBar.js';

export default function initManualInstructionsView() {
  // Redirect to upload if no accounts are available
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  // Full-width step header (shared component). The account count lives in the
  // subtitle and is filled in just below.
  document.querySelector('.container-responsive').insertAdjacentHTML('afterbegin', createStepHeader({
    title: "You're ready to import",
    subtitle: `<span id="accountCount" class="font-semibold text-gray-900">0 accounts</span> prepared and formatted for Monarch. Two steps and you're done.`,
    backText: "Back to Customize"
  }));

  const countSpan = document.getElementById('accountCount');
  const downloadBtn = document.getElementById('downloadBtn');
  const switchBtn = document.getElementById('switchToAuto');
  const backBtn = document.getElementById('backBtn');
  renderButtons();

  const includedAccounts = Object.values(state.accounts).filter(acc => acc.included);
  countSpan.textContent = `${includedAccounts.length} account${includedAccounts.length !== 1 ? 's' : ''}`;

  downloadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const zip = new JSZip();
    const MAX_ROWS_PER_FILE = 1000;

    includedAccounts.forEach(account => {
      // Use the name the user chose on the customize step (falls back to the
      // original YNAB name) for both the file name and the CSV "Account" column.
      const accountName = account.modifiedName || account.name;
      const safeName = accountName.replace(/[\\/:*?"<>|]/g, '_');
      const transactions = account.transactions;
      const total = transactions.length;

      if (total <= MAX_ROWS_PER_FILE) {
        const csv = generateCSV(accountName, transactions);
        zip.file(`${safeName}.csv`, csv);
      } else {
        const chunks = Math.ceil(total / MAX_ROWS_PER_FILE);
        for (let i = 0; i < chunks; i++) {
          const start = i * MAX_ROWS_PER_FILE;
          const end = start + MAX_ROWS_PER_FILE;
          const chunk = transactions.slice(start, end);
          const chunkCsv = generateCSV(accountName, chunk);
          zip.file(`${safeName}_part${i + 1}.csv`, chunkCsv);
        }
      }
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.download = 'accounts_export.zip';
      downloadLink.click();
    } catch (e) {
      console.error('❌ ZIP generation failed', e);
      alert('Failed to generate ZIP file.');
    }
  });

  switchBtn.addEventListener('click', () => {
    navigate('/login');
  });

  backBtn.addEventListener('click', () => {
    goBack();
  });
}
