// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

// 方法一
// var o={1:222, 2:123, 5:888}

// function transform(obj) {
//   var arr = new Array(12).fill(null)
//   for(var i in obj) {
//     arr[Number(i) - 1] = obj[i]
//   }
//   return arr
// }
// console.log(transform(o))

// 方法二

// var o={1:222, 2:123, 5:888}

// function transform(obj) {
//   obj.length = 13
//   return Array.from(obj).slice(1).map(item=>{
//     if(item===undefined) return null
//     else return item
//   })
// }
// console.log(transform(o))


// 方法三

var o={1:222, 2:123, 5:888}

function transform(obj) {
  obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
  obj.length = 13
  return [...obj].slice(1).map(item=>{
    if(item===undefined) return null
    else return item
  })
}
console.log(transform(o))