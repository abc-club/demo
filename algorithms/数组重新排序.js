// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

var arr = [1,2,3,4,5,6]

// 算法复杂度O(n)
function reOrderArray(arr) {
  var result = []
  arr.forEach(item => {
    if (item%2 === 1) result.unshift(item)
    else result.push(item)
  })
  return result
}


// 设定两个指针

// 第一个指针start从数组第一个元素出发，向尾部前进

// 第二个指针end从数组的最后一个元素出发，向头部前进

// start遍历到偶数，end遍历到奇数时，交换两个数的位置

// 当start>end时，完成交
// 算法复杂度O(logn)
function reOrderArray1(array) {
  if (Array.isArray(array)) {
    let start = 0;
    let end = array.length - 1;
    while (start < end) {
      while (array[start] % 2 === 1) {
        start++;
      }
      while (array[end] % 2 === 0) {
        end--;
      }
      if (start < end) {
        [array[start], array[end]] = [array[end], array[start]]
      }
    }
  }
  return array;
}

console.log(reOrderArray(arr))
console.log(reOrderArray1(arr))