let questionNumber = 0;

export function counter(elem, shuffledQuestions) {
  questionNumber++;
  const totalQuestions = shuffledQuestions.length;
  elem.textContent = `${questionNumber}/${totalQuestions}`;
}
