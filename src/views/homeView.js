import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

function createHomeView(parent) {
  const root = createElement('div', {
    class: 'title-wrapper',
    appendTo: parent,
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

  return { root, startBtn };
}

export default createHomeView;
