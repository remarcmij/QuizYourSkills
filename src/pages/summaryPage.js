import loadPage from '../lib/pageLoader.js';
import createSummaryView from '../views/summaryView.js';
import createHomePage from './homePage.js';

function createSummaryPage(data) {
  const onRestart = () => loadPage(createHomePage);

  return createSummaryView({
    questions: data.questions,
    onRestart,
  });
}

export default createSummaryPage;
