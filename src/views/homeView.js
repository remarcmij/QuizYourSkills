import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';

const createHomeView = () => {
  const root = createElement('div', { class: 'title-wrapper' });

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

  const { root: buttonsWrapper } = createButtonsViewWrapper();
  root.appendChild(buttonsWrapper);

  const startBtn = createElement('button', {
    type: 'submit',
    class: 'btn btn-start scale-hover',
    text: '<Start>',
    appendTo: root,
  });

  return { root, startBtn };
};

export default createHomeView;
