function createSummaryView(props) {
  const root = document.createElement('div');
  root.className = 'hero centered';
  root.innerHTML = String.raw`
    <div class="game-end-wrapper">
      <h3 class="end-msg typewriter-title">
        Thank you for taking JavaScript Quiz!
      </h3>
      <div class="summary"></div>
    </div>
    <div class="btns-wrapper">
      <button type="submit" class="btn btn-restart scale-hover"">
        &lt;Restart Quiz&gt;
      </button>
    </div>
  `;

  const container = root.querySelector('.summary');
  const btnRestart = root.querySelector('.btn-restart');
  btnRestart.addEventListener('click', props.onRestart);

  props.questions.forEach((question) => {
    const correctAnswer = question.answers[question.correct];
    const chosenAnswer = question.answers[question.selected];
    const h3 = document.createElement('h3');
    h3.className = 'summary-question';
    container.appendChild(h3);
    h3.innerHTML = String.raw`
      <div>${question.text}</div>
      <div>correct answer is: ${correctAnswer}</div>
      <div>chosen answer is: ${chosenAnswer}</div>
    `;
  });

  return { root };
}

export default createSummaryView;
