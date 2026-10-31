import { removeStyle } from '@scripts/utils/utils';
import { introAnime } from './anime';

const hideIntro = (intro: HTMLElement): void => {
  removeStyle(window.__introStyleRef);

  intro.classList.add('intro--is-hidden');
};

const closeIntro = (intro: HTMLElement): void => {
  intro.classList.add('intro--is-hidden');
  document.body.style.overflow = '';

  removeStyle(window.__introStyleRef);
};

const showIntro = (intro: HTMLElement) => {
  intro.classList.remove('intro--is-hidden');
  document.body.style.overflow = 'hidden';
};

const initIntroLogic = (intro: HTMLElement, enterBtn: HTMLButtonElement): void => {
  const STORAGE_KEY = 'splash-seen';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    hideIntro(intro);
    return;
  }

  showIntro(intro);

  enterBtn.addEventListener('click', () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    closeIntro(intro);
  });

  introAnime();
};

export { initIntroLogic };
