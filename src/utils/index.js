
/**
 * @param { void } fn
 * @param { }
 */
export function debounce(fn) {
  let timer = null
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, 1000)
  }
}
