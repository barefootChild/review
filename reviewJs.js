//单例模式
function getSingle(fn) {
  var instance
  return function() {
    return instance || (instance = fn.apply(this, arguments))
  }
}

//AOP模式
Function.prototype.before = function(beforeFn) {
  var _self = this
  return function() {
    beforeFn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterFn) {
  var _self = this
  return function() {
    var ret = _self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

//新版Promise.race避免一个promise reject导致整个流程reject
Promise.prototype.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.map(p => Promise.resolve(p))
    promises.forEach(p => p.then(resolve))
    promises.reduce((a, b) => a.catch(() => b)).catch(() => reject(Error("ALL FAILED!")))
  })
}

