function createTopWrapperView() {
  let secs = 0;

  const root = document.createElement('div');
  root.className = 'quiz-top-wrapper';
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

  const update = (data) => {
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
