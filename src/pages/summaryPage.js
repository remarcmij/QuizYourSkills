import loadPage from '../lib/pageLoader.js';
import createMainView from '../views/mainView.js';
import createSummaryView from '../views/summaryView.js';
import createHomePage from './homePage.js';

function createSummaryPage(data) {
  clearInterval(data.intervalId);
  const { root } = createMainView();
  const { restartButton } = createSummaryView(root, data.questions);
  restartButton.addEventListener('click', () => loadPage(createHomePage));
  return { root };
}

export default createSummaryPage;
