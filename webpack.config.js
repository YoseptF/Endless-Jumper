const path = require('path');
const webpack = require('webpack');// eslint-disable-line import/no-unresolved
const HtmlWebpackPlugin = require('html-webpack-plugin');// eslint-disable-line import/no-unresolved
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');// eslint-disable-line import/no-unresolved
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'file-loader',
        options: {
          // limit: 8000, // Convert images < 8kb to base64 strings
          name: 'html/[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  entry: [
    path.resolve('src', 'index.js'),
    // path.resolve('src', 'packages', 'countries.js'),
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    // chunkFilename: '[name].[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      title: 'Endless Jumper',
      favicon: './src/images/favicon.ico',
    }),
    new BrowserSyncPlugin({
      https: true,
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
};
