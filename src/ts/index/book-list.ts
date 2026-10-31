const initBookList = (): void => {
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
};

export { initBookList };
