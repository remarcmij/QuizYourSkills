function createQuestionButtonView(props) {
  const root = document.createElement('div');
  root.setAttribute('class', 'btns-wrapper');
  root.innerHTML = String.raw`
    <button type="submit" class="btn btn-next scale-hover">
        &lt;Next&gt;
      </button>
    <button class="btn btn-giveup scale-hover hidden">
      &lt;Give Up&gt;
    </button>
  `;

  const nextButton = root.querySelector('.btn-next');
  nextButton.addEventListener('click', props.onNext);

  const giveUpButton = root.querySelector('.btn-giveup');
  giveUpButton.addEventListener('click', props.onGiveUp);

  const update = (action) => {
    switch (action) {
      case 'next':
        giveUpButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
        break;
      case 'update':
      case 'giveup':
        giveUpButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        break;
    }
  };

  return { root, update };
}

export default createQuestionButtonView;
