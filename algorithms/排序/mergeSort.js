// 归并排序

// 将已有序的子序列合并，得到完全有序的序列
// 即先使每个子序列有序，再使子序列段间有序
// 若将两个有序表合并成一个有序表，称为二路归并

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  var mid = Math.floor(array.length / 2);
  var left = array.slice(0, mid);
  var right = array.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var temp = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) temp.push(left.shift());
    else temp.push(right.shift());
  }
  while (left.length) {
    temp.push(left.shift());
  }
  while (right.length) {
    temp.push(right.shift());
  }
  return temp;
}
console.log(mergeSort([7, 5, 4, 6, 2, 1, 1]));
