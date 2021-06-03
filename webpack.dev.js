const path = require('path');
// const { merge } = require('webpack-merge'); // 报错使用该配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
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
        include: path.resolve(__dirname, 'src'),
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  }
});