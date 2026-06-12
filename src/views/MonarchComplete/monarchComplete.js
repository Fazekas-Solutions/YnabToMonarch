import state from '../../state.js';
import { monarchApi } from '../../api/monarchApi.js';
import { navigate } from '../../router.js';
import { renderButtons } from '../../components/button.js';

// Sort order for the account list: failed first, then in-flight, queued, done.
const STATUS_ORDER = { failed: 0, uploading: 1, processing: 1, pending: 2, completed: 3 };
const BATCH_SIZE = 5;

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initMonarchCompleteView() {
  if (!state.accounts || Object.keys(state.accounts).length === 0) {
    navigate('/upload', true);
    return;
  }

  const $title = document.getElementById('completeTitle');
  const $subtitle = document.getElementById('completeSubtitle');
  const $progressBar = document.getElementById('progressBar');
  const $progressLabel = document.getElementById('progressLabel');
  const $progressPct = document.getElementById('progressPct');
  const $actions = document.getElementById('completeActions');
  const $list = document.getElementById('accountList');

  let isProcessing = false;

  // Anything not already completed/failed starts queued.
  Object.values(state.accounts).forEach(a => {
    if (a.included && a.status !== 'completed' && a.status !== 'failed') a.status = 'pending';
  });

  render();
  runProcessing(includedEntries().filter(([, a]) => a.status !== 'completed').map(([name]) => name));

  // --------------------------------------------------------------- selectors

  function includedEntries() {
    return Object.entries(state.accounts).filter(([, a]) => a.included);
  }

  function counts() {
    const inc = includedEntries().map(([, a]) => a);
    return {
      total: inc.length,
      completed: inc.filter(a => a.status === 'completed').length,
      failed: inc.filter(a => a.status === 'failed').length,
    };
  }

  // ----------------------------------------------------------------- render

  function render() {
    const c = counts();
    const done = !isProcessing && c.completed + c.failed === c.total;

    if (done && c.failed > 0) {
      $title.textContent = 'Almost there';
      $subtitle.textContent = `${c.completed} of ${c.total} account${c.total !== 1 ? 's' : ''} imported. ${c.failed} need${c.failed === 1 ? 's' : ''} another try. Retry below.`;
    } else {
      $title.textContent = 'Importing your accounts';
      $subtitle.textContent = 'Bringing your transactions and balances into Monarch. This can take a moment.';
    }

    const pct = c.total ? Math.round((c.completed / c.total) * 100) : 0;
    $progressBar.style.width = `${pct}%`;
    $progressLabel.textContent = `${c.completed} of ${c.total} imported`;
    $progressPct.textContent = `${pct}%`;

    $actions.innerHTML = (done && c.failed > 0)
      ? `<button id="retryAll" class="ui-button" data-type="primary" data-size="large">Retry ${c.failed} failed account${c.failed !== 1 ? 's' : ''}</button>`
      : '';

    const sorted = includedEntries().sort(
      (a, b) => (STATUS_ORDER[a[1].status] ?? 9) - (STATUS_ORDER[b[1].status] ?? 9)
    );
    $list.innerHTML = sorted.map(([name, a]) => card(name, a)).join('');

    // Wire BEFORE renderButtons() — it rewrites className and would strip the
    // js-retry-one marker class off the per-row retry buttons.
    const retryAll = document.getElementById('retryAll');
    if (retryAll) retryAll.addEventListener('click', onRetryAll);
    $list.querySelectorAll('.js-retry-one').forEach(btn => {
      btn.addEventListener('click', () => onRetryOne(btn.dataset.name));
    });

    renderButtons();
  }

  function card(name, a) {
    const label = a.modifiedName || a.name || name;
    const txCount = a.transactionCount ?? (a.transactions?.length || 0);
    const failed = a.status === 'failed';

    let leftIcon;
    let right;
    let sub = `<div class="text-xs text-gray-500 mt-0.5">${txCount.toLocaleString()} transaction${txCount !== 1 ? 's' : ''}</div>`;

    switch (a.status) {
      case 'completed':
        leftIcon = badge('bg-green-100', `<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`);
        right = pill('Imported', 'text-green-700 bg-green-50');
        break;
      case 'failed':
        leftIcon = badge('bg-red-100', `<svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`);
        right = `<button class="js-retry-one ui-button" data-type="secondary" data-size="small" data-name="${esc(name)}" ${isProcessing ? 'disabled' : ''}>Retry</button>`;
        sub = `<div class="text-xs text-red-600 mt-0.5 truncate">${esc(a.errorMessage || 'Import failed')}</div>`;
        break;
      case 'uploading':
        leftIcon = spinner();
        right = pill('Uploading…', 'text-[#005B96] bg-[#005B96]/5');
        break;
      case 'processing':
        leftIcon = spinner();
        right = pill('Creating…', 'text-[#005B96] bg-[#005B96]/5');
        break;
      default:
        leftIcon = badge('bg-gray-100', `<span class="w-2 h-2 rounded-full bg-gray-400"></span>`);
        right = pill('Queued', 'text-gray-500 bg-gray-100');
    }

    return `
      <div class="flex items-center gap-3 sm:gap-4 rounded-xl border p-3 sm:p-4 transition-colors ${failed ? 'border-red-200 bg-red-50/60' : 'border-gray-200 bg-white'}">
        <div class="flex-shrink-0">${leftIcon}</div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-gray-900 truncate">${esc(label)}</div>
          ${sub}
        </div>
        <div class="flex-shrink-0">${right}</div>
      </div>
    `;
  }

  function badge(bg, inner) {
    return `<span class="flex items-center justify-center w-7 h-7 rounded-full ${bg}">${inner}</span>`;
  }
  function spinner() {
    return `<span class="block w-6 h-6 border-2 border-[#005B96]/30 border-t-[#005B96] rounded-full animate-spin"></span>`;
  }
  function pill(text, cls) {
    return `<span class="inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${cls}">${text}</span>`;
  }

  // ------------------------------------------------------------- processing

  async function runProcessing(names) {
    if (!names.length) { checkCompletion(); return; }

    const token = state.credentials.apiToken;
    if (!token) {
      names.forEach(n => {
        if (state.accounts[n]) {
          state.accounts[n].status = 'failed';
          state.accounts[n].errorMessage = 'Authentication required. Please log in again.';
        }
      });
      render();
      checkCompletion();
      return;
    }

    isProcessing = true;
    render();

    const toProcess = names
      .map(n => ({ accountName: n, ...state.accounts[n] }))
      .filter(a => a && a.included);

    for (let i = 0; i < toProcess.length; i += BATCH_SIZE) {
      const batch = toProcess.slice(i, i + BATCH_SIZE);
      batch.forEach(acc => {
        if (state.accounts[acc.accountName]) state.accounts[acc.accountName].status = 'processing';
      });
      render();
      await processBatch(token, batch);
      if (i + BATCH_SIZE < toProcess.length) await new Promise(r => setTimeout(r, 1000));
    }

    isProcessing = false;
    render();
    checkCompletion();
  }

  // When every included account is imported (no failures), move on to the
  // thank-you page. Otherwise we stay here and surface the retry controls.
  function checkCompletion() {
    if (isProcessing) return;
    const c = counts();
    if (c.total > 0 && c.completed === c.total) {
      setTimeout(() => navigate('/thank-you'), 800);
    }
  }

  function onRetryAll() {
    if (isProcessing) return;
    const failedNames = includedEntries().filter(([, a]) => a.status === 'failed').map(([n]) => n);
    failedNames.forEach(n => { state.accounts[n].status = 'pending'; delete state.accounts[n].errorMessage; });
    render();
    runProcessing(failedNames);
  }

  function onRetryOne(name) {
    if (isProcessing || !state.accounts[name]) return;
    state.accounts[name].status = 'pending';
    delete state.accounts[name].errorMessage;
    render();
    runProcessing([name]);
  }

  async function processBatch(token, batch) {
    try {
      // Create accounts + upload transactions, applying the category/tag/priority
      // mappings chosen in the mapping wizard.
      const response = await monarchApi.createAccounts(token, batch, state.mappings);

      if (response.success || response.failed) {
        (response.failed || []).forEach(result => {
          const acc = batch.find(a => a.name === result.name || a.modifiedName === result.name);
          if (acc && state.accounts[acc.accountName]) {
            state.accounts[acc.accountName].status = 'failed';
            state.accounts[acc.accountName].errorMessage = result.error || 'Account creation failed';
          }
        });

        const successes = response.success || [];
        successes.forEach(result => {
          const acc = batch.find(a => a.name === result.name || a.modifiedName === result.name);
          if (acc && state.accounts[acc.accountName]) {
            state.accounts[acc.accountName].status = 'uploading';
            state.accounts[acc.accountName].sessionKeys = result.sessionKeys || [];
          }
        });
        render();

        await Promise.all(successes.map(async result => {
          const acc = batch.find(a => a.name === result.name || a.modifiedName === result.name);
          if (acc && state.accounts[acc.accountName] && result.sessionKeys) {
            try {
              await monitorUploadStatus(token, acc.accountName, result.sessionKeys);
              state.accounts[acc.accountName].status = 'completed';
            } catch (error) {
              state.accounts[acc.accountName].status = 'failed';
              state.accounts[acc.accountName].errorMessage = error.message || 'Transaction upload failed';
            }
            render();
          }
        }));

        // Anything still "processing" wasn't acknowledged by the server.
        batch.forEach(acc => {
          if (state.accounts[acc.accountName] && state.accounts[acc.accountName].status === 'processing') {
            state.accounts[acc.accountName].status = 'failed';
            state.accounts[acc.accountName].errorMessage = 'Account not processed by server';
          }
        });
      } else {
        const message = response.error || 'Failed to create accounts in Monarch Money';
        batch.forEach(acc => {
          if (state.accounts[acc.accountName]) {
            state.accounts[acc.accountName].status = 'failed';
            state.accounts[acc.accountName].errorMessage = message;
          }
        });
      }
    } catch (error) {
      batch.forEach(acc => {
        if (state.accounts[acc.accountName]) {
          state.accounts[acc.accountName].status = 'failed';
          state.accounts[acc.accountName].errorMessage = 'Network error. Please check your connection and try again.';
        }
      });
    }
    render();
  }

  async function monitorUploadStatus(token, accountName, sessionKeys) {
    await Promise.all(sessionKeys.map(async (sessionKey) => {
      let attempts = 0;
      let consecutiveErrors = 0;
      const maxAttempts = 60;          // ~5 minutes (60 * 5s)
      const maxConsecutiveErrors = 3;

      while (attempts < maxAttempts) {
        let statusResponse;
        try {
          statusResponse = await monarchApi.queryUploadStatus(token, sessionKey);
        } catch (error) {
          consecutiveErrors++;
          if (consecutiveErrors >= maxConsecutiveErrors) {
            throw new Error(`Couldn't verify upload status: ${error.message}`);
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
          continue;
        }

        if (statusResponse?.errors?.length) {
          throw new Error(statusResponse.errors.map(e => e.message).join('; '));
        }

        const session = statusResponse?.data?.uploadStatementSession;
        if (!session) {
          consecutiveErrors++;
          if (consecutiveErrors >= maxConsecutiveErrors) {
            throw new Error('Upload status unavailable from Monarch.');
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempts++;
          continue;
        }

        consecutiveErrors = 0;
        const status = session.status;
        if (status === 'completed') return;
        if (['failed', 'error', 'errored'].includes(status)) {
          const raw = session.errorMessage;
          const message = raw && raw !== 'None' ? raw : 'Monarch could not process the uploaded transactions.';
          throw new Error(message);
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
        attempts++;
      }

      throw new Error(`Upload status check timed out for account ${accountName}`);
    }));
  }
}

export default initMonarchCompleteView;
