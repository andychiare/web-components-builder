const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './index.html' },
      { from: './node_modules/@webcomponents/webcomponentsjs',
        to: 'wc-polyfills',
        ignore: ['*.map']
      }
    ])
]
};