import { odd } from './odd.js';
console.log(odd);

export var counter = 0;
console.log(even);
// 变量提升
export function even(n) {
  counter++;
  return n === 0 || odd(n - 1);
}
