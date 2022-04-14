const getters = {
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
