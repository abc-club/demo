// 

var nums = [-1, 0, 1, 2, -1,-1, -4]

// [-4,-1,-1,0,1,2]
function IsContinuous(nums) {
  let result = []
  if (nums.length == 0) return []
  if (nums.length == 1) return nums[0] === 0? [[0]] : []
  if (nums.length == 2) return nums[0] + nums[1] === 0? [[0,1]] : []
  let length = nums.length
  nums.sort((a,b) => a-b)
  console.log(nums)
  let p1 = 0, p2 = 1, p3 = length - 1;
  while(p3 -p1 > 1 ) {
    if (p2 === p3) {
      p1++
      p2 = p1 + 1
      p3 = length - 1
      continue
    }
    if (nums[p1] + nums[p2] + nums[p3] === 0) {
      result.push([nums[p1],nums[p2],nums[p3]])
      p3--
      p2++
      // 不知道为啥不行
      // while(nums[p3] === nums[p3-1]) p3--
      // while(nums[p2] === nums[p2-1]) p2++
      continue
    }
    if (nums[p1] + nums[p2] + nums[p3] > 0) {
      p3--
      continue
    }
    if (nums[p1] + nums[p2] + nums[p3] < 0) {
      p2++
      continue
    }
  }
  return result
}

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // 跳过重复数字
    if (i && nums[i] === nums[i - 1]) { continue; }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        result.push([nums[i], nums[left++], nums[right--]]);
        // 跳过重复数字
        while (nums[left] === nums[left - 1]) {
          left++;
        }
        // 跳过重复数字
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      }
    }
  }
  return result;
}

console.log(threeSum(nums))