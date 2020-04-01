// 循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。

// 这样一次循环之后最后一个数就是本数组最大的数。

// 下一次循环继续上面的操作，不循环已经排序好的数。

// 优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。

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

console.log(bubbleSort([7, 5, 4, 6, 2, 1, 1]));
