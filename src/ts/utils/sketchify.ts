import rough from 'roughjs';
import type { RoughSVG } from 'roughjs/bin/svg';
import type { Options as RoughOptions } from 'roughjs/bin/core';

// Тип функции-resolver'а: даёшь path → получаешь options
type PathOptionsResolver = (path: SVGPathElement) => RoughOptions;

function sketchifySvg(svg: SVGSVGElement, resolver: PathOptionsResolver): void {
  const rc: RoughSVG = rough.svg(svg);

  // Array.from — критично, replaceWith меняет DOM
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path'));

  for (const path of paths) {
    const d = path.getAttribute('d');
    if (!d) continue;

    const options = resolver(path);
    const roughPath = rc.path(d, options);

    // Переносим class для CSS/анимации
    const className = path.getAttribute('class');
    if (className) {
      roughPath.setAttribute('class', className);
    }

    path.replaceWith(roughPath);
  }
}

export { type PathOptionsResolver, sketchifySvg };
