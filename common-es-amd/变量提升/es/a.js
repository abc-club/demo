import { b } from './b.js';
console.log('in a.js: b=' + b);

export var a = 1; // 改成let就会报错，因为let不存在变量提升
