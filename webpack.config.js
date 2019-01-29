const path = require('path');

const config = {
  mode: 'development',
  devServer: {
    contentBase: './public',
  },
  context: __dirname,
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
    mainFields: ['browser', 'module', 'main'],
  },
};

module.exports = config;
