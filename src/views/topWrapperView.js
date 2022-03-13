import { createElement } from '../lib/domHelpers.js';

// Needs to be global for the timer to continue during the quiz
// const timerView = createTimerView();

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

  const timerContainer = createElement('p', { class: 'timer' });
  root.appendChild(timerContainer);

  const time = createElement('span', { class: 'time' });
  timerContainer.appendChild(time);

  return {
    root,
    counter,
    corrects,
    time,
  };
};

export default createTopWrapperView;
