const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('semantic/semantic.min.css');

const config = {
  entry: './app/app.js',
  // externals: [nodeExternals(), 'node_helper'],
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
        // query: {
        //   presets: ["es2015", "react", "stage-0"]
        // }
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],

        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      // {
      //   test: /aws-sdk/,
      //   loader: ['transform-loader?aws']
      // },
      // {
      //   test: /\.json$/,
      //   loader: ['json-loader']
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

module.exports = config;
