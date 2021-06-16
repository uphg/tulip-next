const path = require('path');
// const { merge } = require('webpack-merge'); // merge 报错使用该配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: './example/main.js',
  devtool: 'inline-source-map', // 添加报错文件映射
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true, // 启用热更新
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body', // 配置 JS 文件引入到哪里
      template: './public/index.html'
    })
  ],
});