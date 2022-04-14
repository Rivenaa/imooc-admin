/* 判断是否为外界资源 */

export function isExternal(path) {
  return /^(https?:|milto:|tel:)/.test(path)
}
