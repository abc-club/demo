let pre = '12473568'
let mid = '47215386'

function getHRD(pre, vin) {
  if (!pre) {
    return '';
  }
  if (pre.length === 1) {
    return pre;
  }
  const head = pre[0];
  const splitIndex = vin.indexOf(head);
  const vinLeft = vin.substring(0, splitIndex);
  const vinRight = vin.substring(splitIndex + 1);
  const preLeft = pre.substring(1, splitIndex + 1);
  const preRight = pre.substring(splitIndex + 1);
  return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
}

console.log(getHRD(pre,mid))