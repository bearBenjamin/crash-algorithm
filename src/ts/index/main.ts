import { sketchifyBear } from '@scripts/index/draw-picture/bear';
import { sketchifyIntro } from '@scripts/index/draw-picture/intro';
import { initIntroLogic } from './main-manager';

const initIntro = (): void => {
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
};

export { initIntro };
