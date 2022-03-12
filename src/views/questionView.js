import { createElement } from '../lib/domHelpers.js';
import createQuestionButtonView from './questionButtonView.js';

function createQuestionView(questionData) {
  const root = createElement('div', { class: 'quiz-bottom-wrapper' });

  root.appendChild(
    createElement('p', { class: 'question', text: questionData.text })
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

  const choices = Object.entries(questionData.answers).map(([key, value]) => {
    return createElement('li', {
      class: 'answer typewriter-answer shadow-hover',
      'data-key': key,
      text: value,
    });
  });

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
