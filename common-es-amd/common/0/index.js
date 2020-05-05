const a = require('./a.js');
const b = require('./b.js');
console.log('main 开始');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);

// b 开始
// 在 b 中，a.done = undefined
// b 结束
// a 开始
// 在 a 中，b.done = true
// a 结束
// main 开始
// 在 main 中，a.done=true，b.done=true
