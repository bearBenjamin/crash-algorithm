import { sketchifySvg, type PathOptionsResolver } from '@scripts/utils/sketchify';
import { BASE_OPTIONS, BEAR_COLOR } from '@scripts/utils/const';

const getFillType = (path: SVGPathElement): 'black' | 'white' => {
  const fill = path.getAttribute('fill') || '';
  if (fill === '#fff') {
    return 'white';
  }
  return 'black';
};

const bearResolver: PathOptionsResolver = (path) => {
  const fillType = getFillType(path);

  return fillType === 'black'
    ? {
        ...BASE_OPTIONS,
        stroke: BEAR_COLOR.ink, // чёрная обводка
        strokeWidth: 1.8,
        fill: BEAR_COLOR.ink, // чёрная заливка
        fillStyle: 'solid', // штриховка
        fillWeight: 1.1, // толщина штриховки
      }
    : {
        ...BASE_OPTIONS,
        stroke: 'none', // без обводки (white path — это «дырка»)
        fill: BEAR_COLOR.paper, // белый цвет бумаги (не чисто белый!)
        fillStyle: 'solid', // сплошная заливка
      };
};

const sketchifyBear = (svg: SVGSVGElement): void => {
  sketchifySvg(svg, bearResolver);
};

export { sketchifyBear };
