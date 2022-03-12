function quizTimer(elem, data) {
  data.elapsed = 0;
  const pad = (val) => (val > 9 ? val : '0' + val);
  return setInterval(() => {
    elem.textContent = `${pad(parseInt(data.elapsed / 60, 10))}:${pad(
      ++data.elapsed % 60
    )}`;
  }, 1000);
}

export default quizTimer;
