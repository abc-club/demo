import * as b from './b';

console.log('a 开始');
const output = { done: false };
console.log('在 a 中，b.done = %j', b.default);
output.done = true;
console.log('a 结束');

export default output;
