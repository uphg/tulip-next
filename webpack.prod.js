const path = require('path');
// const { merge } = require('webpack-merge'); // 报错使用该配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // 分离 CSS 样式文件
    }),
    new CssMinimizerPlugin(), // 开启 CSS 压缩
  ]
});