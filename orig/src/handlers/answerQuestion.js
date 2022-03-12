export function answerQuestion(event, shuffledQuestions, data, correctAnswer) {
  const item = event.target;
  document.getElementById('btn-next').classList.remove('hidden');
  document.getElementById('btn-giveup').classList.add('hidden');
  let chosenAnswer = item.getAttribute('data-choose');
  shuffledQuestions[data.currentQuestionIndex].selected = chosenAnswer;
  document.querySelectorAll('.answer').forEach((answer) => {
    answer.style.pointerEvents = 'none';
  });

  if (chosenAnswer === shuffledQuestions[data.currentQuestionIndex].correct) {
    item.style.pointerEvents = 'none';
    item.classList.add('correct-answer');
    document
      .getElementById('user-interface')
      .classList.add('correct-container');
    data.correctAnswersCounter++;
  } else {
    item.classList.add('wrong-answer');
    correctAnswer.classList.add('correct-answer');
    document.getElementById('user-interface').classList.add('wrong-container');
  }
  document.getElementById(
    'corrects'
  ).innerText = `${data.correctAnswersCounter} Correct of ${shuffledQuestions.length}`;
}
