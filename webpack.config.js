const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, './dist'), // 绝对路径
  },
  devServer: {
    port: 7000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
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
      // hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
}