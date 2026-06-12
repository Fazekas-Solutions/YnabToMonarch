import state from '../../state.js';
import { navigate, clearAppState } from '../../router.js';
import { renderButtons } from '../../components/button.js';

// Celebratory wrap-up shown once every account has imported successfully.
// Surfaces the work the tool did, nudges (gently) toward a donation, and offers
// next steps: migrate more, request a feature, or view the source.
export default function initThankYouView() {
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  const completed = Object.values(state.accounts).filter(a => a.included && a.status === 'completed');

  const accountsCount = completed.length;
  const txCount = completed.reduce((sum, a) => sum + (a.transactions?.length ?? a.transactionCount ?? 0), 0);

  // Earliest transaction date → rough span of history brought over.
  let earliest = null;
  completed.forEach(a => (a.transactions || []).forEach(t => {
    if (t.Date && (!earliest || t.Date < earliest)) earliest = t.Date;
  }));
  let years = null;
  if (earliest) {
    const ms = Date.now() - new Date(earliest).getTime();
    years = Math.max(1, Math.round(ms / (365.25 * 24 * 60 * 60 * 1000)));
  }

  const categoryCount = state.mappings?.categoryMapping ? Object.keys(state.mappings.categoryMapping).length : 0;
  const tagCount = state.mappings?.tagMapping ? Object.keys(state.mappings.tagMapping).length : 0;

  const stats = [
    { value: accountsCount.toLocaleString(), label: `Account${accountsCount !== 1 ? 's' : ''} migrated` },
    { value: txCount.toLocaleString(), label: `Transaction${txCount !== 1 ? 's' : ''} imported` },
  ];
  if (years) stats.push({ value: `${years}`, label: `Year${years !== 1 ? 's' : ''} of history` });

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="w-36 sm:w-44 rounded-2xl border border-gray-200 bg-white shadow-sm p-5 text-center">
      <div class="text-3xl sm:text-4xl font-black text-[#005B96]">${s.value}</div>
      <div class="text-xs sm:text-sm text-gray-500 mt-1">${s.label}</div>
    </div>
  `).join('');

  const extras = [];
  if (categoryCount) extras.push(`${categoryCount} categor${categoryCount !== 1 ? 'ies' : 'y'}`);
  if (tagCount) extras.push(`${tagCount} tag${tagCount !== 1 ? 's' : ''}`);
  const statsExtra = document.getElementById('statsExtra');
  statsExtra.textContent = extras.length
    ? `Plus ${extras.join(' and ')} mapped, with transactions and balance history brought over in one pass.`
    : 'Transactions and balance history, all brought over in one pass.';

  renderButtons();

  document.getElementById('startOverBtn').addEventListener('click', () => {
    clearAppState();
    navigate('/upload', true);
  });
}
