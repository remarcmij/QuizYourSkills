//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createQuizTopWrapperView = (
  questionIndex,
  totalQuestions,
  correctCount
) => {
  const root = createElement('div', { class: 'quiz-top-wrapper' });

  const counter = createElement('p', {
    class: 'counter',
    text: `${questionIndex + 1}/${totalQuestions}`,
  });
  root.appendChild(counter);

  const corrects = createElement('p', {
    class: 'corrects',
    text: `${correctCount} Correct of ${totalQuestions}`,
  });
  root.appendChild(corrects);

  const timer = createElement('p', { class: 'timer' });
  root.appendChild(timer);

  const time = createElement('span', { class: 'time' });

  timer.appendChild(time);

  return { root, counter, corrects, timer, time };
};

export default createQuizTopWrapperView;
