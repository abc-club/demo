const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer,
});

function completer(line) {
  const completions = '.help .error .exit .quit .q'.split(' ');
  const hits = completions.filter(c => c.startsWith(line));
  // 如果没有匹配，则显示所有补全。
  return [hits.length ? hits : completions, line];
}

// rl.question('xxxx?', answer => {
//   // rl.prompt('???!' + answer);
//   console.log('thanks!' + answer);
//   rl.close();
// });

////////////////////////
// rl.on('line', input => {
//   console.log(`接收到：${input}`);
// });

// rl.on('pause', () => {
//   console.log('Readline 暂停');
// });

// rl.on('SIGINT', () => {
//   rl.question('确定要退出吗？', answer => {
//     if (answer.match(/^y(es)?$/i)) rl.pause();
//   });
// });

// rl.on('SIGTSTP', () => {
//   // 这将覆盖 SIGTSTP 并阻止程序进入后台。
//   console.log('捕获 SIGTSTP');
// });

// rl.on('close', () => {
//   console.log('closed');
// });

////////////////////////
// const values = ['lorem ipsum', 'dolor sit amet'];
// process.stdin.on('keypress', () => {
//   console.log('\n', values.filter(val => val.startsWith(rl.line)).join(' '));
// });
