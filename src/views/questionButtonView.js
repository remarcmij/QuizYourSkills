function createQuestionButtonView(props) {
  const root = document.createElement('div');
  root.className = 'btns-wrapper';
  root.innerHTML = String.raw`
    <button type="submit" class="btn btn-next scale-hover">
        &lt;Next&gt;
      </button>
    <button class="btn btn-giveup scale-hover hidden">
      &lt;Give Up&gt;
    </button>
  `;

  const btnNext = root.querySelector('.btn-next');
  btnNext.addEventListener('click', props.onNext);

  const btnGiveUp = root.querySelector('.btn-giveup');
  btnGiveUp.addEventListener('click', props.onGiveUp);

  const update = (data) => {
    switch (data.action) {
      case 'next':
        btnGiveUp.classList.remove('hidden');
        btnNext.classList.add('hidden');
        break;
      case 'update':
      case 'giveup':
        btnGiveUp.classList.add('hidden');
        btnNext.classList.remove('hidden');
        break;
    }
  };

  return { root, update };
}

export default createQuestionButtonView;
