const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/, path.resolve(__dirname, 'public')],
        use: [
          // 'thread-loader',
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
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
};
function getWebpackConfig(env) {
  const isProduction = env === 'production';
  const optimization = {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // 表示移除注释
          },
          parse: {
            ecma: 8, // 表示解析 ECMAScript 2017 代码
          },
          compress: {
            ecma: 5, // 表示压缩时，保持 ECMAScript 5 兼容性
            warnings: false, // 表示不显示压缩警告
            comparisons: false, // 表示禁用比较操作的压缩，因为存在问题（参见相关 GitHub 问题）
            inline: 2, // 表示内联函数
            drop_debugger: true, // 移除debugger语句
          },
          mangle: {
            safari10: true, // 兼容 Safari 10
          },
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5, // ES5 兼容性
            comments: false, // 移除注释
            ascii_only: true, // ASCⅡ编码
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProduction) {
    return { ...baseConfig, optimization, ...proConfig };
  }
  return { ...baseConfig, ...devConfig };
}
module.exports = getWebpackConfig;
