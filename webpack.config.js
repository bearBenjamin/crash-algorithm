const path = require('path');
const glob = require('glob');
const PugPlugin = require('pug-plugin');

// ──────────────────────────────────────────────────────────
// Auto-discovery PUG-страниц.
// Все .pug в src/views/ (кроме начинающихся с _) автоматически
// становятся entry-точками. Имя entry = путь относительно src/views/.
//
// Примеры:
//   src/views/index.pug                       → dist/index.html
//   src/views/intro.pug                       → dist/intro.html
//   src/views/algorithms/binary-search.pug    → dist/algorithms/binary-search.html
//   src/views/algorithms/_partial.pug         → пропускается (partial)
// ──────────────────────────────────────────────────────────
function discoverEntries() {
  const viewsDir = path.resolve(__dirname, 'src/views');
  const entry = {};

  glob.sync('**/*.pug', { cwd: viewsDir }).forEach((rel) => {
    const basename = path.basename(rel, '.pug');
    // Пропускаем partials и layouts (файлы начинаются с _)
    if (basename.startsWith('_')) return;
    // Имя entry = относительный путь без расширения
    // На Windows приводим слеши к POSIX-стилю
    const name = rel.replace(/\.pug$/, '').replace(/\\/g, '/');
    entry[name] = `./src/views/${rel}`;
  });

  return entry;
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',

    entry: discoverEntries(),

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      publicPath: 'auto',
      clean: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        // Алиасы — позволяют писать require('@/scss/main.scss')
        // и require('@/ts/intro.ts') из любого PUG/TS-файла,
        // не считая относительные пути (../../../).
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/scss'),
        '@scripts': path.resolve(__dirname, 'src/ts'),
      },
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern',
                sassOptions: {
                  silenceDeprecations: ['legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              // onlyCompileBundledFiles: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },

    plugins: [
      new PugPlugin({
        pretty: !isProd,
        css: {
          filename: 'css/[name].[contenthash:8].css',
        },
        js: {
          filename: 'js/[name].[contenthash:8].js',
        },
      }),
    ],

    devServer: {
      static: path.join(__dirname, 'dist'),
      watchFiles: ['src/**/*.*'],
      hot: true,
      open: true,
      port: 3000,
      allowedHosts: 'all',
    },

    performance: {
      hints: isProd ? 'warning' : false,
      maxAssetSize: 600000,
      maxEntrypointSize: 800000,
    },
  };
};
