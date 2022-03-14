function createHomeView(props) {
  const root = document.createElement('div');
  root.className = 'hero centered';
  root.innerHTML = String.raw`
    <div class="title-wrapper">
      <h1 class="typewriter-title">QuizYourSkills</h1>
      <h2 class="unicode">&#9759;</h2>
    </div>
    div class="btns-wrapper">
      <button type="submit" class="btn btn-start scale-hover">
        &lt;Start&gt;
      </button>
    </div>
  `;

  const btnStart = root.querySelector('.btn-start');
  btnStart.addEventListener('click', props.onStart);
  return { root };
}

export default createHomeView;
