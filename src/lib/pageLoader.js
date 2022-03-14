//t@ts-check
/** @typedef {{root: HTMLElement}} ViewObject*/
/** @typedef {(data?: object) => ViewObject} PageFunction */

/**
 * Create and load a page, replacing an existing.
 * @param {PageFunction} createPageFn A Page function.
 * @param {object} [data] An option data object.
 */
function loadPage(createPageFn, data) {
  const { root } = createPageFn(data);
  const pageContainer = document.getElementById('page-root');
  pageContainer.innerHTML = '';
  pageContainer.appendChild(root);
}

export default loadPage;
