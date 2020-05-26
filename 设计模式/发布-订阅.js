var pubsub = {
  subscribes: [],
  publish(){
    this.subscribes.forEach(sub=>{
      sub.update()
    })
  },
  subscribe(sub) {
    this.subscribes.push(sub)
  }
}

var subscribe = {
  update() {
    console.log('update')
  },
  subscribe(pubsub) {
    pubsub.subscribe(this)
  }
}

var publisher = {
  publish(pubsub) {
		pubsub.publish()
	}
}

subscribe.subscribe(pubsub)
publisher.publish(pubsub)