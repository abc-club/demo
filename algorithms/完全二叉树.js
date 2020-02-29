function Node(data, left, right) {
  this.data = data
  this.left = left
  this.right = right
}

Node.prototype.show = function() {
  console.log(this.data)
}

function Tree() {
  this.root = null
}

Tree.prototype.init = function(arr) {
  let nodelist = []
  let length = arr.length
  arr.forEach(data=>nodelist.push(new Node(data, null, null)))
  for(var i = 0;i<length;i++) {
    if (2*i+1<=length) nodelist[i].left = nodelist[2*i+1]
    if (2*i+2<=length) nodelist[i].right = nodelist[2*i+2]
    if (i===0) this.root = nodelist[i]
  }
}



// 递归方法
// Tree.prototype.preOrder = function(node) {
//   if (node) {
//     node.show()
//     this.preOrder(node.left)
//     this.preOrder(node.right)
//   }
// }

Tree.prototype.preOrder = function(node) {
  let current = node
  let stack = []
  while(current || stack.length > 0) {
    while(current) {
      current.show()
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }
}

Tree.prototype.middleOrder = function(node) {
  if (node) {
    this.middleOrder(node.left)
    node.show()
    this.middleOrder(node.right)
  }
}

Tree.prototype.middleOrder = function(node) {
  let current = node
  let stack = []
  while(current || stack.length) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current.show()
    current = current.right
  } 
}


// Tree.prototype.laterOrder = function(node) {
//   if (node) {
//     this.laterOrder(node.left)
//     this.laterOrder(node.right)
//     node.show()
//   }
// }

Tree.prototype.laterOrder = function(node) {
  let current = node
  let stack = []
  let last = null
  while(current || stack.length > 0) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length - 1]
    if (!current.right || current.right === last) {
      current.show()
      last = stack.pop()
      current = null
    } else {
      current = current.right
    }
  }
}

let tree = new Tree()
tree.init([1,2,3,4,5,6,7])
// tree.insert(1)
// tree.insert(2)
// tree.insert(3)
// tree.insert(4)
// tree.insert(5)
// tree.insert(6)
// tree.insert(7)
// tree.preOrder(tree.root)
// tree.middleOrder(tree.root)
tree.laterOrder(tree.root)
