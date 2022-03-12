export function timer() {
  let sec = 0;
  const pad = (val) => (val > 9 ? val : '0' + val);
  return setInterval(() => {
    document.querySelector('.time').innerText = `${pad(
      parseInt(sec / 60, 10)
    )}:${pad(++sec % 60)}`;
  }, 1000);
}
