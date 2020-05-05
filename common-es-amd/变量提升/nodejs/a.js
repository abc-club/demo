let b = require('./b.js');
console.log('in a.js: b=' + b.b);
let a = 1;
exports.a = a; // 改成let就会报错，因为let不存在变量提升
