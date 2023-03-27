/** @format */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // devtool: 'cheap-eval-source-map',
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
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
        test: /\.scss$|\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 文件大小小於 8KB 的時候轉換成 data URL
              fallback: require.resolve('file-loader'), // 文件大小大於 8KB 的時候使用 file-loader 轉換成實際文件路徑
              outputPath: './dist/assets/images'
            },
          },
        ],
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
    port: process.env.NODE_ENV === "production" ? 'https://clothing-frontend.herokuapp.com/' : 8080,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'index_bundle.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        ASSETS_PATH: JSON.stringify(
          path.join(__dirname, 'dist/assets/images')
        ),
      },
    }),
  ],
  mode: 'development',

  devtool: 'source-map',
}

