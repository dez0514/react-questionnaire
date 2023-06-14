export const debounce = (fn: Function, wait: number = 500) => {
  let timeout: any = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...arguments)
    }, wait)
  }
}