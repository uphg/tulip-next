const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const vueInclude = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'example'),
  path.resolve(__dirname, 'packages'),
  path.resolve(__dirname, 'styles')
]

module.exports = {
  output: {
    filename: 'tulip-ui.common.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Tulip-ui',
      type: 'umd',
    },
    clean: true, // 打包时清空之前的文件
  },
  // 配置参考：https://webpack.docschina.org/configuration/resolve/
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src/'),
      'packages': path.resolve(__dirname, 'packages/'),
      'tulip-ui': path.resolve(__dirname, '../')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: vueInclude,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: vueInclude,
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: vueInclude,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
};