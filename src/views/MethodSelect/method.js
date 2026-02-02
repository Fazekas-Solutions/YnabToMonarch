import { navigate } from '../../router.js';
import { renderPageLayout } from '../../components/pageLayout.js';
import Accounts from '../../schemas/accounts.js';

export default async function initMethodSelectView() {
  renderPageLayout({
    navbar: {
      showBackButton: true,
      showDataButton: true
    },
    header: {
      title: 'Step 4: Choose Your Migration Method',
      description: 'Either manually import your accounts into Monarch Money yourself or let us automate the process.',
      containerId: 'pageHeader'
    }
  });

  const accounts = new Accounts();
  await accounts.loadFromDb();

  const manualFileCountElement = document.getElementById('manualFileCount');
  manualFileCountElement.textContent = accounts.length();

  document.getElementById('manualImportCard').addEventListener('card-click', () => {
    navigate('/manual');
  });

  document.getElementById('autoImportCard').addEventListener('card-click', () => {
    navigate('/login');
  });
}
