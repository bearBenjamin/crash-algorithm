// import rough from 'roughjs';
// import type { RoughSVG } from 'roughjs/bin/svg';
// import type { Options as RoughOptions } from 'roughjs/bin/core';

// const BASE_OPTIONS: RoughOptions = {
//   roughness: 1.8,        // «карандашность» (1-3 — нормальный диапазон)
//   bowing: 1,             // изгиб линий (1 = default)
//   seed: 42,              // фиксированный seed — повторяемый результат
//   disableMultiStroke: true,  // одна линия вместо двух — для будущей анимации
// };

// interface color {
//   baseBlack: string,
//   colorPaper: string
// };

// const BASE_COLOR: color = {
//   baseBlack: '#1d1d1d',
//   colorPaper: '#fbfbf9'
// }

// const OUTLINE_ONLY = new Set(['frame', 'landscape', 'cloud', 'roof', 'chair', 'cup-one', 'display']);
// const OUTLINE_WITH_HACHURE = new Set(['ground', 'display-plate', 'books']);
// const OUTLINE_WITH_SOLID = new Set(['cup-two']);

// const svgIntro = document.querySelector('.intro__svg-js') as SVGSVGElement;
// // console.log('svgIntro: ', svgIntro);

// // console.log('OUTLINE_ONLY: ', OUTLINE_ONLY);
// console.log('OUTLINE_WITH_HACHURE: ', OUTLINE_WITH_HACHURE);
// // console.log('OUTLINE_WITH_SOLID: ', OUTLINE_WITH_SOLID);
// // function prefersReducedMotion(): boolean {
// //   return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// // }

// function getOptionsForPath(path: SVGPathElement): RoughOptions {
//   for (const cls of path.classList) {
//     // console.log('cls: ', cls);
//     if (OUTLINE_WITH_HACHURE.has(cls)) {
//       console.log('cls: ', cls);
//       return {
//         ...BASE_OPTIONS,
//         fill: 'red',
//         fillStyle: 'hachure',
//         hachureGap: 4,
//         hachureAngle: 41,
//         fillWeight: 1,
//       };
//     }
//     if (OUTLINE_WITH_SOLID.has(cls)) {
//       return { ...BASE_OPTIONS, fill: 'green', fillStyle: 'solid' };
//     }
//   }
//   return { ...BASE_OPTIONS, fill: 'none' };
// }

// function sketchifyIntro(): void {
//   const rc = rough.svg(svgIntro);

//   const paths = Array.from(svgIntro.querySelectorAll<SVGPathElement>('path'));
//   console.log('paths: ', paths);

//   for (const path of paths) {
//     const d = path.getAttribute('d');
//     if (!d) continue;

//     const options = getOptionsForPath(path);
//     const roughPath = rc.path(d, options);

//     // Переносим class для будущей анимации/CSS
//     const cls = path.getAttribute('class');
//     if (cls) {
//       roughPath.setAttribute('class', cls);
//     }

//     path.replaceWith(roughPath);
//   }

//   console.info(`[intro] Перерисовано path: ${paths.length}`);
// }

// export { sketchifyIntro }
