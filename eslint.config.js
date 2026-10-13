// ESLint 9 — flat config
// Документация: https://eslint.org/docs/latest/use/configure/configuration-files

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Базовые рекомендации ESLint
  js.configs.recommended,

  // Рекомендации для TypeScript (strict + stylistic по желанию — можно оставить только recommended)
  ...tseslint.configs.recommended,

  // Отключаем правила, которые конфликтуют с Prettier
  // (Prettier отвечает за форматирование, ESLint — за логику/баги)
  prettier,

  // Глобальные настройки
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Браузерные глобальные (window, document, requestAnimationFrame и т.д.)
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        history: 'readonly',
        location: 'readonly',
        navigator: 'readonly',
      },
    },
    rules: {
      // Твои кастомные правила — добавляй по мере роста проекта
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log → warning
      'no-unused-vars': 'off', // отключаем базовое — оно не понимает TS-типы
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // any — допустимо, но с предупреждением
    },
  },

  // Файлы, которые не линтим
  {
    ignores: ['dist/**', 'node_modules/**', '.husky/**'],
  }
);
