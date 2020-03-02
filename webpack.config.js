var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      { 
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/react'],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
            // ["transform-runtime",
            //   {
            //     "polyfill": false,
            //     "regenerator": true
            //   }
            // ]
          ]
        }
      }, 
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader'}
      //   ]
      // }
    ]
  }
};