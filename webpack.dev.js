const path = require('path');
// const { merge } = require('webpack-merge'); // merge 报错使用该配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: './src/main.js',
  devtool: 'inline-source-map', // 添加报错文件映射
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true, // 启用热更新
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'packages'),
          path.resolve(__dirname, 'styles')
        ],
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body', // 配置 JS 文件引入到哪里
      template: './public/index.html'
    })
  ],
});