// ============================================================
// intro.ts — точка входа для страницы-заставки
// ============================================================
//
// Здесь будет:
// 1. Чтение prefers-reduced-motion
// 2. Анимация SVG-маской (clip-path) — «рисунок проявляется по штрихам»
// 3. Анимация заголовка (clip-path по буквам)
// 4. Защита от повторного показа заставки в одной сессии (sessionStorage)
// 5. Кнопка «Пропустить» — прерывает анимацию и переходит на index.html
//
// Сейчас — каркас, чтобы сборка работала и заставка показывалась
// без анимации. Реализацию добавим на следующем шаге.

// ──────────────────────────────────────────────────────────
// IIFE — изолируем скоуп, не засоряем window глобальными функциями.
// Имя `main` не конфликтует с другими entry-точками (binary-search.ts и т.д.).
// ──────────────────────────────────────────────────────────
(() => {
  // Безопасный доступ к DOM-элементам с типизацией
  function querySelector<T extends Element = HTMLElement>(selector: string): T | null {
    return document.querySelector<T>(selector);
  }

  function main(): void {
    const stage = querySelector<HTMLElement>('[data-splash="root"]');
    const art = querySelector<HTMLElement>('[data-splash="art"]');
    const title = querySelector<HTMLElement>('[data-splash="title"]');
    const subtitle = querySelector<HTMLElement>('[data-splash="subtitle"]');
    const skipBtn = querySelector<HTMLButtonElement>('[data-splash="skip"]');

    if (!stage || !art || !title || !subtitle || !skipBtn) {
      console.warn('[intro] Не найдены обязательные элементы заставки');
      return;
    }

    // Проверяем — показывали ли заставку в этой сессии?
    // Если да — пропускаем (пользователь уже видел на этом tab-е)
    if (sessionStorage.getItem('splash-seen') === '1') {
      redirectToHome();
      return;
    }

    // Хук: кнопка «Пропустить» — прерывает анимацию и переходит дальше
    skipBtn.addEventListener('click', () => {
      sessionStorage.setItem('splash-seen', '1');
      redirectToHome();
    });

    // Сюда добавим GSAP-анимацию маски на следующем шаге.
    // Пока — заглушка: просто помечаем заставку как увиденную
    setTimeout(() => {
      sessionStorage.setItem('splash-seen', '1');
    }, 1000);
  }

  function redirectToHome(): void {
    // index.html — главная страница блога (список книг/статей).
    window.location.href = 'index.html';
  }

  // Запуск после готовности DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
