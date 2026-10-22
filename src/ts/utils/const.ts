import type { Options as RoughOptions } from 'roughjs/bin/core';

const BASE_OPTIONS: RoughOptions = {
  roughness: 1.8, // «карандашность» (1-3 — нормальный диапазон)
  bowing: 1, // изгиб линий (1 = default)
  seed: 42, // фиксированный seed — повторяемый результат
  disableMultiStroke: true, // одна линия вместо двух — для будущей анимации
};

interface ThemeColors {
  // Базовая графика и монохром
  ink: string; // Карандашный контур (#1d1d1d)
  charcoal: string; // Плотный серый для теней/металла (#3d3d3d)
  paper: string; // Фон теплой бумаги (#fbfbf9)
  pageWhite: string; // ультра-белый для книжных страниц (#FAFAFA)
  white: string; // Чистый белый (#ffffff)

  // Пастельные акценты
  accentBlue: string; // Нежно-синий (#B5D8E8)
  accentSand: string; // Песочный/кремовый (#F4E8D4)

  // Древесная палитра (Градиент дерева от светлого к темной сиене)
  woodLight: string; // Светлое дерево / столешница (#C8A165)
  woodBrown: string; // Теплый древесный (#b58558)
  sienna: string; // Глубокий коричнево-рыжий (#A6743D)
  earthClay: string; // Глиняный/охра (#e2b282)
  khakiMuted: string; // Оливковый/хаки (#8F8B7D)

  // Яркие карандашные цвета для обложек и керамики
  terracotta: string; // Терракотово-красный (#C75450)
  mustard: string; // Горчично-жёлтый (#D4A82B)
  forestGreen: string; // Лесной зелёный (#5B8A5A)
  dustyBlue: string; // Пыльно-синий (#4A6FA5)
  coffee: string; // Кофейный коричневый (#6B4A36)

  [key: string]: string;
}

const BASE_COLORS: ThemeColors = {
  ink: '#1d1d1d',
  charcoal: '#3d3d3d',
  paper: '#fbfbf9',
  pageWhite: '#fafafa',
  white: '#ffffff',

  accentBlue: '#B5D8E8',
  accentSand: '#F4E8D4',

  woodLight: '#c8a165',
  woodBrown: '#b58558',
  sienna: '#a6743d',
  earthClay: '#e2b282',
  khakiMuted: '#8F8B7D',

  terracotta: '#c75450',
  mustard: '#d4a82b',
  forestGreen: '#5bba5a',
  dustyBlue: '#4a6fa5',
  coffee: '#6b4a36',
};

const { ink, paper } = BASE_COLORS;
const BEAR_COLOR = { ink, paper };

export { BASE_OPTIONS, BASE_COLORS, BEAR_COLOR };
