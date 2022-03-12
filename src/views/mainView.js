import { createElement } from '../lib/domHelpers.js';

const createMainView = () => {
  const root = createElement('div', { class: 'hero centered' });
  return { root };
};

export default createMainView;
