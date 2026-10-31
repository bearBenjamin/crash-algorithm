export {};

declare global {
  interface Window {
    // Указываем, что свойство может быть HTMLStyleElement или undefined
    __introStyleRef?: HTMLStyleElement;
  }
}
