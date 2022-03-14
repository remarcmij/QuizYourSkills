function createTopWrapperView() {
  let secs = 0;

  const root = document.createElement('div');
  root.setAttribute('class', 'quiz-top-wrapper');
  root.innerHTML = String.raw`
    <p class="counter"></p>
    <p class="corrects"></p>
    <p class="timer">
      <span class="time">00:00</span>
    </p>
  `;

  const counter = root.querySelector('.counter');
  const corrects = root.querySelector('.corrects');
  const time = root.querySelector('.time');

  const update = (context) => {
    counter.textContent = `${context.questionIndex + 1}/${
      context.questions.length
    }`;
    corrects.textContent = `${context.correctCount} Correct of ${context.questions.length}`;
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
