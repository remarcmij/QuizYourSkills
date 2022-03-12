import { createElement } from '../lib/domHelpers.js';

const createTimerView = () => {
  const root = createElement('p', { class: 'timer' });
  const time = createElement('span', { class: 'time' });
  root.appendChild(time);
  return { root, time };
};

export default createTimerView;
