import state from '../../state.js';
import { navigate, persistState } from '../../router.js';
import parseYNABZip from '../../services/ynabParser.js';
import { openModal, closeModal } from '../../components/modal.js';
import { renderButtons } from '../../components/button.js';

export default function initUploadView() {
  const dropzone = document.getElementById('dropzone');
  const manualFileInput = document.getElementById('manualFileInput');
  const dropzoneIdle = document.getElementById('dropzoneIdle');
  const dropzoneLoading = document.getElementById('dropzoneLoading');
  const loadingFileName = document.getElementById('loadingFileName');
  const errorMessage = document.getElementById('errorMessage');
  const errorMessageText = document.getElementById('errorMessageText');
  const manualImportInfoModalButton = document.getElementById('manualImportInfoModalButton');
  const closeManualImportInfoModal = document.getElementById('closeManualImportInfoModal');

  renderButtons();

  manualImportInfoModalButton?.addEventListener('click', () => openModal('manualImportInfoModal'));
  closeManualImportInfoModal?.addEventListener('click', () => closeModal('manualImportInfoModal'));

  // The browser opens dropped files as a new page by default; suppress that
  // everywhere so a near-miss drop doesn't navigate away from the flow.
  ['dragover', 'drop'].forEach((evt) =>
    window.addEventListener(evt, (e) => e.preventDefault())
  );

  let dragDepth = 0; // dragenter/leave fire per child; count to avoid flicker.

  dropzone?.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragDepth += 1;
    dropzone.classList.add('is-dragging');
  });

  dropzone?.addEventListener('dragover', (e) => e.preventDefault());

  dropzone?.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) dropzone.classList.remove('is-dragging');
  });

  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDepth = 0;
    dropzone.classList.remove('is-dragging');
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  });

  manualFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });

  function showError(message) {
    errorMessageText.textContent = message;
    errorMessage.classList.remove('hidden');
    // Return the dropzone to its idle prompt so the user can try again.
    dropzoneLoading.classList.add('hidden');
    dropzoneLoading.classList.remove('flex');
    dropzoneIdle.classList.remove('hidden');
    dropzoneIdle.classList.add('flex');
    manualFileInput.value = ''; // allow re-selecting the same file
  }

  function showLoading(fileName) {
    errorMessage.classList.add('hidden');
    loadingFileName.textContent = fileName;
    dropzoneIdle.classList.add('hidden');
    dropzoneIdle.classList.remove('flex');
    dropzoneLoading.classList.remove('hidden');
    dropzoneLoading.classList.add('flex');
  }

  async function handleFile(file) {
    // Determine whether this looks like a YNAB ZIP export. The parser is the
    // ultimate authority, so the gate here is intentionally permissive: any
    // ZIP-ish extension/MIME, or simply a file larger than 1KB.
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    const isZipByExtension =
      fileName.endsWith('.zip') ||
      fileName.endsWith('.bin') ||
      fileName.includes('ynab') ||
      fileName.includes('register') ||
      fileName.includes('export');

    const isZipByMimeType = [
      'application/zip',
      'application/x-zip-compressed',
      'application/octet-stream',
      'application/x-zip',
      'multipart/x-zip',
      'application/x-compressed',
      'application/binary',
    ].includes(fileType);

    const isPotentialZip = isZipByExtension || isZipByMimeType || file.size > 1000;

    if (!isPotentialZip) {
      showError('That doesn’t look like a YNAB export. Please upload the .zip file you exported from YNAB.');
      return;
    }

    showLoading(file.name);

    try {
      const accounts = await parseYNABZip(file);
      state.accounts = accounts;
      persistState();

      if (accounts && Object.keys(accounts).length > 0) {
        // Skip route guards since we just set the accounts.
        navigate('/review', false, true);
      } else {
        showError('We couldn’t find any accounts in that file. Make sure it’s your full YNAB export.');
      }
    } catch (err) {
      showError(
        'We couldn’t read that file. Please make sure it’s a valid YNAB .zip export containing register.csv and plan.csv.'
      );
      console.error(err);
    }
  }
}
