import { even } from './even.js';
console.log(even);
export function odd(n) {
  return n !== 0 && even(n - 1);
}
