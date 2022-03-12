export function displayQuizSummary(QuizTimer, shuffledQuestions) {
  document.getElementById('btn-restart').classList.remove('hidden');
  document.getElementById('end-msg').classList.remove('hidden');
  document.getElementById('counter').classList.add('hidden');
  document.querySelector('.corrects').classList.toggle('end-timer');
  document.getElementById('quiz-bottom-wrapper').classList.add('hidden');
  document.getElementById('btn-next').classList.add('hidden');
  document.getElementById('btn-giveup').classList.add('hidden');

  clearInterval(QuizTimer);
  shuffledQuestions.forEach((element) => {
    let rightAnswerKey = element.correct;
    let rightAnswerValue = element.answers[rightAnswerKey];
    let chosenAnswerKey = element.selected;
    let chosenAnswerValue = element.answers[chosenAnswerKey];
    const h3Element = document.createElement('h3');
    h3Element.classList.add('summary-question');
    h3Element.innerHTML = `${element.text}<br>correct answer is:
                           ${rightAnswerValue}<br>chosen answer is:
                           ${chosenAnswerValue}<br>`;
    document.getElementById('summary').append(h3Element);
  });
}
