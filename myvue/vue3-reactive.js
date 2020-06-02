
const isObject = (val) => val !== null && typeof val === 'object'
const isArray = Array.isArray

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue)

let targetMap = new WeakMap() 
let activeEffect
const effectStack = []
let shouldTrack = true
const trackStack = []
let uid = 0

function reactive(obj) {
  if(!isObject(obj)) return obj
  let p = new Proxy(obj, {
    get(target, key, receiver) {
      
      console.log(`get ${key}`)
      let res = Reflect.get(target, key, receiver)
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      console.log(`set ${key} ${value}`)
      const oldValue = target[key]
      const hadKey = hasOwn(target, key)
      let res = Reflect.set(target, key, value, receiver)
      if (!hadKey) {
        trigger(target, 'add', key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, 'set', key, value, oldValue)
      }
      return res
    },
  })
  return p
}

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    // activeEffect.deps.push(dep)
  }
}

function trigger(target, type, key, value, oldValue) {
  debugger
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // never been tracked
    return
  }
  const effects = new Set()
  const computedRunners = new Set()

  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        if (effect !== activeEffect || !shouldTrack) {
          if (effect.options.computed) {
            computedRunners.add(effect)
          } else {
            effects.add(effect)
          }
        } else {
        }
      })
    }
  }
  // if(key === 'length'  && isArray(target)) {
  //   depsMap.forEach((dep, key) => {
  //     if (key === 'length' || key >= (newValue as number)) {
  //       add(dep)
  //     }
  // }
  if (key !== void 0) {
    add(depsMap.get(key))
  }
  const run = effect=>{
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  }
  computedRunners.forEach(run)
  effects.forEach(run)
}

function effect(fn, options) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect(...args) {
    if (!effect.active) {
      return options.scheduler ? undefined : fn(...args)
    }
    if (!effectStack.includes(effect)) {
      cleanup(effect)
      try {
        enableTracking()
        effectStack.push(effect)
        activeEffect = effect
        return fn(...args)
      } finally {
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.options = options
  return effect
}
function enableTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = true
}
function resetTracking() {
  const last = trackStack.pop()
  shouldTrack = last === undefined ? true : last
}

function cleanup(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

let obj = {
  a: [1,2],
  b: {
    c: 1
  },
  d: 1
}
// obj对应的更新操作
function init() {
  // 这里模拟更新界面, 希望每次赋值只触发一次
  console.log('init')
}
function update() {
  // 这里模拟更新界面, 希望每次赋值只触发一次
  console.log('update')
}


// let obj2 = {
//   aa: 1
// }
// // obj2对应的更新操作
// function update2() {
//   // 这里模拟更新界面, 希望每次赋值只触发一次
//   console.log('update')
// }
let proxyObj = reactive(obj)
// let proxyObj2 = reactive(obj2)

// 这里模拟render的时候获取obj.a
effect(init, {scheduler: update})
proxyObj.a

proxyObj.a.push(3)

