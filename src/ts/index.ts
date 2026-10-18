function main(): void {
  const art = document.querySelector<HTMLElement>('.intro-js');
  // const picture = art?.querySelector<SVGSVGElement>('.intro__svg-js');
  const title = art?.querySelector<HTMLElement>('.intro__title-js');
  const subtitle = art?.querySelector<HTMLElement>('.intro__subtitle-js');
  const enterBtn = art?.querySelector<HTMLButtonElement>('.intro__enter-js');

  if (!art || !title || !subtitle || !enterBtn) {
    console.warn('[intro] Не найдены обязательные элементы заставки');
    return;
  }

  // Проверяем — показывали ли заставку в этой сессии?
  // Если да — пропускаем (пользователь уже видел на этом tab-е)
  // if (sessionStorage.getItem('splash-seen') === '1') {
  //   redirectToHome(art);
  //   return;
  // }

  // Хук: кнопка «Войти» — прерывает анимацию и переходит дальше
  enterBtn.addEventListener('click', () => {
    sessionStorage.setItem('splash-seen', '1');
    closeIntro(art);
  });

  // Сюда добавим anime-анимацию маски на следующем шаге.
}

function closeIntro(art: HTMLElement): void {
  art.classList.add('intro--is-hidden');
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

// Запуск после готовности DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    main();
    initBookList();
  });
} else {
  main();
  initBookList();
}

// document.addEventListener('DOMContentLoaded', () => {
//   const bookList = document.querySelector<HTMLUListElement>('.stage__book-list');

//   bookList?.addEventListener('click', (event) => {
//     const target = event.target;
//     if (!(target instanceof HTMLElement)) return;

//     const wrapper = target.closest<HTMLElement>('.stage__book-wrapper');
//     if (!wrapper) return;

//     const currentItem = wrapper.closest<HTMLElement>('.stage__book-item');

//     if (currentItem) {
//       const isOpen = currentItem.classList.contains('stage__book-item--is-open');

//       const openItems = bookList.querySelectorAll('.stage__book-item--is-open');
//       openItems.forEach((item) => item.classList.remove('stage__book-item--is-open'));

//       if (!isOpen) {
//         currentItem.classList.add('stage__book-item--is-open');
//       }
//     }
//   });
// });
