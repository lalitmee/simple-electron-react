const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("semantic/semantic.min.css");

const config = {
  entry: "./app/app.js",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
        // query: {
        //   presets: ["es2015", "react", "stage-0"]
        // }
      },
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],

        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};

module.exports = config;
