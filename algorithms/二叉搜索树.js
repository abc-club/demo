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
  arr.forEach(data=>this.insert(data))
}

Tree.prototype.insert = function(data) {
  if (!this.root) {
    this.root = new Node(data, null, null)
    return
  }
  let current = this.root
  let last = null
  while(current) {
    last = current
    if (data < current.data) {
      current = current.left
      if (!current) {
        last.left = new Node(data, null, null) 
        return
      }
    } else {
      current = current.right
      if (!current) {
        last.right = new Node(data, null, null) 
        return
      }
    }
  }
  // if (data < last.data) last.left = new Node(data, null, null)
  // else last.right = new Node(data, null, null)
}



// 递归方法
Tree.prototype.preOrder = function(node) {
  if (node) {
    node.show()
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
}

// Tree.prototype.preOrder = function(node) {
//   let current = node
//   let stack = []
//   while(current || stack.length > 0) {
//     while(current) {
//       current.show()
//       stack.push(current)
//       current = current.left
//     }
//     current = stack.pop()
//     current = current.right
//   }
// }

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

// 获取最大深度
Tree.prototype.getMaxDepth = function (node) {
  if (!node) return 0
  if (!node.left && !node.right) return 1
  let left = this.getMaxDepth(node.left)
  let right = this.getMaxDepth(node.right)
  if (left> right) return left + 1
  else return right + 1
}

// 获取最小深度
Tree.prototype.getMinDepth = function (node) {
  if (!node) return 0
  if (!node.left) {
    return this.getMinDepth(node.right) + 1
  }
  if (!node.right) {
    return this.getMinDepth(node.left) + 1
  }
  return Math.min(getMinDepth(node.left), getMinDepth(node.right)) + 1
}

let tree = new Tree()
tree.init([3,6,4,5])
// tree.init([1,2,3,4,5,6,7])
// tree.insert(1)
// tree.insert(2)
// tree.insert(3)
// tree.insert(4)
// tree.insert(5)
// tree.insert(6)
// tree.insert(7)
// tree.preOrder(tree.root)
// tree.middleOrder(tree.root)
// tree.laterOrder(tree.root)


console.log(tree.getMinDepth(tree.root))