/** @format */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
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
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 8192,
              fallback: require.resolve('url-loader'),
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     { loader: '@svgr/webpack' },
      //     { loader: 'svg-sprite-loader', options: {} },
      //     {
      //       loader: 'svgo-loader', options: {
      //         plugins: [
      //           {
      //             name: 'removeAttrs',
      //             params: {
      //               attrs: 'fill'
      //             }
      //           }
      //         ]
      //       }
      //     },
      //   ],
      // },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true,
    historyApiFallback: true,
    port: process.env.NODE_ENV === "production" ? 'https://github.com/FelixMitsui/wave-sight' : 8080,
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
  // mode: 'development',

  devtool: 'source-map',
}

