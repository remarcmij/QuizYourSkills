import loadPage from './lib/pageLoader.js';
import createHomePage from './pages/homePage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  const pageContainer = document.createElement('div');
  pageContainer.id = 'page-root';
  appRoot.appendChild(pageContainer);

  loadPage(createHomePage);
}

window.addEventListener('load', loadApp);
