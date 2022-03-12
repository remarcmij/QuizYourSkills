export function displayLearningSources(
  shuffledQuestions,
  currentQuestionIndex
) {
  const links = document.getElementById('links-wrapper');
  shuffledQuestions[currentQuestionIndex].links.forEach((link) => {
    document.getElementById('hints-text').classList.remove('hidden');
    const aElement = document.createElement('a');
    aElement.classList.add('link');
    aElement.innerText = link.text;
    aElement.href = link.href;
    aElement.setAttribute('target', '_blank');
    links.append(aElement);
  });
}
