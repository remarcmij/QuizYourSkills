import { createElement } from '../lib/domHelpers.js';

function createButtonsViewWrapper(parent) {
  const root = createElement('div', {
    class: 'btns-wrapper',
    appendTo: parent,
  });
  return { root };
}

export default createButtonsViewWrapper;
