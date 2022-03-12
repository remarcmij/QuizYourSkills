import createMainView from '../views/mainView.js';
import createTopWrapperView from '../views/topWrapperView.js';
import loadPage from '../lib/pageLoader.js';
import createQuestionView from '../views/questionView.js';
import createSummaryPage from './summaryPage.js';
import quizTimer from '../helpers/quizTimer.js';

const createQuestionPage = (data) => {
  const { root: mainContainer } = createMainView();

  const topWrapperView = createTopWrapperView(data);

  mainContainer.appendChild(topWrapperView.root);

  const questionView = createQuestionView();
  mainContainer.appendChild(questionView.root);

  questionView.update('new', data);

  const onClick = (event) => {
    const currentQuestion = data.questions[data.questionIndex];
    const selectedAnswer = event.target;
    const selected = selectedAnswer.getAttribute('data-key');
    currentQuestion.selected = selected;

    if (selected === currentQuestion.correct) {
      mainContainer.classList.add('correct-container');
      data.correctCount += 1;
    } else {
      mainContainer.classList.add('wrong-container');
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
      // loadPage(createQuestionPage, data);
      questionView.update('new', data);
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
