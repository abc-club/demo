function ListNode(val, next = null) {
  this.val = val
  this.next = next
}

var node1 = new ListNode(1)
var node2 = new ListNode(2)
var node3 = new ListNode(4)
node1.next = node2
node2.next = node3


var nodea = new ListNode(1)
var nodeb = new ListNode(3)
var nodec = new ListNode(4)
nodea.next = nodeb
nodeb.next = nodec

var mergeTwoLists = function(l1, l2) {
  if (!l1 || !l2) return
  let little = l1, big = l2
  if (l1.val > l2.val) {
      little = l2
      big = l1
  }
  let temp = little.next
  little.next = big
  mergeTwoLists(temp, big)
  return little
};

console.log(mergeTwoLists(node1,nodea))
