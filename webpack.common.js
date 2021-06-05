const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Tulip-ui',
      type: 'umd',
    },
    clean: true,
  },
  // 配置参考：https://webpack.docschina.org/configuration/resolve/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      // 'packages': path.resolve(__dirname, 'packages/'),
      // 'styles': path.resolve(__dirname, 'styles/')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'packages')
        ],
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'packages')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'packages')
        ],
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: 'body', // 配置 JS 文件引入到哪里
    //   template: './public/index.html'
    // }),
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ],
};