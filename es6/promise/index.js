// const p1 = new Promise(function (resolve, reject) {
//   setTimeout(() => reject(new Error('fail')), 2000)
// })

// const p2 = new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(p1), 1000)
// })

// p2
//   .then(result => console.log(1))
//   .catch(error => console.log(2))


///////////////////
// const promise = new Promise(function(resolve, reject) {
//   resolve('ok');
//   console.log(1)
//   throw new Error('test');
//   console.log(2)
// });
// promise
//   .then(function(value) { 
//     console.log(value)
//     return value
//    })
//    .then((value)=> {
//     console.log(value)
     
//    })
//   .catch(function(error) { console.log(error) });
// // ok


//////////////////

// let p = new Promise((resolve,reject)=> {
//   resolve()
// })
// p.then(res=>{
//   console.log(1)
//   throw new Error('e')
// }).catch(err=> {
//   console.log(2)
// })


//////////////////
// TODO：为什么2秒后打印error
// let p = new Promise((resolve,reject)=> {
//   console.log(1)
//   // resolve(x + 2);
//   throw new Error('a')
//   console.log(2)
// })
// p.then(res=>{
//   console.log(3)
// })
// // setTimeout(() => { console.log(123) }, 2000);
////////////////////////

// const promise = new Promise(function (resolve, reject) {
//   resolve('ok');
//   setTimeout(function () { throw new Error('test') }, 0)
// });
// promise.then(function (value) { console.log(value) });
// setTimeout(() => { console.log(123) }, 2000); // 不会执行
// // ok
// // Uncaught Error: test



////////////////////////

// setTimeout(function () { throw new Error('test') }, 0)
// setTimeout(() => { console.log(123) }, 2000); // 不会执行

////////////////////////

// setTimeout(() => { console.log(123) }, 2000); // 不会执行
// throw new Error('test')

////////////////////////

// const promise = new Promise(function (resolve, reject) {
//   throw new Error('test')
// });
// promise
//   .then(function (value) { console.log(value) })
//   .catch(e=> {
//     console.log(1)
//     y+1
//   })
// setTimeout(() => { console.log(123) }, 2000); // 会执行

////////////////////////

// const promise = new Promise(function (resolve, reject) {
//   throw new Error('test')
// });
// promise
//   .then(function (value) { console.log(value) })
//   .catch(e=> {
//     console.log(1)
//     y+1
//   }).catch(function(error) {
//     console.log('carry on', error);
//   });
// setTimeout(() => { console.log(123) }, 2000); // 会执行

////////////////////////

// const resolved = Promise.resolve(42);
// const rejected = Promise.reject(-1);

// const allSettledPromise = Promise.allSettled([resolved, rejected]); // 需要polyfill

// allSettledPromise.then(function (results) {
//   console.log(results);
// });
// // [
// //    { status: 'fulfilled', value: 42 },
// //    { status: 'rejected', reason: -1 }
// // ]

////////////////////////

// let thenable = {
//   then: function(resovle,reject) {
//     resovle(42)
//   }
// };

// let p1 = Promise.resolve(thenable);
// p1.then(function(value) {
//   console.log(value);  // 42
//   return 1
// }).then(function(value) {
//   console.log(value);  // 1
// });

////////////////////////

// let thenable = {
//   then: function(resovle,reject) {
//     console.log(11)
//     return 42
//   }
// };

// let p1 = Promise.resolve(thenable); // p1一直pending
// console.log(p1)
// p1.then(function(value) { // 不会执行
//   console.log(value);  //
//   return 1
// }).then(function(value) {
//   console.log(value);  // 
// });

////////////////////////

// let thenable = {
//   a: function(resovle,reject) {
//     console.log(11)
//     return 42
//   }
// };

// let p1 = Promise.resolve(thenable);
// p1.then(function(value) {
//   console.log(value);  // { a: [Function: a] }
//   return 1
// }).then(function(value) {
//   console.log(value);  // 1
// });

// let p1 = Promise.resolve({a: 1});
// p1.then(function(value) {
//   console.log(value);  // 42
//   return 1
// }).then(function(value) {
//   console.log(value);  // 
// });


////////////////////////
