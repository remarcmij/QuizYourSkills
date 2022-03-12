//@ts-check
import { createElement } from './lib/domHelpers.js';
import loadPage from './lib/pageLoader.js';
import createHomePage from './pages/homePage.js';

const loadApp = () => {
  const appRoot = document.getElementById('app-root');

  const pageContainer = createElement('div', { id: 'page-root' });
  appRoot.appendChild(pageContainer);

  loadPage(createHomePage);
};

window.addEventListener('load', loadApp);
