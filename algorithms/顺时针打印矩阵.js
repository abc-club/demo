// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

var nums = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12]
]


function find(nums) {
  console.time('1')
  let direction = 'right'
  let m = nums.length, n = nums[0].length
  let x = 0, y = 0
  while(true) {
    console.log(nums[x][y])
    nums[x][y] = undefined
    if (direction == 'right' && (y+1>n -1 || nums[x][y+1] === undefined) && (x+1> m - 1 || nums[x+1][y]  === undefined)) break
    if (direction == 'down' && (x+1> m - 1 || nums[x+1][y]  === undefined) && (y -1 < 0 || nums[x][y-1]  === undefined)) break
    if (direction == 'left' && (y -1 < 0 || nums[x][y-1]  === undefined) && (x-1<0 || nums[x-1][y]  === undefined)) break
    if (direction == 'up' && (x-1<0 || nums[x-1][y]  === undefined) && (y+1>n -1 || nums[x][y+1]  === undefined)) break
    if (direction == 'right') {
      if (y+1>n -1 || nums[x][y+1]  === undefined) {
        direction = 'down'
        x++
      } else {
        y++
      }
      continue
    }
    if (direction == 'down') {
      if (x+1> m - 1 || nums[x+1][y]  === undefined) {
        direction = 'left'
        y--
      } else {
        x++
      }
      continue
    }
    if (direction == 'left') {
      if (y -1 < 0 || nums[x][y-1]  === undefined) {
        direction = 'up'
        x--
      } else {
        y--
        
      }
      continue
    }
    if (direction == 'up') {
      debugger
      if (x-1<0 || nums[x-1][y]  === undefined) {
        direction = 'right'
        y++
      } else {
        x--
      }
      continue
    }
  }
  console.timeEnd('1')
}


function printMatrix(matrix) {
  console.time('2')
  var start = 0;
  var rows = matrix.length;
  var coloums = matrix[0].length;
  var result = [];
  if (!rows || !coloums) {
    return false;
  }
  while (coloums > start * 2 && rows > start * 2) {
    printCircle(matrix, start, coloums, rows, result);
    start++;
  }
  console.timeEnd('2')

  return result;
}

// 打印一圈
function printCircle(matrix, start, coloums, rows, result) {
  var entX = coloums - start - 1;
  var endY = rows - start - 1;
  for (var i = start; i <= entX; i++) {
    result.push(matrix[start][i]);
  }
  if (endY > start) {
    for (var i = start + 1; i <= endY; i++) {
      result.push(matrix[i][entX]);
    }
    if (entX > start) {
      for (var i = entX - 1; i >= start; i--) {
        result.push(matrix[endY][i]);
      }
      if (endY > start + 1) {
        for (var i = endY - 1; i > start; i--) {
          result.push(matrix[i][start]);
        }
      }
    }
  }
}

console.log(printMatrix(nums))
find(nums)
