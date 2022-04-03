import { login } from '@/api/index'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    login(context, userInfo) {
      const { usernmae, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          usernmae,
          password: md5(password)
        })
          .then((data) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
