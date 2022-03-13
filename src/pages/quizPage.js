import { quizData } from '../data.js';
import quizTimer from '../helpers/quizTimer.js';
import loadPage from '../lib/pageLoader.js';
import createQuizView from '../views/quizView.js';
import createSummaryPage from './summaryPage.js';

function createQuizPage() {
  const questions = [...quizData.questions].sort(() => Math.random() - 0.5);
  const data = { questions, questionIndex: 0, correctCount: 0, elapsed: 0 };

  const quizView = createQuizView();
  const intervalId = quizTimer(quizView.time);

  quizView.answersContainer.addEventListener('click', (event) => {
    const key = event.target.getAttribute('data-key');
    data.questions[data.questionIndex].selected = key;
    quizView.update('answered', data);
  });

  quizView.giveUpButton.addEventListener('click', () =>
    quizView.update('giveup', data)
  );

  quizView.nextButton.addEventListener('click', () => {
    data.questionIndex += 1;
    if (data.questionIndex < questions.length) {
      quizView.update('next', data);
    } else {
      clearInterval(intervalId);
      loadPage(createSummaryPage, data);
    }
  });

  quizView.update('next', data);
  return { root: quizView.root };
}

export default createQuizPage;
