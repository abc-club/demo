function *g() {
  let res1 = yield p1()
  console.log(res1)
  let res2 = yield p2()
  console.log(res2)
  let res3 = yield p3()
  console.log(res3)
}

let p1 = function () {
  return Promise.resolve(1)
}
let p2 = function () {
  return Promise.reject(new Error(2))
}
let p3 = function () {
  return Promise.resolve(3)
}

function run(g) {
  var it = g()
  function go(result) {
    if(result.done) return result.value
    return result.value.then(value=>go(it.next(value)), error=>go(it.next(error)))
  }
  go(it.next())
}

run(g)
