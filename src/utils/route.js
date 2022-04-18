const path = require('path-browserify')

/* 返回所有子路由 */
export const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/* 过滤已有一级路由 */
export const filterRouter = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(item => {
      return item.path === route.path
    })
  })
}

/* 判断数据是否为空值 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/* 根据routes数据 返回对应的Menu规则数组 */
export const generateMenus = (routes, basePath) => {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在children && 不存在meta 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children && 不存在meta 进入迭代
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }

    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon&&title
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, routePath))
    }
  })

  return result
}
