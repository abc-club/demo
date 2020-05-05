import * as a from './a';

console.log('b 开始');
const output = { done: false };
console.log('在 b 中，a.done = %j', a.default);
output.done = true;
console.log('b 结束');

export default output;
