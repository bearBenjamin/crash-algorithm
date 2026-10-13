// ESLint 9 — flat config (ESM)
// Документация: https://eslint.org/docs/latest/use/configure/configuration-files
//
// ВАЖНО: файл называется eslint.config.mjs (не .js), потому что
// внутри используется ESM-синтаксис (import/export). ESLint 9 требует
// либо .mjs-расширение, либо "type": "module" в package.json.
// Второе сломало бы webpack.config.js (он CommonJS), поэтому .mjs.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Базовые рекомендации ESLint
  js.configs.recommended,

  // Рекомендации для TypeScript
  ...tseslint.configs.recommended,

  // Отключаем правила, конфликтующие с Prettier
  prettier,

  // ──────────────────────────────────────────────────────────
  // Основной скоуп — TypeScript и JS в src/
  // ──────────────────────────────────────────────────────────
  {
    files: ['src/**/*.{ts,js}'],
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
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // отключаем базовое — оно не понимает TS-типы
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // ──────────────────────────────────────────────────────────
  // Конфиг-файлы в корне проекта — CommonJS (require/module.exports)
  // Это webpack.config.js, postcss.config.js и т.д.
  // Без этого override ESLint ругается на require() в ESM-режиме.
  // ──────────────────────────────────────────────────────────
  {
    files: ['*.config.js', 'webpack.config.js', 'postcss.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs', // ← ключевое: разрешаем require/module.exports
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        exports: 'writable',
        console: 'readonly',
      },
    },
    rules: {
      // В конфигах CommonJS — require() это норма, не ошибка
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // ──────────────────────────────────────────────────────────
  // Файлы, которые не линтим вовсе
  // ──────────────────────────────────────────────────────────
  {
    ignores: ['dist/**', 'node_modules/**', '.husky/**', '.github/**', 'coverage/**'],
  }
);
