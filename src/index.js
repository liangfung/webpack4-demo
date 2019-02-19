import str from './a'
import str2 from './b'
require('@babel/polyfill')
// import('./c')
console.log(str + str2)


// // import('./style/index.css')  // 动态yinru
// // import('./style/b.less')
require('./style/index.css')
require('./style/b.less')

// let fn = () => {console.log('this is fn')}
// fn()

// @log
// class Foo {
//   name = 'a'
//   say() {
//     console.log(this.name)
//   }
// }

// function log(target) {
//   console.log(target)
// }

// let foo = new Foo()
// foo.say()

// const bar = async() => {
//   return 3
// }
// bar()


// console.log('abc'.includes('c'))



// 方法一：expose-loader
/*使用内联loader的写法，挂在window对象下*/
// import $ from 'expose-loader?$!jquery'

/* 在webpack config的module中写loader规则，不用写内联的形式 */
// import $ from 'jquery'


// 方法二：wepback.provider
/* 在webpack config的plugins里面写，为每个模块注入jquery */


// 方法三： externals
/**
 * 在html中用script引入之后，jquery变量就已经挂到window下了
 * 但这时候想同时  require('jquery')的话，会导致jquery依赖打包到bundle中
 * 应该要是用externals声明，使得jquery不打包
 */
// import _$ from 'jquery'

// console.log(_$)  // 引入但不打包
// console.log($)   // 挂在window下
// console.log(window.$)  // 挂在window下

