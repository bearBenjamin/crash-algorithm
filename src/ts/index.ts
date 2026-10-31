import { initIntro } from '@scripts/index/main';
import { initBookList } from '@scripts/index/book-list';

// Запуск после готовности DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initBookList();
  });
} else {
  initIntro();
  initBookList();
}
