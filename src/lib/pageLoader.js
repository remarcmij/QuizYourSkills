//t@ts-check
import { clearElement } from './domHelpers.js';

/** @typedef {{root: HTMLElement}} ViewObject*/
/** @typedef {(data?: object) => ViewObject} PageFunction */

/**
 * Create and load a page, replacing an existing.
 * @param {PageFunction} createPageFn A Page function.
 * @param {object} [data] Any arguments that should be passed to the Page function.
 */
function loadPage(createPageFn, data) {
  const { root } = createPageFn(data);
  const pageContainer = document.getElementById('page-root');
  clearElement(pageContainer);
  pageContainer.appendChild(root);
}

export default loadPage;
