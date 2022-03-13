import { clearElement, createElement } from '../lib/domHelpers.js';
import createMainView from '../views/mainView.js';
import createTopWrapperView from '../views/topWrapperView.js';
import createQuestionButtonView from './questionButtonView.js';

const getCurrentQuestion = (data) => data.questions[data.questionIndex];

function renderAnswerElements(answersList, question) {
  clearElement(answersList);
  const answerElements = [];
  for (const [key, value] of Object.entries(question.answers)) {
    const p = createElement('p', {
      class: 'answer typewriter-answer shadow-hover',
      'data-key': key,
      text: value,
      appendTo: answersList,
    });
    answerElements.push(p);
  }
  return answerElements;
}

function renderLinks(question, linksWrapper) {
  clearElement(linksWrapper);
  question.links.forEach((link) => {
    const aElement = createElement('a', {
      class: 'link',
      text: link.text,
      href: link.href,
      target: '_blanks==',
    });
    linksWrapper.append(aElement);
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

  const { root } = createMainView();
  const topWrapperView = createTopWrapperView();
  root.appendChild(topWrapperView.root);

  const bottomWrapper = createElement('div', {
    class: 'quiz-bottom-wrapper',
    appendTo: root,
  });
  const questionText = createElement('p', {
    class: 'question',
    appendTo: bottomWrapper,
  });

  const answersContainer = createElement('div', {
    class: 'answers-container',
    appendTo: bottomWrapper,
  });
  answersContainer.addEventListener('click', props.onAnswerClick);

  createElement('p', {
    class: 'hints-text',
    text: 'Need help?',
    appendTo: bottomWrapper,
  });
  const linksWrapper = createElement('div', {
    class: 'links-wrapper',
    appendTo: bottomWrapper,
  });

  const questionButtonView = createQuestionButtonView(props);
  root.appendChild(questionButtonView.root);

  function createNewQuestion(data) {
    const question = getCurrentQuestion(data);
    questionText.textContent = question.text;
    answerElements = renderAnswerElements(answersContainer, question);
    renderLinks(question, linksWrapper);
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

  function update(action, data) {
    switch (action) {
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
        throw new Error(`Unsupported action: ${action}`);
    }

    topWrapperView.update(action, data);
    questionButtonView.update(action, data);
  }

  return {
    root,
    update,
    updateTimer: topWrapperView.updateTimer,
  };
}

export default createQuizView;
