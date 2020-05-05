import * as a from './a';
import * as b from './b';
console.log('main 开始');
console.log('在 main 中，a.done=%j，b.done=%j', a.default, b.default);

// b 开始
// 在 b 中，a.done = %j undefined
// b 结束
// a 开始
// 在 a 中，b.done = %j {done: true}
// a 结束
// main 开始
// 在 main 中，a.done=%j，b.done=%j {done: true} {done: true}
