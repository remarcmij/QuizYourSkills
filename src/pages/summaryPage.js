import loadPage from '../lib/pageLoader.js';
import createSummaryView from '../views/summaryView.js';
import createHomePage from './homePage.js';

function createSummaryPage(context) {
  const onRestart = () => loadPage(createHomePage);

  return createSummaryView({
    questions: context.questions,
    onRestart,
  });
}

export default createSummaryPage;
