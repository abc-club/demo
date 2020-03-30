const { AsyncSeriesHook } = require('tapable');
let sh = new AsyncSeriesHook([]);
sh.tap('A', () => {
  console.log('A:');
});
sh.tap(
  {
    name: 'B',
    before: 'A', // 影响该回调的执行顺序, 回调B比回调A先执行
  },
  () => {
    console.log('B:');
  },
);
sh.callAsync((err, result) => {
  console.log(err, result);
});
