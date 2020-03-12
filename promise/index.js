
class MyPromise {
  constructor(cb) {
    this.status = 'pending'
    this.result = null
    this.success = null
    this.fail = null

    cb.call(this,this.resolve.bind(this),this.reject.bind(this))
  }

  resolve(data) {
    this.status = 'fulfilled'
    this.result = data
    this.success && (this.result = this.success(data))
  }

  reject(data) {
    this.status = 'rejected'
    this.result = data
    this.fail && (this.result = this.fail(data))
  }


  then(success, fail) {
    this.success = success
    this.fail = fail
    switch(this.status) {
      case 'fulfilled':
        this.success && (this.result = this.success(this.result))
        break
      case 'rejected':
        this.fail && (this.result = this.fail(this.result))
        break
      default:
        break
    }
    return this
  }
}

MyPromise.resolve = function(props) {
  return new MyPromise((resolve,reject)=> {
    resolve(props)
  })
}

MyPromise.reject = function(props) {
  return new MyPromise((resolve,reject)=> {
    reject(props)
  })
}

// 测试用例1
// let p = new MyPromise((resolve, reject) => {
//   // setTimeout(()=> {
//   //   resolve(1)
//   // },1000)
//   resolve(1)
// })

// p.then(res=> {
//   console.log(res)
// })

// 测试用例2

// let p = MyPromise.resolve(1)
// console.log(p)
// p.then(res=> {
//   console.log('a'+res)
//   return 22
// }).then(res=> {
//   console.log('b'+res)
// })

// 测试用例3

// let p = MyPromise.reject(1)
// console.log(p)
// p
//   .then(res=> {
//     console.log('a'+res)
//     return 22
//   }, err=> {
//     console.log('err'+err)
//     return 22
//   })
//   .then(res=> {
//     console.log('a'+res)
//     return 22
//   }, err=> {
//     console.log('err2'+err)
//   })

let p = new Promise((resolve, reject) => {
  // setTimeout(()=> {
  //   resolve(1)
  // },1000)
  resolve(1)
})
console.log(p)

let p1=p.then(res=> {
  console.log(res)
})
console.log(p1)