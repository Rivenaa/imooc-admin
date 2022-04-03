import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/* 请求拦截器 */
service.interceptors.request.use((config) => {
  config.headers.icode = '1BB3797345D2472E'
  return config
})

export default service
