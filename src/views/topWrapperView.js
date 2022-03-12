import { createElement } from '../lib/domHelpers.js';
import createTimerView from './timerView.js';

// Needs to be global for the timer to continue during the quiz
const timerView = createTimerView();

const createTopWrapperView = ({ questions, questionIndex, correctCount }) => {
  const root = createElement('div', { class: 'quiz-top-wrapper' });

  const counter = createElement('p', {
    class: 'counter',
    text: `${questionIndex + 1}/${questions.length}`,
  });
  root.appendChild(counter);

  const corrects = createElement('p', { class: 'corrects' });
  root.appendChild(corrects);

  if (questionIndex > 0) {
    corrects.textContent = `${correctCount} Correct of ${questions.length}`;
  }

  root.appendChild(timerView.root);

  return {
    root,
    counter,
    corrects,
    time: timerView.time,
  };
};

export default createTopWrapperView;
