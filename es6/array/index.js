
ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

forEach(), filter(), reduce(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
[, 'a', undefined, null].join('#'); // "#a##"
[, 'a', undefined, null].toString(); // ",a,,"
