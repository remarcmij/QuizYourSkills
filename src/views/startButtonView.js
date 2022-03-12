//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createStartButtonView = () => {
  const startBtn = createElement('button', {
    type: 'submit',
    class: 'btn btn-start scale-hover',
    text: '<Start>',
  });
  return { root: startBtn };
};

export default createStartButtonView;
