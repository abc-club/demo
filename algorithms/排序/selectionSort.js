// 每次循环选取一个最小的数字放到前面的有序序列中。
function selectionSort(array) {
  for (var i = 0; i < array.length; i++) {
    var minIndex = i;
    for (var j = i; j < array.length; j++) {
      if (array[j] < array[minIndex]) minIndex = j;
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return array;
}
console.log(selectionSort([7, 5, 4, 6, 2, 1, 1]));
