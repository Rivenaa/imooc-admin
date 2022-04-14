import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/* 请求拦截器 */
service.interceptors.request.use(
  config => {
    config.headers.icode = '1BB3797345D2472E'
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
      /* token超时 */
      if (isCheckTimeout) {
        store.dispatch('user/logout')
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
service.interceptors.response.use(
  response => {
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      /* 业务错误 */
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    /* TODO:处理Token超时问题 */
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    /* 提示错误信息 */
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
