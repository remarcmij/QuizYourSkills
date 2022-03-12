import createMainView from '../views/mainView.js';
import createQuizTopWrapperView from '../views/quizTopWrapperView.js';
import loadPage from '../lib/pageLoader.js';
import createQuestionView from '../views/questionView.js';
import createSummaryPage from './summaryPage.js';
import quizTimer from '../helpers/quizTimer.js';

const createQuestionPage = (data) => {
  const currentQuestion = data.questions[data.questionIndex];
  const { root: mainContainer } = createMainView();

  const topWrapperView = createQuizTopWrapperView(data);

  mainContainer.appendChild(topWrapperView.root);

  const questionView = createQuestionView(currentQuestion);
  mainContainer.appendChild(questionView.root);

  const onClick = (event) => {
    const selectedAnswer = event.target;
    const key = selectedAnswer.getAttribute('data-key');
    currentQuestion.selected = key;

    if (key === currentQuestion.correct) {
      mainContainer.classList.add('correct-container');
      selectedAnswer.classList.add('correct-answer');
      data.correctCount += 1;
    } else {
      mainContainer.classList.add('wrong-container');
      selectedAnswer.classList.add('wrong-answer');
      const correctAnswer = questionView.choices.find(
        (choice) => choice.getAttribute('data-key') === currentQuestion.correct
      );
      correctAnswer.classList.add('correct-answer');
    }
    topWrapperView.corrects.textContent = `${data.correctCount} Correct of ${data.questions.length}`;

    questionView.choices.forEach((choice) => {
      choice.style.pointerEvents = 'none';
    });

    questionView.nextButton.classList.remove('hidden');
    questionView.giveUpButton.classList.add('hidden');
  };

  questionView.answersList.addEventListener('click', onClick);

  questionView.giveUpButton.addEventListener('click', () =>
    console.log('give up')
  );

  questionView.nextButton.addEventListener('click', () => {
    data.questionIndex += 1;
    if (data.questionIndex < 2) {
      //questions.length) {
      loadPage(createQuestionPage, data);
    } else {
      loadPage(createSummaryPage, data);
    }
  });

  if (!data.intervalId) {
    data.intervalId = quizTimer(topWrapperView.time, data);
  }

  return { root: mainContainer };
};

export default createQuestionPage;
