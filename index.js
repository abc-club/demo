const data = [{
  id: '1',
  name: 'test1',
  children: [
      {
          id: '11',
          name: 'test11',
          children: [
              {
                  id: '111',
                  name: 'test111'
              },
              {
                  id: '112',
                  name: 'test112'
              }
          ]

      },
      {
          id: '12',
          name: 'test12',
          children: [
              {
                  id: '121',
                  name: 'test121'
              },
              {
                  id: '122',
                  name: 'test122'
              }
          ]
      }
  ]
}];

function find(arr,id) {
  var helper = function(arr,id) {
    var stack =[]
    if(!arr|| arr.length<=0) return
    for(var i=0;i<arr.length;i++) {
      if(arr[i].id===id) {
        stack.push(id)
        break
      } else {
        stack.push(arr[i].id)
        helper(arr[i].children, id, stack)
      }
    }
  }
  var stack = []
  helper(arr,id,stack)
  return stack
}

console.log(find(data, '121'))