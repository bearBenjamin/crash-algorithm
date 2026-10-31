const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Добавить класс на <html>, если reduced-motion
const applyReducedMotionClass = (): void => {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduced-motion');
  }
};

export { prefersReducedMotion, applyReducedMotionClass };
