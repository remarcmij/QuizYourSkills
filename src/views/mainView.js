import { createElement } from '../lib/domHelpers.js';

function createMainView(parent) {
  const root = createElement('div', {
    class: 'hero centered',
    appendTo: parent,
  });
  return { root };
}

export default createMainView;
