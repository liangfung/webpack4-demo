/** babel-loader的presets和plugins */
// require('./esSyntax')

/** 使用 mini-css-extract-plugin */
// require('./extactCss')

/** 注入全局变量 */
// require('./globalVariable')

/** 忽略不引入某些依赖中的依赖 */
// require('./ignorePlugin')

/** 不查找指定包中的依赖关系 */
// require('./noParse')

/** 使用webpack的dll */
// require('./dllPlugin')

/** happypack 多线程打包 */
// require('./happypack')

/** 使用 optimization.splitChunks */
import('./splitChunk/page1')
import('./splitChunk/page2')