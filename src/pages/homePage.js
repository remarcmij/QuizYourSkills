import loadPage from '../lib/pageLoader.js';
import createHomeView from '../views/homeView.js';
import createMainView from '../views/mainView.js';
import createQuizPage from './quizPage.js';
import { quizData } from '../data.js';

function createHomePage() {
  const { root } = createMainView();

  const onStart = () => {
    const shuffledQuestions = [...quizData.questions].sort(
      () => Math.random() - 0.5
    );

    const data = {
      questions: shuffledQuestions,
      questionIndex: 0,
      correctCount: 0,
      elapsed: 0,
    };

    loadPage(createQuizPage, data);
  };

  const homeView = createHomeView({ onStart });
  root.appendChild(homeView.root);

  return { root };
}

export default createHomePage;
