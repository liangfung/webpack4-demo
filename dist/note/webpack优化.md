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


## dllPlugin


## chunkSplit


## codeSplit(懒加载)


## hot-reload-replacement
