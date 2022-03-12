import createMainView from '../views/mainView.js';
import createQuizTopWrapperView from '../views/quizTopWrapperView.js';
import questionTimer from '../helpers/timer.js';
import loadPage from '../lib/pageLoader.js';
import createQuestionView from '../views/questionView.js';
import createSummaryPage from './summaryPage.js';

const createQuestionPage = ({ questions, questionIndex, correctCount }) => {
  const currentQuestion = questions[questionIndex];
  const { root: mainContainer } = createMainView();

  const topWrapperView = createQuizTopWrapperView(
    questionIndex,
    questions.length,
    correctCount
  );
  mainContainer.appendChild(topWrapperView.root);

  questionTimer(topWrapperView.time);

  const questionView = createQuestionView(currentQuestion);
  mainContainer.appendChild(questionView.root);

  const onClick = (event) => {
    const selectedAnswer = event.target;
    const key = selectedAnswer.getAttribute('data-key');
    currentQuestion.selected = key;

    if (key === currentQuestion.correct) {
      mainContainer.classList.add('correct-container');
      selectedAnswer.classList.add('correct-answer');
      correctCount += 1;
    } else {
      mainContainer.classList.add('wrong-container');
      selectedAnswer.classList.add('wrong-answer');
      const correctAnswer = questionView.choices.find(
        (choice) => choice.getAttribute('data-key') === currentQuestion.correct
      );
      correctAnswer.classList.add('correct-answer');
    }
    topWrapperView.corrects.textContent = `${correctCount} Correct of ${questions.length}`;

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
    questionIndex += 1;
    if (questionIndex < 2) {
      //questions.length) {
      loadPage(createQuestionPage, { questions, questionIndex, correctCount });
    } else {
      loadPage(createSummaryPage, questions);
    }
  });

  currentQuestion.links.forEach((link) => {
    questionView.hintsText.classList.remove('hidden');
    const aElement = document.createElement('a');
    aElement.classList.add('link');
    aElement.innerText = link.text;
    aElement.href = link.href;
    aElement.setAttribute('target', '_blank');
    questionView.linksWrapper.append(aElement);
  });

  return { root: mainContainer };
};

export default createQuestionPage;
