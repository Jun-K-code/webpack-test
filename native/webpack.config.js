const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.pro');

const baseConfig = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js', // 输出文件名
    path: path.resolve(__dirname, 'build'), // 输出的目录
    clean: true, // 在生成文件之前，清空 output 目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
function getWebpackConfig(env) {
  if (env === 'production') {
    return { ...baseConfig, ...proConfig };
  }
  return { ...baseConfig, ...devConfig };
}
module.exports = getWebpackConfig;
