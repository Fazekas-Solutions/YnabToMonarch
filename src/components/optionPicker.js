/**
 * Modal option picker — a searchable, grouped list shown in a centered popup.
 *
 * Used by the mapping wizard's floating bulk bar to pick one specific existing
 * Monarch option (e.g. a category) and apply it to every selected row at once,
 * which the per-row dropdowns can't do in bulk.
 *
 * Usage:
 *   openOptionPicker({ title, subtitle, groups, actions, searchPlaceholder, onSelect });
 *
 * `groups` matches the dropdown config shape so the same data drives both:
 *   [{ label?, options: [{ value, label, icon?, swatch? }] }]
 *
 * `actions` are link-style choices pinned to a footer below the (searchable)
 * list — e.g. "Add as a new category" — that aren't part of the filtered set:
 *   [{ value, label }]
 *
 * `onSelect(value)` fires once when an option or action is chosen; the popup
 * then closes.
 */

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Emoji icon or color swatch + label — mirrors the dropdown's option rendering.
function optionLead(option) {
  if (option.icon) {
    return `<span class="w-5 flex-shrink-0 text-center">${esc(option.icon)}</span>`;
  }
  if (option.swatch) {
    return `<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${esc(option.swatch)}"></span>`;
  }
  return '';
}

export function openOptionPicker({ title, subtitle = '', groups = [], actions = [], searchPlaceholder = 'Search…', onSelect = () => {} }) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50 opacity-0 transition-opacity duration-200 p-4';
  const actionsHtml = actions.length ? `
    <div class="border-t border-gray-100 p-2 flex-shrink-0">
      ${actions.map(action => `
        <button type="button" class="js-pick-action w-full text-left px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                data-value="${esc(action.value)}">${esc(action.label)}</button>
      `).join('')}
    </div>
  ` : '';
  overlay.innerHTML = `
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col max-h-[80vh]">
      <div class="p-5 sm:p-6 pb-3 flex-shrink-0">
        <h2 class="text-lg sm:text-xl font-bold mb-1">${esc(title)}</h2>
        ${subtitle ? `<p class="text-sm text-gray-500 mb-3">${esc(subtitle)}</p>` : ''}
        <input type="text" id="pickerSearch" autocomplete="off"
               class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="${esc(searchPlaceholder)}">
      </div>
      <div id="pickerList" class="px-2 pb-2 overflow-y-auto flex-1"></div>
      ${actionsHtml}
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('opacity-100'));

  // Lock scrolling on the page behind the popup so the wheel/touch only moves
  // the list inside it. Restored on close.
  const prevBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const search = overlay.querySelector('#pickerSearch');
  const list = overlay.querySelector('#pickerList');

  function close() {
    document.body.style.overflow = prevBodyOverflow;
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.remove(), 200);
  }

  overlay.querySelectorAll('.js-pick-action').forEach(btn => {
    btn.addEventListener('click', () => {
      close();
      onSelect(btn.dataset.value);
    });
  });

  function renderList(query) {
    const q = query.trim().toLowerCase();
    const filtered = groups
      .map(group => ({
        label: group.label,
        options: group.options.filter(o => !q || String(o.label).toLowerCase().includes(q)),
      }))
      .filter(group => group.options.length > 0);

    if (filtered.length === 0) {
      list.innerHTML = `<div class="text-center text-sm text-gray-400 py-8">No matches</div>`;
      return;
    }

    list.innerHTML = filtered.map(group => `
      ${group.label ? `<div class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">${esc(group.label)}</div>` : ''}
      ${group.options.map(option => `
        <button type="button"
                class="js-pick w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg hover:bg-gray-50 text-gray-800"
                data-value="${esc(option.value)}">
          ${optionLead(option)}<span class="truncate">${esc(option.label)}</span>
        </button>
      `).join('')}
    `).join('');

    list.querySelectorAll('.js-pick').forEach(btn => {
      btn.addEventListener('click', () => {
        close();
        onSelect(btn.dataset.value);
      });
    });
  }

  search.addEventListener('input', () => renderList(search.value));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  renderList('');
  search.focus();
}
