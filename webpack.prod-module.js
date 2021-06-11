const path = require('path');
// const { merge } = require('webpack-merge'); // merge 报错使用该配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example'),
          path.resolve(__dirname, 'packages'),
          path.resolve(__dirname, 'styles')
        ],
        use: [
          'vue-style-loader',
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
    new CssMinimizerPlugin(), // 开启 CSS 压缩
  ]
});