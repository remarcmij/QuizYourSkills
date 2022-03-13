import loadPage from '../lib/pageLoader.js';
import createHomeView from '../views/homeView.js';
import createQuizPage from './quizPage.js';
import { quizData } from '../data.js';

function createHomePage() {
  const onStart = () => {
    const shuffledQuestions = [...quizData.questions].sort(
      () => Math.random() - 0.5
    );

    // This context data object represents the application state and is passed
    // around by the page loader.
    const context = {
      questions: shuffledQuestions,
      questionIndex: 0,
      correctCount: 0,
      elapsed: 0,
    };

    loadPage(createQuizPage, context);
  };

  return createHomeView({ onStart });
}

export default createHomePage;
