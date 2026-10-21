import rough from 'roughjs';
// import type { RoughSVG } from 'roughjs/bin/svg';
import type { Options as RoughOptions } from 'roughjs/bin/core';

const BASE_OPTIONS: RoughOptions = {
  roughness: 1.8, // «карандашность» (1-3 — нормальный диапазон)
  bowing: 1, // изгиб линий (1 = default)
  seed: 42, // фиксированный seed — повторяемый результат
  disableMultiStroke: true, // одна линия вместо двух — для будущей анимации
};

// interface color {
//   baseBlack: string,
//   colorPaper: string
// };

// const BASE_COLOR: color = {
//   baseBlack: '#1d1d1d',
//   colorPaper: '#fbfbf9'
// }

function fillOptionsForClass(className: string): Partial<RoughOptions> {
  switch (className) {
    case 'frame': // окно
      return {
        fill: 'blue',
        fillStyle: 'hachure',
        hachureGap: 1,
        hachureAngle: 90,
        fillWeight: 1,
      };

    case 'landscape': // гора
      return {
        fill: 'grey',
        fillStyle: 'cross-hatch',
        hachureGap: 1,
        fillWeight: 1,
      };

    case 'cloud':
      return {
        fill: 'white',
        fillStyle: 'cross-hatch',
        hachureGap: 1,
        hachureAngle: 45,
        fillWeight: 1,
      };

    case 'roof': //снежная шапка
      return {
        fill: 'white',
        fillStyle: 'cross-hatch',
        hachureGap: 1,
        hachureAngle: -45,
        fillWeight: 1,
      };

    case 'display': {
      return {
        fill: 'rgb(209, 207, 199)',
        fillStyle: 'solid',
        hachureGap: 1,
        fillWeight: 1,
      };
    }

    case 'display-plate': // нижняя планка монитора
      return {
        fill: 'grey',
        fillStyle: 'hachure',
        hachureGap: 2,
        hachureAngle: 42,
        fillWeight: 1,
      };

    case 'chair': // спинка кресла
      return {
        fill: '#b58558',
        fillStyle: 'cross-hatch',
        hachureGap: 1,
        fillWeight: 1,
      };

    case 'ground': // столешница
      return {
        fill: '#e2b282',
        fillStyle: 'hachure',
        hachureGap: 2,
        hachureAngle: 42,
        fillWeight: 1,
      };

    case 'book-one':
      return {
        fill: 'white',
        stroke: 'red',
        strokeWidth: 3,
        fillStyle: 'solid',
        hachureGap: 1,
        hachureAngle: 90,
        fillWeight: 1,
      };

    case 'book-two':
      return {
        fill: 'white',
        stroke: 'yellow',
        strokeWidth: 9,
        fillStyle: 'solid',
        hachureGap: 1,
        hachureAngle: 90,
        fillWeight: 1,
      };

    case 'book-three':
      return {
        fill: 'white',
        stroke: 'green',
        strokeWidth: 5,
        fillStyle: 'hachure',
        hachureGap: 4,
        hachureAngle: 90,
        fillWeight: 1,
      };

    case 'book-four':
      return {
        fill: 'white',
        stroke: 'blue',
        strokeWidth: 5,
        fillStyle: 'hachure',
        hachureGap: 4,
        hachureAngle: 90,
        fillWeight: 1,
      };

    case 'cup-two':
      return {
        fill: 'rgb(92, 64, 51)',
        fillStyle: 'solid',
        hachureGap: 1,
        fillWeight: 1,
      };

    default:
      return {};
  }
}

function sketchifyIntro(svg: SVGSVGElement): void {
  const rc = rough.svg(svg);

  // Array.from — критично, replaceWith меняет DOM
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path'));

  for (const path of paths) {
    const d = path.getAttribute('d');
    if (!d) continue;

    const className = path.getAttribute('class') || '';

    // Объединяем базовые опции обводки + опции заливки для класса
    const options: RoughOptions = {
      ...BASE_OPTIONS,
      ...fillOptionsForClass(className),
    };

    const roughPath = rc.path(d, options);

    // Переносим class для CSS/анимации
    if (className) {
      roughPath.setAttribute('class', className);
    }

    path.replaceWith(roughPath);
  }
}

export { sketchifyIntro };
