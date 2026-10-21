import rough from 'roughjs';
import type { RoughSVG } from 'roughjs/bin/svg';
import type { Options as RoughOptions } from 'roughjs/bin/core';

const BASE_OPTIONS: RoughOptions = {
  roughness: 1.8, // «карандашность» (1-3 — нормальный диапазон)
  bowing: 1, // изгиб линий (1 = default)
  seed: 42, // фиксированный seed — повторяемый результат
  disableMultiStroke: true, // одна линия вместо двух — для будущей анимации
};

interface color {
  baseBlack: string;
  colorPaper: string;
}

const BASE_COLOR: color = {
  baseBlack: '#1d1d1d',
  colorPaper: '#fbfbf9',
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getFillType(path: SVGPathElement): 'black' | 'white' {
  const fill = path.getAttribute('fill') || '';
  if (fill === '#fff') {
    return 'white';
  }
  return 'black';
}

// Перерисовка одного path
function sketchifyPath(
  rc: RoughSVG,
  path: SVGPathElement,
  fillType: 'black' | 'white'
): SVGElement | null {
  const d = path.getAttribute('d');
  if (!d) return null;

  // Опции зависят от типа path
  const options: RoughOptions =
    fillType === 'black'
      ? {
          ...BASE_OPTIONS,
          stroke: BASE_COLOR.baseBlack, // чёрная обводка
          strokeWidth: 1.8,
          fill: BASE_COLOR.baseBlack, // чёрная заливка
          fillStyle: 'solid', // штриховка
          fillWeight: 1.1, // толщина штриховки
        }
      : {
          ...BASE_OPTIONS,
          stroke: 'none', // без обводки (white path — это «дырка»)
          fill: BASE_COLOR.colorPaper, // белый цвет бумаги (не чисто белый!)
          fillStyle: 'solid', // сплошная заливка
        };

  // Перерисовываем через Rough.js
  return rc.path(d, options);
}

// Перерисовка всего SVG медведя
function sketchifyBear(svg: SVGSVGElement): void {
  const rc = rough.svg(svg);

  // Все path в SVG (в исходном порядке — важно для z-order!)
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path'));

  // Если path нет — выходим
  if (paths.length === 0) {
    console.warn('[bear] В SVG не найдено ни одного path');
    return;
  }

  // Считаем статистику для лога
  // let blackCount = 0;
  // let whiteCount = 0;
  // let errorCount = 0;

  // Перерисовываем каждый path
  for (const path of paths) {
    const fillType = getFillType(path);

    const roughPath = sketchifyPath(rc, path, fillType);

    // Заменяем оригинал на rough-версию
    path.replaceWith(roughPath as SVGAElement);
  }
}

// Точка входа
function initBear(): void {
  const svg = document.querySelector<SVGSVGElement>('.stage__bear');

  if (!svg) {
    return;
  }

  // Если пользователь просил reduced-motion — не «карандашим»
  // (хотя для статичной перерисовки это не критично)
  if (prefersReducedMotion()) {
    return;
  }

  try {
    sketchifyBear(svg);
  } catch (err) {
    console.error('[bear] Ошибка перерисовки:', err);
  }
}

// ──────────────────────────────────────────────────────────
// Запуск
// ──────────────────────────────────────────────────────────
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initBear);
// } else {
//   initBear();
// }
export { initBear };
