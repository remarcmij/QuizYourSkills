//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createButtonsViewWrapper = () => {
  const root = createElement('div', { class: 'btns-wrapper' });
  return { root };
};

export default createButtonsViewWrapper;
