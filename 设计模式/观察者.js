// 没有中间商

var subject = {
  observers: [],
  attach(observer){
    this.observers.push(observer)
  },
  notify() {
    this.observers.forEach(observer=>{
      observer.update()
    })
  }
}

var observer ={
  update() {
    console.log('update')
  }
}


subject.attach(observer)
subject.notify()