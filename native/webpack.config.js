const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js', // 输出文件名
    path: path.resolve(__dirname, 'build'), // 输出的目录
    clean: true, // 在生成文件之前清空 output 目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
