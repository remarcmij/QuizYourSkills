import createMainView from '../views/mainView.js';
import createTopWrapperView from '../views/topWrapperView.js';
import loadPage from '../lib/pageLoader.js';
import createQuizView from '../views/quizView.js';
import createSummaryPage from './summaryPage.js';
import quizTimer from '../helpers/quizTimer.js';

const createQuizPage = (data) => {
  const { root } = createMainView();

  const topWrapperView = createTopWrapperView(data);
  data.intervalId = quizTimer(topWrapperView.time, data);

  root.appendChild(topWrapperView.root);

  const questionView = createQuizView();
  root.appendChild(questionView.root);

  const onClick = (event) => {
    const currentQuestion = data.questions[data.questionIndex];
    const selectedAnswerElement = event.target;
    currentQuestion.selected = selectedAnswerElement.getAttribute('data-key');

    if (currentQuestion.selected === currentQuestion.correct) {
      root.classList.add('correct-container');
      data.correctCount += 1;
    } else {
      root.classList.add('wrong-container');
    }

    topWrapperView.corrects.textContent = `${data.correctCount} Correct of ${data.questions.length}`;

    questionView.update('update', data);
  };

  questionView.answersList.addEventListener('click', onClick);

  questionView.giveUpButton.addEventListener('click', () =>
    console.log('give up')
  );

  questionView.nextButton.addEventListener('click', () => {
    data.questionIndex += 1;
    if (data.questionIndex < 2) {
      //questions.length) {fx
      questionView.update('new', data);
    } else {
      loadPage(createSummaryPage, data);
    }
  });

  questionView.update('new', data);
  return { root };
};

export default createQuizPage;
