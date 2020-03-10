
// 面试题1
// let r
// function* g(n) {
//   r=n>0?yield 2 : 1
// }

// var a= g(1)
// // var a= g(-1)
// console.log(a.next(4))
// console.log(r)
// console.log(a.next(6))
// console.log(r)


////////////////////////////

// (function (){
//   yield 1;
// })()

////////////////////////////

// function* demo() {
//   // console.log('Hello' + yield); // SyntaxError
//   // console.log('Hello' + yield 123); // SyntaxError

//   console.log('Hello' + (yield)); // OK
//   console.log('Hello' + (yield 123)); // OK
// }

// var g=demo()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())

////////////////////////////

// 不包含return
// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }

// for (let v of foo()) {
//   console.log(v); // 1 2 3 4 5
// }

////////////////////////////

// function* foo() {
//   let y = yield 1
//   if (y) {
//     yield 2
//   }
//   yield 3

// }
// for (let v of foo()) {
//   console.log(v); // 1 3
// }

////////////////////////////
// try{
//   console.log(1)
//   throw new Error('a')
//   console.log(2)
// } catch(e) {
//   console.log(e)
// }
// console.log(3)

////////////////////////////

// var g = function* () {
//   while (true) {
//     yield;
//     console.log('内部捕获', e);
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a');
//   i.throw('b');
// } catch (e) {
//   console.log('外部捕获', e);
// }
// // 外部捕获 a

////////////////////////////
// 注意throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
// var gen = function* gen(){
//   try {
//     yield console.log('a');
//   } catch (e) {
//     console.log('error')
//   }
//   yield console.log('b');
//   yield console.log('c');
// }

// var g = gen();
// g.next() // a
// g.next() // b
// g.throw(new Error('aaa')) // 中止，抛出异常
// console.log(1)
// g.next() // c

////////////////////
// function* foo() {
//   var x = yield 3;
//   var y = x.toUpperCase();
//   yield y; // 不会执行了
//   console.log(121)
//   yield 1;
// }

// var it = foo();

// it.next(); // { value:3, done:false }

// try {
//   it.next(42);
// } catch (err) {
//   console.log(err);
// }
// console.log(11) // 11
// it.next(); // { value:undefined, done:true }
// console.log(12) // 12


//////////////////
// function* numbers () {
//   yield 1;
//   try {
//     yield 2;
//     yield 3;
//   } finally {
//     yield 4;
//     yield 5;
//   }
//   yield 6;
// }
// var g = numbers();
// console.log(g.next()) //{ value: 1, done: false }
// console.log(g.next()) //{ value: 2, done: false }
// console.log(g.next()) //{ value: 3, done: false }
// console.log(g.next()) //{ value: 4, done: false }
// console.log(g.return(7)) //{ value: 7, done: true }
// console.log(g.next()) // { value: undefined, done: true }
// console.log(g.next()) // { value: undefined, done: true }
// // g.next() // { value: 1, done: false }
// // g.next() // { value: 2, done: false }
// // g.return(7) // { value: 4, done: false }
// // g.next() // { value: 5, done: false }
// // g.next() // { value: 7, done: true }


//////////////////
// 太耦合了
// function* main(url) {
//   var result = yield request(url)
//   console.log(result)
// }

// function request(url) {
//   setTimeout(()=> {
//     g.next('result')
//   }, 1000)
// }

// var g = main()
// g.next()
//////////////////


// thunk和run自动执行generator函数
// function readFile(filename, callback) {
//   setTimeout(() => {
//     callback(filename)
//   }, 1000)
// }

// function Thunkify(fn) {
//   return function(...args) {
//     return function(callback) {
//       return fn.call(this, ...args, callback)
//     }
//   }
// }

// let thunkRead = Thunkify(readFile)

// function* gen() {
//   let f1= yield thunkRead('A')
//   console.log(f1)
//   let f2= yield thunkRead(f1+'B')
//   console.log(f2)
// }

// // let g = gen()

// // g.next().value(function(f1) {
// //   g.next(f1).value(function(f2) {
// //     g.next(f2)
// //   })
// // })

// function run(fn) {
//   var gen = fn();

//   function next(data) {
//     var result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }

//   next();
// }

// run(gen)


//////////////////
