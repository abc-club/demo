// 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

var nums1 = [1, 2, 2, 1]
var nums2 = [2, 2]

// function section(arr1, arr2) {
//   return arr1.filter(item=>{
//     return arr2.indexOf(item) > -1
//   })
// }

function intersection(arr1, arr2) {
  var map = {}
  for(let item of arr1) {
    if(map[item]===undefined) map[item] = 1
    else map[item]++
  }
  var ans = []
  for(let item of arr2) {
    if(map[item]) {
      ans.push(item)
      map[item]--
    }
  }
  return ans
}

console.log(intersection(nums1,nums2))