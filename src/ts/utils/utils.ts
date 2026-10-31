const removeStyle = (styleElement: HTMLStyleElement | undefined): void => {
  if (styleElement) {
    styleElement.remove();
  }
};

export { removeStyle };
