/** es新语法 */
require('@babel/polyfill')
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
/** es语法  */