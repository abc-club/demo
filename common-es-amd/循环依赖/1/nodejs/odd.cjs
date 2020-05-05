var even = require('./even').even;
module.exports = function (n) {
  return n != 0 && even(n - 1);
};
