export function fetchItem(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: renderStr(5),
      });
    }, 500);
  });
}

function renderStr(n) {
  var str = [];
  for (var i = 0; i < n; i++) {
    str[i] = Math.floor(Math.random() * 10);
  }
  return str.join('');
}
