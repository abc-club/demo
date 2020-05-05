var E = require('./even.cjs');
console.log(E);
module.exports = function odd(n) {
  return n != 0 && E.even(n - 1);
};
