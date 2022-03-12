import { createElement } from '../lib/domHelpers.js';
import createQuestionButtonView from './questionButtonView.js';

function createQuestionView(currentQuestion) {
  const root = createElement('div', { class: 'quiz-bottom-wrapper' });

  root.appendChild(
    createElement('p', { class: 'question', text: currentQuestion.text })
  );

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

  currentQuestion.links.forEach((link) => {
    const aElement = createElement('a', {
      class: 'link',
      text: link.text,
      href: link.href,
      target: '_blanks==',
    });
    linksWrapper.append(aElement);
  });

  const choices = Object.entries(currentQuestion.answers).map(
    ([key, value]) => {
      return createElement('li', {
        class: 'answer typewriter-answer shadow-hover',
        'data-key': key,
        text: value,
      });
    }
  );

  choices.forEach((choice) => {
    answersList.appendChild(choice);
  });

  const questionButtonView = createQuestionButtonView();
  root.appendChild(questionButtonView.root);

  return {
    root,
    answersList,
    linksWrapper,
    hintsText,
    nextButton: questionButtonView.nextButton,
    backButton: questionButtonView.backButton,
    giveUpButton: questionButtonView.giveUpButton,
    choices,
  };
}

export default createQuestionView;
