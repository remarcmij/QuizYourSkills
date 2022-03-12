import { quizData } from './data.js';
import { counter } from './components/counter.js';
import { timer } from './components/timer.js';
import { displayQuizSummary } from './handlers/displayQuizSummary.js';
import { displayLearningSources } from './handlers/displayLearningSources.js';
import { answerQuestion } from './handlers/answerQuestion.js';

let QuizTimer;
let shuffledQuestions = [...quizData.questions].sort(() => Math.random() - 0.5);
const data = {
  currentQuestionIndex: 0,
  correctAnswersCounter: 0,
};

let correctAnswer;
let dataChoose;

document
  .getElementById('btn-start')
  .addEventListener('click', () => startQuiz());
document.getElementById('btn-next').addEventListener('click', nextState);

const startQuiz = () => {
  document.getElementById('title-wrapper').classList.add('hidden');
  document.getElementById('btn-start').classList.add('hidden');
  document.getElementById('quiz-top-wrapper').classList.remove('hidden');
  document.getElementById('quiz-bottom-wrapper').classList.remove('hidden');
  document.getElementById('btn-giveup').classList.remove('hidden');
  QuizTimer = timer();
  counter(shuffledQuestions);
  renderQuestion(shuffledQuestions[data.currentQuestionIndex]);
  displayLearningSources(shuffledQuestions, data.currentQuestionIndex);
};

function renderQuestion(questionObj) {
  document.getElementById('question').innerText = questionObj.text;
  const answers = document.getElementById('answers-container');
  for (const [key, value] of Object.entries(questionObj.answers)) {
    const pElement = document.createElement('p');
    pElement.classList.add('answer', 'typewriter-answer', 'shadow-hover');
    pElement.innerText = value;
    pElement.setAttribute('data-choose', key);
    answers.append(pElement);
  }

  document.querySelectorAll('.answer').forEach((item) => {
    dataChoose = item.getAttribute('data-choose');
    if (dataChoose === shuffledQuestions[data.currentQuestionIndex].correct) {
      correctAnswer = item;
    }
    item.addEventListener('click', (event) => {
      answerQuestion(event, shuffledQuestions, data, correctAnswer);
    });
  });
}

function nextState() {
  document
    .getElementById('user-interface')
    .classList.remove('correct-container', 'wrong-container');

  if (data.currentQuestionIndex >= shuffledQuestions.length - 1) {
    displayQuizSummary(QuizTimer, shuffledQuestions);
    return;
  }

  data.currentQuestionIndex++;
  resetState();
  renderQuestion(shuffledQuestions[data.currentQuestionIndex]);
  displayLearningSources(shuffledQuestions, data.currentQuestionIndex);
  counter(shuffledQuestions);
}

function resetState() {
  document.getElementById('btn-next').classList.add('hidden');
  document.getElementById('btn-giveup').classList.remove('hidden');
  document.getElementById('answers-container').innerHTML = '';
  document.getElementById('links-wrapper').innerHTML = '';
}

document.getElementById('btn-giveup').addEventListener('click', giveUpButton);

function giveUpButton() {
  correctAnswer.classList.add('correct-answer');
  document.querySelectorAll('.answer').forEach((answer) => {
    answer.style.pointerEvents = 'none';
  });
  document.getElementById('btn-giveup').classList.add('hidden');
  document.getElementById('btn-next').classList.remove('hidden');
  document.getElementById(
    'corrects'
  ).innerText = `${data.correctAnswersCounter} Correct of ${shuffledQuestions.length}`;
}
