import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

function createQuestionButtonView(props) {
  const { root } = createButtonsViewWrapper();

  const giveUpButton = createElement('button', {
    class: 'btn btn-giveup scale-hover',
    text: '<Give Up>',
    appendTo: root,
  });
  giveUpButton.addEventListener('click', props.onGiveUp);

  const nextButton = createElement('button', {
    class: 'btn btn-next scale-hover hidden',
    text: '<Next>',
    appendTo: root,
  });
  nextButton.addEventListener('click', props.onNext);

  const update = (action) => {
    switch (action) {
      case 'next':
        giveUpButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
        break;
      case 'update':
      case 'giveup':
        giveUpButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        break;
    }
  };

  return { root, update };
}

export default createQuestionButtonView;
