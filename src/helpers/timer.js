function timer(elem) {
  let sec = 0;
  const pad = (val) => (val > 9 ? val : '0' + val);
  return setInterval(() => {
    elem.textContent = `${pad(parseInt(sec / 60, 10))}:${pad(++sec % 60)}`;
  }, 1000);
}

export default timer;