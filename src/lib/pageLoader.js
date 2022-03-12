import { clearElement } from './domHelpers.js';

/** @typedef {{root: HTMLElement}} ViewObject*/
/** @typedef {(...args: any) => ViewObject} ViewFunction */

/**
 * Create and load a page, replacing an existing.
 * @param {ViewFunction} createPageFn A Page function.
 * @param {*} args Any arguments that should be passed to the Page function.
 */
const loadPage = (createPageFn, ...args) => {
  const { root } = createPageFn(...args);
  const pageContainer = document.getElementById('page-root');
  clearElement(pageContainer);
  pageContainer.appendChild(root);
};

export default loadPage;
