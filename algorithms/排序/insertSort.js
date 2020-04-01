// 将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。

// 插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。

function insertSort(array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = i; j > 0; j--) {
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
      }
    }
  }
  return array;
}
console.log(insertSort([7, 5, 4, 6, 2, 1, 1]));
