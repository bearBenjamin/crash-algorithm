import { main, initBookList } from '@scripts/index/main';

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
