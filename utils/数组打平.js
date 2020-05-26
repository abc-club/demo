let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

// var flat = function(arr) {
//   var ans = []
//   arr.forEach(item=>{
//     if(item instanceof Array) {
//       ans.push(...flat(item))
//     } else {
//       ans.push(item)
//     }
//   })
//   return ans
// }

// var flat = function(arr, result = []) {
//   arr.forEach(item=>{
//     if(item instanceof Array) {
//       flat(item, result)
//     } else {
//       result.push(item)
//     }
//   })
//   return result
// }

// var flat = function(arr) {
//   var arrs = [...arr]
//   var result = []
//   while(arrs.length){
//     var item = arrs.shift()
//     if(Array.isArray(item)) {
//       arrs.unshift(...item)
//     } else {
//       result.push(item)
//     }
//   }
//   return result
// }


function* iterator (arr) {
  for(let item of arr){
		if(Array.isArray(item)){
			yield* iterator(item);//Generator委托
		}else {
			yield item
		}
	}
}

function flat(arr) {
  var g = iterator(arr)
  var result = []
  for(var item of g) {
    result.push(item)
  }
  return result
}

console.log(flat(arr))

