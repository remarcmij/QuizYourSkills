//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createQuizBottomWrapperView = () => {
  // wrapper for question, answers and learning sources
  const root = createElement('div', { class: 'quiz-bottom-wrapper' });

  // the question
  const question = createElement('p', { class: 'question' });
  root.appendChild(question);

  // wrapper for all answers
  const answersContainer = createElement('div', { class: 'answers-container' });
  root.appendChild(answersContainer);

  //  wrapper for learning sources
  const hintsText = createElement('p', {
    class: 'hints-text hidden',
    text: 'Need help?',
  });
  root.appendChild(hintsText);

  const linksWrapper = createElement('div', { class: 'links-wrapper' });
  root.appendChild(linksWrapper);

  return { root, question, answersContainer, hintsText, linksWrapper };
};

export default createQuizBottomWrapperView;
