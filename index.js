function Parent(a){
  this.a = a
}
Parent.prototype.getA = function() {
  return this.a
}

function Child(a,b) {
  Parent.apply(this, arguments)
  this.b = b
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.getB = function() {
  return this.b
}
var c= new Child(1,2)