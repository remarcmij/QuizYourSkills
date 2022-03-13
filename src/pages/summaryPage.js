import loadPage from '../lib/pageLoader.js';
import createMainView from '../views/mainView.js';
import createSummaryView from '../views/summaryView.js';
import createHomePage from './homePage.js';

function createSummaryPage(data) {
  const { root } = createMainView();

  const onRestart = () => loadPage(createHomePage);

  const summaryView = createSummaryView({ onRestart });
  root.appendChild(summaryView.root);

  summaryView.update(data);

  return { root };
}

export default createSummaryPage;
