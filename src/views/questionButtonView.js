import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

const createQuestionButtonView = () => {
  const { root } = createButtonsViewWrapper();

  const giveUpButton = createElement('button', {
    class: 'btn btn-giveup scale-hover',
    text: '<Give Up>',
    appendTo: root,
  });

  const nextButton = createElement('button', {
    class: 'btn btn-next scale-hover hidden',
    text: '<Next>',
    appendTo: root,
  });

  return { root, giveUpButton, nextButton };
};

export default createQuestionButtonView;
