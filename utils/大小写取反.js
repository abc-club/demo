// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc'

// function converse(str) {
//   str = str.replace(/([A-Za-z])/g, function(matched, capture1,position,str,groups){
//     if(capture1>='A'&&capture1<='Z') return capture1.toLowerCase()
//     else return capture1.toUpperCase()
//   })
//   return str
// }

// console.log(converse('aBc'))



// str.replace(/(\w)/g, m => m === m.toUpperCase() ? m.toLowerCase() : m.toUpperCase())

function processString (s) {
  var arr = s.split('');
  var new_arr = arr.map((item) => {
      return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
  });
  return new_arr.join('');
}
console.log(processString('AbC'));