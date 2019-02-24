## noParse
`module.noParse`,不去解析符合指定正则的文件中的依赖关系,从而减少打包时间
注意，noParse的文件中不能有`import`, `require`, `define`这样的
```js
// webpack.config.js
module.exports = {
  module: {
    noParse: /jquery/
  }
}
```

## ignorePlugin(大杀器)
webpack.IgnorePlugin，能够忽略某些包内部的依赖
比如，moment内依赖了大量的语言文件，非常大。使用ignorePlugin之后，可以忽略不引用，大大减少bundle的size
需要引入的语言包在手动引入

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ]
}
```

## happyPack
多线程打包

## dllPlugin
dll是要讲指定的文件抽离出来，生成动态链接映射文件，然后在打包的时候，动态引用抽离出来的dll文件，不打包到bundle文件中
- webpack.DllPlugin({ name, path })
    生成dll文件和映射文件(manifest.json)
- webpack.DllReferencePlugin({manifest})
    根据manifest文件找到dll文件，建立依赖关系

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({manifest: path.resolve('dist','manifest.json')})
  ]
}

// webpack.config.dll.js
module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    libirary: '_dll_[name]'  // dll模块返回的module.exports赋值给library
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}
```

## chunkSplit


## codeSplit(懒加载)


## hot-reload-replacement
