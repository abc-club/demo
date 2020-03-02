// 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径

function find(root, expectNumber, tempArr = [],result =[]) {
  tempArr.push(root.val)
  if (root.left) find(root.left, expectNumber - root.val,tempArr,result)
  if (root.right) find(root.right, expectNumber - root.val,tempArr,result)
  if (!root.left && !root.right) {
    if (root.val === expectNumber) result.push(tempArr.slice(0))
  }
  tempArr.pop()
  return result
}

var Node = function(val) {
  this.val = val
  this.left = null
  this.right = null
}

let root = new Node(0)
let n1 = new Node(1)
let n2 = new Node(2)
let n3 = new Node(3)
let n4 = new Node(4)
let n5 = new Node(5)
let n6 = new Node(6)

root.left = n1
root.right = n2

n1.left = n5
n1.right = n4

n2.left = n3
n2.right = n6

console.log(find(root, 5))