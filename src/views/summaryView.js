import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

function createSummaryView(parent, questions) {
  const root = createElement('div', {
    class: 'game-end-root',
    appendTo: parent,
  });

  const title = createElement('h3', {
    class: 'end-msg typewriter-title',
    text: 'Thank you for taking JavaScript Quiz!',
  });
  root.appendChild(title);

  const container = createElement('div', { class: 'summary' });
  root.appendChild(container);

  const buttonsWrapper = createButtonsViewWrapper(root);
  const restartButton = createElement('button', {
    type: 'button',
    class: 'btn btn-restart scale-hover',
    text: '<Restart Quiz>',
    appendTo: buttonsWrapper.root,
  });

  questions.forEach((question) => {
    const correctAnswer = question.answers[question.correct];
    const chosenAnswer = question.answers[question.selected];
    const h3 = createElement('h3', { class: 'summary-question' });
    container.appendChild(h3);
    h3.appendChild(createElement('div', { text: question.text }));
    h3.appendChild(
      createElement('div', { text: `correct answer is: ${correctAnswer}` })
    );
    h3.appendChild(
      createElement('div', { text: `chosen answer is: ${chosenAnswer}` })
    );
  });

  return { root, restartButton };
}

export default createSummaryView;
