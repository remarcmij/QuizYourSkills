//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createQuestionButtonView = () => {
  const root = createElement();

  const giveUpButton = createElement('button', {
    class: 'btn btn-giveup scale-hover',
    text: '<Give Up>',
  });
  root.appendChild(giveUpButton);

  const nextButton = createElement('button', {
    class: 'btn btn-next scale-hover hidden',
    text: '<Next>',
  });
  root.appendChild(nextButton);

  return { root, giveUpButton, nextButton };
};

export default createQuestionButtonView;
