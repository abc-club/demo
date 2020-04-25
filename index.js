function add(a, b) {
  return a + b;
}

// function curry(fn) {
//   var arr = [];
//   return function f() {
//     arr.push(...arguments);
//     if (arr.length === fn.length) {
//       return fn.apply(null, arr);
//     } else return f;
//   };
// }

// 严格模式
function curry(fn) {
  var arr = [];
  return function () {
    arr.push(...arguments);
    if (arr.length === fn.length) {
      let res = fn.apply(null, arr);
      arr = [];
      return res;
    } else return arguments.callee;
  };
}

var curryAdd = curry(add);
console.log(curryAdd(1)(2));
console.log(curryAdd());
