//t@ts-check
/** @typedef {{root: HTMLElement}} ViewObject*/
/** @typedef {(context?: object) => ViewObject} PageFunction */

/**
 * Create and load a page, replacing an existing.
 * @param {PageFunction} createPageFn A Page function.
 * @param {object} [context] Any arguments that should be passed to the Page function.
 */
function loadPage(createPageFn, context) {
  const { root } = createPageFn(context);
  const pageContainer = document.getElementById('page-root');
  pageContainer.innerHTML = '';
  pageContainer.appendChild(root);
}

export default loadPage;
