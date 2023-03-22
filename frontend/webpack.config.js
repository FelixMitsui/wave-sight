/** @format */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // devtool: 'cheap-eval-source-map',
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.[hash].js',
    publicPath: '/',
    clean: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(gif|jpg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          { loader: '@svgr/webpack' },
          { loader: 'svg-sprite-loader', options: {} },
          {
            loader: 'svgo-loader', options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: 'fill'
                  }
                }
              ]
            }
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true,
    historyApiFallback: true,
    port: 8080,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'index.[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',

  devtool: 'source-map',
}

