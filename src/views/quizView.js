import { clearElement, createElement } from '../lib/domHelpers.js';
import createMainView from '../views/mainView.js';
import createTopWrapperView from '../views/topWrapperView.js';
import createQuestionButtonView from './questionButtonView.js';

const getCurrentQuestion = (data) => data.questions[data.questionIndex];

function renderFixedParts(container) {
  const questionText = createElement('p', {
    class: 'question',
    appendTo: container,
  });
  const answersContainer = createElement('div', {
    class: 'answers-container',
    appendTo: container,
  });
  createElement('p', {
    class: 'hints-text',
    text: 'Need help?',
    appendTo: container,
  });
  const linksWrapper = createElement('div', {
    class: 'links-wrapper',
    appendTo: container,
  });
  return { questionText, answersContainer, linksWrapper };
}

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

function createQuizView() {
  let answerElements;

  const { root } = createMainView();
  const topWrapperView = createTopWrapperView(root);
  const bottomWrapper = createElement('div', {
    class: 'quiz-bottom-wrapper',
    appendTo: root,
  });
  const { questionText, answersContainer, linksWrapper } =
    renderFixedParts(bottomWrapper);
  const questionButtonView = createQuestionButtonView(root);
  const { nextButton, giveUpButton } = questionButtonView;

  function createNewQuestion(data) {
    const question = getCurrentQuestion(data);
    questionText.textContent = question.text;
    answerElements = renderAnswerElements(answersContainer, question);
    renderLinks(question, linksWrapper);
    giveUpButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    topWrapperView.counter.textContent = `${data.questionIndex + 1}/${
      data.questions.length
    }`;
  }

  function updateAnsweredQuestion(data) {
    const question = getCurrentQuestion(data);
    removePointerEvents(answerElements);

    const selectedAnswerElement = findAnswerElementByKey(
      answerElements,
      question.selected
    );
    if (question.selected === question.correct) {
      selectedAnswerElement.classList.add('correct-answer');
    } else {
      selectedAnswerElement.classList.add('wrong-answer');
      findAnswerElementByKey(answerElements, question.correct).classList.add(
        'correct-answer'
      );
    }

    giveUpButton.classList.add('hidden');
    nextButton.classList.remove('hidden');

    topWrapperView.corrects.textContent = `${data.correctCount} Correct of ${data.questions.length}`;

    question.selected = selectedAnswerElement.getAttribute('data-key');

    if (question.selected === question.correct) {
      root.classList.add('correct-container');
      data.correctCount += 1;
    } else {
      root.classList.add('wrong-container');
    }
  }

  function giveUp(data) {
    const question = getCurrentQuestion(data);
    removePointerEvents(answerElements);
    findAnswerElementByKey(answerElements, question.correct).classList.add(
      'correct-answer'
    );
    topWrapperView.corrects.textContent = `${data.correctCount} Correct of ${data.questions.length}`;
    giveUpButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  }

  function update(action, data) {
    switch (action) {
      case 'next':
        createNewQuestion(data);
        break;
      case 'answered':
        updateAnsweredQuestion(data, answerElements);
        break;
      case 'giveup':
        giveUp(data);
        break;
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  return {
    root,
    answersContainer,
    nextButton,
    giveUpButton,
    time: topWrapperView.time,
    update,
  };
}

export default createQuizView;
