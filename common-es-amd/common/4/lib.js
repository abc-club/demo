var counter = 3;
var obj = {
  a: 1,
  b: 2,
};
function incCounter() {
  counter++;
  obj.a = 2;
}
module.exports = {
  counter: counter,
  obj: obj,
  incCounter: incCounter,
};
