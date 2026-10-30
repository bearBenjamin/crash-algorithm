import { sketchifyBear } from '@scripts/index/draw-picture/bear';
import { sketchifyIntro } from '@scripts/index/draw-picture/intro';
import { introAnime } from '@scripts/index/anime';

function main(): void {
  const mainPage = document.querySelector<HTMLElement>('.main-page');
  const intro = document.querySelector<HTMLElement>('.intro');

  const bookChapters = mainPage?.querySelectorAll<HTMLElement>('.stage__book-item-list');

  bookChapters?.forEach((list) => {
    list.classList.remove('stage__book-item-list--no-js');
  });

  const pictureIntro = intro?.querySelector<SVGSVGElement>('.intro__svg');
  const pictureMain = mainPage?.querySelector<SVGSVGElement>('.stage__bear');

  const introTitle = intro?.querySelector<HTMLElement>('.intro__title');
  const introSubtitle = intro?.querySelector<HTMLElement>('.intro__subtitle');

  const enterBtn = intro?.querySelector<HTMLButtonElement>('.intro__enter');

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

  if (isIntroReady && intro && enterBtn) {
    initIntroLogic(intro, enterBtn);
  }
}

function initIntroLogic(intro: HTMLElement, enterBtn: HTMLButtonElement): void {
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
}

function showIntro(intro: HTMLElement) {
  intro.classList.remove('intro--is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeIntro(intro: HTMLElement): void {
  intro.classList.add('intro--is-hidden');
  document.body.style.overflow = '';

  if (window.__introStyleRef) {
    window.__introStyleRef.remove(); // Удаляем блокирующий стиль
  }
}

function hideIntro(intro: HTMLElement): void {
  if (window.__introHiddenStyleRef) {
    window.__introHiddenStyleRef.remove();
  }

  intro.classList.add('intro--is-hidden');
}

function initBookList(): void {
  const bookList = document.querySelector<HTMLUListElement>('.stage__book-list');
  if (!bookList) return;

  const pictureBear = document.querySelector<SVGSVGElement>('.stage__bear');

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
      pictureBear?.classList.remove('stage__bear--is-hidden');

      if (!isOpen) {
        currentItem.classList.add('stage__book-item--is-open');
        pictureBear?.classList.add('stage__bear--is-hidden');
      }
    }
  });
}

export { main, initBookList };
