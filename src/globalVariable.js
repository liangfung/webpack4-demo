/** 注入全局变量 start */
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
import _$ from 'jquery'

console.log(_$)  // 引入但不打包
console.log($)   // 挂在window下
console.log(window.$)  // 挂在window下

/** 注入全局变量 end */