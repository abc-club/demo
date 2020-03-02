function ListNode(data, next = null) {
  this.data = data
  this.next = next
}

ListNode.prototype.show = function() {
  console.log(this.data)
}

function List() {
  this.root = null
}

// 在最后插入一个节点
List.prototype.add = function(data) {
  if (!this.root) {
    this.root = new ListNode(data)
    return
  }
  let current = this.root
  let last = null
  while(current) {
    last = current
    current = current.next
  }
  last.next = new ListNode(data)
}

// 在afterVal后面插入data
List.prototype.insertAfter = function(afterVal, data) {
  let current  = this.root
  while(current) {
    if (current.data === afterVal) {
      let node = new ListNode(data)
      if (current.next) node.next = current.next
      current.next = node
      break
    }
    current = current.next
  }
}


List.prototype.show = function() {
  let current = this.root
  while(current) {
    current.show()
    current = current.next
  }
}

// 反转链表
List.prototype.reverse = function() {
  let current = this.root
  let head = this.root
  while(current && current.next) {
    let next = current.next
    current.next = next.next
    next.next = head
    head = next
  }
  return head
}


// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
// function merge(list1, list2) {
//   let p1 = list1.root
//   let p2 = list2.root
//   let head = list1.root
//   let pre = null // 保存list1前一个
//   while(p1) {
//     let current = null
//     let pre2 = null
//     while(p2) {
//       if (p2.data < p1.data) {
//         if (!current) pre2 = p2
//         current = p2
//         p2 = p2.next
//       }
//       else break
//     }
//     if (current) {
//       if (p1 === list1.root) head = list2.root // 第一次循环时，如果list2中有比list1.root小的head应该设为list2.root
//       p2 = current.next
//       if(pre) pre.next = pre2
//       current.next = p1
//     } else {
//       p2 = list2.root
//     }
//     pre = p1
//     p1 = p1.next
//   }
//   return head
// }


function merge(node1, node2) {
  if (!node1 || !node2) return
  if (node1.data < node2.data) {
    merge(node1.next, node2)
    node1.next= node2
  }
  else {
    merge(node1, node2.next)
    node2.next= node1
  }
}

// 查找倒数第k项
// function findLastK(node, k) {
//   let current = node
//   let arr = []
//   while(current) {
//     arr.push(current.data)
//     current = current.next
//   }
//   return arr[arr.length - k]
// }


// 性能更好
// 查找倒数第k项
function findLastK(head, k) {
  if (!head || !k) return null;
  let front = head;
  let behind = head;
  let index = 1;
  while (front.next) {
    index++;
    front = front.next;
    if (index > k) {
      behind = behind.next;
    }
  }
  return (k <= index) && behind;
}


let list1 = new List()
list1.add(1)
list1.add(4)
list1.add(5)
list1.add(7)

// var reverseList = function(head) {
//   var stack = []
//   var current = head
//   while(current) {
//       stack.unshift(current)
//       current = current.next
//   }
//   for(var i=0;i<stack.length;i++) {
//       if (stack[i+1]) stack[i].next = stack[i+1]
//   }
//   return stack[0]
// };

var reverseList = function(head) {
  let currentNode = null;
  var root = head
  while(head && head.next) {
      head.next = head.next.next
      head.next.next = root
      root = head.next
  }
  return root
};

console.log(reverseList(list1.root))

// let list2 = new List()
// list2.add(0)
// list2.add(3)
// list2.add(6)
// list2.add(8)

// console.log(merge(list1, list2))
// merge(list1.root, list2.root)
// console.log(list2.root)

// list.insertAfter(4,6)

// list.show()

// console.log(list.reverse())