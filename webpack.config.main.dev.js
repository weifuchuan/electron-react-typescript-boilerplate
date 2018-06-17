'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fs = require('fs');
try {
  fs.unlinkSync(path.join(__dirname, "app/main.js"));
} catch (e) {}
try {
  fs.unlinkSync(path.join(__dirname, "app/main.js.map"));
} catch (e) {}
module.exports = {
  target: 'electron-main',
  entry: {
    main: './app/main.dev.ts'
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js',  '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules'],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [
        path.resolve(__dirname, 'app'/*, 'main.dev.ts'*/)
      ],
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
