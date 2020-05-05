var odd = require('./odd.cjs');
console.log(odd);

var counter = 0;
exports.counter = counter;
console.log(even);
function even(n) {
  counter++;
  // console.log(counter);
  return n == 0 || odd(n - 1);
}
exports.even = even;
