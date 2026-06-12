/**
 * Custom "premium" dropdown used by the mapping wizard.
 *
 * Native <select> can't show grouped options with icons, color swatches, or
 * link-style footer actions, so this renders a button + panel and manages
 * open/close + selection itself.
 *
 * Usage:
 *   container.innerHTML = renderDropdown({ key, value, groups, actions });
 *   initDropdowns(container, (key, value) => { ... });
 *
 * Config shape:
 *   {
 *     key: string,                  // identifies the dropdown (data-key)
 *     value: string,                // currently selected value
 *     placeholder?: string,
 *     groups: [{ label?, options: [{ value, label, icon?, swatch? }] }],
 *     actions?: [{ value, label }], // link-style footer actions
 *   }
 */

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Icon (emoji) or color swatch + label, used in both the trigger and options.
function optionInner(option) {
  let lead = '';
  if (option.icon) {
    lead = `<span class="cdd-icon w-5 flex-shrink-0 text-center">${esc(option.icon)}</span>`;
  } else if (option.swatch) {
    lead = `<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${esc(option.swatch)}"></span>`;
  }
  return `${lead}<span class="truncate">${esc(option.label)}</span>`;
}

function findOption(config, value) {
  for (const group of config.groups || []) {
    for (const option of group.options) {
      if (option.value === value) return option;
    }
  }
  for (const action of config.actions || []) {
    if (action.value === value) return { value: action.value, label: action.label };
  }
  // Fall back to displaying the raw value so a selection is never blank.
  return value ? { value, label: value } : null;
}

export function renderDropdown(config) {
  const selected = findOption(config, config.value);
  const triggerInner = selected
    ? optionInner(selected)
    : `<span class="text-gray-400">${esc(config.placeholder || 'Select…')}</span>`;

  const groupsHtml = (config.groups || []).map(group => `
    ${group.label ? `<div class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 border-y border-gray-200">${esc(group.label)}</div>` : ''}
    ${group.options.map(option => {
      const isSelected = option.value === config.value;
      return `
        <button type="button"
                class="cdd-option w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-gray-50 ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800'}"
                data-value="${esc(option.value)}"
                data-label="${esc(option.label)}"
                data-icon="${esc(option.icon || '')}"
                data-swatch="${esc(option.swatch || '')}">
          ${optionInner(option)}
        </button>
      `;
    }).join('')}
  `).join('');

  const actionsHtml = (config.actions || []).length ? `
    <div class="cdd-actions sticky bottom-0 bg-white border-t border-gray-100">
      ${config.actions.map(action => `
        <button type="button"
                class="cdd-option w-full text-left px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-medium"
                data-value="${esc(action.value)}"
                data-label="${esc(action.label)}"
                data-icon="">
          ${esc(action.label)}
        </button>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="cdd relative" data-key="${esc(config.key)}">
      <button type="button" class="cdd-trigger w-full flex items-center justify-between gap-2 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition">
        <span class="cdd-label flex items-center gap-2 min-w-0">${triggerInner}</span>
        <svg class="cdd-chevron w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div class="cdd-panel hidden absolute left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto py-1">
        ${groupsHtml}
        ${actionsHtml}
      </div>
    </div>
  `;
}

function closeAllPanels(scope) {
  scope.querySelectorAll('.cdd-panel:not(.hidden)').forEach(panel => {
    panel.classList.add('hidden');
    const chevron = panel.parentElement?.querySelector('.cdd-chevron');
    if (chevron) chevron.classList.remove('rotate-180');
  });
}

let documentCloseAttached = false;

/**
 * Wires every dropdown inside `root`. Calls `onSelect(key, value)` when an
 * option is chosen.
 */
export function initDropdowns(root, onSelect) {
  if (!documentCloseAttached) {
    document.addEventListener('click', () => closeAllPanels(document));
    documentCloseAttached = true;
  }

  root.querySelectorAll('.cdd').forEach(dropdown => {
    const trigger = dropdown.querySelector('.cdd-trigger');
    const panel = dropdown.querySelector('.cdd-panel');
    const chevron = dropdown.querySelector('.cdd-chevron');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = panel.classList.contains('hidden');
      closeAllPanels(document);
      if (willOpen) {
        panel.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });

    panel.querySelectorAll('.cdd-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const { value, label, icon, swatch } = option.dataset;
        const labelEl = trigger.querySelector('.cdd-label');
        labelEl.innerHTML = optionInner({ value, label, icon, swatch });
        panel.classList.add('hidden');
        chevron?.classList.remove('rotate-180');
        onSelect(dropdown.dataset.key, value);
      });
    });
  });
}
