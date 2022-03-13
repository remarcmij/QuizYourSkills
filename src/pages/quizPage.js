import loadPage from '../lib/pageLoader.js';
import createQuizView from '../views/quizView.js';
import createSummaryPage from './summaryPage.js';

function createQuizPage(context) {
  // Event handler for a click on an answer option
  const onAnswerClick = (event) => {
    const key = event.target.getAttribute('data-key');
    context.questions[context.questionIndex].selected = key;
    quizView.update('update', context);
  };

  // Event handler for the Give Up button
  const onGiveUp = () => {
    quizView.update('giveup', context);
  };

  // Event handler for the Next button
  const onNext = () => {
    context.questionIndex += 1;
    if (context.questionIndex < context.questions.length) {
      quizView.update('next', context);
    } else {
      clearInterval(intervalId);
      loadPage(createSummaryPage, context);
    }
  };

  // Create the quiz view and pass the event handlers as props.
  const quizView = createQuizView({ onAnswerClick, onNext, onGiveUp });

  // Start the timer that update the time indicator in the quiz view.
  const intervalId = setInterval(quizView.updateTimer, 1000);

  // Start the first question
  quizView.update('next', context);

  return { root: quizView.root };
}

export default createQuizPage;
