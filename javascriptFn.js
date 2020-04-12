// 简易深拷贝
function easyClone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = easyClone(target[key])
    }

    return cloneTarget
  } else {
    return target
  }
}

// 模拟实现call
Function.prototype.selfCall = function(context = window, ...args) {
  if (this === Function.prototype) {
    return false
  }

  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]

  return result
}

// 模拟实现apply
Function.prototype.selfApply = function(conntext = window, ...args) {
  if (this === Function.prototype) {
    return false
  }

  const fn = Symbol()
  conntext[fn] = this
  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}

// 模拟实现bind
Function.prototype.selfBind = function(context, ...args1) {
  if (this === Function.prototype) {
    return false
  }
  const _this = this
  return function F(...args2) {
    if (this instanceof F) {
      return new _this(...args1, ...args2)
    }
    return _this.apply(context, args1.concat(args2))
  }
}

// 手动实现EventEmitter
function selfEventEmitter() {

}

selfEventEmitter.prototype.addListener = function(event, listener) {
  this.events = this.events || Object.create(null)
  if (this._events[event]) {
    this._events[event].push(listener)
  } else {
    this._events[event] = [listener]
  }
}

selfEventEmitter.prototype.removeListener = function(event, listener) {
  if (Array.isArray(this._events[event])) {
    if (!listener) {
      delete this._events[event]
    } else {
      this._events[event].filter(fn => return fn !== listener && fn.origin !== listener)
    }
  }
}

selfEventEmitter.prototype.once = function(event, listener) {
  const fn = (...args) => {
    listener.apply(this, args)
    this.removeListener(event, listener)
  }
  fn.origin = listener
  this.addListener(event, fn)
}

selfEventEmitter.prototype.emit = function(event, ...args) {
  if (Array.isArray(this._events[event])) {
    this._events[event].forEach(fn => {
      fn.apply(this, args)
    })
  }
}

// 防抖
function debounce(fn, time, flag) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    if (flag && !timer) {
      fn.apply(this, args)
      timer = 1
      return false
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

// 节流
function throttle1(fn, time) {
  let pre = 0
  return function(...args) {
    if (Date.now() - pre > time) {
      pre = Date.now()
      fn.apply(this, args)
    }
  }
}

function throttle2(fn, time) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, time)
    }
  }
}

function throttle3(fn, time) {
  let pre = 0, timer = null
  return function(...args) {
    if (Date.now() - pre > time) {
      fn.apply(this, args)
      pre = Date.now()
      clearTimeout(timer)
      timer = null
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, time)
    }
  }
}

// 数组去重
function unique1(arr) {
  let container = {}

  return arr.filter(item => container.hasOwnProperty(item) ? false : container[item] = true)
}

function unique2(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

function unique3(arr) {
  return Array.from(new Set(arr))
}

// 排序去重
function unique4(arr) {
  arr.sort((a, b) => a - b)
  let pre = 0
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (i==0 || arr[i] !== arr[pre]) {
      result.push(arr[i])
    }
    pre = i
  }

  return result
}

// 去掉重复的值
function unique5(arr) {
  return arr.filter(item => arr.indexOf(item) === arr.lastIndexOf(item))
}

// 数组扁平化
function flat1(arr) {
  let result = []
  for (let i=0; i< arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat(arr[i]))
    } else {
      result.push(arr[i])
    }
  }

  return result
}

function flat2(arr) {
  return arr.reduce((target, current) => {
    return Array.isArray(current) ? target.concat(flat2(current)) : target.concat(current)
  }, [])
}

function flat3(arr, deep) {
  return arr.reduce((target, current) => {
    return Array.isArray(current) && deep > 1 ? target.concat(flat3(current)) : target.concat(current)
  }, [])
}

// 最值
arr.reduce((target, current) => Math.max(target, current))
Math.max.apply(null, arr)
Math.max(...arr)

// 实现map
Array.prototype.selfMap = function(fn) {
  return this.reduce((target, current, index) => {
    target.push(fn.call(this, current, index))
    return target
  }, [])
}

// 实现filter
Array.prototype.selfFilter = function(fn) {
  return this.reduce((target, current, index) => {
    if (fn.call(this, current, index)) {
      target.push(current)
    }
    return target
  }, [])
}

// 数组乱序洗牌
function disOrder(arr) {
  const len = arr.length
  let current = len - 1
  let random
  let t
  while(current > -1) {
    random = Math.floor(len * Math.random())
    t = arr[current]
    arr[current] = arr[random]
    arr[random] = t
    // [arr[current], arr[random]] = [arr[random], arr[current]]
    current--
  }

  return arr
}

// 函数柯里化
function currying(fn, ...args) {
  if (args.length > fn.length) {
    fn(...args)
  } else {
    return (...args2) => currying(fn, ...args, ...args2)
  }
}

// 手动实现JSONP
(function(window, document) {
  var jsonp = function(url, data, callback) {
    var searchStr = url.indexOf('?') > -1 ? '&' : '?'
    for (var key in data) {
      searchStr += key + '=' + data[key] + '&'
    }

    var cbFuncName = 'self_json_cb' + Math.random().toString().replace('.', '')
    searchStr += 'callback=' + cbFuncName

    var scriptEle = document.createElement('script')
    scriptEle.src = url + searchStr

    window[cbFuncName] = function(data) {
      callback(data)
      document.body.removeChild(scriptEle)
    }

    document.body.appendChild(scriptEle)
  }

  window.$jsonp = jsonp
})(window, document)

// 模拟实现promise
const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'
function selfPromise(fn) {
  this.state = PENDING
  this.value = null
  this.reason = reason
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => {
        fn()
      })
    }
  }

  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => {
        fn()
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch(reason) {
    reject(reason)
  }
}

