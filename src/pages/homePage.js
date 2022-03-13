import loadPage from '../lib/pageLoader.js';
import createHomeView from '../views/homeView.js';
import createMainView from '../views/mainView.js';
import createQuizPage from './quizPage.js';
import { quizData } from '../data.js';

const createHomePage = () => {
  const { root } = createMainView();

  const homeView = createHomeView();
  root.appendChild(homeView.root);

  homeView.startBtn.addEventListener('click', () => {
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
  });

  return { root };
};

export default createHomePage;
