const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const devConfig = require('./webpack.dev');

const baseConfig = {
  entry: './src/index.js',
  output: {
    filename: 'static/js/[name].[contenthash:8].js', // 输出文件名
    path: path.resolve(__dirname, 'build'), // 输出的目录
    clean: true, // 在生成文件之前，清空 output 目录
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env', // 能解决大多数样式兼容性问题
                  ],
                ],
              },
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
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
};
function getWebpackConfig(env) {
  const isProduction = env?.production;
  const base = {
    mode: isProduction ? 'production' : env?.development && 'development',
    ...baseConfig,
  };
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
          // output: {
          //   ecma: 5, // ES5 兼容性
          //   comments: false, // 移除注释
          //   ascii_only: true, // ASCⅡ编码
          // },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              // 删除所有注释(包括以 /*! 开头的注释)
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProduction) {
    return { ...base, optimization };
  }
  return { ...base, ...devConfig };
}
module.exports = getWebpackConfig;
