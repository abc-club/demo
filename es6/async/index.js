// async function f() {
//   await new Promise(function (resolve, reject) {
//     throw new Error('出错了');
//   }).catch(e=> {
//     console.log('eee')
//     return 1
//   });
// }

// f()
// .then(v => console.log(v))
// .catch(e => console.log(e))

///////////////

// async function g() {
//   throw new Error('error')
//   return 1
// }

// async function f() {
//   return await g()
// }

// f()
// .then(v => console.log(v))
// .catch(e => console.log(e))

///////////////
// var a = [1,2,3]
// let r = a.reduce((pre, cur) => {
//   return pre+','+cur
// })
// console.log(r)

// var a = [1,2,3]
// let r = a.reduce(async (pre, cur) => {
//   await Promise.resolve(pre+','+cur)
//   // return pre+','+cur
// })
// console.log(r)
// r.then(res=> {
//   console.log(111)
// })

// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })
// let p1 = new Promise((resolve, reject) => {
//   reject(1)
// })
// let p2 = new Promise((resolve, reject) => {
// })
// console.log(p)
// console.log(p1)
// console.log(p2)

// let p = Promise.resolve(1)
// console.log(p)


///////////////

function request(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log(filename)
      resolve(filename)
    }, Math.random()*500)
  })
}
// 方法一
// async function a() {
//   let docs = ['A','B','C']
//   let promises = docs.map(filename=>request(filename))
//   for(var promise of promises) {
//     await promise
//   }
// }
// 方法二
async function a() {
  let docs = ['A','B','C']
  let promises = docs.map(filename=>request(filename))
  await Promise.all(promises)
}

a().then(res=> res)