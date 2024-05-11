/* global module __dirname process */
const path = require('path');

const configureWebpack = (webpackConfig, { env, paths }) => {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  webpackConfig.output = {
    ...webpackConfig.output,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction
      ? 'assets/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'assets/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? 'assets/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'assets/js/[name].chunk.js',
  };
  console.log('测试module', webpackConfig.module);
  webpackConfig.module = {
    ...webpackConfig.module,
    rules: [
      ...webpackConfig.module.rules,
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  };
  return webpackConfig;
};

module.exports = {
  webpack: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
    configure: configureWebpack,
  },
};
