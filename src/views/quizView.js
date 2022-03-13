import { clearElement, createElement } from '../lib/domHelpers.js';
import createQuestionButtonView from './questionButtonView.js';

function renderFixedParts(container) {
  const questionText = createElement('p', {
    class: 'question',
    appendTo: container,
  });
  const answersList = createElement('ul', {
    class: 'answers-container',
    appendTo: container,
  });
  createElement('p', {
    class: 'hints-text hidden',
    text: 'Need help?',
    appendTo: container,
  });
  const linksWrapper = createElement('div', {
    class: 'links-wrapper',
    appendTo: container,
  });
  return { questionText, answersList, linksWrapper };
}

function createQuizView() {
  const root = createElement('div', { class: 'quiz-bottom-wrapper' });

  const { questionText, answersList, linksWrapper } = renderFixedParts(root);

  const questionButtonView = createQuestionButtonView();
  root.appendChild(questionButtonView.root);
  const { nextButton, giveUpButton } = questionButtonView;

  let answerElements;

  function renderQuestion(question) {
    questionText.textContent = question.text;
    clearElement(answersList);

    answerElements = [];
    for (const [key, value] of Object.entries(question.answers)) {
      const li = createElement('li', {
        class: 'answer typewriter-answer shadow-hover',
        'data-key': key,
        text: value,
        appendTo: answersList,
      });
      answerElements.push(li);
    }
  }

  function renderLinks(question) {
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

  function createNewQuestion(question) {
    renderQuestion(question);
    renderLinks(question);
  }

  function findAnswerElementByKey(key) {
    const elem = answerElements.find(
      (item) => item.getAttribute('data-key') === key
    );
    if (!elem) {
      throw new Error(`No element found with data-key '${key}'`);
    }
    return elem;
  }

  function updateCurrentQuestion(question) {
    for (const elem of answerElements) {
      elem.style.pointerEvents = 'none';
    }

    const selectedAnswerElement = findAnswerElementByKey(question.selected);
    if (question.selected === question.correct) {
      selectedAnswerElement.classList.add('correct-answer');
    } else {
      selectedAnswerElement.classList.add('wrong-answer');
      findAnswerElementByKey(question.correct).classList.add('correct-answer');
    }

    nextButton.classList.remove('hidden');
    giveUpButton.classList.add('hidden');
  }

  function update(action, data) {
    const currentQuestion = data.questions[data.questionIndex];
    if (action === 'new') {
      createNewQuestion(currentQuestion);
    } else {
      updateCurrentQuestion(currentQuestion);
    }
  }

  return { root, answersList, nextButton, giveUpButton, update };
}

export default createQuizView;
