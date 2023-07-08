const path = require('path');
require('dotenv').config({ path: './config.env' });
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

console.log(process.env.NODE_ENV || 'development');
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].index_bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath:
      process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
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
                plugins: [require('autoprefixer')],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
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
    hot: true,
    historyApiFallback: true,
    port: 8080,
    compress: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL || ''),
        ASSETS_PATH: JSON.stringify(path.join(__dirname, './assets/images')),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index_bundle.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: process.env.NODE_ENV === 'products' ? '' : 'source-map',
};
