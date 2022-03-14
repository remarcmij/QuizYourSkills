import createTopWrapperView from '../views/topWrapperView.js';
import createQuestionButtonView from './questionButtonView.js';

const getCurrentQuestion = (data) => data.questions[data.questionIndex];

function renderAnswerElements(answersList, question) {
  answersList.innerHTML = '';
  const answerElements = [];

  for (const [key, value] of Object.entries(question.answers)) {
    const para = document.createElement('p');
    para.className = 'answer typewriter-answer shadow-hover';
    para.setAttribute('data-key', key);
    para.textContent = value;
    answersList.append(para);
    answerElements.push(para);
  }

  return answerElements;
}

function renderLinks(question, linksWrapper) {
  linksWrapper.innerHTML = '';
  question.links.forEach((link) => {
    const linkElement = document.createElement('a');
    linkElement.className = 'link';
    linkElement.href = link.href;
    linkElement.target = '_blank';
    linkElement.textContent = link.text;
    linksWrapper.append(linkElement);
  });
}

function removePointerEvents(answerElements) {
  for (const elem of answerElements) {
    elem.style.pointerEvents = 'none';
  }
}

function findAnswerElementByKey(answerElements, key) {
  const elem = answerElements.find(
    (item) => item.getAttribute('data-key') === key
  );
  if (!elem) throw new Error(`No element found with data-key '${key}'`);
  return elem;
}

function createQuizView(props) {
  let answerElements;

  const root = document.createElement('div');
  root.className = 'hero centered';

  const topWrapperView = createTopWrapperView();
  root.appendChild(topWrapperView.root);

  const bottomWrapper = document.createElement('div');
  bottomWrapper.className = 'quiz-bottom-wrapper';
  root.appendChild(bottomWrapper);
  bottomWrapper.innerHTML = String.raw`
    <p class="question"></p>

    <!-- wrapper for all answers -->
    <div class="answers-container"></div>

    <!-- wrapper for learning sources -->
    <!-- title for wrapper -->
    <p class="hints-text">Need help?</p>
    <div class="links-wrapper"></div>
  `;

  const questionText = bottomWrapper.querySelector('.question');
  const answersContainer = bottomWrapper.querySelector('.answers-container');
  const linksWrapper = bottomWrapper.querySelector('.links-wrapper');

  answersContainer.addEventListener('click', props.onAnswerClick);

  const questionButtonView = createQuestionButtonView(props);
  root.appendChild(questionButtonView.root);

  function createNewQuestion(data) {
    const question = getCurrentQuestion(data);
    questionText.textContent = question.text;
    answerElements = renderAnswerElements(answersContainer, question);
    renderLinks(question, linksWrapper);
    root.classList.remove('correct-container');
    root.classList.remove('wrong-container');
  }

  function updateAnsweredQuestion(data) {
    const question = getCurrentQuestion(data);
    removePointerEvents(answerElements);

    const selectedAnswerElement = findAnswerElementByKey(
      answerElements,
      question.selected
    );

    const correctAnswerElement = findAnswerElementByKey(
      answerElements,
      question.correct
    );

    if (question.selected === question.correct) {
      selectedAnswerElement.classList.add('correct-answer');
      root.classList.add('correct-container');
      data.correctCount += 1;
    } else {
      selectedAnswerElement.classList.add('wrong-answer');
      correctAnswerElement.classList.add('correct-answer');
      root.classList.add('wrong-container');
    }
  }

  function giveUp(data) {
    const question = getCurrentQuestion(data);
    removePointerEvents(answerElements);
    findAnswerElementByKey(answerElements, question.correct).classList.add(
      'correct-answer'
    );
  }

  function update(data) {
    switch (data.action) {
      case 'next':
        createNewQuestion(data);
        break;
      case 'update':
        updateAnsweredQuestion(data);
        break;
      case 'giveup':
        giveUp(data);
        break;
      default:
        throw new Error(`Unsupported action: ${data.action}`);
    }

    topWrapperView.update(data);
    questionButtonView.update(data);
  }

  return {
    root,
    update,
    updateTimer: topWrapperView.updateTimer,
  };
}

export default createQuizView;
