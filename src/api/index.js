import service from '../service/index'

/* 登录模块 */
export const login = (data) => {
  return service({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
