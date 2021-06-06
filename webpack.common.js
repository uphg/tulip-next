const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
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
      '@': path.resolve(__dirname, 'src/')
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
    new VueLoaderPlugin()
  ],
};