import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import pkg from './package.json';
const dependencies = Object.keys(pkg.dependencies);

module.exports = {
  entry: {
    main: './src/js/app.js',
    vendor: dependencies
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.join(__dirname, 'src', 'js'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'source-map-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      xhtml: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
        beautify: true
      },
      compress: {
        warnings: false,
        dead_code: true,
        collapse_vars: true,
        join_vars: true,
        unused: true,
        toplevel: true,
        drop_console: true
      },
      mangle: {
        screw_ie8: true
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
  ],

  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
    ,
    alias: {
      react: 'react-lite',
      'react-dom': 'react-lite'
    }
  }
};
