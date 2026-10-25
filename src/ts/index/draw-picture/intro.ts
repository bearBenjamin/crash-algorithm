import { sketchifySvg, type PathOptionsResolver } from '@scripts/utils/sketchify';
import { BASE_OPTIONS, BASE_COLORS } from '@scripts/utils/const';
import type { Options as RoughOptions } from 'roughjs/bin/core';

function fillOptionsForClass(className: string): Partial<RoughOptions> {
  switch (className) {
    case 'frame': // небо в окне
      return {
        fill: BASE_COLORS.accentBlue, // мягкий небесно-голубой
        fillStyle: 'hachure',
        hachureGap: 4,
        hachureAngle: 90,
        fillWeight: 0.8,
      };

    case 'landscape': // гора (тело)
      return {
        fill: BASE_COLORS.khakiMuted, // тёплый серо-коричневый (дымка)
        fillStyle: 'cross-hatch',
        hachureGap: 3,
        fillWeight: 1,
      };

    case 'cloud': // облако
      return {
        fill: BASE_COLORS.white, // чистый белый
        fillStyle: 'solid',
        fillWeight: 1,
      };

    case 'roof': // снежная шапка
      return {
        fill: BASE_COLORS.white, // чистый белый
        fillStyle: 'solid',
        fillWeight: 1,
      };

    case 'display': // экран монитора (включён, тёплый режим)
      return {
        fill: BASE_COLORS.accentSand, // тёплый кремовый — «режим чтения»
        fillStyle: 'solid',
      };

    case 'display-plate': // корпус/подставка монитора
      return {
        fill: BASE_COLORS.charcoal, // тёмный графит
        fillStyle: 'hachure',
        hachureGap: 2,
        hachureAngle: 42,
        fillWeight: 1,
      };

    case 'chair': // спинка кресла
      return {
        fill: BASE_COLORS.sienna, // тёплый коричневый (кожа/дерево)
        fillStyle: 'cross-hatch',
        hachureGap: 3,
        fillWeight: 1,
      };

    case 'ground': // столешница
      return {
        fill: BASE_COLORS.woodLight, // тёплое дерево
        fillStyle: 'hachure',
        hachureGap: 2,
        hachureAngle: 42, // такой же угол, как корпус монитора
        fillWeight: 1,
      };

    case 'book-one': // терракотовая обложка
      return {
        fill: BASE_COLORS.pageWhite, // белые страницы
        stroke: BASE_COLORS.terracotta, // терракотовая обложка
        strokeWidth: 3,
        fillStyle: 'solid',
      };

    case 'book-two': // горчично-жёлтая обложка
      return {
        fill: BASE_COLORS.pageWhite,
        stroke: BASE_COLORS.mustard, // горчично-жёлтая
        strokeWidth: 4,
        fillStyle: 'solid',
      };

    case 'book-three': // лесной зелёный
      return {
        fill: BASE_COLORS.pageWhite,
        stroke: BASE_COLORS.forestGreen, // лесной зелёный
        strokeWidth: 4,
        fillStyle: 'solid',
      };

    case 'book-four': // пыльно-синий
      return {
        fill: BASE_COLORS.pageWhite,
        stroke: BASE_COLORS.dustyBlue, // пыльно-синий
        strokeWidth: 4,
        fillStyle: 'solid',
      };

    case 'cup-one': // ручка чашки (дырка)
      return {
        fill: 'none', // без заливки — это «дырка»
        fillStyle: 'solid',
      };

    case 'cup-two': // корпус чашки
      return {
        fill: BASE_COLORS.coffee, // кофейный коричневый (керамика)
        fillStyle: 'solid',
      };

    default:
      return {};
  }
}

const introResolver: PathOptionsResolver = (path) => {
  const className = path.getAttribute('class') || '';
  return {
    ...BASE_OPTIONS,
    ...fillOptionsForClass(className),
  };
};

function sketchifyIntro(svg: SVGSVGElement): void {
  sketchifySvg(svg, introResolver);
}

export { sketchifyIntro };
