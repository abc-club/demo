function ListNode(data, next = null) {
  this.data = data
  this.next = next
}

ListNode.prototype.show = function() {
  console.log(this.data)
}
let root = new ListNode(1)
let node2 = new ListNode(2)
let node3 = new ListNode(3)
let node4 = new ListNode(4)
let node5 = new ListNode(5)

root.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node3

// 不好
// function EntryNodeOfLoop(node) {
//   if (!node) return
//   let stack = []
//   let current = node
//   let result = null
//   while(current) {
//     if (stack.indexOf(current) > -1) {
//       result = current
//       break
//     }
//     stack.push(current)
//     current = current.next
//   }
//   if (result) return result
// }


// 声明两个指针 P1 P2

// 1.判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在

// 2.从环内某个节点开始计数，再回到此节点时得到链表环的长度 length

// 3.P1、P2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点
function EntryNodeOfLoop(pHead) {
  if (!pHead || !pHead.next) {
    return null;
  }
  let P1 = pHead.next;
  let P2 = pHead.next.next;
  // 1.判断是否有环
  while (P1 != P2) {
    if (P2 === null || P2.next === null) {
      return null;
    }
    P1 = P1.next;
    P2 = P2.next.next;
  }
  // 2.获取环的长度
  let temp = P1;
  let length = 1;
  P1 = P1.next;
  while (temp != P1) {
    P1 = P1.next;
    length++;
  }
  // 3.找公共节点
  P1 = P2 = pHead;
  while (length-- > 0) {
    P2 = P2.next;
  }
  while (P1 != P2) {
    P1 = P1.next;
    P2 = P2.next;
  }
  return P1;
}

console.log(EntryNodeOfLoop(root))