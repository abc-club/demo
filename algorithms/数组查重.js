// 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回-1（需要区分大小写）。

var str = 'bca'

function find(str) {
  var map ={}
  for (var i = 0;i < str.length;i++) {
    var val = str[i]
    if (!map[val]) map[val] = 1
    else map[val]++
  }
  for (var i = 0;i < str.length;i++) {
    if (map[str[i]] === 1) break
  }
  return i
}

function find2(str) {
  var arr = str.split('').sort()
  if (arr.length < 2) return arr[0]
  let i = 0,j = 1
  while(i<arr.length && j<arr.length) {
    let p1 = arr[i]
    let p2 = arr[j]
    if (p1 === p2) {
      j++
    } else {
      if (j - i ===1) break
      i = j
      j++
    }
  }
  // 有结果的条件
  if (j - i ===1) {
    return str.indexOf(arr[i])
  }
  return -1
}

console.log(find(str))
console.log(find2(str))

