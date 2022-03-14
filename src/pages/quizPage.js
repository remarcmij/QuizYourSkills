import loadPage from '../lib/pageLoader.js';
import createQuizView from '../views/quizView.js';
import createSummaryPage from './summaryPage.js';

function createQuizPage(data) {
  // Event handler for a click on an answer option
  const onAnswerClick = (event) => {
    const key = event.target.getAttribute('data-key');
    data.questions[data.questionIndex].selected = key;
    data.action = 'update';
    quizView.update(data);
  };

  // Event handler for the Give Up button
  const onGiveUp = () => {
    data.action = 'giveup';
    quizView.update(data);
  };

  // Event handler for the Next button
  const onNext = () => {
    data.questionIndex += 1;
    if (data.questionIndex < data.questions.length) {
      data.action = 'next';
      quizView.update(data);
    } else {
      clearInterval(intervalId);
      loadPage(createSummaryPage, data);
    }
  };

  // Create the quiz view and pass the event handlers as props.
  const quizView = createQuizView({ onAnswerClick, onNext, onGiveUp });

  // Start the timer that update the time indicator in the quiz view.
  const intervalId = setInterval(quizView.updateTimer, 1000);

  // Start the first question
  data.action = 'next';
  quizView.update(data);

  return { root: quizView.root };
}

export default createQuizPage;
