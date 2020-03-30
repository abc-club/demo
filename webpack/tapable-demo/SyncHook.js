const { SyncHook } = require('tapable');
console.log(SyncHook.prototype);
let sh = new SyncHook(['name']);
sh.tap('A', name => {
  console.log('A:', name);
});
sh.tap(
  {
    name: 'B',
    before: 'A', // 影响该回调的执行顺序, 回调B比回调A先执行
  },
  name => {
    console.log('B:', name);
  },
);
sh.call('Tapable');
console.log(sh instanceof SyncHook);
