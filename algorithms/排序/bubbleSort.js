// 循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。

// 这样一次循环之后最后一个数就是本数组最大的数。

// 下一次循环继续上面的操作，不循环已经排序好的数。


function bubbleSort(array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}


// 优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。
function bubbleSort(array) {
  var i = array.length -1
  while(i>0) {
    var pos = 0
    for(var j =0;j<i;j++) {
      if(array[j]>array[j+1]) {
        pos = j; // 注意这里要分号，否则不符合预期
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
    i = pos
  }
  return array
}

function bubbleSort1(arr) {
  let i = arr.length - 1;

  while (i > 0) {
      let pos = 0;
      for (let j = 0; j < i; j++) {
          if (arr[j] > arr[j + 1]) {
              pos = j;
              const temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
      i = pos;
  }
  console.log(arr);
}

console.log(bubbleSort([7, 5, 4, 6, 2, 1, 1]));
