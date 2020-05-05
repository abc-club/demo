import 'core-js';
import 'regenerator-runtime/runtime';

require('@babel/register');
import { add, mutil } from './math';
var _math2 = require('./math');
console.log(add(1, 2));
console.log(_math2.add(1, 2));

let s = new Set([1, 2, 3]);
const arr = Array.from(s);
