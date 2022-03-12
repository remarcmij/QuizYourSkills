//@ts-check
import { createElement } from '../lib/domHelpers.js';
import createButtonsViewWrapper from './buttonsWrapperView.js';
import createStartButtonView from './startButtonView.js';

//@ts-check
const createHomeView = () => {
  const root = createElement('div', { class: 'title-wrapper' });

  root.appendChild(
    createElement('h1', {
      class: 'typewriter-title',
      text: 'QuizYourSkills',
    })
  );

  root.appendChild(
    createElement('h2', {
      class: 'unicode',
      text: '\u261f',
    })
  );

  const { root: buttonsWrapper } = createButtonsViewWrapper();
  root.appendChild(buttonsWrapper);

  const { root: startBtn } = createStartButtonView();
  root.appendChild(startBtn);

  return { root, startBtn };
};

export default createHomeView;
