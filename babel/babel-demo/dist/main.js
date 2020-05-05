"use strict";

require("core-js");

require("regenerator-runtime/runtime");

var _math = require("./math");

require('@babel/register');

var _math2 = require('./math');

console.log((0, _math.add)(1, 2));
console.log(_math2.add(1, 2));
var s = new Set([1, 2, 3]);
var arr = Array.from(s);
