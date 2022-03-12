import createSummaryView from '../views/summaryView.js';
import createMainView from '../views/mainView.js';

const createSummaryPage = (questions) => {
  const { root } = createMainView();

  const summaryView = createSummaryView(questions);
  root.appendChild(summaryView.root);

  return { root };
};

export default createSummaryPage;
