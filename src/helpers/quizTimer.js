function quizTimer(elem) {
  let secs = 0;
  const pad = (val) => (val > 9 ? val : '0' + val);
  return setInterval(() => {
    elem.textContent = `${pad(parseInt(secs / 60, 10))}:${pad(++secs % 60)}`;
  }, 1000);
}

export default quizTimer;
