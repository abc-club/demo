// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]

function f(){
  var arr = new Array(10)
  var ans = []
  for(var i=0;i<10;i++) {
    arr[i] = Math.floor(Math.random()*100)
    var res = Math.floor(arr[i]/10)
    if(ans[res]) {
      ans[res].push(arr[i])
    } else {
      ans[res] = [arr[i]]
    }
  }
  return ans.filter(item=> item)
}

console.log(f())