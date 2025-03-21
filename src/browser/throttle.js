/**
 * 节流
 * @param {Function} fn 被节流的函数
 * @param {Number} wait 时间间隔
 */
const throttle = (fn, wait) => {
  wait = wait || 0

  let prev = 0

  return function () {
    const context = this
    const args = arguments
    const now = +new Date()

    if (now - prev > wait) {
      prev = now
      return fn.apply(context, args)
    }
  }
}

export default throttle
