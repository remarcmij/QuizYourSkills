import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

function createHomeView(props) {
  const root = createElement('div', {
    class: 'title-wrapper',
  });
  createElement('h1', {
    class: 'typewriter-title',
    text: 'QuizYourSkills',
    appendTo: root,
  });
  createElement('h2', {
    class: 'unicode',
    text: '\u261f',
    appendTo: root,
  });

  const { root: buttonsWrapper } = createButtonsViewWrapper(root);

  const startBtn = createElement('button', {
    type: 'submit',
    class: 'btn btn-start scale-hover',
    text: '<Start>',
    appendTo: buttonsWrapper,
  });
  startBtn.addEventListener('click', props.onStart);

  return { root };
}

export default createHomeView;
