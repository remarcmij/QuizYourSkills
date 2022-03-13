import { quizData } from '../data.js';
import loadPage from '../lib/pageLoader.js';
import createQuizView from '../views/quizView.js';
import createSummaryPage from './summaryPage.js';

function createQuizPage() {
  const questions = [...quizData.questions].sort(() => Math.random() - 0.5);
  const data = { questions, questionIndex: 0, correctCount: 0, elapsed: 0 };

  const onAnswerClick = (event) => {
    const key = event.target.getAttribute('data-key');
    data.questions[data.questionIndex].selected = key;
    quizView.update('update', data);
  };

  const onGiveUp = () => {
    quizView.update('giveup', data);
  };

  const onNext = () => {
    data.questionIndex += 1;
    if (data.questionIndex < 2) {
      // < questions.length) {
      quizView.update('next', data);
    } else {
      clearInterval(intervalId);
      loadPage(createSummaryPage, data);
    }
  };

  const quizView = createQuizView({ onAnswerClick, onNext, onGiveUp });
  const intervalId = setInterval(quizView.updateTimer, 1000);

  quizView.update('next', data);

  return { root: quizView.root };
}

export default createQuizPage;
