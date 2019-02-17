import str from './a'
import str2 from './b'
require('@babel/polyfill')
// import('./c')
console.log(str + str2)


// import('./style/index.css')  // 动态yinru
// import('./style/b.less')
require('./style/index.css')
require('./style/b.less')

let fn = () => {console.log('this is fn')}
fn()

@log
class Foo {
  name = 'a'
  say() {
    console.log(this.name)
  }
}

function log(target) {
  console.log(target)
}

let foo = new Foo()
foo.say()

const bar = async() => {
  return 3
}
bar()


console.log('abc'.includes('c'))