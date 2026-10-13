// ============================================================
// algorithms/binary-search.ts — демо-логика визуализации
// ============================================================
// Это КАРКАС — реальную визуализацию бинарного поиска допишем,
// когда дойдём до этой главы в книге. Сейчас только каркас,
// чтобы страница работала и сборка не падала.

(() => {
  function main(): void {
    const canvas = document.querySelector<HTMLCanvasElement>(
      '[data-algorithm="binary-search-canvas"]'
    );
    const restartBtn = document.querySelector<HTMLButtonElement>('[data-action="restart"]');
    const targetInput = document.querySelector<HTMLInputElement>('[data-input="target"]');

    if (!canvas || !restartBtn || !targetInput) {
      console.warn('[binary-search] Не найдены обязательные элементы');
      return;
    }

    // Контекст canvas — сюда потом зайдёт D3.js / Rough.js
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('[binary-search] Canvas 2D context недоступен');
      return;
    }

    // Тестовый вывод — убедиться, что страница живая
    ctx.font = '20px "Patrick Hand", sans-serif';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText('Тут будет визуализация бинарного поиска', 20, 40);

    // Перерисовка по кнопке «Заново»
    restartBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText('Перезапуск... target = ' + targetInput.value, 20, 40);
    });

    console.info('[binary-search] Страница загружена');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
