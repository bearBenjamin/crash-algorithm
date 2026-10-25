import { createTimeline } from 'animejs';
import type { Timeline } from 'animejs';

function introAnime(): void {
  const rows = document.querySelectorAll<SVGRectElement>('.reveal-row');

  const tl: Timeline = createTimeline({
    defaults: {
      duration: 400,
      ease: 'inOutQuad',
    },
  });

  if (rows.length > 0) {
    rows.forEach((row, index) => {
      const isEven = index % 2 === 0;

      if (isEven) {
        tl.add(row, { width: '100%' });
      } else {
        tl.add(row, { x: '0%', width: '100%' });
      }
    });
  }

  const textStartPosition = rows.length > 0 ? '<' : 0;

  tl.add('.intro__title-text', { x: ['-100%', '0%'] }, textStartPosition)
    .add('.intro__subtitle-text', { x: ['100%', '0%'] }, '<')
    .add('.intro__enter', { opacity: [0, 1], duration: 500 }, '<');
}

export { introAnime };
