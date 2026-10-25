import { sketchifyBear } from '@scripts/index/draw-picture/bear';
import { sketchifyIntro } from '@scripts/index/draw-picture/intro';
import { introAnime } from '@scripts/index/anime';

function main(): void {
  const mainPage = document.querySelector<HTMLElement>('.main-page');
  const intro = document.querySelector<HTMLElement>('.intro-js');

  const pictureIntro = intro?.querySelector<SVGSVGElement>('.intro__svg-js');
  const pictureMain = mainPage?.querySelector<SVGSVGElement>('.stage__bear');

  const introTitle = intro?.querySelector<HTMLElement>('.intro__title-js');
  const introSubtitle = intro?.querySelector<HTMLElement>('.intro__subtitle-js');

  const enterBtn = intro?.querySelector<HTMLButtonElement>('.intro__enter-js');

  const isIntroReady = Boolean(intro && introTitle && introSubtitle && enterBtn);

  if (!isIntroReady) {
    console.warn('[intro] Не найдены обязательные элементы заставки');
  }

  if (pictureIntro) {
    sketchifyIntro(pictureIntro);
  }

  if (pictureMain) {
    sketchifyBear(pictureMain);
  }

  if (isIntroReady && intro && enterBtn && mainPage) {
    initIntroLogic(intro, enterBtn, mainPage);
  }
}

function initIntroLogic(
  intro: HTMLElement,
  enterBtn: HTMLButtonElement,
  mainPage: HTMLElement
): void {
  const STORAGE_KEY = 'splash-seen';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    hideIntro(intro);
    return;
  }

  showIntro(intro, mainPage);

  enterBtn.addEventListener('click', () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    closeIntro(intro, mainPage);
  });

  introAnime();
}

function showIntro(intro: HTMLElement, mainPage: HTMLElement) {
  intro.classList.remove('intro--is-hidden');
  mainPage.classList.add('stage--is-hidden');
  document.body.style.overflow = 'hidden';
  mainPage.setAttribute('inert', '');
}

function closeIntro(intro: HTMLElement, mainPage: HTMLElement): void {
  intro.classList.add('intro--is-hidden');
  mainPage.classList.remove('stage--is-hidden');
  document.body.style.overflow = '';
  mainPage.removeAttribute('inert');
}

function hideIntro(intro: HTMLElement): void {
  intro.classList.add('intro--is-hidden');
}

function initBookList(): void {
  const bookList = document.querySelector<HTMLUListElement>('.stage__book-list');
  if (!bookList) return;

  bookList.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const wrapper = target.closest<HTMLElement>('.stage__book-wrapper');
    if (!wrapper) return;

    const currentItem = wrapper.closest<HTMLElement>('.stage__book-item');

    if (currentItem) {
      const isOpen = currentItem.classList.contains('stage__book-item--is-open');

      const openItems = bookList.querySelectorAll('.stage__book-item--is-open');
      openItems.forEach((item) => item.classList.remove('stage__book-item--is-open'));

      if (!isOpen) {
        currentItem.classList.add('stage__book-item--is-open');
      }
    }
  });
}

export { main, initBookList };
