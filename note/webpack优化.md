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
```js
const HappyPack = require('happypack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'happypack/loader?id=js'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
          plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import'
            ]
        }
      }
    })
  ]
}
```

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

## tree shaking
使用es module的import语法来更好的实现tree shaking

## scope hosting


## splitChunks
使用`optimization.splitChunks`
其中，使用`cacheGroups`能够很好的分割chunk
### splitChunks的默认配置
- 抽离出来的新chunk必须是有共用的或者是node_modules中的
- 大于30kb的抽离出来
- 按需请求时，最大并行请求数是5
- 首页加载时，最大并行请求数是3

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5, // Maximum number of parallel requests when on-demand loading.
      maxInitialRequests: 3,  // Maximum number of parallel requests at an entry point
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

## codeSplit(懒加载)
使用 `dynamic import` 动态加载
(或者使用require.ensure，不过这是野生的)

## hot-reload-replacement
