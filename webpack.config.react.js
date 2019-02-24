const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]'  // 将模块返回的module.exports赋值给指定的library
  },
  plugins: [
    new webpack.DllPlugin({ // 生成动态链接map文件  name = library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json') // 生成map文件给DllReferencePlugin查找
    })
  ]
}