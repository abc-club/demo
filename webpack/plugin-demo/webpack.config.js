var path = require('path');
var AddFilePlugin = require('../webpack-add-file-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './entry.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'comment-loader?comment=aaa',
      },
    ],
  },
  plugins: [
    // new AddFilePlugin({
    //   filename: 'a.json',
    //   content: '{a: 1}'
    // }),
    new AddFilePlugin(),
  ],
  resolveLoader: {
    // 去哪些目录下寻找 Loader，有先后顺序之分
    modules: ['node_modules', '../'],
  },
};
