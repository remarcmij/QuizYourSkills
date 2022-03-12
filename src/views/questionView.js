import { clearElement, createElement } from '../lib/domHelpers.js';
import createQuestionButtonView from './questionButtonView.js';

function createQuestionView() {
  const root = createElement('div', { class: 'quiz-bottom-wrapper' });

  const questionText = createElement('p', {
    class: 'question',
  });

  root.appendChild(questionText);

  const answersList = createElement('ul', { class: 'answers-container' });
  root.appendChild(answersList);

  //  wrapper for learning sources
  const hintsText = createElement('p', {
    class: 'hints-text hidden',
    text: 'Need help?',
  });
  root.appendChild(hintsText);

  const linksWrapper = createElement('div', { class: 'links-wrapper' });
  root.appendChild(linksWrapper);

  const questionButtonView = createQuestionButtonView();
  root.appendChild(questionButtonView.root);

  let answerListItems;

  const update = (action, data) => {
    const currentQuestion = data.questions[data.questionIndex];
    const { selected } = currentQuestion;

    if (action === 'new') {
      questionText.textContent = currentQuestion.text;
      clearElement(answersList);
      answerListItems = Object.entries(currentQuestion.answers).map(
        ([key, value]) => {
          return createElement('li', {
            class: 'answer typewriter-answer shadow-hover',
            'data-key': key,
            text: value,
          });
        }
      );
      answerListItems.forEach((answerListItem) => {
        answersList.appendChild(answerListItem);
      });
    }

    clearElement(linksWrapper);
    currentQuestion.links.forEach((link) => {
      const aElement = createElement('a', {
        class: 'link',
        text: link.text,
        href: link.href,
        target: '_blanks==',
      });
      linksWrapper.append(aElement);
    });

    if (action === 'update') {
      answerListItems.forEach((answerListItem) => {
        answerListItem.style.pointerEvents = 'none';
      });

      const selectedAnswer = answerListItems.find(
        (answerListItem) => answerListItem.getAttribute('data-key') === selected
      );

      if (selected === currentQuestion.correct) {
        selectedAnswer.classList.add('correct-answer');
      } else {
        selectedAnswer.classList.add('wrong-answer');
        const correctAnswer = answerListItems.find(
          (answerListItem) =>
            answerListItem.getAttribute('data-key') === currentQuestion.correct
        );
        correctAnswer.classList.add('correct-answer');
      }

      questionButtonView.nextButton.classList.remove('hidden');
      questionButtonView.giveUpButton.classList.add('hidden');
    }
  };

  return {
    root,
    answersList,
    linksWrapper,
    hintsText,
    nextButton: questionButtonView.nextButton,
    giveUpButton: questionButtonView.giveUpButton,
    update,
  };
}

export default createQuestionView;
