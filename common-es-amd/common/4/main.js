var mod = require('./lib');
var mod2 = require('./lib2');

console.log(mod.counter); // 3
console.log(mod.obj); // { a: 2, b: 2 }
mod.incCounter();
console.log(mod.counter); // 3
console.log(mod.obj); // { a: 2, b: 2 }
