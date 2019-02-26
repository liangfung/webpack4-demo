const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist'), // 绝对路径
    // library: 'a',
    // libraryTarget: 'umd'
    // publicPath: '/assets/'
  },
  // externals: {
  //   jquery: '$'
  // },
  devServer: {
    port: 7000,
    // open: true,
    contentBase: './dist'
  },
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          priority: 1,
          minSize: 0,
          minChunks: 2
        },
        vendors: { // 第三方公共代码
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          name: 'vendor'
        }
      }
    }
  },
  module: {
    noParse: /jquery/,
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 30 * 1024,
            outputPath: 'img/'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [  // 数组，放插件实例
    // new webpack.DllReferencePlugin({ // manifest中有的依赖，不会打包到bundle.js中
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    new HappyPack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      ]
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        // collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'style/main.css'
    }),
    new CleanWebpackPlugin('./dist'),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, './note'),
    //     to: './note'
    //   }
    // ]),
    new webpack.BannerPlugin('author: liangfung'),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    // new webpack.ProvidePlugin({
    //   '$': 'jquery'
    // })
  ]
}