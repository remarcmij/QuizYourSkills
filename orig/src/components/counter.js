let questionNumber = 0;
export function counter(shuffledQuestions) {
  questionNumber++;
  const totalQuestions = shuffledQuestions.length;

  document.getElementById(
    'counter'
  ).innerText = `${questionNumber}/${totalQuestions}`;
}
