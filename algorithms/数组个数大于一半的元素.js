var nums = [1,2,3,2]

// function find(nums) {
//   var map = {}
//   for (var i = 0; i<nums.length;i++) {
//     if (!map[nums[i]]) map[nums[i]] = 1
//     else map[nums[i]]++
//   }
//   for(var item in map) {
//     if (map[item] > nums.length/2) return item
//   }
//   return false
// }

function find(nums) {
  nums.sort((a,b) => a -b)

  let count = 1
  let length = nums.length
  for (var i = 0; i<length;i++) {
    if (nums[i] === nums[i+1]) {
      count++
      if (count > length/2) break
    }
    else count = 1
  }
  if (i < length) return nums[i]
  return false
}

console.log(find(nums))

