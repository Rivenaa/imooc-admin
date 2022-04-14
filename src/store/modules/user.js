import { login, getUserInfo } from '@/api/index'
import { getItem, setItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            context.commit('setToken', data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      router.push('/login')
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      console.log(res)
      return res
    }
  }
}
