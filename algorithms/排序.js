// var arr = [1,3,5,6,2,4]


// 插入排序
function insertSort(arr) {
  for(var i = 0; i< arr.length;i++) {
    var target = i
    for(var j = i-1;j>=0;j--) {
      if (arr[target]<arr[j]) {
        var temp = arr[target]
        arr[target] = arr[j]
        arr[j] = temp
        target = j
      } else{
        break
      }
    }
  }
  return arr
}

// insertSort(arr)
// console.log(insertSort(arr))

// 冒泡排序
function bubbleSort(arr) {
  for(var i=0;i<arr.length;i++) {
    for(var j=0;j< arr.length - i;j++){
      if (arr[j]>arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
// bubbleSort(arr)
// console.log(arr)


function selectionSort(arr) {
  for(var i=0;i<arr.length;i++) {
    var minIndex = i
    for(var j = i+1;j<arr.length;j++) {
      if (arr[j]<arr[minIndex]) minIndex = j
    }
    if (minIndex !== i) {
      [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]]
    }
  }
}
// selectionSort(arr)
// console.log(arr)

var arr = [3,5,6,2,4]

// function quickSort(arr) {
//   debugger
//   if(!arr || arr.length <=0) return []
//   var left = [], right = []
//   for(var i = 1; i< arr.length;i++) {
//     if (arr[i] < arr[0]) left.push(arr[i])
//     else right.push(arr[i])
//   }
//   return [...quickSort(left), arr[0], ...quickSort(right)]
// }



console.log(quickSort(arr))