import { createElement } from '../lib/domHelpers.js';

function createTopWrapperView(parent) {
  const root = createElement('div', {
    class: 'quiz-top-wrapper',
    appendTo: parent,
  });
  const counter = createElement('p', {
    class: 'counter',
    appendTo: root,
  });
  const corrects = createElement('p', { class: 'corrects', appendTo: root });
  const timerContainer = createElement('p', { class: 'timer', appendTo: root });
  const time = createElement('span', {
    class: 'time',
    appendTo: timerContainer,
  });

  return {
    root,
    counter,
    corrects,
    time,
  };
}

export default createTopWrapperView;
