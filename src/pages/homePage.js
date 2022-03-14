import loadPage from '../lib/pageLoader.js';
import createHomeView from '../views/homeView.js';
import createQuizPage from './quizPage.js';
import { quizData } from '../data.js';

function createHomePage() {
  const onStart = () => {
    const shuffledQuestions = [...quizData.questions].sort(
      () => Math.random() - 0.5
    );

    // This data dobject represents the application state and is passed
    // around by the page loader.
    const data = {
      questions: shuffledQuestions,
      questionIndex: 0,
      correctCount: 0,
      elapsed: 0,
    };

    loadPage(createQuizPage, data);
  };

  return createHomeView({ onStart });
}

export default createHomePage;