selfPromise.prototype.then = function(onFulfilled, onRejected) {
  let thenPromise = new selfPromise((resolve, reject) => {
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          let value = onFulfilled(this.value)
          resolve(value)
        } catch(err) {
          reject(err)
        }
      }, 0)
    } else if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          let value = onRejected(this.reason)
          resolve(value)
        } catch(err) {
          reject(err)
        }
      }, 0)
    } else {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            let value = onFulfilled(this.value)
            resolve(value)
          } catch(err) {
            reject(err)
          }
        }, 0)
      })
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let value = onRejected(this.reason)
            resolve(value)
          } catch(err) {
            reject(err)
          }
        }, 0)
      })
    }
  })

  return thenPromise
}

selfPromise.prototype.catch = function(fn) {
  return this.then(null, fn)
}

selfPromise.prototype.finally = function(fn) {
  return this.then((value) => {
    fn(value)
  }, (reason) => {
    fn(reason)
  })
}

selfPromise.resolve = function(value) {
  return new selfPromise((resolve, reject) => {
    resolve(value)
  })
}

selfPromise.reject = function(reason) {
  return new selfPromise((resolve, reject) => {
    reject(reason)
  })
}

selfPromise.all = function(promiseArr){
  return new selfPromise((resolve, reject) => {
    if (promiseArr.length === 0) {
      resolve([])
    } else {
      let results = [], count = 0
      promiseArr.forEach((item, index) => {
        item.then((value) => {
          results[index] = value
          count++
          if (count === promiseArr.length) {
            resolve(results)
          }
        }, (reason) => {
          reject(reason)
        })
      })
    }
  })
}

selfPromise.race = function(promiseArr) {
  return new selfPromise((resolve, reject) => {
    if (promiseArr.length === 0) {
      resolve()
    } else {
      promiseArr.forEach(item => {
        item.then((value) => {
          resolve(value)
        }, (reason) => {
          reject(reason)
        })
      })
    }
  })
}

// 手动实现instanceof

function selfInstanceof(target, origin) {
  const proto = target.__proto__
  if (proto === origin.prototype) {
    retun true
  } else {
    return selfInstanceof(proto, origin)
  }

  return false
}

// 单例模式

function singleFun(fn) {
  fn.getInstance = (function() {
    var instance
    return function(...args) {
      if (!instance) {
        return new fn(...args)
      }

      return instance
    }
  })()
}

// 二分查找, 数组必需是有序的

function binarySearch(data, arr, start, end) {
  if(start > end) {
    return -1
  }
  let middle = Math.floor((start + end) / 2)
  if (data == arr[middle]) {
    return middle
  } else if (data > arr[middle]) {
    return binarySearch(data, arr, middle + 1, end)
  } else {
    return binarySearch(data, arr, start, middle - 1)
  }
}

// 二叉树中序遍历

function middleOrderTree(root, arr = []) {
  if (root) {
    middleOrderTree(root.left, arr)
    arr.push(root.value)
    middleOrderTree(root.right, arr)
  }

  return arr
}

function middleOrderTree1(root) {
  let stack = [], result = []
  let current = root
  while(current || stack.length > 0) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    result.push(current.value)
    current = current.right
  }

  return result
}

// 二叉树前序遍历

function firstOrderTree(root, arr = []) {
  if (root) {
    arr.push(root.vaule)
    firstOrderTree(root.left, arr)
    firstOrderTree(root.right, arr)
  }

  return arr
}

function firstOrderTree1(root) {
  let result = [], stack = []
  let current = root
  while(current || stack.length > 0) {
    while(current) {
      result.push(current.value)
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    current = current.right
  }

  return result
}

// 二叉树后序遍历

function lastOrderTree(root, arr = []) {
  if (root) {
    lastOrderTree(root.left, arr)
    lastOrderTree(root.right, arr)
    arr.push(root.value)
  }

  return arr
}

function lastOrderTree1(root) {
  let result = [], stack = []
  let current = root
  while(current || stack.length > 0) {
    while(current) {
      stack.push(current)
      current = current.left
    }
    current = stack[stack.length - 1]
    if (!current.right || current.right == last) {
      current = stack.pop()
      result.push(current.value)
      last = current
      current = null
    } else {
      current = current.right
    }
  }
  
  return result
}

// 二叉树的重建,给定前序遍历和中序遍历

function reConstructTree(pre, middle) {
  if (pre.length === 0) {
    return null
  }
  if (pre.length === 1) {
    return new TreeNode(pre[0])
  }

  const value = pre[0]
  const index = middle.indexOf(value)
  const preLeft = pre.slice(1, index + 1)
  const preRight = pre.slice(index + 1)
  const middleLeft = middle.slice(0, index)
  const middleRight = middle.slice(index + 1)
  const node = new TreeNode(value)
  node.left = reConstructTree(preLeft, middleLeft)
  node.right = reConstructTree(preRight, middleRight)

  return node
}

// 二叉树的后续遍历,给定前序遍历字符串和中序遍历字符串,求后序遍历字符串

function getLastOrderStr(preStr, middleStr) {
  if (!preStr) {
    return ""
  }
  if (preStr.length === 1) {
    return preStr
  }

  const head = preStr[0]
  const index = middleStr.indexOf(head)
  const preStrLeft = preStr.substring(1, index + 1)
  const preStrRight = preStr.substring(index + 1)
  const middleStrLeft = middleStr.substring(0, index)
  const middleStrRight = middleStr.substring(index + 1)

  return getLastOrderStr(preStrLeft, middleStrLeft) + getLastOrderStr(preStrRight, middleStrRight) + head
}