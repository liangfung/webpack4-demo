const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist'), // 绝对路径
  },
  externals: {
    jquery: '$'
  },
  devServer: {
    port: 7000
  },
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$'
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        ],
        exclude: /node_modules/
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
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    // new webpack.ProvidePlugin({
    //   '$': 'jquery'
    // })
  ]
}