// 快速排序 算法复杂度O(nlogn)
// 选择一个基准元素target（一般选择第一个数）
// 将比target小的元素移动到数组左边，比target大的元素移动到数组右边
// 分别对target左侧和右侧的元素进行快速排序
// NOTE 不好 可以选第一个元素为基准
// function quickSort(array) {
//   if (array.length <= 1) return array;
//   var mid = Math.floor(array.length / 2);
//   var left = [],
//     right = [],
//     middle = [];
//   for (var i = 0; i < array.length; i++) {
//     if (array[i] < array[mid]) {
//       left.push(array[i]);
//     } else if (array[i] > array[mid]) {
//       right.push(array[i]);
//     } else {
//       middle.push(array[i]);
//     }
//   }
//   return [...quickSort(left), ...middle, ...quickSort(right)];
// }

// function quickSort(array) {
//   if (array.length <= 1) return array;
//   var left = [],
//     right = [],
//     middle = [];
//   for (var i = 0; i < array.length; i++) {
//     if (array[i] < array[0]) {
//       left.push(array[i]);
//     } else if (array[i] > array[0]) {
//       right.push(array[i]);
//     } else {
//       middle.push(array[i]);
//     }
//   }
//   return [...quickSort(left), ...middle, ...quickSort(right)];
// }

function quickSort(array) {
  if (array.length <= 1) return array;
  var left = [],
    right = [],
    middle = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] < array[0]) {
      left.push(array[i]);
    } else if (array[i] > array[0]) {
      right.push(array[i]);
    } else {
      middle.push(array[i]);
    }
  }
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
console.log(quickSort([7, 5, 4, 6, 2, 1, 1]));
