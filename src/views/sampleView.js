//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createSampleView = () => {
  const root = createElement('div', { class: 'sampe' });
  return { root };
};

export default createSampleView;
