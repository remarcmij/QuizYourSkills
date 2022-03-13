import { createElement } from '../lib/domHelpers.js';

function createTopWrapperView() {
  let secs = 0;

  const root = createElement('div', {
    class: 'quiz-top-wrapper',
  });
  const counter = createElement('p', {
    class: 'counter',
    appendTo: root,
  });
  const corrects = createElement('p', { class: 'corrects', appendTo: root });
  const timerContainer = createElement('p', { class: 'timer', appendTo: root });
  const time = createElement('span', {
    class: 'time',
    text: '00:00',
    appendTo: timerContainer,
  });

  const update = (action, data) => {
    counter.textContent = `${data.questionIndex + 1}/${data.questions.length}`;
    corrects.textContent = `${data.correctCount} Correct of ${data.questions.length}`;
  };

  const updateTimer = () => {
    secs += 1;
    const pad = (val) => (val > 9 ? val : '0' + val);
    time.textContent = `${pad(parseInt(secs / 60, 10))}:${pad(++secs % 60)}`;
  };

  return {
    root,
    update,
    updateTimer,
  };
}

export default createTopWrapperView;
