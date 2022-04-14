const getters = {
  token: state => {
    return state.user.token
  },
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
