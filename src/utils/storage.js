/* 存储数据 */
export const setItem = (key, value) => {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/* 获取数据 */
export const getItem = (key, value) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 删除数据 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/* 清除所有数据 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
